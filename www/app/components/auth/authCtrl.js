/*
 * the controller to manage for user authentication.
*/
app.controller('authCtrl', function ($scope, $state, $http, BASE_URL) {     
        
    $scope.user = {
        username: '',
        password: '',
        remember: false
    }

    $scope.login = function (user) {
        
        // Go to date tab if authentication is successed.
        var url = BASE_URL + '/auth/login';        
        var data = {
            u_name: user.username,
            password: user.password,
            //remember: user.remember
        };
        /*if (data.name != '' && data.password != '' && data.remember == true) {
            localStorage.setItem("username", data.name);
            localStorage.setItem("password", data.password);
        }    */    
        $http.post(url, data).then(function (res) {
            console.log(res.data);
            if (res.data.success == true) {
                $state.go('tab.date');
            } else {
                alert('Incorrect password or username');
            }
        }, function (err) {
            alert('connection faild!');
        });
        //$state.go('tab.date');
    };

    $scope.go_customer = function () {
        $state.go('news-customer');
    };
});