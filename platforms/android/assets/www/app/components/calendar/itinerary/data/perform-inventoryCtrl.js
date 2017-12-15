/*
 * 库存上报
 */
app.controller('perform-inventoryCtrl', function ($scope, $http, $state, $stateParams, $ionicHistory, BASE_URL) {

    $scope.invents = [1];

    $scope.$on('$ionicView.enter', function (event) {
        $scope.shop_code = $stateParams.shop_code;
        $scope.shop_name = $stateParams.shop_name;
    })

    $scope.addInvent = function () {
        var temp = [];
        temp = $scope.invents;
        temp.push(1);
        $scope.invents = temp;
    }

    $scope.save = function (inventory) {
        
        var url = BASE_URL + '/inventory/add';
        var data = {
            store_id: $scope.store_id,
            tire_id: inventory.tire_id,
            tire_name: inventory.tire_name,
            inventory_amount: inventory.amount,
            reporter: inventory.reporter,
            report_time: inventory.time.toISOString(),
            remark: inventory.remark,
            photo_url: 'a'
        };
       
        $http.post(url, data).then(function (res) {
            $ionicHistory.goBack();
        });       
    }

    $scope.go_back = function () {
        $ionicHistory.goBack();
    }

})