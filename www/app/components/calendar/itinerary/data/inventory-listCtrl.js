/*
 * 库存统计
 */
app.controller('inventory-listCtrl', function ($scope, $state, $stateParams, $ionicHistory, $http, BASE_URL) {
    // change screen to landscape mode
    screen.orientation.lock('landscape');
    $scope.inventory = [];
    $scope.shop_code = $stateParams.shop_code;
    $scope.$on('$ionicView.enter', function (event) {
        var url = BASE_URL + '/tyrestore/list';
        var data = {
            visit_id: $stateParams.visit_id
        }
        console.log('tyrestore/list:request', data);
        $http.post(url, data).then(function (res) {
            console.log('tyrestore/list:response', res.data);
            $scope.inventory = res.data;
        });
    });
    // 返回
    $scope.go_back = function () {
        screen.orientation.unlock('landscape');
        $ionicHistory.goBack();
    };
    
});