/*
 * 竞品上报
 * @author : kmr
 * @modified : 2017/8/22
 */
app.controller('perform-competingCtrl', function ($scope, $state, $http, $stateParams, $ionicHistory, BASE_URL) {
    // page init
    $scope.againsts = [1];
    $scope.competition = {};

    $scope.$on('$ionicView.enter', function (event) {
        $scope.shop_code = $stateParams.shop_code;
        $scope.shop_name = $stateParams.shop_name;
    })
    // 保存
    $scope.save = function (competition, comments) {
        var url = BASE_URL + '/datareport/add';
        var data = {
            visit_id: $stateParams.visit_id,
            datatype: 'agianstbrand',
            comments: comments,
            report_date: new Date()
        };
        console.log('datareport/add:request', data);
        $http.post(url, data).then(function (res) {
            var url = BASE_URL + '/againstbrand/add';
            var arr = [];
            for (var key in competition.brand_code) {
                var item = {};
                item.brand_name = competition.brand_name[key];
                item.detail = competition.detail[key];
                item.datareport_id = res.data;
                arr.push(item);
            }
            var data = arr;
            console.log('againstbrand/add:request', data);
            $http.post(url, data).then(function (res) {
                alert('保存了!');
                $ionicHistory.goBack();
            });
        });
    }
    // 添加其它竞品
    $scope.addAgainst = function () {
        var temp = [];
        temp = $scope.againsts;
        temp.push(1);
        $scope.againsts = temp;
    }
    // 返回
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }

})