/*
 * 选择成员
*/
app.controller('trip-participatorCtrl', function ($scope, $state, $ionicHistory, BASE_URL, $http, TripService) {

    var participator = [];

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
            participator = res.data;
        });

    })

    // search a member by name
    $scope.search = function (query) {
        var url = BASE_URL + '/itinerary/search';
        var data = {
            search_name : query
        }
        console.log(data);
        $http.post(url, data).then(function (res) {
            console.log(res.data);
            $scope.member = res.data;
        });
    }

    var checked = [];
    var temp = [];

    // event when press check icon in store list
    $scope.participator_check = function (i) {
        if (typeof checked[i] == 'undefined') checked[i] = false;
        var id = 'participator' + i.toString();
        if (checked[i] == false) {
            document.getElementById(id).style.color = '#48b52d';
            checked[i] = true;
            temp.push(participator[i-1]);
        } else {
            document.getElementById(id).style.color = '#444';
            checked[i] = false;
        }
    }

    $scope.confirm = function () {
        TripService.set_participator(temp);
        $ionicHistory.goBack();
    }

    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
});