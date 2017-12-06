/*
 * 店面年度工作计划
 */
app.controller('perform-storefrontCtrl', function ($scope, $state, $stateParams, $ionicHistory, BASE_URL, $http) {
    $scope.$on('$ionicView.enter', function (event) {
        $scope.store_id = $stateParams.store_id;
        $scope.store_name = $stateParams.store_name;
    })


    $scope.save = function (plan) {
        var url = BASE_URL + '/itinerary/annualplan';
        var data = {
            store_id: $scope.store_id,
            jan: plan.jan,
            feb: plan.feb,
            mar: plan.mar,
            apr: plan.apr,
            may: plan.may,
            jun: plan.jun,
            jul: plan.jul,
            aug: plan.aug,
            sep: plan.sep,
            oct: plan.oct,
            nov: plan.nov,
            dec: plan.dec,
            remark: plan.remark
        };
        
        $http.post(url, data).then(function (res) {
            $ionicHistory.goBack();
        });        
    }

    $scope.go_back = function () {
        $ionicHistory.goBack();
    }

})