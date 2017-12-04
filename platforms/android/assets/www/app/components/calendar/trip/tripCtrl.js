/*
 * 添加行程
*/
app.controller('tripCtrl', function ($scope, $state, $ionicHistory, TripService, BASE_URL, $http) {

    $scope.$on('$ionicView.enter', function (event) {        
        init();
    })

    // initialize current view
    var init = function () {
        set_trip_type();
        set_start_date();
        set_end_date();
        set_duty();
        set_participator();
        set_store();
    }
    // set trip type
    var set_trip_type = function () {
        if (TripService.trip_type() == null) {
            $scope.trip_type = '驰加拜访';
        } else {
            $scope.trip_type = TripService.trip_type();
        }
    }
    // set date to start
    var set_start_date = function () {
        var today = new Date();
        var joinString = [today.getFullYear(), today.getMonth() + 1, today.getDate()];
        $scope.start_time = joinString.join('-');
    }
    // set date to finish
    var set_end_date = function () {
        var today = new Date();
        var joinString = [today.getFullYear(), today.getMonth() + 1, today.getDate()];
        $scope.end_time = joinString.join('-');
    }
    // set duty
    var set_duty = function () {
        var url = BASE_URL + '/auth/me';
        if (typeof $scope.duty == 'undefined') {
            $http.get(url).then(function (res) {
                $scope.duty = res.data.name;
            }, function (err) {
                alert('Connection faild!');
            });
        }
               
    }
    // set participator
    var set_participator = function () {
        $scope.participator = '康又坑, 张磊';
    }
    // set a store
    var set_store = function () {
        $scope.store = TripService.store_name();
    }

    // save current data to database.
    $scope.save = function () {
        var data = {
            itinerary_type: $scope.trip_type,
            start_time: $scope.start_time,
            end_time: $scope.end_time,
            duty: $scope.duty,
            participator: $scope.participator,
            store_id: TripService.store_id()
        }
        var url = BASE_URL + '/itinerary/add';
        $http.post(url, data).then(function (res) {
            console.log(res);
        });
    }

    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
    $scope.go_type = function () {
        $state.go('trip-type');
    }
    $scope.go_select_duty = function () {
        $state.go('trip-duty');
    }
    $scope.go_select_participator = function () {
        $state.go('trip-participator');
    }
    $scope.go_store = function () {
        $state.go('trip-store');
    }
});