/*
 * 月度沟通文件
 * @author : kmr
 * @modified : 2017/8/26
 */
app.controller('news-dynamic-detailCtrl', function ($scope, $state, $stateParams, $ionicHistory, $http, BASE_URL) {
    $scope.docs = {};

    $scope.$on('$ionicView.enter', function (event) {
        var url = BASE_URL + '/docs/list';
        var data = {
            filetype: $stateParams.type
        }
        console.log('docs/list:request', data);
        $http.post(url, data).then(function (res) {
            console.log('docs/list:response', res.data);
            $scope.docs = res.data;
            $scope.fileCount = res.data.length;
        });
    });
    // back
    $scope.go_back = function () {
        $ionicHistory.goBack();
    };
    $scope.go_detail = function (item) {
        $state.go('news-dynamic-detail-pptx', {
            fileinfo: item 
        })
    };
    $scope.sort = function () {
        $scope.docs.sort(compare);
    };
    var compare = function (a, b) {
        if (a.filename < b.filename)
            return -1;
        if (a.filename > b.filename)
            return 1;
        return 0;
    };
});