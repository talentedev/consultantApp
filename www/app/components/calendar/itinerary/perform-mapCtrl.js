/*
 * 外勤签到 (到店签到)
 * @author : kmr
 * @modified : 2017/9/5
*/
app.controller('perform-mapCtrl', function ($scope, $state, $stateParams, $ionicHistory, $http, $interval, BASE_URL) {
    var today = new Date();
    var day = ['一', '二', '三', '四', '五', '六'];

    $scope.today = today.getFullYear() + '.' + (today.getMonth() + 1).toString() + '.' + today.getDate();
    $scope.day = day[today.getDay() - 1];
    $scope.hour = today.getHours();
    $scope.minute = today.getMinutes();
    // execute every 30s
    $interval(function () {
        var today = new Date();
        $scope.minute = today.getMinutes();
    }, 30 * 1000);

    var map = new BMap.Map("map");
    var point = new BMap.Point(116.331398, 39.897445);
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.GeolocationControl());
    map.centerAndZoom(point, 12);
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.centerAndZoom(r.point, 16);
            var myGeo = new BMap.Geocoder();
            myGeo.getLocation(r.point, function (rs) {
                var addComp = rs.addressComponents;
                var address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
                $scope.address = address;
            });
        }
        else {
            alert('failed' + this.getStatus());
        }
    }, { enableHighAccuracy: false });
    // 返回
    $scope.go_back = function () {
        $ionicHistory.goBack();
    };
    // 提交
    $scope.go_save = function () {
        var url = BASE_URL + '/visit/update';
        var data = {};
        data.visit_id = $stateParams.visit_id;
        if ($stateParams.type == 'arrive') {
            data.arrive_position = $scope.address;
            data.arrive_time = new Date();
        } else if ($stateParams.type == 'leave') {
            data.leave_position = $scope.address;
            data.leave_time = new Date();
        }
        console.log('visit/update:request', data);
        $http.post(url, data).then(function () {
            $ionicHistory.goBack();
        });
    };
});