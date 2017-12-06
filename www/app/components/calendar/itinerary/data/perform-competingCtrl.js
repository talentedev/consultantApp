/*
 * 竞品上报
 */
app.controller('perform-competingCtrl', function ($scope, $state, $http, $stateParams, $ionicHistory, BASE_URL) {

    $scope.$on('$ionicView.enter', function (event) {
        $scope.store_id = $stateParams.store_id;
        $scope.store_name = $stateParams.store_name;
    })

    $scope.save = function (competition) {
        var url = BASE_URL + '/competition/add';
        var data = {
            store_id: $scope.store_id,
            product_name: competition.name,
            product_remark: competition.ready,            
            reporter: competition.reporter,
            reporttime: competition.time.toISOString(),
            remark: competition.remark,
            photo_url: 'a'
        };
        console.log(data);
        $http.post(url, data).then(function (res) {
            $ionicHistory.goBack();
        });
    }

    $scope.go_back = function () {
        $ionicHistory.goBack();
    }

})