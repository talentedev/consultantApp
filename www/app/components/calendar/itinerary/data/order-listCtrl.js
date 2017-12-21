/*
 * 订单统计
 */
app.controller('order-listCtrl', function ($scope, $state, $stateParams, $ionicHistory, $http, BASE_URL) {
    // change screen to landscape mode
    screen.orientation.lock('landscape');
    $scope.orders = [];
    $scope.shop_code = $stateParams.shop_code;
    $scope.$on('$ionicView.enter', function (event) {
        var url = BASE_URL + '/tyreorder/list';
        var data = {
            visit_id: $stateParams.visit_id
        }
        console.log('tyreorder/list:request', data);
        $http.post(url, data).then(function (res) {
            console.log('tyreorder/list:response', res.data);
            $scope.orders = res.data;
        });
    });
    // 返回
    $scope.go_back = function () {
        screen.orientation.unlock('landscape');
        $ionicHistory.goBack();
    };
});