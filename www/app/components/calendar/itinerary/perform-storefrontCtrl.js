/*
 * 店面年度工作计划
 */
app.controller('perform-storefrontCtrl', function ($scope, $state, $stateParams, $ionicHistory, BASE_URL, $http) {

    $scope.plan = {}

    $scope.$on('$ionicView.enter', function (event) {
        $scope.shop_code = $stateParams.shop_code;
        $scope.shop_name = $stateParams.shop_name;
        var url = BASE_URL + '/visit/annualplan/get';
        var data = {
            sid: $stateParams.sid
        };
        $http.post(url, data).then(function (res) {
            $scope.plan = res.data;
        });
    })


    $scope.save = function () {
        var url = BASE_URL + '/visit/annualplan/add';
        var data = {};                
        data = $scope.plan;
        data.sid = $stateParams.sid;
        $http.post(url, data).then(function (res) {
            $ionicHistory.goBack();
        });        
    }

    $scope.go_back = function () {
        $ionicHistory.goBack();
    }

})