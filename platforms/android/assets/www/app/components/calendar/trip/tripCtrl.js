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
            $scope.trip_type = '';
        } else {
            $scope.trip_type = TripService.trip_type();
        }
    }

    // set date to start. the default value is tomorrow.
    var set_start_date = function () {
        var today = new Date();
        today.setDate(today.getDate() + 1); 
        var joinString = [today.getFullYear(), today.getMonth() + 1, today.getDate()];
        $scope.start_time = joinString.join('-');
    }

    // set date to finish. the default value is tomorrow.
    var set_end_date = function () {
        var today = new Date();
        today.setDate(today.getDate() + 1); 
        var joinString = [today.getFullYear(), today.getMonth() + 1, today.getDate()];
        $scope.end_time = joinString.join('-');
    }

    // set duty
    var set_duty = function () {
        $scope.duty = TripService.duty_name();
    }

    // set participator
    var set_participator = function () {
        $scope.participator = TripService.participator_name().join();
    }

    // set a store
    var set_store = function () {
        $scope.store = TripService.store_name();
    }

    // save current data to database.
    $scope.save = function () {
        var today = new Date();
        today.setDate(today.getDate() + 1); // tomorrow

        var url = BASE_URL + '/itinerary/add';
        var data = {
            itinerary_type: $scope.trip_type,
            start_time: today.toISOString(),// "2017-12-15T19:42:27.100Z",//$scope.start_time,
            end_time: today.toISOString(),//"2017-12-15T19:42:27.100Z",//$scope.end_time,
            duty: TripService.duty_id(),
            paticipator: TripService.participator_id().join(','),
            store_id: TripService.store_id() 
        }
        $http.post(url, data).then(function (res) {
            $ionicHistory.goBack();
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