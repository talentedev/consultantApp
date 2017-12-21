/*
 * 执行巡店类行程
 * @author : kmr
 * @modified : 201/8/23
 */
app.controller('performCtrl', function ($scope, $state, $stateParams, $ionicHistory, BASE_URL, $http) {
    // page init
    $scope.visit = {};
    var received_flag = false;
    var update_flag = false;

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
            update_flag = false;
            $scope.visit_id = res.data.visit_id;
        }, function (err) {
            console.log('visit is not exist!');
            update_flag = true;
        });
    })

    // submit form data.
    $scope.submit = function () {
        if(update_flag == false) {
            var url = BASE_URL + '/visit/update';
        } else {
            var url = BASE_URL + '/visit/create';
        }
        var data = $scope.visit;        
        data.plan_id = $stateParams.plan_id;
        console.log('visit/creare:request', data);
        $http.post(url, data).then(function (res) {
            console.log('visit/creare:response', data);
        });
    }

    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
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
    }

    $scope.go_analysis = function () {
        $state.go('perform-analysis', {
            sid       : $stateParams.sid,
            shop_code : $stateParams.shop_code,
            shop_name : $stateParams.shop_name
        });
    }

    $scope.go_storefront = function () {
        $state.go('perform-storefront', {
            sid: $stateParams.sid,
            shop_code: $stateParams.shop_code,
            shop_name: $stateParams.shop_name
        });
    }

    $scope.go_store = function () {
        $state.go('store-detail', {
            sid: $stateParams.sid,
            shop_code: $stateParams.shop_code
        });
    }
    // 评估记录
    $scope.goEvaluation = function () {
        $state.go('evaluation', {
            sid: $stateParams.sid,
        });
    }
    // 行动计划及草案制定
    $scope.go_develop = function () {
        if(received_flag == true) {
            $state.go('perform-develop', {
                sid: $stateParams.sid,
                visit_id: $scope.visit_id
            });
        }        
    }
    // BI Report
    $scope.go_bireport = function () {
        /*$state.go('bi-report', {
            store_id: $stateParams.store_id
        });*/
    }
    // 驰加审计结果
    $scope.go_audit = function () {
        if (received_flag == true) {
            $state.go('perform-audit', {
                sid: $stateParams.sid,
                type: 'add',
                data: null
            });
        }       
    }
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
    }
    // 观察
    $scope.go_trip = function () {
        $state.go('perform-trip');
    }
    // 库存上报
    $scope.go_inventory = function () {
        if (received_flag == true) {
            $state.go('perform-inventory', {
                shop_code: $stateParams.shop_code,
                shop_name: $stateParams.shop_name,
                visit_id: $scope.visit_id
            });
        }        
    }
    // 销量上报
    $scope.go_sales = function () {
        if (received_flag == true) {
            $state.go('perform-sales', {
                shop_code: $stateParams.shop_code,
                shop_name: $stateParams.shop_name,
                visit_id: $scope.visit_id
            });
        }       
    }
    // 订单上报
    $scope.go_orders = function () {
        if (received_flag == true) {
            $state.go('perform-orders', {
                shop_code: $stateParams.shop_code,
                shop_name: $stateParams.shop_name,
                visit_id: $scope.visit_id
            });
        }       
    }
    // 竞品上报
    $scope.go_competing = function () {
        if (received_flag == true) {
            $state.go('perform-competing', {
                shop_code: $stateParams.shop_code,
                shop_name: $stateParams.shop_name,
                visit_id: $scope.visit_id
            });
        }        
    }
    // 行动计划回顾
    $scope.go_action = function () {
        $state.go('perform-action', {
            visit_id: $scope.visit_id
        });
    }

    $scope.go_communication = function () {
        $state.go('perform-communication', {
            sid: $scope.visit.sid
        });
    }

    $scope.go_training = function () {
        $state.go('perform-training');
    }
    // 添加总结项
    $scope.addSummaryItem = function () {
        $state.go('add-summary-item', {
            sid: $stateParams.sid,
            visit_id: $scope.visit_id
        });
    }
    // 跟踪提醒
    $scope.track = function () {
        if (received_flag == true) {
            $state.go('news-tracking', {
                visit_id: $scope.visit_id
            });
        }
    };

    $scope.go_customer = function () {
        $state.go('news-customer');
    }
});