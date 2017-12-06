/*
 * 选择成员
*/
app.controller('trip-dutyCtrl', function ($scope, $state, $ionicHistory, BASE_URL, $http, TripService) {

    var duty = [];

    $scope.$on('$ionicView.enter', function (event) {
        // get the information of logged user.
        /*var url = BASE_URL + '/auth/me';
        $http.get(url).then(function (res) {
            $scope.me = res.data;
        });*/

        // get list of all consulting members.
        var url = BASE_URL + '/member/list';
        $http.get(url).then(function (res) {
            $scope.members = res.data;
            duty = res.data;
        });
    })

    // search a member by name
    $scope.search = function (query) {
        var url = BASE_URL + '/itinerary/search';
        var data = {
            search_name : query
        }
        $http.post(url, data).then(function (res) {
            $scope.member = res.data;
        });
    }

    var duty = null;
    var checked = [];

    // event when press check icon in store list
    $scope.duty_check = function (i) {
        if (typeof checked[i] == 'undefined') checked[i] = false;
        var id = 'duty' + i.toString();
        if (checked[i] == false) {
            document.getElementById(id).style.color = '#48b52d';
            for (key in checked) {
                if (key != i) {
                    document.getElementById('duty' + key.toString()).style.color = '#444';
                    checked[key] = false;
                }
            }
            TripService.set_duty(duty[i-1]);
            checked[i] = true;
        } else {
            document.getElementById(id).style.color = '#444';
            checked[i] = false;
        }
    }

    $scope.confirm = function () {
        $ionicHistory.goBack();
    }

    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
});