/*
 * 添加/查看/修改行动计划
 */
app.controller('perform-actionCtrl', function ($scope, $state, $stateParams, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }

})