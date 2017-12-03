/*
 * 选择成员
*/
app.controller('trip-selectCtrl', function ($scope, $state, $ionicHistory) {

    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
});