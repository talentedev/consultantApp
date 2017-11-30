/*
 * the controller that manage dynamic file data
 */

app.controller('news-dynamic-detailCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
    $scope.go_detail = function () {
        $state.go('news-dynamic-detail-pptx')
    }
});