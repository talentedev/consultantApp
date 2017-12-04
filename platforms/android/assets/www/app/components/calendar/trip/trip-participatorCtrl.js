/*
 * 选择成员
*/
app.controller('trip-participatorCtrl', function ($scope, $state, $ionicHistory, BASE_URL, $http) {
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

    var checked = [];

    // event when press check icon in store list
    $scope.participator_check = function (i) {
        if (typeof checked[i] == 'undefined') checked[i] = false;
        var id = 'participator' + i.toString();
        if (checked[i] == false) {
            document.getElementById(id).style.color = '#48b52d';
            //store = $scope.stores[i];            
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