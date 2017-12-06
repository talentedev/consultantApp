/* 
 * This service serve passing date between controllers.
 */
app.service('TripService', function () {

    // trip type
    var trip_type = null;
    this.set_trip_type = function (data) {
        trip_type = data;
    };
    this.trip_type = function () {
        return trip_type;
    };

    // store
    var store_name = null,
        store_id = 1;
    this.set_store_name = function (name) {
        store_name = name;
    }
    this.store_name = function () {
        return store_name;
    };
    this.set_store_id = function (id) {
        store_id = id;
    }
    this.store_id = function () {
        return store_id;
    };

    // duty
    var duty_name = null,
        duty_id = null;
    this.set_duty = function (duty) {
        duty_id = duty.mem_id;
        duty_name = duty.name;
    };
    this.duty_id = function () {
        return duty_id;
    };
    this.duty_name = function () {
        return duty_name;
    };

    // participator
    var participator_name = [],
        participator_id = [];
    this.set_participator = function (participator) {
        participator_name = [];
        participator_id = [];
        for (index in participator) {
            participator_name.push(participator[index].name);
            participator_id.push(participator[index].mem_id);
        }
    };
    this.participator_id = function () {
        return participator_id;
    };
    this.participator_name = function () {
        return participator_name;
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