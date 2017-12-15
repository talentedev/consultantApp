/*
 * 执行巡店类行程
 */
app.controller('performCtrl', function ($scope, $state, $stateParams, $ionicHistory, BASE_URL, $http) {

    $scope.visit = {};
    var received_flag = false;

    $scope.$on('$ionicView.enter', function (event) {
        var url = BASE_URL + '/visit/get';
        var data = {
            plan_id: $stateParams.plan_id
        };
        $http.post(url, data).then(function (res) {
            $scope.visit = res.data;
            received_flag = true
        });
    })

    // submit form data.
    $scope.submit = function () {        
        var url = BASE_URL + '/visit/create';
        var data = $scope.visit;
        data.plan_id = $stateParams.plan_id;
        $http.post(url, data).then(function (res) {            
        });
    }

    $scope.go_back = function () {
        $ionicHistory.goBack();
    }

    $scope.go_field = function () {
        $state.go('perform-field', {
            store_id: $stateParams.store_id,
            store_name: $stateParams.store_name,
        });
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

    $scope.go_develop = function () {
        if(received_flag == true) {
            $state.go('perform-develop', {
                visit_id: $scope.visit.visit_id
            });
        }        
    }
    // BI Report
    $scope.go_bireport = function () {
        /*$state.go('bi-report', {
            store_id: $stateParams.store_id
        });*/
    }

    $scope.go_audit = function () {
        $state.go('perform-audit');
    }

    $scope.go_upload = function () {
        $state.go('perform-upload');
    }

    $scope.go_trip = function () {
        $state.go('perform-trip');
    }

    $scope.go_inventory = function () {
        $state.go('perform-inventory', {
            shop_code: $stateParams.shop_code,
            shop_name: $stateParams.shop_name
        });
    }

    $scope.go_sales = function () {
        $state.go('perform-sales', {
            store_id: $stateParams.store_id,
            store_name: $stateParams.store_name
        });
    }

    $scope.go_orders = function () {
        $state.go('perform-orders', {
            store_id: $stateParams.store_id,
            store_name: $stateParams.store_name,
        });
    }

    $scope.go_competing = function () {
        $state.go('perform-competing', {
            store_id: $stateParams.store_id,
            store_name: $stateParams.store_name            
        });
    }

    $scope.go_action = function () {
        $state.go('perform-action', {
            itinerary_id: $stateParams.itinerary_id
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

    $scope.go_customer = function () {
        $state.go('news-customer');
    }
});