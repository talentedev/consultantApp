/*
 * 订单上报
 */
app.controller('perform-ordersCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }

})