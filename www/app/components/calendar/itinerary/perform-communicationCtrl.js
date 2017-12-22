/*
 * 添加沟通
 * @author : kmr
 * @modified : 2017/9/5
 */
app.controller('perform-communicationCtrl', function ($scope, $state, $stateParams, $ionicHistory, $http, TripService, BASE_URL) {
    $scope.commn = {};

    $scope.$on('$ionicView.enter', function (event) {
        var people = TripService.getParticipators();
        var peopleName = '';
        for (key in people) {
            peopleName += people[key].staff_name  + ', ';
        }
        $scope.commn.people = peopleName;
    });
    // 沟通人员
    $scope.go_people = function () {
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
        var url = BASE_URL + '/com/add';
        console.log('com/add:request', commn);
        commn.visit_id = $stateParams.visit_id;
        $http.post(url, commn).then(function (res) {
            console.log('com/add:response', res.data);
            alert('保存了!');
        });
    };
    // 返回
    $scope.go_back = function () {
        $ionicHistory.goBack();
    };
});