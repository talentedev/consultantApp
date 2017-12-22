/*
 * 沟通统计
 * @author : kmr
 * @modified : 2017/9/5
 */
app.controller('com-listCtrl', function ($scope, $state, $stateParams, $ionicHistory, $http, BASE_URL) {

    $scope.$on('$ionicView.enter', function (event) {
        var url = BASE_URL + '/com/list';
        var data = {
            visit_id: $stateParams.visit_id
        }
        console.log('com/list:request', data);
        $http.post(url, data).then(function (res) {
            console.log('com/list:response', res.data);
            $scope.coms = res.data;
        });
    });   
    // 返回
    $scope.go_back = function () {
        $ionicHistory.goBack();
    };
});