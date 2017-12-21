/*
 * 查看店面人员信息 (添加)
 */
app.controller('store-addstaffCtrl', function ($scope, $state, $stateParams, $ionicHistory, BASE_URL, $http) {

    $scope.$on('$ionicView.enter', function (event) {
        $scope.staff = {};
        // initialize staff gender
        $scope.sex = [
            {
                name: '男',
                value: 0
            },
            {
                name: '女',
                value: 1
            }
        ];
        $scope.staff.sex = $scope.sex[0];
        // initialize staff E-learn identity
        $scope.learn_identity = [
            {
                name: '普通员工',
                value: 0
            },
            {
                name: 'DMS操作员',
                value: 1
            },
            {
                name: '关键员工',
                value: 2
            },
            {
                name: '店主',
                value: 3
            }
        ];
        $scope.staff.learn_identity = $scope.learn_identity[0];
        // initialize staff position
        $scope.position = [
            {
                name: '1、见习员工',
                value: 0
            },
            {
                name: '2、普通员工',
                value: 1
            },
            {
                name: '3、训练员',
                value: 2
            },
            {
                name: '4、员工组长',
                value: 3
            },
            {
                name: '5、助理经理',
                value: 4
            },
            {
                name: '6、中心经理',
                value: 5
            },
            {
                name: '7、经营者',
                value: 6
            }
        ];
        $scope.staff.position = $scope.position[0];
    });

    // add new member of the store
    $scope.save = function () {
        var url = BASE_URL + '/staff/add';

        var data = {};
        data = $scope.staff;
        data.sid = $stateParams.sid;
        data.position = $scope.staff.position.value;
        data.learn_identity = $scope.staff.learn_identity.name;
        data.sex = $scope.staff.sex.value;

        console.log('staff/add:request', data);

        $http.post(url, data).then(function (res) {
            alert('成功添加!');
            $ionicHistory.goBack();
        }, function () {
            alert('失败添加!');
        });

    }

    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
});