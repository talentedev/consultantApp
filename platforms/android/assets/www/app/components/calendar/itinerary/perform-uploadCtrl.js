/*
 * 拍照上传
 */
app.controller('perform-uploadCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
    $scope.go_camera = function () {
        $state.go('perform-camera');
    }

})
