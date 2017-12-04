/*
 * 选择成员
*/
app.controller('trip-dutyCtrl', function ($scope, $state, $ionicHistory, BASE_URL, $http) {
    $scope.$on('$ionicView.enter', function (event) {
        var url = BASE_URL + '/auth/me';
        $http.get(url).then(function (res) {
            $scope.member = res.data;
        });
    })

    // search a member by name
    $scope.search = function (query) {
        var url = BASE_URL + '/itineray/search';
        var data = {
            search_name : query
        }
        console.log(data);
        $http.post(url, data).then(function (res) {
            console.log(res.data);
            $scope.member = res.data;
        });
    }

    var duty = null;
    var checked = [];

    // event when press check icon in store list
    $scope.duty_check = function (i) {
        if (typeof checked[i] == 'undefined') checked[i] = false;
        var id = 'duty' + i.toString();
        if (checked[i] == false) {
            document.getElementById(id).style.color = '#48b52d';
            //duty = $scope.stores[i];
            for (key in checked) {
                if (key != i) {
                    document.getElementById('duty' + key.toString()).style.color = '#444';
                    checked[key] = false;
                }
            }
            checked[i] = true;
        } else {
            document.getElementById(id).style.color = '#444';
            checked[i] = false;
        }
    }

    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
});