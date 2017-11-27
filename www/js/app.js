// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ctApp', ['ionic', 'ctApp.controllers', 'ctApp.services', 'ng-fusioncharts'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (cordova.platformId === "ios" && window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
$stateProvider
//login page
.state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
})
// setup an abstract state for the tabs directive
.state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
})
/*消息*/
.state('tab.news', {
    url: '/news',
    views: {
        'tab-news': {
            templateUrl: 'templates/tab-news.html',
            controller: 'newsCtrl'
        }
    }
})
/*自我管理*/
.state('tab.manage', {
    url: '/manage',
    views: {
        'tab-manage': {
            templateUrl: 'templates/tab-manage.html',
            controller: 'manageCtrl'
        }
    }
})
/*日历*/
.state('tab.date', {
    url: '/date',
    views: {
        'tab-date': {
            templateUrl: 'templates/tab-date.html',
            controller: 'dateCtrl'
        }
    }
})
/*门店*/
.state('tab.store', {
    url: '/store',
    views: {
        'tab-store': {
            templateUrl: 'templates/tab-store.html',
            controller: 'storeCtrl'
        }
    }
})
/*我的*/
.state('tab.self', {
    url: '/self',
    views: {
        'tab-self': {
            templateUrl: 'templates/tab-self.html',
            controller: 'selfCtrl'
        }
    }
})
/*公告*/
.state('news-announcement', {
    url: '/news-announcement',
    templateUrl: 'templates/news-announcement.html',
    controller: 'news-announcementCtrl'
})
/*企业网盘*/
.state('news-dynamic', {
    url: '/news-dynamic',
    templateUrl: 'templates/news-dynamic.html',
    controller: 'news-dynamicCtrl'
})
/*月度沟通文件*/
.state('news-dynamic-detail', {
    url: '/news-dynamic-detail',
    templateUrl: 'templates/news-dynamic-detail.html',
    controller: 'news-dynamic-detailCtrl'
})
/*月度沟通文件*/
.state('news-dynamic-detail-pptx', {
    url: '/news-dynamic-detail-pptx',
    templateUrl: 'templates/news-dynamic-detail-pptx.html',
    controller: 'news-dynamic-detail-pptxCtrl'
})
/*跟踪提醒*/
.state('news-tracking', {
    url: '/news-tracking',
    templateUrl: 'templates/news-tracking.html',
    controller: 'news-trackingCtrl'
})
/*客服*/
.state('news-customer', {
    url: '/news-customer',
    templateUrl: 'templates/news-customer.html',
    controller: 'news-customerCtrl'
})
/*添加/修改门店*/
.state('store-detail', {
    url: '/store-detail',
    templateUrl: 'templates/store-detail.html',
    controller: 'store-detailCtrl'
})
/*查看店面人员信息*/
.state('store-manager', {
    url: '/store-manager',
    templateUrl: 'templates/store-manager.html',
    controller: 'store-managerCtrl'
})
/*个人信息*/
.state('self-personal', {
    url: '/self-personal',
    templateUrl: 'templates/self-personal.html',
    controller: 'self-personalCtrl'
})
/*执行巡店类行程*/
.state('perform', {
    url: '/perform',
    templateUrl: 'templates/perform.html',
    controller: 'performCtrl'
})
/*外勤签到*/
.state('perform-field', {
    url: '/perform-field',
    templateUrl: 'templates/perform-field.html',
    controller: 'perform-fieldCtrl'
})
/*SWOT分析*/
.state('perform-analysis', {
    url: '/perform-analysis',
    templateUrl: 'templates/perform-analysis.html',
    controller: 'perform-analysisCtrl'
})
/*店面年度工作计划*/
.state('perform-storefront', {
    url: '/perform-storefront',
    templateUrl: 'templates/perform-storefront.html',
    controller: 'perform-storefrontCtrl'
})
/*添加行动计划及草案制定*/
.state('perform-develop', {
    url: '/perform-develop',
    templateUrl: 'templates/perform-develop.html',
    controller: 'perform-developCtrl'
})
/*驰加审计结果*/
.state('perform-audit', {
    url: '/perform-audit',
    templateUrl: 'templates/perform-audit.html',
    controller: 'perform-auditCtrl'
})
/*拍照上传*/
.state('perform-upload', {
    url: '/perform-upload',
    templateUrl: 'templates/perform-upload.html',
    controller: 'perform-uploadCtrl'
})
/*Camera*/
.state('perform-camera', {
    url: '/perform-camera',
    templateUrl: 'templates/perform-camera.html',
    controller: 'perform-cameraCtrl'
})
/*添加行程*/
.state('perform-trip', {
    url: '/perform-trip',
    templateUrl: 'templates/perform-trip.html',
    controller: 'perform-tripCtrl'
})
/*库存上报*/
.state('perform-inventory', {
    url: '/perform-inventory',
    templateUrl: 'templates/perform-inventory.html',
    controller: 'perform-inventoryCtrl'
})
/*销量上报*/
.state('perform-sales', {
    url: '/perform-sales',
    templateUrl: 'templates/perform-sales.html',
    controller: 'perform-salesCtrl'
})
/*订单上报*/
.state('perform-orders', {
    url: '/perform-orders',
    templateUrl: 'templates/perform-orders.html',
    controller: 'perform-ordersCtrl'
})
/*竞品上报*/
.state('perform-competing', {
    url: '/perform-competing',
    templateUrl: 'templates/perform-competing.html',
    controller: 'perform-competingCtrl'
})
/*添加/查看/修改行动计划*/
.state('perform-action', {
    url: '/perform-action',
    templateUrl: 'templates/perform-action.html',
    controller: 'perform-actionCtrl'
})
/*添加沟通*/
.state('perform-communication', {
    url: '/perform-communication',
    templateUrl: 'templates/perform-communication.html',
    controller: 'perform-communicationCtrl'
})
/*路途*/
.state('road', {
    url: '/road',
    templateUrl: 'templates/road.html',
    controller: 'roadCtrl'
})
/*添加行程*/
.state('trip', {
    url: '/trip',
    templateUrl: 'templates/trip.html',
    controller: 'tripCtrl'
})
/*选择行程类型*/
.state('trip-type', {
    url: '/trip-type',
    templateUrl: 'templates/trip-type.html',
    controller: 'trip-typeCtrl'
})
/*选择成员*/
.state('trip-select', {
    url: '/trip-select',
    templateUrl: 'templates/trip-select.html',
    controller: 'trip-selectCtrl'
})
/*选择门店*/
.state('trip-store', {
    url: '/trip-store',
    templateUrl: 'templates/trip-store.html',
    controller: 'trip-storeCtrl'
})

    // if none of the above states are matched, use this as the fallback
$urlRouterProvider.otherwise('/login');

});