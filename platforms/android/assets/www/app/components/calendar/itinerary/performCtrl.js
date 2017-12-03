/*
 * 执行巡店类行程
 */
app.controller('performCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
    $scope.go_field = function () {
        $state.go('perform-field');
    }
    $scope.go_analysis = function () {
        $state.go('perform-analysis');
    }
    $scope.go_storefront = function () {
        $state.go('perform-storefront');
    }
    $scope.go_store = function () {
        $state.go('store-detail');
    }
    $scope.go_develop = function () {
        $state.go('perform-develop');
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
        $state.go('perform-inventory');
    }
    $scope.go_sales = function () {
        $state.go('perform-sales');
    }
    $scope.go_orders = function () {
        $state.go('perform-orders');
    }
    $scope.go_competing = function () {
        $state.go('perform-competing');
    }
    $scope.go_action = function () {
        $state.go('perform-action');
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