/*
 * the controller that manage for user authentication.
*/
app.controller('authCtrl', function ($scope, $state, DBService) {

    $scope.login = function (user) {
        //console.log('Log-In', user);
        // Go to date tab if authentication is successed.
        //$state.go('tab.date');       

        // create table operation
        //var response = DBService.createTable();

        // delete table operation
        //var response = DBService.deleteTable();

        // list table operation
        //var response = DBService.listTable();

        // put row operation
        var response = DBService.putRow();

        // get row operation
        //var response = DBService.getRow();

        // delete row operation
        //var response = DBService.deleteRow();

        // update row operation
        //var response = DBService.updateRow();
        
        // batch get row operation
        //var response = DBService.batchGetRow();

        response.then(function (res) {
            console.log(res);
        });
        //console.log(response);
    };
});