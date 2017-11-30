/*
 * the controller that manage customer service data
 */

app.controller('news-customerCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
});