/*
 * 库存上报
 * @author : kmr
 * @modified : 2017/8/22
 */
app.controller('perform-inventoryCtrl', function ($scope, $http, $state, $stateParams, $ionicHistory, BASE_URL) {

    $scope.invents = [1];
    $scope.comments = '';
    $scope.inventory = {};
    //$scope.inventory.brand_code = {};
    //$scope.inventory.brand_name = {};
    //$scope.inventory.storenum = {};

    $scope.$on('$ionicView.enter', function (event) {
        $scope.shop_code = $stateParams.shop_code;
        $scope.shop_name = $stateParams.shop_name;
    })
    // 添加其它库存商品
    $scope.addInvent = function () {
        var temp = [];
        temp = $scope.invents;
        temp.push(1);
        $scope.invents = temp;
    }
    // 保存
    $scope.save = function (inventory, comments) {
        
        var url = BASE_URL + '/datareport/add';       
        var data = {
            visit_id: $stateParams.visit_id,
            datatype: 'tyrestore',
            comments: comments,
            report_date : new Date()
        };
        console.log('datareport/add:request', data);
        $http.post(url, data).then(function (res) {            
            var url = BASE_URL + '/tyrestore/add';
            var arr = [];
            for (var key in inventory.brand_code) {
                var item = {};
                item.brand_code = inventory.brand_code[key];
                item.brand_name = inventory.brand_name[key];
                item.storenum = inventory.storenum[key];
                item.datareport_id = res.data;
                arr.push(item);
            }
            var data = arr;            
            console.log('tyrestore/add:request', data);
            $http.post(url, data).then(function (res) {
                console.log('tyrestore/add:response', res.data);
                alert('保存了!');
                //$ionicHistory.goBack();
            });            
        });
    }
    // 返回
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
    // 统计
    $scope.list = function () {
        $state.go('inventory-list', {
            shop_code: $stateParams.shop_code,
            visit_id: $stateParams.visit_id
        });
    }
})