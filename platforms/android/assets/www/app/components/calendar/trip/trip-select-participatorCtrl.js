/*
 * 选择成员
*/
app.controller('trip-selectCtrl', function ($scope, $state, $ionicHistory, BASE_URL, $http) {
    $scope.$on('$ionicView.enter', function (event) {
        var url = BASE_URL + '/auth/me';
        $http.get(url).then(function (res) {
            $scope.member = res.data;
        });
    })

    // search a member by name
    $scope.search = function (query) {
        var url = BASE_URL + '/itineray/search';
        var data = {
            search_name : query
        }
        console.log(data);
        $http.post(url, data).then(function (res) {
            console.log(res.data);
            $scope.member = res.data;
        });
    }

    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
});