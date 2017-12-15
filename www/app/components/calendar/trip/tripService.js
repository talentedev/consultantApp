/* 
 * This service serve passing date between controllers.
 */
app.service('TripService', function () {

    // plan type
    var plan_type = {};
    this.setPlanType = function (data) {
        plan_type = data;
    };
    this.getPlanType = function () {
        return plan_type;
    };

    // store
    var shop = {}
    this.setShop = function (data) {
        shop = data;
    }
    this.getShop = function () {
        return shop;
    }

    // duty
    var duty = {};
    this.setDuty = function (data) {
        duty = data;
    };
    this.getDuty = function () {
        return duty;
    };

    // participator
    var participators = [];
    this.setParticipators = function (data) {
        participators = [];
        participators = data;       
    };
    this.getParticipators = function () {
        return participators;
    };
    
    // employee    
    var employee_name = [],
        employee_id = [];
    this.set_employee = function (employees) {
        //console.log(employees);
        employee_name = [];
        employee_id = [];
        //for (index in employees) {
            employee_name.push(employees.name);
            //employee_id.push(employees[index]._id);
        //}
    };
    this.employee_id = function () {
        return employee_id;
    };
    this.employee_name = function () {
        return employee_name;
    };
});