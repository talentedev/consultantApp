/*
 * 添加培训辅导
 * @author : kmr
 * @modified : 2017/9/11
 */
app.controller('trainCtrl', function ($scope, $state, $stateParams, $ionicHistory, $http, TripService, BASE_URL) {
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
        $state.go('train-list', {
            visit_id: $stateParams.visit_id
        });
    };
    // 保存
    $scope.save = function (commn) {
        var data = commn.content;
        var arr = [];
        for (var key in data) {
            var item = {};
            item.train_people = commn.people[key];
            item.train_date = commn.train_date[key];
            item.train_content = commn.content[key];
            item.train_result = commn.result[key];
            //item.comments = commn.comments[key];
            item.visit_id = $stateParams.visit_id;
            arr.push(item);
        };
        var url = BASE_URL + '/train/add';
        console.log('train/add:request', arr);
        $http.post(url, arr).then(function (res) {
            console.log('train/add:response', res.data);
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