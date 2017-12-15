/*
 * 选择门店
*/
app.controller('trip-storeCtrl', function ($scope, $state, $ionicHistory, BASE_URL, $http, TripService) {

    $scope.$on('$ionicView.enter', function (event) {
        var url = BASE_URL + '/store/list';        
        $http.get(url).then(function (res) {
            $scope.stores = res.data;
        });
    })

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

    var store = {};
    var checked = [];

    // event when press check icon in store list
    $scope.store_check = function (i) {
        if (typeof checked[i] == 'undefined') checked[i] = false;
        var id = 'store' + i.toString();
        if (checked[i] == false) {
            document.getElementById(id).style.color = '#48b52d';
            store = $scope.stores[i];
            for (key in checked) {
                if (key != i) {
                    document.getElementById('store' + key.toString()).style.color = '#444';
                    checked[key] = false;
                }
            }
            checked[i] = true;
        } else {
            document.getElementById(id).style.color = '#444';
            checked[i] = false;
        }
    }

    // return current data to previous view.
    $scope.save = function () {
        TripService.setShop(store);
        $ionicHistory.goBack();   
    }

    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
});