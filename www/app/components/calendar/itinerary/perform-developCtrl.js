/*
 * 添加行动计划及草案制定
 */
app.controller('perform-developCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }

});