/*
 * the controller that manage tracking reminder data
 */

app.controller('news-trackingCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
});