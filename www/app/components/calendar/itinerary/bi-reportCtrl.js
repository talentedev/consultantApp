/*
 * BI Report
 */
app.controller('bi-reportCtrl', function ($scope, $state, $ionicHistory) {

    $scope.$on('$ionicView.enter', function (event) {
        // change screen to landscape mode
        screen.orientation.lock('landscape');

        var data = [
            {
                type: '轮胎',
            },
            {
                type: '轮胎修补',
            },
            {
                type: '四轮定位',
            },
            {
                type: '气门嘴',
            },
            {
                type: '动平衡',
            },
            {
                type: '轮胎拆装',
            },
            {
                type: '轮胎压力管理系统',
            },
            {
                type: '轮胎相关',
            }
        ];
        $scope.datas = data;
    })
    
    $scope.go_back = function () {
        screen.orientation.unlock('landscape');
        $ionicHistory.goBack();
    }
})