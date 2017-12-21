/*
* 添加行程
* @author : kmr
* @modified : 2017/8/22
*/
app.controller('tripCtrl', function ($scope, $state, $ionicHistory, TripService, BASE_URL, $http) {

    $scope.$on('$ionicView.enter', function (event) {        
        init();
    })
    // initialize page
    var init = function () {        
        setPlanType();
        setStartTime();
        setEndTime();
        setDuty();
        setParticipator();
        setShop();
    }
    // 选择行程类型
    var setPlanType = function () {
        var plan_type = TripService.getPlanType();
        if (plan_type == null) {
            $scope.trip_type = '';
        } else {
            $scope.plan_type = plan_type;
        }
    }
    // 开始时间
    var setStartTime = function () {
        /*var today = new Date();
        today.setDate(today.getDate()); 
        var joinString = [today.getFullYear(), today.getMonth() + 1, today.getDate()];
        $scope.start_time = joinString.join('-');*/
    }

    // 结束时间
    var setEndTime = function () {
        /*var today = new Date();
        today.setDate(today.getDate()); 
        var joinString = [today.getFullYear(), today.getMonth() + 1, today.getDate()];
        $scope.end_time = joinString.join('-');*/
    }
    // 负责员工
    var setDuty = function () {
        $scope.duty = TripService.getDuty();
    }
    // 参与员工
    var setParticipator = function () {
        var participators = [];
        participators = TripService.getParticipators();
        var temp = [];
        for (key in participators) {
            temp.push(participators[key].real_name);
        }
        $scope.participators = temp.join();
    }
    // 相关门店
    var setShop = function () {
        $scope.shop = TripService.getShop();
    }
    // 保存
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
        console.log('plan/create:request: ', data);
        // validate
        if (typeof data.sid == 'undefined' || typeof data.plantype_id == 'undefined') {
            alert('请输入所有项目!');
        } else {
            $http.post(url, data).then(function (res) {
                console.log('plan/create:response: ', res.data);
                $ionicHistory.goBack();
            }); 
        }               
    }
    // 取消
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
    // 行程类型
    $scope.go_type = function () {
        $state.go('trip-type');
    }
    // 负责员工
    $scope.go_select_duty = function () {
        $state.go('trip-duty');
    }
    // 参与员工
    $scope.go_select_participator = function () {
        $state.go('trip-participator');
    }
    // 相关门店
    $scope.go_store = function () {
        $state.go('trip-store');
    }
});