/*
 * the controller that manage store
 */

app.controller('storeCtrl', function ($scope, $state, $http, $ionicHistory, BASE_URL) {

    $scope.$on('$ionicView.enter', function (event) {      
        var url = BASE_URL + '/store/list';
        $http.get(url).then(function (res) {
            $scope.stores = res.data;
        });
    });

    // search a store by name
    $scope.search = function (query) {
        $scope.stores = [];
        var url = BASE_URL + '/store/search';
        var data = {
            store_name: query
        }
        $http.post(url, data).then(function (res) {
            console.log(res.data);
            $scope.stores = res.data;
        });
    }

    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
    $scope.go_detail = function (store_id) {
        $state.go('store-detail', {
            store_id: store_id
        });
    }
    $scope.go_add = function () {
        $state.go('store-detail');
    }
});