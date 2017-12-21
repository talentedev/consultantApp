/*
 * 消息
 * @author : kmr
 * @modified : 2017/8/26
 */
app.controller('newsCtrl', function ($scope, $state, $http, BASE_URL, TripService) {
    $scope.announcement = {};
    $scope.doc = {};
    $scope.tommorow = {};
    $scope.today = {};

    $scope.$on('$ionicView.enter', function (event) {
        // 公告
        var url = BASE_URL + '/posts/list';
        $http.get(url).then(function (res) {
            console.log('posts/list:response', res.data)
            var date = new Date(res.data[0].dateover);               
            $scope.announcement.month = date.getMonth() + 1;
            $scope.announcement.day = date.getDate();
            $scope.announcement.content = res.data[0].content;
        }, function (err) {
            //alert('失败!');
        });
        // 文件动态
        url = BASE_URL + '/docs/list';
        var data = {
            filetype: '月沟通文件'
        }
        console.log('docs/list:request', data);
        $http.post(url, data).then(function (res) {
            console.log('docs/list:response', res.data);
            var date = new Date(res.data[0].filedate);
            $scope.doc.month = date.getMonth() + 1;
            $scope.doc.day = date.getDate();
            $scope.doc.content = res.data[0].file_explain;
        });
        // 明日计划
        var today = new Date();
        $scope.today.month = today.getMonth() + 1;
        $scope.today.day = today.getDate();
        $scope.tommorow.month = today.getMonth() + 1;
        $scope.tommorow.day = today.getDate() + 1;
        url = BASE_URL + '/plan/list';
        today.setDate(today.getDate() + 1);
        var data = {
            date: today
        };
        console.log('plan/list:request', data);
        $http.post(url, data).then(function (res) {
            console.log('plan/list:response', res.data);
            var data = res.data;           
            $scope.plantype = data[0].plantype_name;           
            $scope.shop = data[0].shop_name;
        });
        // 跟踪提醒
        url = BASE_URL + '/track/list';        
        $http.get(url).then(function (res) {
            console.log('track/list:response', res.data);
            $scope.trackCount = res.data.length;
        }, function (err) {
            //alert('失败!');
        });
    });
    // 公告
    $scope.go_announcement = function () {
        $state.go('news-announcement');
    };
    // 文件动态
    $scope.go_dynamic = function () {
        $state.go('news-dynamic');
    };
    // 明日计划
    $scope.go_tabdate = function () {
        var today = new Date();
        today.setDate(today.getDate() + 1);
        TripService.setDate(today);
        $state.go('tab.date');
    };
    // 跟踪提醒
    $scope.go_tracking = function () {
        $state.go('news-tracking', {
            mem_id: $scope.mem_id
        });
    };
    // 雷瑞客服
    $scope.go_customer = function () {
        $state.go('news-customer')
    };
});