/*
 * 驰加审计结果
 * @author : kmr
 * @modified : 2017/8/22
 */
app.controller('perform-auditCtrl', function ($scope, $state, $stateParams, $ionicHistory, $http, BASE_URL) {
    // init
    $scope.audit = {};
    $scope.auditType = [
            {
                name: 'SOP',
                value: 0
            },
            {
                name: 'CSI',
                value: 1
            },
            {
                name: 'DMS',
                value: 2
            }
    ];
    $scope.audit.type = $scope.auditType[0];

    $scope.$on('$ionicView.enter', function (event) {
        if($stateParams.type == 'edit') {
            var url = BASE_URL + '/audit/get';
            var data = {
                audit_id: $stateParams.data
            };
            console.log('audit/get:request:', data);
            $http.post(url, data).then(function (res) {
                console.log('audit/get:response:', res.data);
                $scope.audit = res.data;
                $scope.audit.type = $scope.auditType[res.data.type];
            });
        }
    })
    // 保存
    $scope.save = function (audit) {
        var url = BASE_URL;
        var data = audit;
        if($stateParams.type == 'add') {
            url += '/audit/add';
        } else if ($stateParams.type == 'edit') {
            url += '/audit/update';
            data.audit_id = $stateParams.data;
        }       
        data.type = audit.type.value;
        data.sid = $stateParams.sid;
        console.log('audit/add:request', data);
        $http.post(url, data).then(function (res) {
            console.log('audit/add:response', res, data);
            alert('保存了!');
            if ($stateParams.type == 'edit') {
                $ionicHistory.goBack();
            }            
        });
    }    
    // 继续添加其它驰加审计结果
    $scope.addAudit = function () {
        $scope.audit = {};
        $scope.audit.type = $scope.auditType[0];
    }
    // 驰加审计结果统计
    $scope.goList = function () {
        $state.go('audit-list', {
            sid: $stateParams.sid
        });
    }
    // 返回
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
})