/*
 * 外勤签到
*/
app.controller('perform-mapCtrl', function ($scope, $state, $stateParams, $ionicHistory, BaiduMap) {
    var today = new Date();
    $scope.today = today.getFullYear() + '.' + (today.getMonth() + 1).toString() + '.' + today.getDate();
    var day = ['一', '二', '三', '四', '五', '六'];
    $scope.day = day[today.getDay() - 1];

    $scope.store_name = $stateParams.store_name;
    BaiduMap.searchDuration($stateParams.store_name);
    localStorage.setItem('duration', '');
    var getDuration = function () {
        setTimeout(function () {
            if (localStorage.getItem('duration') != '') {
                //$scope.duration = localStorage.getItem('duration');
                $scope.duration = '27';
            } else {
                getDuration();
                console.log('getDuration--->' + localStorage.getItem('duration'));
            }
        }, 1000);
    };
    getDuration();       
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
    $scope.go_save = function () {
        $state.go('tab.self');
    }
});

app.factory('BaiduMap', function () {
    return {
        searchDuration: function (p_storename) {
            var p_start = {
                lng: 0,
                lat: 0
            };
            var p_end = {
                lng: 0,
                lat: 0
            };
            var map = new BMap.Map("map");
            var point = new BMap.Point(116.331398, 39.897445);
            map.centerAndZoom(point, 12);
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function (r) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    var mk = new BMap.Marker(r.point);
                    // map.addOverlay(mk);
                    //map.panTo(r.point);
                    p_start.lng = r.point.lng;
                    p_start.lat = r.point.lat;
                    //alert('您的位置：' + r.point.lng + ',' + r.point.lat);
                    // get geolocation from address
                    var myGeo = new BMap.Geocoder();
                    myGeo.getPoint(p_storename, function (point) {
                        if (point) {
                            //map.centerAndZoom(point, 16);
                            //map.addOverlay(new BMap.Marker(point));
                            p_end.lng = point.lng;
                            p_end.lat = point.lat;

                            var start = new BMap.Point(p_start.lng, p_start.lat);
                            var end = new BMap.Point(p_end.lng, p_end.lat);
                            var output = '';
                            var searchComplete = function (results) {
                                if (driving.getStatus() != BMAP_STATUS_SUCCESS) {
                                    return;
                                }
                                var plan = results.getPlan(0);
                                var duration = plan.getDuration(true);
                                localStorage.setItem('duration', duration);
                                console.log('Duration--->' + localStorage.getItem('duration'));
                                //output += "总路程为：";
                                //output += plan.getDistance(true) + "\n";                            
                            };

                            var driving = new BMap.DrivingRoute(map, { renderOptions: { map: map, autoViewport: true }, policy: BMAP_DRIVING_POLICY_LEAST_TIME, onSearchComplete: searchComplete });
                            driving.search(start, end);
                        } else {
                            alert("您选择地址没有解析到结果!");
                        }
                    }, '');
                }
                else {
                    alert('failed' + this.getStatus());
                }
            }, { enableHighAccuracy: false });
        }
    }
})