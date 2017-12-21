/*
 * 自我管理
 * @author : kmr
 * @modifed : 2017/8/29
 */
app.controller('manageCtrl', function ($scope, $state, $http, BASE_URL) {
    $scope.myDataSource1 = {};
    $scope.myDataSource2 = {};
    $scope.myDataSource1.data = [];
    $scope.myDataSource2.data = [];
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
            value: "",
            color: "#48b52d"
        }, {
            label: "二月",
            value: "",
            color: "#48b52d"
        }, {
            label: "三月",
            value: "",
            color: "#48b52d"
        }, {
            label: "四月",
            value: "",
            color: "#48b52d"
        }, {
            label: "五月",
            value: "",
            color: "#48b52d"
        }, {
            label: "六月",
            value: "",
            color: "#48b52d"
        }, {
            label: "七月",
            value: "",
            color: "#48b52d"
        }, {
            label: "八月",
            value: "",
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
            value: "",
            color: "#48b52d"
        }, {
            label: "二月",
            value: "",
            color: "#48b52d"
        }, {
            label: "三月",
            value: "",
            color: "#48b52d"
        }, {
            label: "四月",
            value: "",
            color: "#48b52d"
        }, {
            label: "五月",
            value: "",
            color: "#48b52d"
        }, {
            label: "六月",
            value: "",
            color: "#48b52d",
        }, {
            label: "七月",
            value: "",
            color: "#48b52d"
        }, {
            label: "八月",
            value: "",
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
    
    $scope.$on('$ionicView.enter', function (event) {
        var date = new Date();
        $scope.year = date.getFullYear().toString();
        init(date.getFullYear().toString());
    });

    $scope.selYear = function (year) {
        init(year);
    };

    var init = function (date) {
        var url = BASE_URL + '/chart/visitshop';
        var data = {
            year: date
        };
        console.log('chart/visitshop:request', data);
        $http.post(url, data).then(function (res) {
            console.log('chart/visitshop:response', res.data);
            var data = res.data;
            var arr = [];
            var i = 0;
            var length = Object.keys(data).length;
            for (i = 0; i < length; i++) {
                $scope.myDataSource1.data[i].value = data[Object.keys(data)[i]];
            }
        });
        url = BASE_URL + '/chart/worktime';
        $http.post(url, data).then(function (res) {
            console.log('chart/worktime:response', res.data);
            var data = res.data;
            var arr = [];
            var i = 0;
            var length = Object.keys(data).length;
            for (i = 0; i < length; i++) {
                $scope.myDataSource2.data[i].value = data[Object.keys(data)[i]];
            }
        });
    };
});