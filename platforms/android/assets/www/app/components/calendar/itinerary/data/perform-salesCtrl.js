/*
 * 销量上报
 * @author : kmr
 * @modified : 2017/8/22
 */
app.controller('perform-salesCtrl', function ($scope, $state, $http, BASE_URL, $stateParams, $ionicHistory) {
    // page init
    $scope.sales = [1];
    $scope.sale = {};

    $scope.$on('$ionicView.enter', function (event) {
        $scope.shop_code = $stateParams.shop_code;
        $scope.shop_name = $stateParams.shop_name;
    })
    // 保存
    $scope.save = function (sale, comments, total_amount) {
        var url = BASE_URL + '/datareport/add';
        var data = {
            visit_id: $stateParams.visit_id,
            datatype: 'tyresales',
            comments: comments,
            report_date: new Date()
        };
        console.log('datareport/add:request', data);
        $http.post(url, data).then(function (res) {
            var url = BASE_URL + '/tyresales/add';
            var arr = [];
            for (var key in sale.brand_code) {
                var item = {};
                item.brand_code = sale.brand_code[key];
                item.brand_name = sale.brand_name[key];
                item.salenum = sale.salenum[key];
                item.saleprice = sale.saleprice[key];
                item.datareport_id = res.data;
                arr.push(item);
            }
            var data = arr;
            console.log('tyresales/add:request', data);
            $http.post(url, data).then(function (res) {
                alert('保存了!');
                //$ionicHistory.goBack();
            });
            // update datareport
            url = BASE_URL + '/datareport/update';
            data = {
                datareport_id: res.data,
                total_amount: total_amount
            }
            console.log('datareport/update:request', data);
            $http.post(url, data).then(function (res) {
                console.log('datareport/update:response', res.data);
            });
        });
    }
    // 添加其它轮胎销量
    $scope.addSale = function () {
        var temp = [];
        temp = $scope.sales;
        temp.push(1);
        $scope.sales = temp;
    }
    // 返回
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
    // 统计
    $scope.list = function () {
        $state.go('sale-list', {
            shop_code: $stateParams.shop_code,
            visit_id: $stateParams.visit_id
        });
    }
})