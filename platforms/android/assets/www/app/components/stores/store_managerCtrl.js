/*
 * 查看店面人员信息
 * @author : kmr
 * @midified : 2017/9/12
 */
app.controller('store-managerCtrl', function ($scope, $state, $stateParams, $ionicHistory, BASE_URL, $http) {
    $scope.staff = {};
    var file, key;

    $scope.$on('$ionicView.enter', function (event) {
        $scope.staff = {};
        // initialize staff gender
        $scope.sex = [
            {
                name: '男',
                value: 0
            },
            {
                name: '女',
                value: 1
            }
        ];
        $scope.staff.sex = $scope.sex[0];
        // initialize staff E-learn identity
        $scope.learn_identity = [
            {
                name: '普通员工',
                value: 0
            },
            {
                name: 'DMS操作员',
                value: 1
            },
            {
                name: '关键员工',
                value: 2
            },
            {
                name: '店主',
                value: 3
            }
        ];
        $scope.staff.learn_identity = $scope.learn_identity[0];
        // initialize staff position
        $scope.position = [
            {
                name: '1、见习员工',
                value: 0
            },
            {
                name: '2、普通员工',
                value: 1
            },
            {
                name: '3、训练员',
                value: 2
            },
            {
                name: '4、员工组长',
                value: 3
            },
            {
                name: '5、助理经理',
                value: 4
            },
            {
                name: '6、中心经理',
                value: 5
            },
            {
                name: '7、经营者',
                value: 6
            }
        ];
        $scope.staff.position = $scope.position[0];

        // get a staff data
        var url = BASE_URL + '/staff/get';
        var data = {
            sid: $stateParams.sid,
            shopofstaff_id: $stateParams.shopofstaff_id
        }
        $http.post(url, data).then(function (res) {
            var response = res.data[0];
            console.log('staff/get:response', response);
            // set header
            $scope.staff_name = response.staff_name;
            $scope.identity = response.learn_identity;

            $scope.staff = response;
            $scope.staff.sex = $scope.sex[response.sex];
            //$scope.staff.learn_identity = $scope.learn_identity[parseInt(response.learn_identity)];
            $scope.staff.position = $scope.position[response.position];
            $scope.staff.entry_date = new Date(response.entry_date);
            if (response.employ_state == 1) {
                $scope.staff.employ_state = true;
                $scope.employeeState = '在职'; 
            } else {
                $scope.staff.employ_state = false;
                $scope.employeeState = '离职';
            }
            // set learn identity
            for (key in $scope.learn_identity) {
                if($scope.learn_identity[key].name == response.learn_identity) 
                    $scope.staff.learn_identity = $scope.learn_identity[key];
            }
        });
    });
    // 保存
    $scope.save = function () {
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
                var url = BASE_URL + '/staff/update';
                var data = {
                    sid: $stateParams.sid,
                    shopofstaff_id: $stateParams.shopofstaff_id
                }
                data = $scope.staff;
                data.position = $scope.staff.position.value;
                data.learn_identity = $scope.staff.learn_identity.name;
                data.sex = $scope.staff.sex.value;
                data.head_url = res.url;
                if (data.employ_state == true) {
                    data.employ_state = 1;
                } else data.employ_state = 0;
                console.log('staff/update:request: ', data);
                $http.post(url, data).then(function (res) {
                    alert('保存!');
                    $ionicHistory.goBack();
                });
            });
        } else {
            var url = BASE_URL + '/staff/update';
            var data = {
                sid: $stateParams.sid,
                shopofstaff_id: $stateParams.shopofstaff_id
            }
            data = $scope.staff;
            data.position = $scope.staff.position.value;
            data.learn_identity = $scope.staff.learn_identity.name;
            data.sex = $scope.staff.sex.value;
            if (data.employ_state == true) {
                data.employ_state = 1;
            } else data.employ_state = 0;
            console.log('staff/update:request: ', data);
            $http.post(url, data).then(function (res) {
                alert('保存!');
                $ionicHistory.goBack();
            });
        }
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
            document.getElementById('staff-head').src = imgURI;
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
    // 人员状态
    $scope.changeEmpState = function (state) {
        if (state == true) {
            $scope.employeeState = '在职';               
        } else {
            $scope.employeeState = '离职';
        }
    };
    // 返回
    $scope.go_back = function () {
        $ionicHistory.goBack();
    };
});