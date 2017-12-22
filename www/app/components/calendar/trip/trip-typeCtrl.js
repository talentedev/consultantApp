/*
 * 选择行程类型
 * @author : kmr
 * @modified : 2017/9/4
*/
app.controller('trip-typeCtrl', function ($scope, $state, $ionicHistory, $http, BASE_URL, TripService) {    
    var plantype = {};

    $scope.$on('$ionicView.enter', function (event) {
        var url = BASE_URL + '/plantype';
        $http.get(url).then(function (res) {
            console.log('plantype:response', res.data);
            $scope.plantypes = res.data;
        });
    });    
    // check trip type
    $scope.onItem = function ($event, type) {
        // change the selected checkbox
        var elementList = document.querySelectorAll('#trip-type i');
        for (i = 0; i < elementList.length; i++) {
            var ele = elementList[i];
            ele.className = "icon fa fa-square-o";
        }
        $event.currentTarget.className = "icon fa fa-check-square-o";
        plantype = type;
    };
    // 保存
    $scope.save = function () {
        TripService.setPlanType(plantype);
        $ionicHistory.goBack();
    };
    // 取消
    $scope.go_back = function () {
        $ionicHistory.goBack();
    };
});