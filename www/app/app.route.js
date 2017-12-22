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
        ontroller: 'authCtrl'
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
        controller: 'news-dynamic-detailCtrl',
        params: {
            type: ''
        }
    })
    // Weekly communication Week -30
    .state('news-dynamic-detail-pptx', {
        url: '/news-dynamic-detail-pptx',
        templateUrl: 'app/components/news-dynamic/dynamic-pptx/news-dynamic-detail-pptx.html',
        controller: 'news-dynamic-detail-pptxCtrl', 
        params: {
            fileinfo: null
        }
    })
    // 跟踪提醒
    .state('news-tracking', {
        url: '/news-tracking',
        templateUrl: 'app/components/news-tracking/news-tracking.html',
        controller: 'news-trackingCtrl',
        params: {
            visit_id: null
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
            sid: null,
            plan_id: null,
            shop_code: '',
            shop_name: ''
        }
    })
    // 到店签到
    .state('perform-arrive', {
        url: '/perform-arrive',
        templateUrl: 'app/components/calendar/itinerary/perform-map.html',
        controller: 'perform-mapCtrl',
        params: {
            sid: null,           
            shop_name: '',
            visit_id: null,
            type: ''
        }
    })
    // SWOT分析
    .state('perform-analysis', {
        url: '/perform-analysis',
        templateUrl: 'app/components/calendar/itinerary/perform-analysis.html',
        controller: 'perform-analysisCtrl',
        params: {
            sid: null,
            shop_code: null,
            shop_name: ''
        }
    })
    // 店面年度工作计划
    .state('perform-storefront', {
        url: '/perform-storefront',
        templateUrl: 'app/components/calendar/itinerary/perform-storefront.html',
        controller: 'perform-storefrontCtrl',
        params: {
            sid: null,
            shop_code: null,
            shop_name: ''
        }
    })
    // 添加行动计划及草案制定
    .state('perform-develop', {
        url: '/perform-develop',
        templateUrl: 'app/components/calendar/itinerary/perform-develop.html',
        controller: 'perform-developCtrl',
        params: {
            visit_id: null,
            sid: null
        }
    })
    // 选择店面人员
    .state('action-executor', {
        url: '/action-executor',
        templateUrl: 'app/components/calendar/itinerary/action-executor.html',
        controller: 'action-executorCtrl',
        params: {
            sid: null
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
    // 评估记录
    .state('evaluation', {
        url: '/evaluation',
        templateUrl: 'app/components/calendar/itinerary/evaluation.html',
        controller: 'evaluationCtrl',
        params: {
            sid: null,
            visit_id: null
        }
    })
    // 驰加审计结果
    .state('perform-audit', {
        url: '/perform-audit',
        templateUrl: 'app/components/calendar/itinerary/perform-audit.html',
        controller: 'perform-auditCtrl',
        params: {
            sid: null,
            type: 'add',
            data: null
        }
    })
    // 驰加审计结果统计
    .state('audit-list', {
        url: '/audit-list',
        templateUrl: 'app/components/calendar/itinerary/audit-list.html',
        controller: 'audit-listCtrl',
        params: {
            sid: null            
        }
    })
    // 拍照上传
    .state('perform-upload', {
        url: '/perform-upload',
        templateUrl: 'app/components/calendar/itinerary/perform-upload.html',
        controller: 'perform-uploadCtrl',
        params: {
            sid: null,
            shop_code: '',
            shop_name: '',
            visit_id: null
        }
    })
    // Camera
    .state('perform-camera', {
        url: '/perform-camera',
        templateUrl: 'app/components/calendar/itinerary/perform-camera.html',
        controller: 'perform-cameraCtrl'
    })
    // 观察
    .state('perform-trip', {
        url: '/perform-trip',
        templateUrl: 'app/components/calendar/itinerary/perform-trip.html',
        controller: 'perform-tripCtrl',
        params: {
            visit_id: null
        }
    })
    // 库存上报
    .state('perform-inventory', {
        url: '/perform-inventory',
        templateUrl: 'app/components/calendar/itinerary/data/perform-inventory.html',
        controller: 'perform-inventoryCtrl',
        params: {
            shop_code: null,
            shop_name: '',
            visit_id: null
        }
    })
    // 库存统计
    .state('inventory-list', {
        url: '/inventory-list',
        templateUrl: 'app/components/calendar/itinerary/data/inventory-list.html',
        controller: 'inventory-listCtrl',
        params: {
            shop_code: null,
            visit_id: null
        }
    })
    // 销量上报
    .state('perform-sales', {
        url: '/perform-sales',
        templateUrl: 'app/components/calendar/itinerary/data/perform-sales.html',
        controller: 'perform-salesCtrl',
        params: {
            shop_code: null,
            shop_name: '',
            visit_id: null
        }
    })
    // 销量统计
    .state('sale-list', {
        url: '/sale-list',
        templateUrl: 'app/components/calendar/itinerary/data/sale-list.html',
        controller: 'sale-listCtrl',
        params: {
            shop_code: null,
            visit_id: null
        }
    })
    // 订单上报
    .state('perform-orders', {
        url: '/perform-orders',
        templateUrl: 'app/components/calendar/itinerary/data/perform-orders.html',
        controller: 'perform-ordersCtrl',
        params: {
            shop_code: null,
            shop_name: '',
            visit_id: null
        }
    })
    // 订单统计
    .state('order-list', {
        url: '/order-list',
        templateUrl: 'app/components/calendar/itinerary/data/order-list.html',
        controller: 'order-listCtrl',
        params: {
            shop_code: null,
            visit_id: null
        }
    })
    // 竞品上报
    .state('perform-competing', {
        url: '/perform-competing',
        templateUrl: 'app/components/calendar/itinerary/data/perform-competing.html',
        controller: 'perform-competingCtrl',
        params: {
            shop_code: null,
            shop_name: '',
            visit_id: null
        }
    })
    // 添加/查看/修改行动计划
    .state('perform-action', {
        url: '/perform-action',
        templateUrl: 'app/components/calendar/itinerary/perform-action.html',
        controller: 'perform-actionCtrl',
        params: {
            sid: null,
            visit_id: null
        }
    })
     // 行动计划
    .state('action-list', {
        url: '/action-list',
        templateUrl: 'app/components/calendar/itinerary/action-list.html',
        controller: 'action-listCtrl',
        params: {
            visit_id: null
        }
    })
    // 沟通
    .state('perform-communication', {
        url: '/perform-communication',
        templateUrl: 'app/components/calendar/itinerary/perform-communication.html',
        controller: 'perform-communicationCtrl',
        params: {
            sid: null,
            visit_id: null
        }
    })
    // 沟通统计
    .state('com-list', {
        url: '/com-list',
        templateUrl: 'app/components/calendar/itinerary/com-list.html',
        controller: 'com-listCtrl',
        params: {
            visit_id: null
        }
    })
    // 添加总结项
    .state('add-summary-item', {
        url: '/add-summary-item',
        templateUrl: 'app/components/calendar/itinerary/add-summary-item.html',
        controller: 'add-summary-itemCtrl',
        params: {
            sid: null,
            visit_id: null
        }
    })
    // 总结
    .state('summary-list', {
        url: '/summary-list',
        templateUrl: 'app/components/calendar/itinerary/summary-list.html',
        controller: 'summary-listCtrl',
        params: {           
            visit_id: null
        }
    })
    // 选择店面人员
    .state('com-people', {
        url: '/com-people',
        templateUrl: 'app/components/calendar/itinerary/com-people.html',
        controller: 'com-peopleCtrl',
        params: {
            sid: null
        }
    })
    // 路途
    .state('road', {
        url: '/road',
        templateUrl: 'app/components/calendar/itinerary/road.html',
        controller: 'roadCtrl',
        params: {
            plan_id: null
        }
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
            sid: null,
            shop_code: ''
        }
    })
    // 店面人员信息
    .state('store-staff', {
        url: '/store-staff',
        templateUrl: 'app/components/stores/store-staff.html',
        controller: 'store-staffCtrl',
        params: {
            sid: null
        }
    })
    // 查看店面人员信息
    .state('store-manager', {
        url: '/store-manager',
        templateUrl: 'app/components/stores/store-manager.html',
        controller: 'store-managerCtrl',
        params: {
            sid: null,
            shopofstaff_id: null
        }
    })
    // 添加
    .state('store-addstaff', {
        url: '/store-addstaff',
        templateUrl: 'app/components/stores/store-addstaff.html',
        controller: 'store-addstaffCtrl',
        params: {
            sid: null
        }
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
