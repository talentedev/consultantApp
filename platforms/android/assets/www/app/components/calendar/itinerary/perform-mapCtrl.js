/*
 * 外勤签到
*/
app.controller('perform-mapCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
    $scope.go_save = function () {
        $state.go('tab.self');
    }
});