/*
 * 库存上报
 */
app.controller('perform-inventoryCtrl', function ($scope, $http, $state, $stateParams, $ionicHistory, BASE_URL) {

    $scope.$on('$ionicView.enter', function (event) {
        $scope.store_id = $stateParams.store_id;
        $scope.store_name = $stateParams.store_name;
    })


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