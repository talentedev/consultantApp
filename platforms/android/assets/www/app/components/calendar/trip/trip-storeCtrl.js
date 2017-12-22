/*
 * 选择门店
 * @author : kmr
 * @modified : 2017/9/4
*/
app.controller('trip-storeCtrl', function ($scope, $state, $ionicHistory, BASE_URL, $http, TripService) {
    var store = {};

    $scope.$on('$ionicView.enter', function (event) {
        var url = BASE_URL + '/store/list';
        $http.get(url).then(function (res) {
            $scope.stores = res.data;
        });
    });
    // check a shop
    $scope.store_check = function ($event, data) {
        var elementList = document.querySelectorAll('#trip-store .list i');
        for (i = 0; i < elementList.length; i++) {
            var ele = elementList[i];
            ele.className = "icon fa fa-square-o";
        }
        $event.currentTarget.className = "icon fa fa-check-square-o";
        store = data;
    };
    // 保存
    $scope.save = function () {
        TripService.setShop(store);
        $ionicHistory.goBack();
    };
    // 取消
    $scope.go_back = function () {
        $ionicHistory.goBack();
    };
});