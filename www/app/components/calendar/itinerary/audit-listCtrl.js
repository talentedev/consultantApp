/*
 * 驰加审计结果统计
 */
app.controller('audit-listCtrl', function ($scope, $state, $stateParams, $ionicHistory, $http, BASE_URL) {   

    $scope.$on('$ionicView.enter', function (event) {
        var url = BASE_URL + '/audit/list';
        var data = {
            sid: $stateParams.sid
        }
        console.log('audit/list:request', data);
        $http.post(url, data).then(function (res) {
            console.log('audit/list:response', res.data);            
            for(key in res.data) {
                switch(res.data[key].type) {
                    case '0': res.data[key].type = 'SOP'; break;
                    case '1': res.data[key].type = 'CSI'; break;
                    case '2': res.data[key].type = 'DMS'; break;
                    default: res.data[key].type = '';
                }
            }
            $scope.audits = res.data;
        });        
    });
    // edit
    $scope.edit = function (data) {
        $state.go('perform-audit', {
            sid: $stateParams.sid,
            type: 'edit',
            data: data.audit_id
        });
    };
    // 筛选
    $scope.filter = function () {
        var data = $scope.audits;
        data.sort(function (a, b) {
            return a.year - b.year;
        });
        $scope.audits = data;
    };
    // 返回
    $scope.go_back = function () {
        screen.orientation.unlock('landscape');
        $ionicHistory.goBack();
    };
});