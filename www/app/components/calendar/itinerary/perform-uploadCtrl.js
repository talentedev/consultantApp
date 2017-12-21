/*
 * 拍照上传
 * @author : kmr
 * @modified : 2017/8/22
 */
app.controller('perform-uploadCtrl', function ($scope, $state, $stateParams, $http, $ionicHistory, BASE_URL) {
    // page init
    $scope.items = [];

    $scope.$on('$ionicView.enter', function (event) {
        $scope.shop_code = $stateParams.shop_code;
        $scope.shop_name = $stateParams.shop_name;
        var url = BASE_URL + '/imgitem/list';       
        $http.get(url).then(function (res) {
            console.log('imgitem/list:response:', res.data);
            $scope.items = res.data;
            var imgUrl = BASE_URL + '/sopimg/list';
            var data = {
                visit_id: $stateParams.visit_id
            }
            console.log('sopimg/list:request:', data);
            $http.post(imgUrl, data).then(function (res) {
                console.log('sopimg/list:response:', res.data);
                if (res.data.length > 0) {                  
                    for (key in res.data) {
                        $scope.items[key].photodate = res.data[key].photodate;
                        $scope.items[key].sopofimage_id = res.data[key].sopofimage_id;
                    }
                } else {
                    var url = BASE_URL + '/sopimg/add';
                    var data = { visit_id: $stateParams.visit_id };
                    console.log('sopimg/add:request:', data);
                    $http.post(url, data).then(function (res) { console.log('sopimg/add:response:', res.data); });
                }
            });
        });        
    });
       
    $scope.go_camera = function (id) {       

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
            var file = new File([u8arr], filename, { type: mime });
            var key = file.name;

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
                var url = BASE_URL + '/sopimg/update';
                var data = {
                    sopofimage_id: id,
                    imgurl: res.url
                }
                console.log('sopimg/update:request', data);
                $http.post(url, data).then(function (res) {
                    console.log('sopimg/update:response', res.data);
                    alert('成功上传!');
                    location.reload();
                });                
            });
        }, function (err) {
            alert('失败上传!');
        }, options);
    }

    $scope.goMap = function () {
        
    }
    // 返回
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }

})
