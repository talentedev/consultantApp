/*
 * 我的
 * @author : kmr
 * @modified : 2017/8/22
 */
app.controller('selfCtrl', function ($scope, $state, $http, BASE_URL) {
    // 个人信息
    $scope.information = function () {
        $state.go('self-personal');
    };
    // 退出登录
    $scope.logout = function () {
        $http.get(BASE_URL + '/auth/logout').then(function (res) {
            localStorage.clear();
            $state.go('login')
        });
    };
});