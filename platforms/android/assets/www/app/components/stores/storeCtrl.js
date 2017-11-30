/*
 * the controller that manage store
 */

app.controller('storeCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
    $scope.go_detail = function () {
        $state.go('store-detail');
    }
    $scope.go_add = function () {
        $state.go('store-detail');
    }
});