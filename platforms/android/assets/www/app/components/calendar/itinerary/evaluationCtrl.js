/*
 * 评估记录
 * @author : kmr
 * @modified : 2017/9/5
 */
app.controller('evaluationCtrl', function ($scope, $state, $stateParams, $ionicHistory, BASE_URL, $http) {    
    // change screen to landscape mode
    screen.orientation.lock('landscape');

    $scope.$on('$ionicView.enter', function (event) {     
        // set type
        $scope.types = [{
                name: '1、评估列表',
                value: 0
            }, {
                name: '2、评分趋势图',
                value: 1
            }, {
                name: '3、级别趋势图',
                value: 2
            }];
        $scope.type = $scope.types[0];

        var url = BASE_URL + '/eval/list';
        var data = {
            visit_id: $stateParams.visit_id
        };
        console.log('/eval/list:request:', data);
        $http.post(url, data).then(function (res) {
            console.log('/eval/list:response:', res.data);
            $scope.datas = res.data;
        });
    });
    // 返回
    $scope.go_back = function () {
        screen.orientation.unlock('landscape');
        $ionicHistory.goBack();
    };
});