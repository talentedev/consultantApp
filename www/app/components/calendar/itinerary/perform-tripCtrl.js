/*
 * 店面评估
 * @author : kmr
 * @modified : 2017/9/5
 */
app.controller('perform-tripCtrl', function ($scope, $state, $http, $stateParams, $ionicHistory, BASE_URL) {
    $scope.score = [];
    var updateFlag = false;

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
            $scope.items = res.data;

            url = BASE_URL + '/sopresult/get';
            var data = {
                visit_id: $stateParams.visit_id
            };
            for (index in res.data) {
                $scope.score[index] = $scope.scores[0];
            }
            console.log('sopresult/get:request', data);
            $http.post(url, data).then(function (res) {
                console.log('sopresult/get:response', res.data);
                if (res.data != 'null') {
                    updateFlag = true;
                }
                var i = 0;
                for (key in res.data) {                    
                    if (key.indexOf('sop') == 0 && key.indexOf('sopofresult_id') != 0) {
                        if (res.data[key] == -1) {
                            $scope.score[i] = $scope.scores[0];
                        } else if (res.data[key] == 0) {
                            $scope.score[i] = $scope.scores[1];
                        } else {
                            $scope.score[i] = $scope.scores[2];
                        }                        
                        i++;
                    }
                }
            });
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
        var url = BASE_URL;
        console.log(updateFlag);
        if (updateFlag == false) {
            url += '/sopresult/add';
        } else {
            url += '/sopresult/add';
        }        
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