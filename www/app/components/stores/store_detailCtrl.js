/*
 * 添加/修改门店
 */
app.controller('store-detailCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
    $scope.go_save = function () {
        $state.go('tab.store');
    }
    $scope.go_manager = function () {
        $state.go('store-manager');
    }
});