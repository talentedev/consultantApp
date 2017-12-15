/*
 * 添加沟通
 */
app.controller('perform-communicationCtrl', function ($scope, $state, $stateParams, $ionicHistory) {

    $scope.coms = [1];

    $scope.$on('$ionicView.enter', function (event) {
       
    })

    // increase a view to add inventory report
    $scope.addCom = function () {
        $scope.coms.push(1);
    }
    // go to the view to select people to communicate
    $scope.go_people = function () {
        $state.go('com-people', {
            sid: $stateParams.sid
        });
    }

    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
})