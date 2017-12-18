/*
 * 添加行程
*/
app.controller('tripCtrl', function ($scope, $state, $ionicHistory, TripService, BASE_URL, $http) {

    $scope.$on('$ionicView.enter', function (event) {        
        init();
    })

    // initialize current view
    var init = function () {        
        setPlanType();
        setStartTime();
        setEndTime();
        setDuty();
        setParticipator();
        setShop();
    }

    // set plan type
    var setPlanType = function () {
        var plan_type = TripService.getPlanType();
        if (plan_type == null) {
            $scope.trip_type = '';
        } else {
            $scope.plan_type = plan_type;
        }
    }

    // set start time
    var setStartTime = function () {
        /*var today = new Date();
        today.setDate(today.getDate()); 
        var joinString = [today.getFullYear(), today.getMonth() + 1, today.getDate()];
        $scope.start_time = joinString.join('-');*/
    }

    // set date to finish. the default value is tomorrow.
    var setEndTime = function () {
        /*var today = new Date();
        today.setDate(today.getDate()); 
        var joinString = [today.getFullYear(), today.getMonth() + 1, today.getDate()];
        $scope.end_time = joinString.join('-');*/
    }

    // set duty
    var setDuty = function () {
        $scope.duty = TripService.getDuty();
    }

    // set participator
    var setParticipator = function () {
        var participators = [];
        participators = TripService.getParticipators();
        var temp = [];
        for (key in participators) {
            temp.push(participators[key].real_name);
        }
        $scope.participators = temp.join();
    }

    // set a store
    var setShop = function () {
        $scope.shop = TripService.getShop();
    }

    // save current data to database.
    $scope.save = function (time) {
        var today = new Date();

        var url = BASE_URL + '/plan/create';
        var data = {
            sid: TripService.getShop().sid,
            plantype_id: $scope.plan_type.plantype_id,
            start_date: document.getElementById('start_time').value,//today.toISOString(),// "2017-12-15T19:42:27.100Z",//$scope.start_time,
            end_date: document.getElementById('end_time').value//today.toISOString(),//"2017-12-15T19:42:27.100Z",//$scope.end_time,
            //start_time: document.getElementById('start_time').value,
            //end_time: document.getElementById('end_time').value           
        }
        console.log('plan/create', data);
        // validate
        if (typeof data.sid == 'undefined' || typeof data.plantype_id == 'undefined') {
            alert('Please enter all items.');
        } else {
            $http.post(url, data).then(function (res) {
                console.log(res.data);
                $ionicHistory.goBack();
            }); 
        }               
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