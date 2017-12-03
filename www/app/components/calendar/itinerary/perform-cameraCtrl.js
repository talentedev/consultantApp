/*
 * Camera
 */
app.controller('perform-cameraCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
})