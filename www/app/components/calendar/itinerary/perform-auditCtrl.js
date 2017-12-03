/*
 * 驰加审计结果
 */
app.controller('perform-auditCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }

})