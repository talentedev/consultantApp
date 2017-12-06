/*
 * 添加/修改门店
 */
app.controller('store-detailCtrl', function ($scope, $state, $stateParams, $ionicHistory, $http, BASE_URL) {

    $scope.$on('$ionicView.loaded', function (event) {
        $scope.store = {};        
        $scope.store_id = $stateParams.store_id;
        $scope.store_name = $stateParams.store_name;
        $scope.store_shortname = $stateParams.store_shortname;

        var url = BASE_URL + '/itinerary/store_info';
        var data = {
            store_id: $stateParams.store_id
        };
        $http.post(url, data).then(function (res) {            
            var mergeObject = {};
            for (key in res.data) {
                mergeObject = angular.extend(mergeObject, res.data[key]);
            }
            console.log(mergeObject);
            mergeObject.st_id = $stateParams.store_id;
            mergeObject.st_starttime = new Date(mergeObject.st_starttime);
            mergeObject.startallow_time = new Date(mergeObject.startallow_time);
            mergeObject.dms_time = new Date(mergeObject.dms_time);
            mergeObject.equip_time = new Date(mergeObject.equip_time);
            $scope.store = mergeObject;
        });        
    });

    $scope.go_back = function () {
        $ionicHistory.goBack();
    };

    $scope.go_save = function (store) {
        
        var url = BASE_URL + '/store/add';
        var data = {
            // StoreInfo Table Data
            st_id: store.st_id,
            st_shortname: store.st_shortname,
            st_name: store.st_name,
            st_type: store.st_type,
            st_status: store.st_status,
            st_starttime: "2018-12-15T19:42:27.100Z",//store.st_starttime,
            startallow_time: "2018-12-15T19:42:27.100Z",//store.startallow_time,
            equip_time: "2018-12-15T19:42:27.100Z",//store.equip_time,
            dms_time: "2018-12-15T19:42:27.100Z",//store.dms_time,
            st_province: store.st_province,
            st_city: store.st_city,
            st_address: store.st_address,
            photo_url: store.photo_url,
            email: store.email,
            am: store.AM,
            manager: store.manager,
            hand_phone: store.hand_phone,
            telephone: store.telephone,
            // storedescription table data
            total_area: store.total_area,
            work_area: store.work_area,
            rest_area: store.rest_area,
            member_num: store.member_num,
            lift_num: store.lift_num,
            carcleanroom_num: store.carcleanroom_num,
            toilet: store.toilet,
            // shops_in_range table data
            cardecorationshop: store.cardecorationshop,
            carquickfixshop: store.carquickfixshop,
            car4Sshop: store.fourshop,                                  
            carfixshop: store.carfixshop,
            addpetrolshop: store.addpetrolshop,
            largescaleshop: store.largescaleshop,
            traditionaltireshop: store.traditionaltireshop,
            memberclub: store.memberclub,
            othershop: store.othershop,
            // initial_investiment table data
            init_amount: store.init_amount,
            decoration: store.decoration,
            equipment: store.equipment,
            initialcost: store.initialcost,
            stocking: store.stocking,
            prepaid_rent: store.prepaid_rent,
            bank_liquidity: store.bank_liquidity,
            others: store.others,
            // service_content table data
            engine_oil: store.oil,
            brake: store.brake,
            battery: store.battery,
            sparkplug: store.sparkplug,
            lightbulb: store.lightbulb,
            filter: store.filter,
            carcleancard: store.carcleancard,
            manualcarclean: store.manualcarclean,
            service_decoration: store.service_decoration,        
            autoclean: store.autoclean,
            waxing: store.waxing,
            polishing: store.polishing,
            protectionfilm: store.protectionfilm,
            seatcover: store.seatcover,
            tire: store.tire,
            wheelalign: store.wheelalign,            
            valve: store.valve,
            ballence: store.ballence,
            insurance: store.insurance,
            glass: store.glass,
            motor: store.motor,
            wiper: store.wiper,
            other: store.other
        };
        console.log(data);
        $http.post(url, data).then(function (res) {
            console.log(res);
        });
        $state.go('tab.store');
    };

    $scope.go_manager = function () {
        $state.go('store-manager');
    };
});