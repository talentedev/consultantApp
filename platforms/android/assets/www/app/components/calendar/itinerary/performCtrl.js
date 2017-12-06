/*
 * 执行巡店类行程
 */
app.controller('performCtrl', function ($scope, $state, $stateParams, $ionicHistory) {

    $scope.$on('$ionicView.enter', function (event) {
        $scope.itinerary = {};
    })

    // submit form data.
    $scope.submit = function (itinerary) {
        console.log(itinerary);
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
            store_id: $stateParams.store_id,
            store_name: $stateParams.store_name
        });
    }

    $scope.go_storefront = function () {
        $state.go('perform-storefront', {
            store_id: $stateParams.store_id,
            store_name: $stateParams.store_name
        });
    }

    $scope.go_store = function () {
        $state.go('store-detail', {
            store_id: $stateParams.store_id,
            store_name: $stateParams.store_name,
            store_shortname: $stateParams.store_shortname
        });
    }

    $scope.go_develop = function () {
        $state.go('perform-develop', {
            store_id: $stateParams.store_id,
            itinerary_id: $stateParams.itinerary_id
        });
    }
    // BI Report
    $scope.go_bireport = function () {
        $state.go('bi-report', {
            store_id: $stateParams.store_id
        });
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
            store_id: $stateParams.store_id,
            store_name: $stateParams.store_name,
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
        $state.go('perform-communication');
    }

    $scope.go_training = function () {
        $state.go('perform-training');
    }

    $scope.go_customer = function () {
        $state.go('news-customer');
    }
});