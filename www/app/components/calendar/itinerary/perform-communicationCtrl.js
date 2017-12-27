/*
 * 添加沟通
 * @author : kmr
 * @modified : 2017/9/5
 */
app.controller('perform-communicationCtrl', function ($scope, $state, $stateParams, $ionicHistory, $http, TripService, BASE_URL) {
    $scope.coms = [1];
    $scope.commn = {};
    $scope.commn.people = [];
    $scope.index = '';

    $scope.$on('$ionicView.enter', function (event) {
        var people = TripService.getParticipators();
        var peopleName = '';
        for (key in people) {
            if (key != 0) {
                peopleName += ', ';
            }
            peopleName += people[key].staff_name;
        }
        $scope.commn.people[$scope.index] = peopleName;
    });
    // 沟通人员
    $scope.go_people = function (index) {
        $scope.index = index;
        $state.go('com-people', {
            sid: $stateParams.sid
        });
    };
    // 统计
    $scope.list = function () {
        $state.go('com-list', {
            visit_id: $stateParams.visit_id
        });
    };
    // 保存
    $scope.save = function (commn) {       
        var data = commn.content;
        var arr = [];
        for (var key in data) {
            var item = {};
            item.people = commn.people[key];
            item.communication_time = commn.communication_time[key];
            item.content = commn.content[key];
            item.result = commn.result[key];
            item.comments = commn.comments[key];
            item.visit_id = $stateParams.visit_id;
            arr.push(item);
        };
        var url = BASE_URL + '/com/add';
        console.log('com/add:request', arr);
        $http.post(url, arr).then(function (res) {
            console.log('com/add:response', res.data);
            alert('保存了!');
        });
    };
    // 添加其它行动计划
    $scope.addCom = function () {       
        $scope.coms.push(1);
    };
    // 返回
    $scope.go_back = function () {
        $ionicHistory.goBack();
    };
});