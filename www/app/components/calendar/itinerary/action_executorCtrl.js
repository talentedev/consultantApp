/*
 * 选择店面人员
*/
app.controller('action-executorCtrl', function ($scope, $state, $stateParams, $ionicHistory, BASE_URL, $http, TripService) {
    var checked = [];
    var participators = [];
    var temp = [];

    $scope.$on('$ionicView.enter', function (event) {       
        // get list of all emplyees in a store.
        var url = BASE_URL + '/staff/list';
        var data = {
            sid: $stateParams.sid
        };
        console.log('staff/list:request', data);
        $http.post(url, data).then(function (res) {
            console.log('staff/list:response', res.data);
            employees = res.data;            
            $scope.employees = res.data;           
        });
    })

    var checked = [];  

    // event when press check icon in store list
    $scope.employee_check = function (index, $event, data) {       
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

    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
});