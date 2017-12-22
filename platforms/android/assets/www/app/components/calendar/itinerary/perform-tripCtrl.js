/*
 * 店面评估
 * @author : kmr
 * @modified : 2017/9/5
 */
app.controller('perform-tripCtrl', function ($scope, $state, $http, $stateParams, $ionicHistory, BASE_URL) {
    $scope.score = [];

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
        //$scope.score = $scope.scores[0];
        var url = BASE_URL + '/sopitem/list';
        $http.get(url).then(function (res) {
            console.log('sopitem/list:response', res.data);
            var data = res.data;
            for (key in data) {
                //switch (data[key].score) {
                //    case "-1": data[key].score = $scope.scores[0]; break;
                //    case "0": data[key].score = $scope.scores[1]; break;
                //    default: data[key].score = $scope.scores[2]; break;
                //}
                $scope.score[key] = $scope.scores[0];
            }
            $scope.items = data;
        });
    });
    // 保存
    $scope.save = function (score) {
        var arr = [];
        for (key in score) {
            arr.push(score[key].value);
        }
        var data = {
            visit_id: $stateParams.visit_id,
            result: arr
        };
        var url = BASE_URL + '/sopresult/add';
        console.log('sopresult/add:request', data);
        $http.post(url, data).then(function (res) {
            alert('保存了!');
            $ionicHistory.goBack();
        });
    };
    // 返回
    $scope.go_back = function () {
        $ionicHistory.goBack();
    };
});