/*
 * 选择店面人员
*/
app.controller('com-peopleCtrl', function ($scope, $state, $stateParams, $ionicHistory, BASE_URL, $http, TripService) {

    var checked = [];
    var participators = [];
    var temp = [];

    $scope.$on('$ionicView.enter', function (event) {
        // get list of staffs for the shop
        var url = BASE_URL + '/staff/list';
        var data = {
            sid: $stateParams.sid
        }
        $http.post(url, data).then(function (res) {
            $scope.members = res.data;
        });
    })

    // search a member by name
    $scope.search = function (query) {
        var url = BASE_URL + '/staff/search';
        var data = {
            real_name: query
        }
        $http.post(url, data).then(function (res) {
            $scope.members = res.data;
        });
    }

    $scope.onItem = function ($event, index, data) {
        if (typeof checked[index] == 'undefined') checked[index] = false;
        if (checked[index] == false) {
            $event.currentTarget.style.color = '#48b52d';
            checked[index] = true;
            temp[index] = data;
        } else if (checked[index] == true) {
            $event.currentTarget.style.color = '#444';
            checked[index] = false;
            temp[index] = null;
        }
    }

    $scope.confirm = function () {
        participators = [];
        for (key in temp) {
            if (checked[key] == true) {
                participators.push(temp[key]);
            }
            checked[key] = false;
        }
        temp = [];
        //TripService.setParticipators(participators);
        $ionicHistory.goBack();
    }

    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
});