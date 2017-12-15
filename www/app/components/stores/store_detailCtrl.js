/*
 * 添加/修改门店
 */
app.controller('store-detailCtrl', function ($scope, $state, $stateParams, $ionicHistory, $http, BASE_URL) {

    var save_setting = null;    

    $scope.$on('$ionicView.enter', function (event) {

        $scope.store = {};
        $scope.business = {};

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

    $scope.go_back = function () {
        $ionicHistory.goBack();
    };

    $scope.go_save = function (store) {
        console.log('save');
        console.log(store);
        var data = store;
        data.shop_style = store.shop_style.value;
        data.shop_state = store.shop_state.value;
        data.toilet = store.toilet.value;

        data.business = $scope.business;

        //console.log(data);
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
    };

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
            var imgURI = "data:image/jpeg;base64," + result;
            // generate image file name
            var today = new Date();
            var filename = today.getFullYear().toString() + today.getMonth().toString() + today.getDate().toString() + today.getHours().toString() + today.getMinutes().toString() + today.getSeconds().toString();
            filename += '.jpeg';

            var blob = new Blob([imgURI], { type: 'image/jpeg' });
            var img_file = new File([blob], filename);
            var url = 'http://storage.leirui.org/consultant/files/' + filename + '?sv=2016-05-31&ss=b&srt=o&sp=rc&se=2020-01-01T00:00:00Z&st=2017-01-01T00:00:00Z&spr=https,http&sig=e9IDvAHSXM5k0vuzy2u3Uy2tFfifNsdAF9%2FG4cPIL8A%3D';
            /*alert(img_file.name);
            var fileReader = new FileReader();
            fileReader.readAsArrayBuffer(img_file);
            fileReader.onload = function (e) {
                Upload.http({
                    method: "PUT",
                    url: url,
                    headers: {
                        'x-ms-blob-type': 'BlockBlob',
                        'x-ms-blob-content-type': img_file.type
                    },
                    data: e.target.result
                }).then(function (response) {
                    if (response.status > 0)
                        alert(response.status + ': ' + response.data);
                }, null, function (evt) {
                    alert('error!');
                });
            }*/
            $http({
                method: 'PUT',
                url: url,
                data: img_file,
                crossDomain: true,
                headers: {
                    'Content-Type': 'image/jpeg',
                    'x-ms-blob-type': 'BlockBlob'
                },
                dataType: "image/jpeg"
            }).then(function successCallback(response) {
                console.log(response);
                alert(filename);
            }, function errorCallback(response) {
                console.log(response);
                alert('error');
            });

            var image = document.getElementById('store_image');
            var urlCreator = window.URL || window.webkitURL;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
            var imageUrl = urlCreator.createObjectURL("http://storage.leirui.org/consultant/files/2017521164947.jpeg");
            image.src = imageUrl;
        }, function (err) {
        }, options);
    }
});