/* 
 * This service serve passing date between controllers.
 */
app.service('ItineraryService', function () {
       
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