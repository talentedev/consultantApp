/*
 * the controller that manage date
 */

app.controller('dateCtrl', function ($scope, $state, $ionicHistory, Calendar) {
    $scope.$on('$ionicView.enter', function(event){
        Calendar.initial();
    })
    $scope.year = Calendar.getyear();
    $scope.month = Calendar.getmonth();
    $scope.pre_calendar = function () {
        if ($scope.month == 1) {
            $scope.month = 12;
            $scope.year = $scope.year - 1;
        } else {
            $scope.month = $scope.month -1;
        }
        Calendar.changeCal($scope.year,$scope.month)
    }
    $scope.next_calendar = function () {
        if ($scope.month == 12) {
            $scope.month = 1;
            $scope.year = $scope.year + 1;
        } else {
            $scope.month = $scope.month + 1;
        }
        Calendar.changeCal($scope.year, $scope.month)
    }
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
    $scope.go_perform = function () {
        $state.go('perform');
    }
    $scope.go_road = function () {
        $state.go('road');
    }
    $scope.go_trip = function () {
        $state.go('trip');
    }
});