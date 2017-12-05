/*
 * 日历
 */

app.controller('dateCtrl', function ($scope, $state, $ionicHistory, Calendar, $http, BASE_URL, ItineraryService) {
    $scope.$on('$ionicView.enter', function(event){
        calendar_init();
    })

    // go to today in calendar
    $scope.today = function () {
        calendar_init();
    }

    var calendar_init = function () {
        Calendar.initial();
        $scope.year = Calendar.getyear();
        $scope.month = Calendar.getmonth();

        $scope.visit = [];
        $scope.non_visit = [];

        var url = BASE_URL + '/tomorrow';
        var data = {
            current_date: new Date()
        };

        $http.post(url, data).then(function (res) {
            //console.log(res.data);
            for (index in res.data) {
                if (res.data[index].itinerary_type == 1 || res.data[index].itinerary_type == 2) {
                    res.data[index].itinerary_type = ' 拜访 ';
                    $scope.visit.push(res.data[index]);
                } else {
                    res.data[index].itinerary_type = ' 路途 ';
                    $scope.non_visit.push(res.data[index]);
                }
            }           
        });
    }
    
    // previous button in calendar
    $scope.pre_calendar = function () {
        if ($scope.month == 0) {
            $scope.month = 11;
            $scope.year = $scope.year - 1;
        } else {
            $scope.month = $scope.month -1;
        }        
        Calendar.changeCal($scope.year,$scope.month)
    }
    // next button in calendar
    $scope.next_calendar = function () {
        if ($scope.month == 11) {
            $scope.month = 0;
            $scope.year = $scope.year + 1;
        } else {
            $scope.month = $scope.month + 1;
        }
        Calendar.changeCal($scope.year, $scope.month)
    }
                
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
    $scope.go_perform = function (index) {
        ItineraryService.set_store_name($scope.visit[index].store_name);
        ItineraryService.set_store_id($scope.visit[index].store_id);
        $state.go('perform');
    }
    $scope.go_road = function () {
        $state.go('road');
    }
    $scope.go_trip = function () {
        $state.go('trip');
    }
});