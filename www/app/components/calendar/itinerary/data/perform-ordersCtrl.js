/*
 * 订单上报
 */
app.controller('perform-ordersCtrl', function ($scope, $state, $http, $stateParams, $ionicHistory, BASE_URL) {

    $scope.$on('$ionicView.enter', function (event) {
        $scope.store_id = $stateParams.store_id;
        $scope.store_name = $stateParams.store_name;
    })

    $scope.save = function (order) {
        var url = BASE_URL + '/order/add';
        var data = {
            store_id: $scope.store_id,
            tire_id: order.tire_id,
            tire_name: order.tire_name,
            amount: order.amount,
            price: order.price,
            subtotal_price: order.sub_price,
            reporter: order.reporter,
            reporttime: order.time.toISOString(),
            remark: order.remark,
            photo_url: 'a'
        };
        console.log(data);
        $http.post(url, data).then(function (res) {
            $ionicHistory.goBack();
        });
    }

    $scope.go_back = function () {
        $ionicHistory.goBack();
    }

})