/*
 * the controller that manage dynamic pptx file data
 */

app.controller('news-dynamic-detail-pptxCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
});