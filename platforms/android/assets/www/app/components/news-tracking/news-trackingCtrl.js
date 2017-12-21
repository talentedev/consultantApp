/*
 * 跟踪提醒
 * @author : kmr
 * @modified : 2017/8/25
 */
app.controller('news-trackingCtrl', function ($scope, $state, $stateParams, $http, BASE_URL, $ionicHistory) {
    $scope.trackings = [];
    $scope.$on('$ionicView.enter', function (event) {
        var url = BASE_URL + '/track/list';       
        $http.get(url).then(function (res) {
            console.log('track/list:response', res.data);            
            for (key in res.data) {
                res.data[key].different = Math.abs(parseInt(res.data[key].different));
            }
            $scope.trackings = res.data;
        });
    })
    // 点击确认收到
    $scope.perform = function (id) {
        var url = BASE_URL + '/reminder/done';
        var data = {
            actionofplan_id : id
        };
        console.log('reminder/done:request', data);
        $http.post(url, data).then(function (res) {
            location.reload();
        });
    }
    // back
    $scope.go_back = function () {
        $state.go('tab.news');
    }
});