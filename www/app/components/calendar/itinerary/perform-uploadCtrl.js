/*
 * 拍照上传
 */
app.controller('perform-uploadCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
    $scope.go_camera = function () {
        //$state.go('perform-camera');

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
            console.log('This is camera capture');
            $scope.imgURI = "data:image/jpeg;base64," + result;
        }, function (err) {
        }, options);
    }

})
