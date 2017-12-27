/*
 * 评估记录
 * @author : kmr
 * @modified : 2017/9/5
 */
app.controller('evaluationCtrl', function ($scope, $state, $stateParams, $ionicHistory, BASE_URL, $http) {    
    // change screen to landscape mode
    screen.orientation.lock('landscape');

    $scope.datas = [];

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

        var url = BASE_URL + '/sopitem/list';
        $http.get(url).then(function (res) {
            console.log('/sopitem/list:response:', res.data);
            for (key in res.data) {
                $scope.datas[key] = {};
                $scope.datas[key].sop_detail = res.data[key].sop_detail;
            }
            url = BASE_URL + '/eval/list';
            $http.post(url, {}).then(function (res) {
                console.log('/eval/list:response:', res.data);
                for (key in res.data) {
                    //console.log(key);
                    var loop = res.data[key];
                    var i = 0;
                    for (index in loop) {
                        //console.log(index);
                        if (index.indexOf('sop') == 0 && key.indexOf('sopofresult_id') != 0) {
                            var objectKey = 'score' + (parseInt(key) + 1);
                            //console.log(typeof loop[index]  'number');
                            if (typeof loop[index] == 'number') {
                                
                                $scope.datas[i][objectKey] = loop[index];
                                i++;
                            }                           
                        }
                       
                    }
                }
                console.log('**************', $scope.datas);
            });
        });        
    });
    // 返回
    $scope.go_back = function () {
        screen.orientation.unlock('landscape');
        $ionicHistory.goBack();
    };
});