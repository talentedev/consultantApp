/*
 * the controller that manage announcement data
 */

app.controller('news-announcementCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
});