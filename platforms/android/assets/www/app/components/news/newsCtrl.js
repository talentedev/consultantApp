/*
 * The controller that manage user's news.
 */
app.controller('newsCtrl', function ($scope, $state, $http, BASE_URL) {

    $scope.$on('$ionicView.enter', function (event) {
        $scope.mem_id = null;
        var url = BASE_URL + '/auth/me';
        $http.get(url).then(function (res) {            
            $scope.mem_id = res.data.mem_id;            
        });
    })

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
        $state.go('news-tracking', {
            mem_id: $scope.mem_id
        });
    }
    $scope.go_customer = function () {
        $state.go('news-customer')
    }
    $scope.go_perform = function () {
        $state.go('perform')
    }
});