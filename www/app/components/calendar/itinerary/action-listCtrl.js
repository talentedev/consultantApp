/*
 * 驰加审计结果统计
 */
app.controller('action-listCtrl', function ($scope, $state, $stateParams, $ionicHistory, $http, BASE_URL) {
    // change screen to landscape mode
    screen.orientation.lock('landscape');
    $scope.actions = [];

    $scope.$on('$ionicView.enter', function (event) {
        var url = BASE_URL + '/action/get';
        var data = {
            visit_id: $stateParams.visit_id
        }
        console.log('action/get:request', data);
        $http.post(url, data).then(function (res) {
            console.log('action/get:response', res.data);
            $scope.actions = res.data;
        });
    });   
    // 返回
    $scope.go_back = function () {
        screen.orientation.unlock('landscape');
        $ionicHistory.goBack();
    };
});