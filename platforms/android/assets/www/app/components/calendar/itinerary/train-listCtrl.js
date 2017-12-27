/*
 * 培训辅导
 * @author : kmr
 * @modified : 2017/9/11
 */
app.controller('train-listCtrl', function ($scope, $state, $stateParams, $ionicHistory, $http, BASE_URL) {

    $scope.$on('$ionicView.enter', function (event) {
        // change screen to landscape mode
        screen.orientation.lock('landscape');

        var url = BASE_URL + '/train/list';
        var data = {
            visit_id: $stateParams.visit_id
        }
        console.log('train/list:request', data);
        $http.post(url, data).then(function (res) {
            console.log('train/list:response', res.data);
            $scope.coms = res.data;
        });
    });
    // 返回
    $scope.go_back = function () {
        screen.orientation.unlock('landscape');
        $ionicHistory.goBack();
    };
});