/*
 * This file define routes to use for app.
 */
app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    /*********************************/
    /*  登录                         */
    /*********************************/
    .state('login', {
        url: '/login',
        templateUrl: 'app/components/auth/login.html',
        controller: 'authCtrl'
    })

    /*********************************/
    /*  Tabs                         */
    /*********************************/
    // setup an abstract state for the tabs directive
    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'app/shared/tabs.html'
    })

    /*********************************/
    /*  消息                         */
    /*********************************/
    .state('tab.news', {
        url: '/news',
        views: {
            'tab-news': {
                templateUrl: 'app/components/news/tab-news.html',
                controller: 'newsCtrl'
            }
        }
    })

    // 公告
    .state('news-announcement', {
        url: '/news-announcement',
        templateUrl: 'app/components/news-announcement/news-announcement.html',
        controller: 'news-announcementCtrl'
    })
    // 企业网盘
    .state('news-dynamic', {
        url: '/news-dynamic',
        templateUrl: 'app/components/news-dynamic/news-dynamic.html',
        controller: 'news-dynamicCtrl'
    })
    // 月度沟通文件
    .state('news-dynamic-detail', {
        url: '/news-dynamic-detail',
        templateUrl: 'app/components/news-dynamic/dynamic-detail/news-dynamic-detail.html',
        controller: 'news-dynamic-detailCtrl'
    })
    // Weekly communication Week -30
    .state('news-dynamic-detail-pptx', {
        url: '/news-dynamic-detail-pptx',
        templateUrl: 'app/components/news-dynamic/dynamic-pptx/news-dynamic-detail-pptx.html',
        controller: 'news-dynamic-detail-pptxCtrl'
    })
    // 跟踪提醒
    .state('news-tracking', {
        url: '/news-tracking',
        templateUrl: 'app/components/news-tracking/news-tracking.html',
        controller: 'news-trackingCtrl',
        params: {
            mem_id: null
        }
    })
    // 客服
    .state('news-customer', {
        url: '/news-customer',
        templateUrl: 'app/components/news-customer/news-customer.html',
        controller: 'news-customerCtrl'
    })

    /*********************************/
    /*  自我管理                      */
    /*********************************/
    .state('tab.manage', {
        url: '/manage',
        views: {
            'tab-manage': {
                templateUrl: 'app/components/management/tab-manage.html',
                controller: 'manageCtrl'
            }
        }
    })

    /*********************************/
    /*  日历                         */
    /*********************************/
    .state('tab.date', {
        url: '/date',
        views: {
            'tab-date': {
                templateUrl: 'app/components/calendar/tab-date.html',
                controller: 'dateCtrl'
            }
        }
    })

    // 添加行程
    .state('trip', {
        url: '/trip',
        templateUrl: 'app/components/calendar/trip/trip.html',
        controller: 'tripCtrl'
    })

    // 选择行程类型
    .state('trip-type', {
        url: '/trip-type',
        templateUrl: 'app/components/calendar/trip/trip-type.html',
        controller: 'trip-typeCtrl'
    })

    // 选择成员(only)
    .state('trip-duty', {
        url: '/trip-duty',
        templateUrl: 'app/components/calendar/trip/trip-duty.html',
        controller: 'trip-dutyCtrl'
    })

    // 选择成员(multi)
    .state('trip-participator', {
        url: '/trip-participator',
        templateUrl: 'app/components/calendar/trip/trip-participator.html',
        controller: 'trip-participatorCtrl'
    })

    // 选择门店
    .state('trip-store', {
        url: '/trip-store',
        templateUrl: 'app/components/calendar/trip/trip-store.html',
        controller: 'trip-storeCtrl'
    })

    // 执行巡店类行程
    .state('perform', {
        url: '/perform',
        templateUrl: 'app/components/calendar/itinerary/perform.html',
        controller: 'performCtrl',
        params: {
            store_id: null,
            store_name: '',
            store_shortname: '',
            itinerary_id: null
        }
    })

    // 外勤签到
    .state('perform-field', {
        url: '/perform-field',
        templateUrl: 'app/components/calendar/itinerary/perform-map.html',
        controller: 'perform-mapCtrl',
        params: {
            store_id: null,
            store_name: ''           
        }
    })

    // SWOT分析
    .state('perform-analysis', {
        url: '/perform-analysis',
        templateUrl: 'app/components/calendar/itinerary/perform-analysis.html',
        controller: 'perform-analysisCtrl',
        params: {
            store_id: null,
            store_name: ''
        }
    })

    // 店面年度工作计划
    .state('perform-storefront', {
        url: '/perform-storefront',
        templateUrl: 'app/components/calendar/itinerary/perform-storefront.html',
        controller: 'perform-storefrontCtrl',
        params: {
            store_id: null,
            store_name: ''
        }
    })

    // 添加行动计划及草案制定
    .state('perform-develop', {
        url: '/perform-develop',
        templateUrl: 'app/components/calendar/itinerary/perform-develop.html',
        controller: 'perform-developCtrl',
        params: {
            store_id: null,
            itinerary_id: null
        }
    })

    // 选择店面人员
    .state('action-executor', {
        url: '/action-executor',
        templateUrl: 'app/components/calendar/itinerary/action-executor.html',
        controller: 'action-executorCtrl',
        params: {
            store_id: null
        }
    })

    // BI Report
    .state('bi-report', {
        url: '/bi-report',
        templateUrl: 'app/components/calendar/itinerary/bi-report.html',
        controller: 'bi-reportCtrl',
        params: {
            store_id: null
        }
    })

    // 驰加审计结果
    .state('perform-audit', {
        url: '/perform-audit',
        templateUrl: 'app/components/calendar/itinerary/perform-audit.html',
        controller: 'perform-auditCtrl'
    })

    // 拍照上传
    .state('perform-upload', {
        url: '/perform-upload',
        templateUrl: 'app/components/calendar/itinerary/perform-upload.html',
        controller: 'perform-uploadCtrl'
    })

    // Camera
    .state('perform-camera', {
        url: '/perform-camera',
        templateUrl: 'app/components/calendar/itinerary/perform-camera.html',
        controller: 'perform-cameraCtrl'
    })

    // 添加行程
    .state('perform-trip', {
        url: '/perform-trip',
        templateUrl: 'app/components/calendar/itinerary/perform-trip.html',
        controller: 'perform-tripCtrl'
    })

    // 库存上报
    .state('perform-inventory', {
        url: '/perform-inventory',
        templateUrl: 'app/components/calendar/itinerary/data/perform-inventory.html',
        controller: 'perform-inventoryCtrl',
        params: {
            store_id: null,
            store_name: ''
        }
    })

    // 销量上报
    .state('perform-sales', {
        url: '/perform-sales',
        templateUrl: 'app/components/calendar/itinerary/data/perform-sales.html',
        controller: 'perform-salesCtrl',
        params: {
            store_id: null,
            store_name: ''
        }
    })

    // 订单上报
    .state('perform-orders', {
        url: '/perform-orders',
        templateUrl: 'app/components/calendar/itinerary/data/perform-orders.html',
        controller: 'perform-ordersCtrl',
        params: {
            store_id: null,
            store_name: ''
        }
    })

    // 竞品上报
    .state('perform-competing', {
        url: '/perform-competing',
        templateUrl: 'app/components/calendar/itinerary/data/perform-competing.html',
        controller: 'perform-competingCtrl',
        params: {
            store_id: null,
            store_name: ''
        }
    })

    // 添加/查看/修改行动计划
    .state('perform-action', {
        url: '/perform-action',
        templateUrl: 'app/components/calendar/itinerary/perform-action.html',
        controller: 'perform-actionCtrl',
        params: {
            itinerary_id: null
        }
    })

    // 添加沟通
    .state('perform-communication', {
        url: '/perform-communication',
        templateUrl: 'app/components/calendar/itinerary/perform-communication.html',
        controller: 'perform-communicationCtrl'
    })

    // 路途
    .state('road', {
        url: '/road',
        templateUrl: 'app/components/calendar/itinerary/road.html',
        controller: 'roadCtrl'
    })

    /*********************************/
    /*  门店                         */
    /*********************************/
    .state('tab.store', {
        url: '/store',
        views: {
            'tab-store': {
                templateUrl: 'app/components/stores/tab-store.html',
                controller: 'storeCtrl'
            }
        }
    })

    // 添加/修改门店
    .state('store-detail', {
        url: '/store-detail',
        templateUrl: 'app/components/stores/store-detail.html',
        controller: 'store-detailCtrl',
        params: {
            store_id: null,
            store_name: '',
            store_shortname: ''
        }
    })

    // 查看店面人员信息
    .state('store-manager', {
        url: '/store-manager',
        templateUrl: 'app/components/stores/store-manager.html',
        controller: 'store-managerCtrl'
    })

    /*********************************/
    /*  我的                         */
    /*********************************/
    .state('tab.self', {
        url: '/self',
        views: {
            'tab-self': {
                templateUrl: 'app/components/mine/tab-self.html',
                controller: 'selfCtrl'
            }
        }
    })

     // 个人信息
    .state('self-personal', {
        url: '/self-personal',
        templateUrl: 'app/components/mine/self-personal.html',
        controller: 'self-personalCtrl'
    });   

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
});
