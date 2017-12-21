/*
 * 订单上报
 * @author : kmr
 * @modified : 2017/8/22
 */
app.controller('perform-ordersCtrl', function ($scope, $state, $http, $stateParams, $ionicHistory, BASE_URL) {
    // page init
    $scope.orders = [1];
    $scope.order = {};

    $scope.$on('$ionicView.enter', function (event) {
        $scope.shop_code = $stateParams.shop_code;
        $scope.shop_name = $stateParams.shop_name;
    })
    // 保存
    $scope.save = function (order, comments) {
        var url = BASE_URL + '/datareport/add';
        var data = {
            visit_id: $stateParams.visit_id,
            datatype: 'tyreorder',
            comments: comments,
            report_date: new Date()
        };
        console.log('datareport/add:request', data);
        $http.post(url, data).then(function (res) {
            var url = BASE_URL + '/tyreorder/add';
            var arr = [];
            for (var key in order.brand_code) {
                var item = {};
                item.brand_code = order.brand_code[key];
                item.brand_name = order.brand_name[key];
                item.ordernum = order.ordernum[key];
                item.orderprice = order.orderprice[key];
                item.order_total = order.ordernum[key] * order.orderprice[key];
                item.datareport_id = res.data;
                arr.push(item);
            }
            var data = arr;
            console.log('tyreorder/add:request', data);
            $http.post(url, data).then(function (res) {
                alert('保存了!');
                //$ionicHistory.goBack();
            });
        });
    }
    // 添加其它订单
    $scope.addOrder = function () {
        var temp = [];
        temp = $scope.orders;
        temp.push(1);
        $scope.orders = temp;
    }
    // 返回
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
    // 统计
    $scope.list = function () {
        $state.go('order-list', {
            shop_code: $stateParams.shop_code,
            visit_id: $stateParams.visit_id
        });
    }
})