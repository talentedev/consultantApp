/*
 * 销量统计
 */
app.controller('sale-listCtrl', function ($scope, $state, $stateParams, $ionicHistory, $http, BASE_URL) {
    // change screen to landscape mode
    screen.orientation.lock('landscape');
    $scope.sales = [];
    $scope.shop_code = $stateParams.shop_code;
    $scope.$on('$ionicView.enter', function (event) {
        var url = BASE_URL + '/tyresales/list';
        var data = {
            visit_id: $stateParams.visit_id
        }
        console.log('tyresales/list:request', data);
        $http.post(url, data).then(function (res) {
            console.log('tyresales/list:response', res.data);
            $scope.sales = res.data;
        });
    });
    // 返回
    $scope.go_back = function () {
        screen.orientation.unlock('landscape');
        $ionicHistory.goBack();
    };
});