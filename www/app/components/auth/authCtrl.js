/*
* 登录
* @author : kmr
* @modified : 2017/8/31
*/
app.controller('authCtrl', function ($scope, $state, $http, BASE_URL, $ionicLoading) {
    $scope.user = {
        username: '',
        password: '',
        remember: false
    };
    $scope.$on('$ionicView.enter', function (event) {
        // 自动登录
        if (localStorage.getItem('remember') == 'true') {
            var url = BASE_URL + '/auth/login';
            var data = {
                u_name: localStorage.getItem("username"),
                password: localStorage.getItem("password")                
            };            
            $http.post(url, data).then(function (res) {               
                if (res.data.success == true) {                   
                    $state.go('tab.date');
                } else {
                    alert('用户名或密码错误');
                }
            }, function (err) {
                alert('连接失败. 再试一次!');
            });
        }    
    });
    // 登录
    $scope.login = function (user) {
        // connecting spinner
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner><br>连接中...'
        });
        var url = BASE_URL + '/auth/login';        
        var data = {
            u_name: user.username,
            password: user.password           
        };
        console.log('auth/login:request', data);
        $http.post(url, data).then(function (res) {
            console.log('auth/login:response', res.data);
            if (res.data.success == true) {                
                if (user.remember == true) {
                    localStorage.setItem("remember", true);
                    localStorage.setItem("username", data.u_name);
                    localStorage.setItem("password", data.password);
                }
                $ionicLoading.hide();
                $state.go('tab.date');
            } else {
                $ionicLoading.hide();
                alert('用户名或密码错误!');
            }
        }, function (err) {
            $ionicLoading.hide();
            alert('连接失败. 再试一次!');
        });        
    };
    // 找回密码
    $scope.go_customer = function () {
        $state.go('news-customer');
    };
});