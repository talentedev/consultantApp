/*
 * The controller that manage user's news.
 */
app.controller('newsCtrl', function ($scope, $state) {
    $scope.go_announcement = function () {
        $state.go('news-announcement');
    }
    $scope.go_dynamic = function () {
        $state.go('news-dynamic');
    }
    $scope.go_tabdate = function () {
        $state.go('tab.date');
    }
    $scope.go_tracking = function () {
        $state.go('news-tracking')
    }
    $scope.go_customer = function () {
        $state.go('news-customer')
    }
    $scope.go_perform = function () {
        $state.go('perform')
    }
});