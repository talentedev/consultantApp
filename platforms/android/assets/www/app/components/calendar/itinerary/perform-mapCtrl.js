/*
 * 外勤签到 (到店签到)
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

    $scope.store_name = $stateParams.shop_name;

    //BaiduMap.searchDuration($stateParams.shop_name);
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
    }
    // 提交
    $scope.go_save = function () {
        var url = BASE_URL + '/visit/update';
        var data = {};
        data.visit_id = $stateParams.visit_id;
        if($stateParams.type == 'arrive') {            
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
    }
});

/*app.factory('BaiduMap', function () {
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
            map.addControl(new BMap.NavigationControl());
            map.addControl(new BMap.ScaleControl());
            map.addControl(new BMap.OverviewMapControl());
            map.centerAndZoom(point, 12);
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function (r) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    var mk = new BMap.Marker(r.point);
                    map.addOverlay(mk);                    
                    //map.panTo(r.point);
                    //p_start.lng = r.point.lng;
                    //p_start.lat = r.point.lat;
                    //alert('您的位置：' + r.point.lng + ',' + r.point.lat);
                    // get geolocation from address
                    var myGeo = new BMap.Geocoder();
                    psss = new BMap.Point(116.331398, 39.897445);
                    myGeo.getLocation(psss, function (rs) {
                        var addComp = rs.addressComponents;
                        var address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
                        //alert(address);
                        $scope.address = address;
                    });
                    //myGeo.getPoint(p_storename, function (point) {
                    //    if (point) {
                    //        //map.centerAndZoom(point, 16);
                    //        //map.addOverlay(new BMap.Marker(point));
                    //        p_end.lng = point.lng;
                    //        p_end.lat = point.lat;

                    //        var start = new BMap.Point(p_start.lng, p_start.lat);
                    //        var end = new BMap.Point(p_end.lng, p_end.lat);
                    //        var output = '';
                    //        var searchComplete = function (results) {
                    //            if (driving.getStatus() != BMAP_STATUS_SUCCESS) {
                    //                return;
                    //            }
                    //            var plan = results.getPlan(0);
                    //            var duration = plan.getDuration(true);
                    //            localStorage.setItem('duration', duration);
                    //            console.log('Duration--->' + localStorage.getItem('duration'));
                    //            //output += "总路程为：";
                    //            //output += plan.getDistance(true) + "\n";                            
                    //        };

                    //        var driving = new BMap.DrivingRoute(map, { renderOptions: { map: map, autoViewport: true }, policy: BMAP_DRIVING_POLICY_LEAST_TIME, onSearchComplete: searchComplete });
                    //        driving.search(start, end);
                    //    } else {
                    //        alert("您选择地址没有解析到结果!");
                    //    }
                    //}, '');
                }
                else {
                    alert('failed' + this.getStatus());
                }
            }, { enableHighAccuracy: false });
        }
    }
})*/