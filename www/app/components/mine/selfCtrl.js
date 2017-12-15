/*
 * the controller that manage self data
 */

app.controller('selfCtrl', function ($scope, $state, $http, BASE_URL, $ionicHistory) {

    $scope.go_back = function () {
        $ionicHistory.goBack();
    }

    $scope.go_information = function () {
        $state.go('self-personal')
    }

    $scope.logout = function () {
        var url = BASE_URL + '/auth/logout';
        $http.get(url).then(function (res) {
            $state.go('login')
        });        
    }

});