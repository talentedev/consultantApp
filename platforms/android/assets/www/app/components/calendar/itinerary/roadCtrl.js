/*
 * 路途
 * @author : kmr
 * @modified : 2017/9/9
 */
app.controller('roadCtrl', function ($scope, $state, $stateParams, $http, BASE_URL, $ionicHistory) {
    $scope.isdone = 0;

    $scope.$on('$ionicView.enter', function (event) {
        var url = BASE_URL + '/plan/get';
        var data = {
            plan_id: $stateParams.plan_id
        };
        console.log('plan/get:request', data);
        $http.post(url, data).then(function (res) {
            console.log('plan/get:response', res.data);
            var today = new Date();
            var month = new Array();
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";
            var m = month[today.getMonth()];
            var d = today.getDate();
            var y = today.getFullYear();
            var str1 = m + ' ' + d + ' ' + y + ' ' + res.data.start_time;
            var str2 = m + ' ' + d + ' ' + y + ' ' + res.data.end_time;
            var start_time = new Date(str1);
            var end_time = new Date(str2);            
            $scope.start_time = start_time;
            $scope.end_time = end_time;
            $scope.isdone = res.data.isdone;
        });
    });
    // 提交
    $scope.submit = function (start_time, end_time) {
        var url = BASE_URL + '/plan/update';
        var data = {
            plan_id: $stateParams.plan_id,
            start_time: start_time,
            end_time: end_time
        };
        console.log('plan/update:request', data);
        $http.post(url, data).then(function (res) {
            console.log('plan/update:response', res.data);
            $ionicHistory.goBack();
        });        
    };
    // 取消
    $scope.go_back = function () {
        $ionicHistory.goBack();
    };
    // Done
    $scope.done = function () {
        var url = BASE_URL + '/plan/done';
        var data = {
            plan_id: $stateParams.plan_id
        };
        console.log('plan/done:request', data);
        $http.post(url, data).then(function (res) {
            console.log('plan/done:response', res.data);
            alert('行程已Done成功');
            $scope.isdone = 1;
        });
    };
});