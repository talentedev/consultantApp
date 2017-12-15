/*
 * 选择成员
*/
app.controller('trip-participatorCtrl', function ($scope, $state, $ionicHistory, BASE_URL, $http, TripService) {

    var checked = [];
    var participators = [];
    var temp = [];
    $scope.friends_list = false;

    $scope.$on('$ionicView.enter', function (event) {       
        // get list of consulting members.
        var url = BASE_URL + '/parents';
        $http.get(url).then(function (res) {
            $scope.members = res.data;
        });

    })

    // search a member by name
    $scope.search = function (query) {
        var url = BASE_URL + '/user/search';
        var data = {
            real_name : query
        }
        $http.post(url, data).then(function (res) {
            $scope.members = res.data;          
        });
    }

    /*var checked = [];
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
    }*/
        
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
        TripService.setParticipators(participators);
        $ionicHistory.goBack();
    }

    $scope.onDetail = function () {
        var url = BASE_URL + '/friends';
        $http.get(url).then(function (res) {
            if (res.data.length > 0) $scope.friends_list = true;
            $scope.friends = res.data;
        });
    }

    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
});