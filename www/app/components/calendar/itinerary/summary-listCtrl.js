/*
 * 总结
 */
app.controller('summary-listCtrl', function ($scope, $state, $stateParams, $ionicHistory, $http, BASE_URL) {
    // change screen to landscape mode
    screen.orientation.lock('landscape');
    $scope.summary = [];
    $scope.shop_code = $stateParams.shop_code;
    $scope.$on('$ionicView.enter', function (event) {
        var url = BASE_URL + '/summary/list';
        var data = {
            visit_id: $stateParams.visit_id
        }
        console.log('summary/list:request', data);
        $http.post(url, data).then(function (res) {
            console.log('summary/list:response', res.data);
            $scope.summary = res.data;
        });
    });
    // 返回
    $scope.go_back = function () {
        screen.orientation.unlock('landscape');
        $ionicHistory.goBack();
    };
});