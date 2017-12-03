/*
 * 添加沟通
 */
app.controller('perform-communicationCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
})