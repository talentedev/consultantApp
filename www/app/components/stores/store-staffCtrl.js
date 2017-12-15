/*
 * the controller that list store staffs
 */

app.controller('store-staffCtrl', function ($scope, $state, $http, $stateParams, $ionicHistory, BASE_URL) {

    $scope.$on('$ionicView.enter', function (event) {
        var url = BASE_URL + '/staff/list';
        var data = {
            sid: $stateParams.sid
        }
        $http.post(url, data).then(function (res) {
            $scope.staffs = res.data;
        });
    });

    // search a shop staff by name
    $scope.search = function (query) {
        $scope.staffs = [];
        var url = BASE_URL + '/staff/search';
        var data = {
            staff_name: query
        }
        $http.post(url, data).then(function (res) {
            $scope.staffs = res.data;
        });
    }
    
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
   
    $scope.go_detail = function (shopofstaff_id) {
        $state.go('store-manager', {
            sid: $stateParams.sid,
            shopofstaff_id: shopofstaff_id
        });
    }
});