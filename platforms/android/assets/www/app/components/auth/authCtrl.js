/*
 * the controller that manage for user authentication.
*/
app.controller('authCtrl', function ($scope, $state) {

    $scope.login = function (user) {
        console.log('Log-In', user);
        // Go to date tab if authentication is successed.
        $state.go('tab.date');
    };

});