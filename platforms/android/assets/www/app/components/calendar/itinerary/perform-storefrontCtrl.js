/*
 * 店面年度工作计划
 */
app.controller('perform-storefrontCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }

})