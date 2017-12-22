/*
 * 添加/修改门店
 * @author : kmr
 * @modified : 2017/9/5
 */
app.controller('store-detailCtrl', function ($scope, $q, $state, $stateParams, $ionicHistory, $http, BASE_URL, $ionicPopover) {
    var save_setting = null;
    var areaId = null;
    var self = this;
    var key = null, file = null;

    $scope.$on('$ionicView.enter', function (event) {
        var province_url = BASE_URL + '/province';
        $http.get(province_url).then(function (res) {            
            $scope.province = res.data;
        });      
        /*************************************************/
        /*     Initialize  page                          */
        /*************************************************/
        $scope.store = {};
        $scope.business = {};
        $scope.shopface_url = '';
        $scope.selectedProvince = '';
        $scope.selectedCity = '';
        $scope.city = [];
        // initialize business services
        var business_url = BASE_URL + '/business';
        $http.get(business_url).then(function (res) {
            $scope.services = res.data;
        });
        $scope.sid = null;        
        // initialize shop type
        $scope.shop_style = [
            {
                name: '1、T+',
                value: 0
            },
            {
                name: '2、其它渠道',
                value: 1
            },
            {
                name: '3、外部投资者',
                value: 2
            }
        ];
        $scope.store.shop_style = $scope.shop_style[0];
        // initialize shop state
        $scope.shop_state = [
            {
                name: '1、正常',
                value: 0
            },
            {
                name: '2、加入流程中',
                value: 1
            },
            {
                name: '3、休眠',
                value: 2
            }
        ];
        $scope.store.shop_state = $scope.shop_state[0];
        // initialize shop toilet
        $scope.toilet = [
            {
                name: '有',
                value: 0
            },
            {
                name: '无',
                value: 1
            }           
        ];
        $scope.store.toilet = $scope.toilet[0];
        // get shop data in detail
        var url = BASE_URL + '/store/get';
        var data = {
            sid: $stateParams.sid
        };
        $http.post(url, data).then(function (res) {
            console.log('store/get:response', res.data);
            var mergeObject = {};                       
            for (key in res.data) {
                mergeObject = angular.extend(mergeObject, res.data[key]);
            }            
            // set shop header.
            $scope.shop_code = mergeObject.shop_code;
            $scope.short_name = mergeObject.short_name;
            $scope.shop_name = mergeObject.shop_name;
            // change date format
            mergeObject.open_time = new Date(mergeObject.open_time);
            mergeObject.shopruntime = new Date(mergeObject.shopruntime);
            mergeObject.DMS_time = new Date(mergeObject.DMS_time);
            mergeObject.decoration_time = new Date(mergeObject.decoration_time);

            $scope.store = mergeObject;
            var services = res.data[3];
            for (key in services) {
                $scope.business[services[key]] = true;
            }                       
            // set option tags
            $scope.store.shop_style = $scope.shop_style[parseInt(mergeObject.shop_style)];
            $scope.store.shop_state = $scope.shop_state[mergeObject.shop_state];
            $scope.store.toilet = $scope.toilet[parseInt(mergeObject.toilet)];
            $scope.selectedProvince = mergeObject.parent_name;

            var cityUrl = BASE_URL + '/city';
            var data = {
                area_name: mergeObject.parent_name
            }
            console.log('city:request:', data);
            $http.post(cityUrl, data).then(function (res) {
                console.log('city:response:', res.data);
                $scope.city = res.data;
                $scope.selectedCity = mergeObject.area_name;
            });
            
            $scope.shopface_url = mergeObject.shopface_url;
            $scope.dataCity = mergeObject.area_name;
        });                    
        // set flag
        $scope.sid = $stateParams.sid;
        // set flag whether adding or updating the data for a shop
        if ($scope.sid != null) {
            save_setting = 'update';
        } else {
            save_setting = 'add';
        }       
    });
    // 返回
    $scope.go_back = function () {
        $ionicHistory.goBack();
    };
    // 保存
    $scope.go_save = function (store) {
        if (file != null) {
            //Create Ali cloud upload objects
            var client = new OSS.Wrapper({
                region: 'oss-cn-qingdao',
                accessKeyId: 'LTAIdwD3ntEWRFpj',
                accessKeySecret: 'OQZMRIffR2qwXXPlSTgA87wKOA3CHF',
                bucket: 'consultant'
            });
            // Upload files to server
            client.multipartUpload('files/' + key, file, {

            }).then(function (res) {
                console.log('upload success: %j', res);
                console.log(res.url);
                var data = store;
                data.shop_style = store.shop_style.value;
                data.shop_state = store.shop_state.value;
                data.toilet = store.toilet.value;

                data.business = $scope.business;
                data.area_name = $scope.dataCity;
                data.shopface_url = res.url;
                console.log('store/add(update):request', data);
                // Add new store data
                if (save_setting == 'add') {
                    // Check if this store id exist already.
                    var url = BASE_URL + '/store/check';
                    var check_data = {
                        shop_code: data.shop_code
                    }
                    if (data.shop_code == null || data.shop_code == '') {
                        alert('Please enter store id.');
                    } else {
                        $http.post(url, check_data).then(function (res) {
                            console.log('add');
                            if (res.data.exist == true) {
                                alert('This shop code exist already!');
                            } else {
                                var url = BASE_URL + '/store/create';
                                $http.post(url, data).then(function (res) {
                                    alert('成功!');
                                    $state.go('tab.store');
                                });
                            }
                        });
                    }
                }
                // Update store data.
                if (save_setting == 'update') {
                    // Check if this store id exist already.
                    var url = BASE_URL + '/store/check';
                    var check_data = {
                        shop_code: data.shop_code
                    }
                    if (data.shop_code == null || data.shop_code == '') {
                        alert('Please enter shop_code.');
                    } else {
                        $http.post(url, check_data).then(function (res) {
                            console.log('update');
                            if (res.data.exist == true) {
                                if (data.shop_code != $stateParams.shop_code) {
                                    alert('This shop code exist already!');
                                } else {
                                    data.new_shop_code = data.shop_code;
                                    data.shop_code = $stateParams.shop_code;

                                    var url = BASE_URL + '/store/update';
                                    $http.post(url, data).then(function (res) {
                                        alert('成功!');
                                        $state.go('tab.store');
                                    });
                                }
                            } else {
                                var url = BASE_URL + '/store/update';
                                data.new_st_id = data.shop_code;
                                data.shop_code = $stateParams.shop_code;
                                $http.post(url, data).then(function (res) {
                                    alert('成功!');
                                    $state.go('tab.store');
                                });
                            }
                        });
                    }
                }
            });
        } else {           
            var data = store;
            data.shop_style = store.shop_style.value;
            data.shop_state = store.shop_state.value;
            data.toilet = store.toilet.value;

            data.business = $scope.business;
            data.area_name = $scope.dataCity;
            console.log('store/add(update):request', data);
            // Add new store data
            if (save_setting == 'add') {
                // Check if this store id exist already.
                var url = BASE_URL + '/store/check';
                var check_data = {
                    shop_code: data.shop_code
                }
                if (data.shop_code == null || data.shop_code == '') {
                    alert('Please enter store id.');
                } else {
                    $http.post(url, check_data).then(function (res) {
                        console.log('add');
                        if (res.data.exist == true) {
                            alert('This shop code exist already!');
                        } else {
                            var url = BASE_URL + '/store/create';
                            $http.post(url, data).then(function (res) {
                                alert('成功!');
                                $state.go('tab.store');
                            });
                        }
                    });
                }
            }
            // Update store data.
            if (save_setting == 'update') {
                // Check if this store id exist already.
                var url = BASE_URL + '/store/check';
                var check_data = {
                    shop_code: data.shop_code
                }
                if (data.shop_code == null || data.shop_code == '') {
                    alert('Please enter shop_code.');
                } else {
                    $http.post(url, check_data).then(function (res) {
                        console.log('update');
                        if (res.data.exist == true) {
                            if (data.shop_code != $stateParams.shop_code) {
                                alert('This shop code exist already!');
                            } else {
                                data.new_shop_code = data.shop_code;
                                data.shop_code = $stateParams.shop_code;

                                var url = BASE_URL + '/store/update';
                                $http.post(url, data).then(function (res) {
                                    alert('成功!');
                                    $state.go('tab.store');
                                });
                            }
                        } else {
                            var url = BASE_URL + '/store/update';
                            data.new_st_id = data.shop_code;
                            data.shop_code = $stateParams.shop_code;
                            $http.post(url, data).then(function (res) {
                                alert('成功!');
                                $state.go('tab.store');
                            });
                        }
                    });
                }
            }
        }
    };
    // selected province
    $scope.selProvince = function (selectedProvince) {        
        $scope.selectedCity = '';
        $scope.city = [];
        console.log(selectedProvince);
        var cityUrl = BASE_URL + '/city';
        var data = {
            area_name: selectedProvince
        }
        console.log('city:request:', data);
        $http.post(cityUrl, data).then(function (res) {
            console.log('city:response:', res.data);
            $scope.city = res.data;
        });
    };
    // selected city
    $scope.selCity = function (selectedCity) {
        console.log('selected City:', selectedCity);
        $scope.dataCity = selectedCity;       
    };
    // go to staff page
    $scope.go_manager = function () {
        $state.go('store-staff', {
            sid: $scope.store.sid           
        });
    };
    // Camera
    $scope.camera = function () {
        var options = {
            quality: 15,
            targetWidth: 800,
            targetHeight: 600,
            correctOrientation: true,
            sourceType: 1,
            destinationType: navigator.camera.DestinationType.DATA_URL,
            allowEdit: true,
            encodingType: navigator.camera.EncodingType.JPEG,
            //          popoverOptions: new CameraPopoverOptions(300, 300, 100, 100, navigator.camera.PopoverArrowDirection.ARROW_ANY),
            saveToPhotoAlbum: false
        };
        navigator.camera.getPicture(function (result) {
            var imgURI = "data:image/png;base64," + result;
            document.getElementById('store_image').src = imgURI;
            // generate file name
            var date = new Date();
            var mm = date.getMonth() + 1;
            var dd = date.getDate();
            var hh = date.getHours();
            var minute = date.getMinutes();
            var ss = date.getSeconds();

            var filename = [date.getFullYear(),
                     (mm > 9 ? '' : '0') + mm,
                     (dd > 9 ? '' : '0') + dd,
                     (hh > 9 ? '' : '0') + hh,
                     (minute > 9 ? '' : '0') + minute,
                     (ss > 9 ? '' : '0') + ss
            ].join('');
            filename += '.png';
            // convert base64 string to file object
            var dataurl = imgURI;
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            file = new File([u8arr], filename, { type: mime });
            key = file.name;            
        }, function (err) {
            alert('失败上传!');
        }, options);
    };
});
