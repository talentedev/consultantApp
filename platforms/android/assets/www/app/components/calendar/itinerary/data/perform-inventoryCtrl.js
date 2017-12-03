/*
 * 库存上报
 */
app.controller('perform-inventoryCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }

})