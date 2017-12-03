/*
 * 添加行程
*/
app.controller('tripCtrl', function ($scope, $state, $ionicHistory) {

    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
    $scope.go_type = function () {
        $state.go('trip-type');
    }
    $scope.go_select = function () {
        $state.go('trip-select');
    }
    $scope.go_store = function () {
        $state.go('trip-store');
    }
});