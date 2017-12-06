/*
 * 添加行动计划及草案制定
 */
app.controller('perform-developCtrl', function ($scope, $state, $stateParams, $ionicHistory, TripService, BASE_URL, $http) {

    $scope.$on('$ionicView.enter', function (event) {
        $scope.action = {};
        console.log(TripService.employee_name());
        $scope.action.executor = TripService.employee_name();
    })

    $scope.save = function (action) {
        var data = {
            itinerary_id: $stateParams.itinerary_id,
            store_id: $stateParams.store_id,
            problem: action.problem,
            action_target: action.target,
            action_plan: action.plan,
            executor: action.executor.join(),
            set_time: action.set_time.toISOString(),
            expected_time: action.expected_time.toISOString(),
            remark: action.remark
        };
        console.log(data);
        var url = BASE_URL + '/itinerary/actionplan/add';
        $http.post(url, data).then(function (res) {
            $ionicHistory.goBack();
        });
    }

    $scope.go_executor = function () {
        $state.go('action-executor', {
            store_id: $stateParams.store_id
        });
    }

    $scope.go_back = function () {
        $ionicHistory.goBack();
    }

});