/*
 * SWOT分析
 * @author : kmr    
 * @modified: 2017/8/22
 */
app.controller('perform-analysisCtrl', function ($scope, $state, $stateParams, $ionicHistory, ItineraryService, BASE_URL, $http) {
    // page init
    $scope.swot = {};
    $scope.swot.strengths = [];
    $scope.swot.weakness = [];
    $scope.swot.opportunity = [];
    $scope.swot.threats = [];

    $scope.strongths = [1];
    $scope.weaks = [1];
    $scope.opportunities = [1];
    $scope.threats = [1];
    var updateFlag = false;

    $scope.$on('$ionicView.enter', function (event) {
        $scope.shop_code = $stateParams.shop_code;
        $scope.shop_name = $stateParams.shop_name;
        var url = BASE_URL + '/visit/swot/get';
        var data = {
            sid: $stateParams.sid
        }
        console.log('visit/swot/get:request', data);
        $http.post(url, data).then(function (res) {
            console.log('visit/swot/get:response', res.data);
            $scope.strongths = [1, 1, 1];
            $scope.weaks = [1, 1, 1];
            $scope.opportunities = [1, 1, 1];
            $scope.threats = [1, 1, 1];
            $scope.swot.strengths[0] = res.data.S_selft;
            //$scope.swot.strengths[1] = res.data.S_selft1;
            // $scope.swot.strengths[2] = res.data.S_selft2;
            $scope.swot.weakness[0] = res.data.W_owner;
            // $scope.swot.weakness[1] = res.data.W_owner1;
            //$scope.swot.weakness[2] = res.data.W_owner2;
            $scope.swot.opportunity[0] = res.data.O_change;
            // $scope.swot.opportunity[1] = res.data.O_change1;
            //$scope.swot.opportunity[2] = res.data.O_change2;
            $scope.swot.threats[0] = res.data.T_danger;
            //$scope.swot.threats[1] = res.data.T_danger1;
            //$scope.swot.threats[2] = res.data.T_danger2;
            $scope.swot.increase = res.data.increase;
            updateFlag = true;
        }, function (err) {
            console.log('swot does not exist!');
            updateFlag = false;
        });
    });
    // 保存
    $scope.save = function () {
        if(updateFlag == true) {
            var url = BASE_URL + '/visit/swot/update';
        } else {
            var url = BASE_URL + '/visit/swot/add';
        }        
        var data = {
            sid       : $stateParams.sid,
            S_selft   : $scope.swot.strengths[0],
            S_selft1  : '',//$scope.swot.strengths[1],
            S_selft2  : '',//$scope.swot.strengths[2],
            W_owner   : $scope.swot.weakness[0],
            W_owner1  : '',//$scope.swot.weakness[1],
            W_owner2  : '',//$scope.swot.weakness[2],
            O_change  : $scope.swot.opportunity[0],
            O_change1 : '',//$scope.swot.opportunity[1],
            O_change2 : '',//$scope.swot.opportunity[2],
            T_danger  : $scope.swot.threats[0],
            T_danger1 : '',//$scope.swot.threats[1],
            T_danger2: '',//$scope.swot.threats[2],
            increase: $scope.swot.increase
        };
        console.log('visit/swot/add(update):request', data);
        $http.post(url, data).then(function (res) {
            console.log('visit/swot/add(update):response', res.data);
            $ionicHistory.goBack();
        });        
    }

    // 添加其它自身优势
    $scope.addStrong = function () {
        var strong = [];
        strong = $scope.strongths;
        if (strong.length < 3) {
            strong.push(1);
        }
        $scope.strongths = strong;
    }
    // 添加其它自我弱点
    $scope.addWeak = function () {
        var weaks = [];
        weaks = $scope.weaks;
        if (weaks.length < 3) {
            weaks.push(1);
        }
        $scope.weaks = weaks;
    }
    // 添加其它外部机遇
    $scope.addOpportunity = function () {
        var opportunities = [];
        opportunities = $scope.opportunities;
        if (opportunities.length < 3) {
            opportunities.push(1);
        }
        $scope.opportunities = opportunities;
    }
    // 添加其它外部威胁
    $scope.addThreat = function () {
        var threats = [];
        threats = $scope.threats;
        if (threats.length < 3) {
            threats.push(1);
        }
        $scope.threats = threats;
    }
    // 返回
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }

});