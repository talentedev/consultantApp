/*
 * 选择成员
*/
app.controller('trip-dutyCtrl', function ($scope, $state, $ionicHistory, BASE_URL, $http, TripService) {

    var duty = {};
    $scope.friends_list = false;

    $scope.$on('$ionicView.enter', function (event) {       
        // get list of duty members.
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

    /*var duty = null;
    var checked = [];

    // event when press check icon in store list
    $scope.duty_check = function (i) {
        if (typeof checked[i] == 'undefined') checked[i] = false;
        console.log(i);
        var id = 'duty' + i.toString();
        if (checked[i] == false) {
            document.getElementById(id).style.color = '#48b52d';
            for (key in checked) {
                if (key != i) {
                    document.getElementById('duty' + key.toString()).style.color = '#444';
                    checked[key] = false;
                }
            }
            TripService.set_duty(duty[i]);
            console.log(duty[i]);
            checked[i] = true;
        } else {
            document.getElementById(id).style.color = '#444';
            checked[i] = false;
        }
    }*/

    $scope.onItem = function ($event, duty_data) {
        // change color on selected checkbox
        var elementList = document.querySelectorAll('i.fa-check-square-o');
        for (i = 0; i < elementList.length; i++) {
            var ele = elementList[i];
            ele.style.color = '#444';
        }
        $event.currentTarget.style.color = '#48b52d';

        duty = duty_data;        
    }

    $scope.onDetail = function () {
        var url = BASE_URL + '/friends';       
        $http.get(url).then(function (res) {
            if (res.data.length > 0) $scope.friends_list = true;
            $scope.friends = res.data;
        });
    }

    $scope.confirm = function () {
        TripService.setDuty(duty);
        $ionicHistory.goBack();
    }

    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
});