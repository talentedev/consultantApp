/*
 * the controller that manage dynamic pptx file data
 */

app.controller('news-dynamic-detail-pptxCtrl', function ($scope, $state, $stateParams, $http, $ionicHistory) {

    $scope.filename = $stateParams.fileinfo.filename;
    $scope.filepath = $stateParams.fileinfo.filepath;

    $scope.download = function () {
       // $ionicPlatform.ready(function () {

            var url = $stateParams.fileinfo.filepath;
            /* file:///data/data/com.ionicframework.projectionic787897/files/image.png */
            var targetPath = cordova.file.dataDirectory + "/" + 'aa.pdf';
            var trustHosts = true;
            var options = {};

            $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
              .then(function (result) {
                  // Success!
                  //Fixme : success but i don't find my picture on my device
                  console.log("result : " + JSON.stringify(result));

              }, function (err) {
                  // Error
                  console.log("error : " + JSON.stringify(err));

              }, function (progress) {
                  $timeout(function () {
                      //$scope.downloadProgress = (progress.loaded / progress.total) * 100;
                  })
              });
       // });
    };

    $scope.go_back = function () {
        $ionicHistory.goBack();
    };
});
