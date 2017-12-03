/*
 * 选择行程类型
*/
app.controller('trip-typeCtrl', function ($scope, $state, $ionicHistory) {

    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
});