/*
 * user management chart controller
 */
app.controller('manageCtrl', function ($scope, $state) {
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
});