/*
 * 添加行动计划及草案制定
 */
app.controller('perform-developCtrl', function ($scope, $state, $stateParams, $ionicHistory, BASE_URL, $http) {

    $scope.action = [];
    $scope.actions = [1];

    $scope.$on('$ionicView.enter', function (event) {
        var url = BASE_URL + '/action/get';
        var data = {
            visit_id: $stateParams.visit_id
        }
        $http.post(url, data).then(function (res) {
            for (var i = 0; i < res.data.length; i++) {
                $scope.actions.push(1);
                $scope.action[i] = res.data[i];
            }            
        });
    })

    $scope.save = function () {
        var data = $scope.action;
        for (key in data) {
           data[key].visit_id = $stateParams.visit_id;
        }
        var url = BASE_URL + '/action/add';
        $http.post(url, data).then(function (res) {
            $ionicHistory.goBack();
        });
    }

    $scope.addAction = function () {
        var actions = $scope.actions;
        actions.push(1);
        $scope.actions = actions;
    }

    $scope.go_executor = function () {
        $state.go('action-executor', {
            store_id: $stateParams.store_id
        });
    }

    $scope.go_back = function () {
        $ionicHistory.goBack();
    }

});