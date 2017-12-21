/*
 * 个人信息
 */
app.controller('self-personalCtrl', function ($scope, $state, $http, $ionicHistory, BASE_URL, $ionicLoading) {
    $scope.headimgurl = '';

    $scope.$on('$ionicView.enter', function (event) {
        $scope.info = {};
        var url = BASE_URL + '/auth/me';
        $http.get(url).then(function (res) {
            console.log('auth/me:response', res.data);
            $scope.info = res.data;
            // set gender
            $scope.gender = [{
                    name: '男',
                    value: 0
                },{
                    name: '女',
                    value: 1
                }];
            $scope.info.gender = $scope.gender[res.data.sex];
            // set marital status
            $scope.ismarry = [{
                    name: '保密',
                    value: 0
                },{
                    name: '已婚',
                    value: 1
                },{
                    name: '未婚',
                    value: 2
                }];
            $scope.info.ismarry = $scope.ismarry[res.data.ismarry];
            // set child
            $scope.child = [{
                    name: '保密',
                    value: 0
                },{
                    name: '有',
                    value: 1
                },{
                    name: '无',
                    value: 2
                }];
            //$scope.info.child = $scope.child[res.data.child];
            $scope.info.child = $scope.child[0];
            //set date
            $scope.info.birthdate = new Date(res.data.birthdate);
            $scope.info.entry_date = new Date(res.data.entry_date);
            $scope.info.graduate_date = new Date(res.data.graduate_date);
        });
    });
    // 保存
    $scope.go_save = function (data) {
        data.sex = data.gender.value;
        data.ismarry = data.ismarry.value;
        data.headimgurl = $scope.headimgurl;
        console.log('user/update:request', data);
        var url = BASE_URL + '/user/update';
        $http.post(url, data).then(function (res) {
            $state.go('tab.self');
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
            // popoverOptions: new CameraPopoverOptions(300, 300, 100, 100, navigator.camera.PopoverArrowDirection.ARROW_ANY),
            saveToPhotoAlbum: false
        };
        navigator.camera.getPicture(function (result) {            
            var imgURI = "data:image/jpeg;base64," + result;            
            var filename = generateFileName('user_', 'jpeg');            
            var file = base64ToFile(imgURI, filename);
            $ionicLoading.show({
                template: '<ion-spinner icon="android"></ion-spinner><br>上传中...'
            });
            console.log('image file name: ', filename);            
            //Create Ali cloud upload objects
            var client = new OSS.Wrapper({
                region: 'oss-cn-qingdao',
                accessKeyId: 'LTAIdwD3ntEWRFpj',
                accessKeySecret: 'OQZMRIffR2qwXXPlSTgA87wKOA3CHF',
                bucket: 'consultant'
            });
            // Upload files to server            
            client.multipartUpload('files/' + file.name, file, {})
            .then(function (res) {
                console.log('upload success: %j', res.url);
                $scope.headimgurl = res.url;
                $ionicLoading.hide();
                alert('成功上传!');
            }, function (err) {
                $ionicLoading.hide();
                alert('失败上传!');
            });
        }, function (err) {
            alert(err);
        }, options);
    };
    // go to photo album
    $scope.goAlbum = function () {

    };
    // 返回
    $scope.go_back = function () {
        $ionicHistory.goBack();
    };
    // generate image file name
    var generateFileName = function (prefix, fileExtension) {
        var date = new Date(),
            mm = date.getMonth() + 1,
            dd = date.getDate(),
            hh = date.getHours(),
            minute = date.getMinutes(),
            ss = date.getSeconds(),
            filename = prefix;
        
        filename += [date.getFullYear(),
                 (mm > 9 ? '' : '0') + mm,
                 (dd > 9 ? '' : '0') + dd,
                 (hh > 9 ? '' : '0') + hh,
                 (minute > 9 ? '' : '0') + minute,
                 (ss > 9 ? '' : '0') + ss
        ].join('');
        filename += '.' + fileExtension;
        return filename;
    };
    // convert base64 string to file object
    var base64ToFile = function (dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };   
});

