/*
 * the controller that manage announcement data
 */

app.controller('news-announcementCtrl', function ($scope, $state, $ionicHistory, BASE_URL, $http) {

    $scope.announcement_init = function () {
        var url = BASE_URL + '/announcement';
        $http.get(url).then(function (res) {           
            for (index in res.data) {
                var parts = res.data[index].report_date.split('-');
                res.data[index].report_date = new Date(parts[0], parts[1] - 1, parts[2]);
            }
            $scope.announcements = res.data;
        }, function (err) {
            alert('Connection failed!');
        });
    };

    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
});