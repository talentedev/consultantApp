/*
 * 添加总结
 * @author : kmr
 * @modified : 201/8/23
 */
app.controller('add-summary-itemCtrl', function ($scope, $state, $stateParams, $ionicHistory, $http, TripService, BASE_URL) {
    $scope.summaries = [1];
    $scope.summary = {};
    $scope.summary.meeting_people = [];
    $scope.tabIndex = 0;

    $scope.$on('$ionicView.enter', function (event) {
        var members = TripService.getParticipators();
        var names = '';
        for (key in members) {
            names += members[key].staff_name;
            names += ' ';
        }
        console.log($scope.tabIndex);
        $scope.summary.meeting_people[$scope.tabIndex] = names;
    });
    // 保存
    $scope.save = function (summary) {
        var url = BASE_URL + '/summary/add';
        var arr = [];
        for (var key in summary.meeting_people) {
            var item = {};
            item.meeting_target = summary.meeting_target[key];
            item.meeting_subject = summary.meeting_subject[key];
            item.meeting_people = summary.meeting_people[key];
            item.meeting_time = new Date(summary.meeting_time[key]);
            item.effect = summary.effect[key];
            item.comments = summary.comments[key];
            item.visit_id = $stateParams.visit_id;
            arr.push(item);
        }
        var data = arr;
        console.log('summary/add:request', data);
        $http.post(url, data).then(function (res) {
            alert('保存了!');
            $ionicHistory.goBack();
        });
    };
    // 参加人员
    $scope.selStaff = function (index) {
        $scope.tabIndex = index;
        $state.go('com-people', {
            sid: $stateParams.sid
        });
    };
    // 添加其它总结
    $scope.addSummary = function () {
        $scope.summaries.push(1);
    };
    // 返回
    $scope.go_back = function () {
        $ionicHistory.goBack();
    };
    // 列表查看
    $scope.list = function () {
        $state.go('summary-list', {
            visit_id: $stateParams.visit_id
        });
    }
});