/*
 * the controller that manage tracking reminder data
 */

app.controller('news-trackingCtrl', function ($scope, $state, $stateParams, $http, BASE_URL, $ionicHistory) {

    $scope.$on('$ionicView.enter', function (event) {
        init();
    })

    var init = function () {
        var url = BASE_URL + '/reminder/list';
        var data = {
            mem_id: $stateParams.mem_id
        };
        $http.post(url, data).then(function (res) {
            console.log(res.data);
            if (res.data.status) $scope.hide = true;
            for (key in res.data) {
                res.data[key].set_time = new Date(res.data[key].set_time);
            }
            $scope.trackings = res.data;
        });
    };

    $scope.perform = function (id) {
        var url = BASE_URL + '/reminder/check';
        var data = {
            itinerary_id: id
        };
        $http.post(url, data).then(function (res) {
            init();
        });
    }

    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
});