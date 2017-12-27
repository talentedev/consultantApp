/*
 * 添加行动计划及草案制定
 * @author : kmr
 * @midified : 2017/9/9
 */
app.controller('perform-developCtrl', function ($scope, $state, $stateParams, $ionicHistory, BASE_URL, $http, TripService) {
    $scope.action = {};
    $scope.action.issue = [];
    $scope.action.action_target = [];
    $scope.action.action_program = [];
    $scope.action.executor = [];
    $scope.action.develop_time = [];
    $scope.action.plan_complete_time = [];
    $scope.action.comments = [];
    $scope.actions = [1];
    $scope.index = '';

    $scope.$on('$ionicView.enter', function (event) {
        //$scope.actions = [1];
        var url = BASE_URL + '/action/get';
        var data = {
            visit_id: $stateParams.visit_id
        }
        console.log('action/get:request', data);
        $http.post(url, data).then(function (res) {
            console.log('action/get:response', res.data);
            //for (var i = 0; i < res.data.length; i++) {
                //$scope.actions.push(1);
               // $scope.action[i] = res.data[i];
            //}            
        });
        var staffs = TripService.getParticipators();
        if (staffs.length > 0) {
            $scope.action.executor[$scope.index] = '';
            for (key in staffs) {                
                if (key != 0) {
                    $scope.action.executor[$scope.index] += ', ';
                }
                $scope.action.executor[$scope.index] += staffs[key].staff_name;
            }
        }        
    })
    // 保存
    $scope.save = function (action) {
        var data = action.issue;
        var arr = [];
        for (var key in data) {
            var item = {};
            item.issue = action.issue[key];
            item.action_target = action.action_target[key];
            item.action_program = action.action_program[key];
            item.executor = action.executor[key];
            item.develop_time = action.develop_time[key];
            item.plan_complete_time = action.plan_complete_time[key];
            item.comments = action.comments[key];
            item.filename = '';
            item.fileattach = '';
            item.visit_id = $stateParams.visit_id;
            arr.push(item);
        }
        var url = BASE_URL + '/action/add';
        console.log('action/add:request', arr);
        $http.post(url, arr).then(function (res) {
            console.log('action/add:response', res.data);
            alert('保存了!');
            $ionicHistory.goBack();
        });
    }
    // 添加其它行动计划及草案
    $scope.addAction = function () {
        var actions = $scope.actions;
        actions.push(1);
        $scope.actions = actions;
    }
    // 执行人
    $scope.go_executor = function (index) {
        $scope.index = index;
        $state.go('action-executor', {
            sid: $stateParams.sid
        });
    }
    // 返回
    $scope.go_back = function () {
        $ionicHistory.goBack();
    };
    // 统计
    $scope.list = function () {
        $state.go('action-list', {
            visit_id: $stateParams.visit_id
        });
    };
});