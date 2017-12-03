/*
 * Add trip
 */
app.controller('perform-tripCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }

})