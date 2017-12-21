/*
 * 公告
 * @author : kmr
 * @modified : 2017/8/26
 */
app.controller('news-announcementCtrl', function ($scope, $state, $ionicHistory, BASE_URL, $http) {
    $scope.$on('$ionicView.enter', function (event) {
        var url = BASE_URL + '/posts/list';
        $http.get(url).then(function (res) {
            console.log('posts/list:response', res.data)           
            for (index in res.data) {
                var date = new Date(res.data[index].dateover);
                res.data[index].month = date.getMonth() + 1;
                res.data[index].day = date.getDate();
            }
            $scope.posts = res.data;
        }, function (err) {
            alert('失败!');
        });
    });
    // 点击确认收到
    $scope.read = function (userId) {
        var url = BASE_URL + '/posts/read';
        var data = {
            infocenter_id: userId
        }
        $http.post(url, data).then(function (res) {
            location.reload();
        }, function (err) {
            alert('失败!');
        });
    };
    // back
    $scope.go_back = function () {
        $ionicHistory.goBack();
    };
});