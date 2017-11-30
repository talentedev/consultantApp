/*
 * This file define routes to use for app.
 */
app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    // sign page
    .state('login', {
        url: '/login',
        templateUrl: 'app/components/auth/login.html',
        controller: 'authCtrl'
    })

    // setup an abstract state for the tabs directive
    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'app/shared/tabs.html'
    })
    // Show news tab.
    .state('tab.news', {
        url: '/news',
        views: {
            'tab-news': {
                templateUrl: 'app/components/news/tab-news.html',
                controller: 'newsCtrl'
            }
        }
    })
    // Show self-management tab.
    .state('tab.manage', {
        url: '/manage',
        views: {
            'tab-manage': {
                templateUrl: 'app/components/management/tab-manage.html',
                controller: 'manageCtrl'
            }
        }
    })
    // Show calendar tab.
    .state('tab.date', {
        url: '/date',
        views: {
            'tab-date': {
                templateUrl: 'app/components/calendar/tab-date.html',
                controller: 'dateCtrl'
            }
        }
    })
    // Show stores tab.
    .state('tab.store', {
        url: '/store',
        views: {
            'tab-store': {
                templateUrl: 'app/components/stores/tab-store.html',
                controller: 'storeCtrl'
            }
        }
    })
    // Show mine tab.
    .state('tab.self', {
        url: '/self',
        views: {
            'tab-self': {
                templateUrl: 'app/components/mine/tab-self.html',
                controller: 'selfCtrl'
            }
        }
    })

    // Show accouncement detail in news-tab.
    .state('news-announcement', {
        url: '/news-announcement',
        templateUrl: 'app/components/news-announcement/news-announcement.html',
        controller: 'news-announcementCtrl'
    })
    // Show dynamic detail in news-tab.
    .state('news-dynamic', {
        url: '/news-dynamic',
        templateUrl: 'app/components/news-dynamic/news-dynamic.html',
        controller: 'news-dynamicCtrl'
    })
    // Show dynamic detail list in dynamic item.
    .state('news-dynamic-detail', {
        url: '/news-dynamic-detail',
        templateUrl: 'app/components/news-dynamic/dynamic-detail/news-dynamic-detail.html',
        controller: 'news-dynamic-detailCtrl'
    })
    // Show downloaded files in dynamic detail.
    .state('news-dynamic-detail-pptx', {
        url: '/news-dynamic-detail-pptx',
        templateUrl: 'app/components/news-dynamic/dynamic-pptx/news-dynamic-detail-pptx.html',
        controller: 'news-dynamic-detail-pptxCtrl'
    })
    // Show tracking item in news-tab.
    .state('news-tracking', {
        url: '/news-tracking',
        templateUrl: 'app/components/news-tracking/news-tracking.html',
        controller: 'news-trackingCtrl'
    })
    // Show customer item in news-tab.
    .state('news-customer', {
        url: '/news-customer',
        templateUrl: 'app/components/news-customer/news-customer.html',
        controller: 'news-customerCtrl'
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
});
