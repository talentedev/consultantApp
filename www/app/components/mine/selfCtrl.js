/*
 * the controller that manage self data
 */

app.controller('selfCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
    $scope.go_information = function () {
        $state.go('self-personal')
    }
});