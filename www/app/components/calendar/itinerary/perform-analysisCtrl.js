/*
 * SWOT分析
 */
app.controller('perform-analysisCtrl', function ($scope, $state, $stateParams, $ionicHistory, ItineraryService, BASE_URL, $http) {
    $scope.$on('$ionicView.enter', function (event) {
        $scope.store_id = $stateParams.store_id;
        $scope.store_name = $stateParams.store_name;
    })
    
    $scope.save = function (swot) {
        var url = BASE_URL + '/itinerary/swot';
        var data = {
            store_id: $scope.store_id,
            advantage: swot.advantage,
            disadvantage: swot.disadvantage,
            opportunity: swot.external_choice,
            threat: swot.external_danger,
            remark: swot.remark
        };
        
        $http.post(url, data).then(function (res) {
            $ionicHistory.goBack();
        });        
    }

    $scope.go_back = function () {
        $ionicHistory.goBack();
    }

});