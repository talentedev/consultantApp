/*
 * 个人信息
 */

app.controller('self-personalCtrl', function ($scope, $state, $http, $ionicHistory, BASE_URL) {

    $scope.$on('$ionicView.enter', function (event) {
        $scope.info = {};
        var url = BASE_URL + '/auth/me';
        $http.get(url).then(function (res) {
            console.log(res.data);
            $scope.info = res.data;

            // set gender
            $scope.gender = [
                {
                    name: '男',
                    value: 0
                },
                {
                    name: '女',
                    value: 1
                }
            ];
            $scope.info.gender = $scope.gender[res.data.sex];

            // set marital status
            $scope.ismarry = [
                {
                    name: '保密',
                    value: 0
                },
                {
                    name: '已婚',
                    value: 1
                },
                {
                    name: '未婚',
                    value: 2
                }
            ];            
            $scope.info.ismarry = $scope.ismarry[res.data.ismarry];

            // set child
            $scope.child = [
                {
                    name: '保密',
                    value: 0
                },
                {
                    name: '有',
                    value: 1
                },
                {
                    name: '无',
                    value: 2
                }
            ];
            //$scope.info.child = $scope.child[res.data.child];
            $scope.info.child = $scope.child[0];

            //set date
            $scope.info.birthdate = new Date(res.data.birthdate);
            $scope.info.entry_date = new Date(res.data.entry_date);
            $scope.info.graduate_date = new Date(res.data.graduate_date);
        });
    })

    // Camera
    $scope.camera = function () {
        var options = {
            quality: 15,
            targetWidth: 800,
            targetHeight: 600,
            correctOrientation: true,
            sourceType: 1,
            destinationType: navigator.camera.DestinationType.DATA_URL,
            allowEdit: true,
            encodingType: navigator.camera.EncodingType.JPEG,
            //          popoverOptions: new CameraPopoverOptions(300, 300, 100, 100, navigator.camera.PopoverArrowDirection.ARROW_ANY),
            saveToPhotoAlbum: false
        };

        navigator.camera.getPicture(function (result) {
            var imgURI = "data:image/jpeg;base64," + result;
            console.log(imgURI);
        }, function (err) {
        }, options);
    }

    // go to previous page
    $scope.go_back = function () {
        $ionicHistory.goBack();
    }

    // save input data
    $scope.go_save = function (data) {
        
        // convert gender value to bool
        data.sex = data.gender.value;        
        
        // convert maritalstatus value to tinyint
        data.ismarry = data.ismarry.value;

        // convert child value to tinyint
        //data.child = data.child.value;

        // convert date format     
        var convertDate = function (date) {
            var date = new Date(date);
            date.setDate(date.getDate());
            var joinString = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
            return joinString.join('-');             
        }

        // convert date format
        data.birthdate = convertDate(data.birthdate);
        data.entry_date = convertDate(data.entry_date);
        data.graduate_date = convertDate(data.graduate_date);
        console.log(data);
        // send request for putting a row
        var url = BASE_URL + '/user/update';
        $http.post(url, data).then(function (res) {
            $state.go('tab.self');
        });    
    }
});