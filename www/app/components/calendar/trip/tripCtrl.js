/*
* 添加行程
* @author : kmr
* @modified : 2017/9/4
*/
app.controller('tripCtrl', function ($scope, $state, $ionicHistory, TripService, BASE_URL, $http) {

    $scope.$on('$ionicView.enter', function (event) {
        setPlanType();
        setShop();
    });    
    // 选择行程类型
    var setPlanType = function () {
        var plan_type = TripService.getPlanType();
        if (plan_type == null) {
            $scope.trip_type = '';
        } else {
            $scope.plan_type = plan_type;
        }
    };   
    // 相关门店
    var setShop = function () {
        $scope.shop = TripService.getShop();
    };
    // 保存
    $scope.save = function () {
        var url = BASE_URL + '/plan/create';
        var data = {
            sid: TripService.getShop().sid,
            plantype_id: $scope.plan_type.plantype_id,
            //start_date: document.getElementById('start_time').value,
            //end_date: document.getElementById('end_time').value,
            start_time: document.getElementById('start_time').value,
            end_time: document.getElementById('end_time').value
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
    };
    // 取消
    $scope.go_back = function () {
        $ionicHistory.goBack();
    };
    // 行程类型
    $scope.go_type = function () {
        $state.go('trip-type');
    };    
    // 相关门店
    $scope.go_store = function () {
        $state.go('trip-store');
    };
});