/*
 * 个人信息
 */

app.controller('self-personalCtrl', function ($scope, $state, $http, $ionicHistory, BASE_URL) {

    $scope.$on('$ionicView.enter', function (event) {
        var url = BASE_URL + '/auth/me';
        $http.get(url).then(function (res) {
            console.log(res.data);
            $scope.info = res.data;
        });
    })

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
            console.log(imgURI);
        }, function (err) {
        }, options);
    }

    $scope.go_back = function () {
        $ionicHistory.goBack();
    }

    $scope.go_save = function () {
        $state.go('tab.self');
    }
});