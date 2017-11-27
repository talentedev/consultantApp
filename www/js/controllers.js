angular.module('ctApp.controllers', [])

 /*the controller that manage about user login*/
.controller('loginCtrl', function ($scope, $state) {

    $scope.login = function (user) {
        console.log('Log-In', user);
        $state.go('tab.date');
    };

})
/*the controller that manage user's news*/
.controller('newsCtrl', function ($scope, $state) {
    $scope.go_announcement = function () {
        $state.go('news-announcement');
    }
    $scope.go_dynamic = function () {
        $state.go('news-dynamic');
    }
    $scope.go_tabdate = function () {
        $state.go('tab.date');
    }
    $scope.go_tracking = function () {
        $state.go('news-tracking')
    }
    $scope.go_customer = function () {
        $state.go('news-customer')
    }
    $scope.go_perform = function () {
        $state.go('perform')
    }
})
/*user management chart controller*/
.controller('manageCtrl', function ($scope, $state) {
    $scope.myDataSource1 = {
        chart: {
            "borderColor": "#ffffff",
            "borderThickness": "0",
            "borderAlpha": "0",
            "bgColor": "#ffffff",
            "usePlotGradientColor": "0",
            "showPlotBorder": "0",
            "labelFontSize": "11",
            "labelFontColor": "#000000",
            "labelFontBold": "1",
            "valueFontColor": "#48b52d",
            "showYAxisValues": "0",
            "divLineColor": "#ffffff",
            "showAlternateHGridColor": "0",
            "showCanvasBorder": "0",
            "chartLeftMargin": "0",
            "chartRightMargin": "0",
            "plotSpacePercent": "40",

        },
        data: [{
            label: "一月",
            value: "9",
            color: "#48b52d"
        }, {
            label: "二月",
            value: "12",
            color: "#48b52d"
        }, {
            label: "三月",
            value: "12",
            color: "#48b52d"
        }, {
            label: "四月",
            value: "12",
            color: "#48b52d"
        }, {
            label: "五月",
            value: "12",
            color: "#48b52d"
        }, {
            label: "六月",
            value: "12",
            color: "#48b52d"
        }, {
            label: "七月",
            value: "9",
            color: "#48b52d"
        }, {
            label: "八月",
            value: "20",
            color: "#48b52d"
        }, {
            label: "九月",
            value: "",
            color: "#48b52d"
        }, {
            label: "十月",
            value: "",
            color: "#48b52d"
        }, {
            label: "十一",
            value: "",
            color: "#48b52d"
        }, {
            label: "十二",
            value: "",
            color: "#48b52d"
        }]
    };
    $scope.myDataSource2 = {
        chart: {
            "borderColor": "#ffffff",
            "borderThickness": "0",
            "borderAlpha": "0",
            "bgColor": "#ffffff",
            "usePlotGradientColor": "0",
            "showPlotBorder": "0",
            "labelFontSize": "11",
            "labelFontColor": "#000000",
            "labelFontBold": "1",
            "valueFontColor": "#48b52d",
            "showYAxisValues": "0",
            "divLineColor": "#ffffff",
            "showAlternateHGridColor": "0",
            "showCanvasBorder": "0",
            "chartLeftMargin": "0",
            "chartRightMargin": "0",
            "plotSpacePercent": "40",
            "placevaluesInside": "0",
            "yAxisMaxValue": "400",
        },
        data: [{
            label: "一月",
            value: "190",
            color: "#48b52d"
        }, {
            label: "二月",
            value: "92",
            color: "#48b52d"
        }, {
            label: "三月",
            value: "174",
            color: "#48b52d"
        }, {
            label: "四月",
            value: "148",
            color: "#48b52d"
        }, {
            label: "五月",
            value: "179",
            color: "#48b52d"
        }, {
            label: "六月",
            value: "179",
            color: "#48b52d",
        }, {
            label: "七月",
            value: "150",
            color: "#48b52d"
        }, {
            label: "八月",
            value: "160",
            color: "#48b52d"
        }, {
            label: "九月",
            value: "",
            color: "#48b52d"
        }, {
            label: "十月",
            value: "",
            color: "#48b52d"
        }, {
            label: "十一",
            value: "",
            color: "#48b52d"
        }, {
            label: "十二",
            value: "",
            color: "#48b52d"
        }]
    };
})
/*the controller that manage date*/
.controller('dateCtrl', function ($scope, $state, $ionicHistory, Calendar) {
    $scope.$on('$ionicView.enter', function(event){
        Calendar.initial();
    })
    $scope.year = Calendar.getyear();
    $scope.month = Calendar.getmonth();
    $scope.pre_calendar = function () {
        if ($scope.month == 1) {
            $scope.month = 12;
            $scope.year = $scope.year - 1;
        } else {
            $scope.month = $scope.month -1;
        }
        Calendar.changeCal($scope.year,$scope.month)
    }
    $scope.next_calendar = function () {
        if ($scope.month == 12) {
            $scope.month = 1;
            $scope.year = $scope.year + 1;
        } else {
            $scope.month = $scope.month + 1;
        }
        Calendar.changeCal($scope.year, $scope.month)
    }
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
    $scope.go_perform = function () {
        $state.go('perform');
    }
    $scope.go_road = function () {
        $state.go('road');
    }
    $scope.go_trip = function () {
        $state.go('trip');
    }
})
/*the controller that manage store*/
.controller('storeCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
    $scope.go_detail = function () {
        $state.go('store-detail');
    }
    $scope.go_add = function () {
        $state.go('store-detail');
    }
})
/*the controller that manage self data*/
.controller('selfCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
    $scope.go_information = function () {
        $state.go('self-personal')
    }
})
/*the controller that manage announcement data*/
.controller('news-announcementCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
})
/*the controller that manage dynamic file data*/
.controller('news-dynamicCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
    $scope.go_detail = function () {
        $state.go('news-dynamic-detail')
    }
})
/*the controller that manage dynamic file data*/
.controller('news-dynamic-detailCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
    $scope.go_detail = function () {
        $state.go('news-dynamic-detail-pptx')
    }
})
/*the controller that manage dynamic pptx file data*/
.controller('news-dynamic-detail-pptxCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
})
/*the controller that manage tracking reminder data*/
.controller('news-trackingCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
})
/*the controller that manage customer service data*/
.controller('news-customerCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
})

/*the controller that add/edit store data*/
.controller('store-detailCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
    $scope.go_save = function () {
        $state.go('tab.store');
    }
    $scope.go_manager = function () {
        $state.go('store-manager');
    }
})
/*the controller that manage perform store inspection class trip infomation data*/
.controller('store-managerCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
})
/*the controller that manage personal infomation data*/
.controller('self-personalCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
    $scope.go_save = function () {
        $state.go('tab.self');
    }
})

/*the controller that manage perform store inspection class trip infomation data*/
.controller('performCtrl', function ($scope, $state, $ionicHistory) {
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
})
/*the controller that manage filed sign data*/
.controller('perform-fieldCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
    $scope.go_save = function () {
        $state.go('tab.self');
    }
})
/*the controller that manage analysis data*/
.controller('perform-analysisCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }

})
/*the controller that manage Storefront annual work plan data*/
.controller('perform-storefrontCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }

})
/*Add to develop action plans and draft*/
.controller('perform-developCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }

})
/*Chi added audit findings*/
.controller('perform-auditCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }

})
/*Upload pictures*/
.controller('perform-uploadCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
    $scope.go_camera = function () {
        $state.go('perform-camera');
    }

})
/*Camera*/
.controller('perform-cameraCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
})
/*Add trip*/
.controller('perform-tripCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }

})
/*Inventory reporting*/
.controller('perform-inventoryCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }

})
/*Sales reporting*/
.controller('perform-salesCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }

})
/*Orders submitted*/
.controller('perform-ordersCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }

})
/*Competing products reported*/
.controller('perform-competingCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }

})
/*Add / View / Edit Action Plan*/
.controller('perform-actionCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }

})
/*Adding communication*/
.controller('perform-communicationCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
})
/*Road*/
.controller('roadCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
})
/*Trip*/
.controller('tripCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
    $scope.go_type = function () {
        $state.go('trip-type');
    }
    $scope.go_select = function () {
        $state.go('trip-select');
    }
    $scope.go_store = function () {
        $state.go('trip-store');
    }
})
/*Trip-type*/
.controller('trip-typeCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
})
/*Trip-select*/
.controller('trip-selectCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
})
/*Trip-store*/
.controller('trip-storeCtrl', function ($scope, $state, $ionicHistory) {
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }
})