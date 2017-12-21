/*
 * 日历
 */
app.controller('dateCtrl', function ($scope, $state, $ionicHistory, Calendar, $http, BASE_URL, ItineraryService, TripService) {
    var prevDate;

    $scope.$on('$ionicView.enter', function (event) {
        if (TripService.getDate() != null) {
            console.log('*************', TripService.getDate());
            calendar_init(TripService.getDate());            
        } else {
            var today = new Date();
            calendar_init(today);
            console.log('&&&&&&&&&&&&&', today);
        }
        TripService.setDate(null);
    })
    // back to today in calendar
    $scope.today = function () {
        var today = new Date();
        calendar_init(today);
        if (typeof prevDate != 'undefined') {
            prevDate.style.color = '#000';
        }
    }           
    // initialize calendar tab.
    var calendar_init = function (date) {
        Calendar.initial();
        $scope.year = Calendar.getyear();
        $scope.month = Calendar.getmonth();
        //var today = new Date();
        //today.setDate(today.getDate() + 1);
        date.setDate(date.getDate());
        getPlanList(date);
    }
    // event when press any date on calendar
    $scope.pressDate = function (i, j) {
        var sObj = document.getElementById('SD' + (i * 7 + j).toString());
        var day = Calendar.getday(i, j, $scope.month, $scope.year) + 2;
        
        Calendar.changeCal($scope.year, $scope.month);

        var today = new Date()
        var dd = today.getDate();
        var id_today = 'GD' + dd.toString();
        var today_Obj = document.getElementById(id_today);
        today_Obj.style.backgroundColor = '#FFF';

        onDate(day, sObj);
    }

    // the event when press a date in calendar
    var onDate = function (day, sObj) {
        if (typeof prevDate != 'undefined') {
            prevDate.style.color = '#000';
        }        
        var dateDiv = sObj.parentElement;
        dateDiv.style.backgroundColor = '#387ef5';
        dateDiv.style.color = '#FFF';
        prevDate = dateDiv;
        var date = new Date($scope.year, $scope.month, day);
        getPlanList(date);
    }

    // get itinarary data according to selected date.
    var getPlanList = function (date) {

        $scope.visit = [];
        $scope.non_visit = [];

        //var today = new Date();

        var url = BASE_URL + '/plan/list';
        var data = {
            date: date//.toISOString()
        };
        console.log('plan/list:request', data);
        $http.post(url, data).then(function (res) {
            var visit = [];
            var non_visit = [];
            console.log('plan/list:response', res.data);
            var data = res.data;
            for (key in data) {
                if (data[key].category == 1) {
                    visit.push(data[key]);
                } else {
                    non_visit.push(data[key]);
                }
                data[key].start_time = data[key].start_time.split(':', 2).join(' : ');
            }

            $scope.visit = visit;
            $scope.non_visit = non_visit;
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

    $scope.go_perform = function (item) {
        $state.go('perform', {
            sid: item.sid,
            plan_id: item.plan_id,
            shop_code: item.shop_code,
            shop_name: item.shop_name
        });
    }

    $scope.go_road = function (item) {
        $state.go('road', {
            plan_id: item.plan_id
        });
    }

    $scope.go_trip = function () {
        $state.go('trip');
    }
});