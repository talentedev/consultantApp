/*
 * 选择行程类型
*/
app.controller('trip-typeCtrl', function ($scope, $state, $ionicHistory, TripService) {
    
    var trip_type = [
        '店面拜访', '签约店面拜访', '潜在客户拜访', '办公室工作', '会议', '电话会议', '周会', '月会', '年会', '区域研讨会', '区域委员会', '假期', '事假', '病假', '年假', '探亲假', '年假', '生育假 / 陪产假', '婚假', '丧假', '其它', '路途', '培训', '交接工作', '岗位认证', '旅游奖励'
    ];

    var checked = [];
    $scope.trip_type_check = function (i) {
        if (typeof checked[i] == 'undefined') checked[i] = false;
        var id = 'type_' + i.toString();
        if (checked[i] == false) {            
            document.getElementById(id).style.color = '#48b52d';
            checked[i] = true;
            for (key in checked) {
                if (key != i) {
                    document.getElementById('type_' + key.toString()).style.color = '#444';
                    checked[key] = false;
                }
            }
            TripService.set_trip_type(trip_type[i-1]);
        } else {
            document.getElementById(id).style.color = '#444';
            checked[i] = false;
        }        
    }
           
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
});