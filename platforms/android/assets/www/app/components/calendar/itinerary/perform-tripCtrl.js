/*
 * Add trip
 */
app.controller('perform-tripCtrl', function ($scope, $state, $http, $ionicHistory, BASE_URL) {
    // page init
    $scope.sopitem = {}

    $scope.$on('$ionicView.enter', function (event) {
        $scope.scores = [
            {
                name: '未打分',
                value: 0
            },
            {
                name: '0',
                value: 1
            },
            {
                name: '满分',
                value: 2
            }
        ];
        $scope.score = $scope.scores[0];
        var url = BASE_URL + '/sopitem/list';
        $http.get(url).then(function (res) {
            console.log('sopitem/list:response', res.data);
            $scope.items = res.data;
        });
    })

    $scope.go_back = function () {
        $ionicHistory.goBack();
    }

})