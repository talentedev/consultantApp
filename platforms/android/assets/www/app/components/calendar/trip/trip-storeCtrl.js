/*
 * 选择门店
*/
app.controller('trip-storeCtrl', function ($scope, $state, $ionicHistory) {

    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
});