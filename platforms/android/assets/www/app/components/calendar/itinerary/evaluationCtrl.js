/*
 * 评估记录
 */
app.controller('evaluationCtrl', function ($scope, $state, $stateParams, $ionicHistory, BASE_URL, $http) {
    
    // change screen to landscape mode
    screen.orientation.lock('landscape');

    $scope.$on('$ionicView.enter', function (event) {       

        // set type
        $scope.types = [
            {
                name: '1、评估列表',
                value: 0
            },
            {
                name: '2、评分趋势图',
                value: 1
            },
            {
                name: '3、级别趋势图',
                value: 2
            }
        ];
        $scope.type = $scope.types[0];

        var url = BASE_URL + '/sopitem/list';
        $http.get(url).then(function (res) {
            console.log('/sopltem/list:response:', res.data);
            $scope.datas = res.data;
        });
    });

    $scope.go_back = function () {
        screen.orientation.unlock('landscape');
        $ionicHistory.goBack();
    }
});