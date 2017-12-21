/*
 * the controller that manage dynamic file data
 */

app.controller('news-dynamicCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }

    $scope.go_detail = function (fileType) {
        $state.go('news-dynamic-detail', {
            type: fileType
        })
    }
});