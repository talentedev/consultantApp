/*
 * 执行巡店类行程
 * @author : kmr
 * @modified : 2017/9/5
 */
app.controller('performCtrl', function ($scope, $state, $stateParams, $ionicHistory, BASE_URL, $http) {
    // page init
    $scope.visit = {};
    var received_flag = false;
    $scope.arrive_flag = '到店签到';
    $scope.leave_flag = '离店签退';

    $scope.$on('$ionicView.enter', function (event) {
        var url = BASE_URL + '/visit/get';
        var data = {
            plan_id: $stateParams.plan_id
        };
        console.log('visit/get:request', data);
        $http.post(url, data).then(function (res) {
            console.log('visit/get:response', res.data);
            $scope.visit = res.data;
            received_flag = true;
            $scope.visit_id = res.data.visit_id;
            if (res.data.arrive_position != null) {
                $scope.arrive_flag = '已签到';
            }
            if (res.data.leave_position != null) {
                $scope.leave_flag = '已签退';
            }
        }, function (err) {
            console.log('visit is not exist!');
            var url = BASE_URL + '/visit/create';            
            var data = $scope.visit;
            data.plan_id = $stateParams.plan_id;
            console.log('visit/create:request', data);
            $http.post(url, data).then(function (res) {
                console.log('visit/create:response', data);
                var url = BASE_URL + '/visit/get';
                var data = {
                    plan_id: $stateParams.plan_id
                };
                $http.post(url, data).then(function (res) {
                    console.log('visit/get:response', res.data);
                    $scope.visit = res.data;
                    received_flag = true;
                    $scope.visit_id = res.data.visit_id;
                    if (res.data.arrive_position != null) {
                        $scope.arrive_flag = '已签到';
                    }
                    if (res.data.leave_position != null) {
                        $scope.leave_flag = '已签退';
                    }
                });
            });
        });
    });
    // 提交
    $scope.submit = function () {
        var url = BASE_URL + '/visit/update';      
        var data = $scope.visit;
        data.plan_id = $stateParams.plan_id;
        console.log('visit/update:request', data);
        $http.post(url, data).then(function (res) {
            console.log('visit/update:response', data);
        });
    };
    // 返回
    $scope.go_back = function () {
        $ionicHistory.goBack();
    };
    // 到店签到 / 离店签退
    $scope.go_field = function (type) {
        if (received_flag == true) {
            $state.go('perform-arrive', {
                sid: $stateParams.sid,
                shop_name: $stateParams.shop_name,
                visit_id: $scope.visit_id,
                type: type
            });
        }
    };
    // SWOT分析
    $scope.go_analysis = function () {
        $state.go('perform-analysis', {
            sid: $stateParams.sid,
            shop_code: $stateParams.shop_code,
            shop_name: $stateParams.shop_name
        });
    };
    // 店面年度工作计划
    $scope.go_storefront = function () {
        $state.go('perform-storefront', {
            sid: $stateParams.sid,
            shop_code: $stateParams.shop_code,
            shop_name: $stateParams.shop_name
        });
    };
    // 单店基本信息
    $scope.go_store = function () {
        $state.go('store-detail', {
            sid: $stateParams.sid,
            shop_code: $stateParams.shop_code
        });
    };
    // 评估记录
    $scope.goEvaluation = function () {
        if (received_flag == true) {
            $state.go('evaluation', {
                sid: $stateParams.sid,
                visit_id: $scope.visit_id
            });
        }
    };
    // 行动计划及草案制定
    $scope.go_develop = function () {
        if (received_flag == true) {
            $state.go('perform-develop', {
                sid: $stateParams.sid,
                visit_id: $scope.visit_id
            });
        }
    };
    // BI Report
    $scope.go_bireport = function () {
        /*$state.go('bi-report', {
            store_id: $stateParams.store_id
        });*/
    };
    // 驰加审计结果
    $scope.go_audit = function () {
        if (received_flag == true) {
            $state.go('perform-audit', {
                sid: $stateParams.sid,
                type: 'add',
                data: null
            });
        }
    };
    // 拍照上传
    $scope.go_upload = function () {
        if (received_flag == true) {
            $state.go('perform-upload', {
                sid: $stateParams.sid,
                shop_code: $stateParams.shop_code,
                shop_name: $stateParams.shop_name,
                visit_id: $scope.visit_id
            });
        }
    };
    // 观察
    $scope.go_trip = function () {
        if (received_flag == true) {
            $state.go('perform-trip', {
                visit_id: $scope.visit_id
            });
        }
    };
    // 库存上报
    $scope.go_inventory = function () {
        if (received_flag == true) {
            $state.go('perform-inventory', {
                shop_code: $stateParams.shop_code,
                shop_name: $stateParams.shop_name,
                visit_id: $scope.visit_id
            });
        }
    };
    // 销量上报
    $scope.go_sales = function () {
        if (received_flag == true) {
            $state.go('perform-sales', {
                shop_code: $stateParams.shop_code,
                shop_name: $stateParams.shop_name,
                visit_id: $scope.visit_id
            });
        }
    };
    // 订单上报
    $scope.go_orders = function () {
        if (received_flag == true) {
            $state.go('perform-orders', {
                shop_code: $stateParams.shop_code,
                shop_name: $stateParams.shop_name,
                visit_id: $scope.visit_id
            });
        }
    };
    // 竞品上报
    $scope.go_competing = function () {
        if (received_flag == true) {
            $state.go('perform-competing', {
                shop_code: $stateParams.shop_code,
                shop_name: $stateParams.shop_name,
                visit_id: $scope.visit_id
            });
        }
    };
    // 行动计划回顾
    $scope.go_action = function () {
        if (received_flag == true) {
            $state.go('perform-action', {
                sid: $stateParams.sid,
                visit_id: $scope.visit_id
            });
        }
    };
    // 沟通
    $scope.go_communication = function () {
        if (received_flag == true) {
            $state.go('perform-communication', {
                sid: $stateParams.sid,
                visit_id: $scope.visit_id
            });
        }
    };
    // 培训辅导
    $scope.go_training = function () {
        $state.go('perform-training');
    };
    // 添加总结项
    $scope.addSummaryItem = function () {
        $state.go('add-summary-item', {
            sid: $stateParams.sid,
            visit_id: $scope.visit_id
        });
    };
    // 跟踪提醒
    $scope.track = function () {
        if (received_flag == true) {
            $state.go('news-tracking', {
                visit_id: $scope.visit_id
            });
        }
    };
    // Done
    $scope.done = function () {
        var url = BASE_URL + '/plan/done';
        var data = {
            plan_id: $stateParams.plan_id
        };
        console.log('plan/done:request', data);
        $http.post(url, data).then(function (res) {
            console.log('plan/done:response', res.data);
        });
    };
});