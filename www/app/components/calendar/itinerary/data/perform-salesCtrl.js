/*
 * 销量上报
 */
app.controller('perform-salesCtrl', function ($scope, $state, $http, BASE_URL, $stateParams, $ionicHistory) {

    $scope.$on('$ionicView.enter', function (event) {
        $scope.store_id = $stateParams.store_id;
        $scope.store_name = $stateParams.store_name;
    })

    $scope.save = function (sale) {
        var url = BASE_URL + '/sales/add';
        var data = {
            store_id: $scope.store_id,
            tire_id: sale.tire_id,
            tire_name: sale.tire_name,
            sales_amount: sale.amount,
            sales_price: sale.price,
            total_price: sale.total_price,
            reporter: sale.reporter,
            reporttime: sale.time.toISOString(),
            remark: sale.remark,
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