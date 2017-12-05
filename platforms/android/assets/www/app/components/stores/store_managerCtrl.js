/*
 * 查看店面人员信息
 */
app.controller('store-managerCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
});