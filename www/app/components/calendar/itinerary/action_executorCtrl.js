/*
 * 选择店面人员
*/
app.controller('action-executorCtrl', function ($scope, $state, $stateParams, $ionicHistory, BASE_URL, $http, TripService) {

    var employees = [];

    $scope.$on('$ionicView.enter', function (event) {
       
        // get list of all emplyees in a store.
        var url = BASE_URL + '/employee/list';
        var data = {
            store_id: $stateParams.store_id
        };
        $http.post(url, data).then(function (res) {
            employees = res.data;            
            $scope.employees = res.data;           
        });

    })

    // search a member by name
    $scope.search = function (query) {
        var url = BASE_URL + '/employee/search';
        var data = {
            search_name: query
        }
        //console.log(data);
        $http.post(url, data).then(function (res) {
            //console.log(res.data);
            $scope.member = res.data;
        });
    }

    var checked = [];  

    // event when press check icon in store list
    $scope.employee_check = function (i) {
        if (typeof checked[i] == 'undefined') checked[i] = false;
        var id = 'employee' + i.toString();
        if (checked[i] == false) {
            document.getElementById(id).style.color = '#48b52d';
            checked[i] = true;
            TripService.set_employee(employees[i]);
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