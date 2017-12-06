/*
 * the controller to manage for user authentication.
*/
app.controller('authCtrl', function ($scope, $state, $http, BASE_URL) {     

    $scope.user = {
        username: '',
        password: ''
    }

    $scope.login = function (user) {
        
        // Go to date tab if authentication is successed.
        var url = BASE_URL + '/auth/login';        
        var data = {
            name: user.username,
            password: user.password,
            remember: user.remember
        };               
       
        $http.post(url, data).then(function (res) {            
            if (res.data.success == true) {
                $state.go('tab.date');
            } else {
                console.log('Incorrect password or username');
            }
        }, function (err) {
            console.log('connection faild!');
        });
                
    };

    $scope.go_customer = function () {
        $state.go('news-customer');
    };
});