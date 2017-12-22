/*
 * 选择店面人员
 * @author : kmr
 * @modified : 2017/9/5
*/
app.controller('com-peopleCtrl', function ($scope, $state, $stateParams, $ionicHistory, BASE_URL, $http, TripService) {
    var checked = [];
    var participators = [];
    var temp = [];

    $scope.$on('$ionicView.enter', function (event) {
        // get list of staffs for the shop
        var url = BASE_URL + '/staff/list';
        var data = {
            sid: $stateParams.sid
        }
        console.log('staff/list:request', data);
        $http.post(url, data).then(function (res) {
            console.log('staff/list:response', res.data);
            $scope.members = res.data;
        });
    });
    // check
    $scope.onItem = function ($event, index, data) {
        if (typeof checked[index] == 'undefined') checked[index] = false;
        if (checked[index] == false) {
            $event.currentTarget.className = "icon fa fa-check-square-o";
            checked[index] = true;
            temp[index] = data;
        } else if (checked[index] == true) {
            $event.currentTarget.className = "icon fa fa-square-o";
            checked[index] = false;
            temp[index] = null;
        }
    };
    // 全选
    $scope.confirm = function () {
        participators = [];
        for (key in temp) {
            if (checked[key] == true) {
                participators.push(temp[key]);
            }
            checked[key] = false;
        }
        temp = [];
        console.log('com-people', participators);
        TripService.setParticipators(participators);
        $ionicHistory.goBack();
    };
    // 取消
    $scope.go_back = function () {
        $ionicHistory.goBack();
    };
});