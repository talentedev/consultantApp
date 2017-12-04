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
        store_id = null;
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

});