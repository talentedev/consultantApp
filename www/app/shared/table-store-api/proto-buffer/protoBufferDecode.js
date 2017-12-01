/*
 * Decode protocol buffer to object.
 * 
 * @author: admin
 * @created at 2/3/2017
 */

angular.module('ctpApp.protoBufferDecode', [])
.service('protoBufferDecode', function (ListTableResponse, GetRowResponse, PutRowResponse, UpdateRowResponse, DeleteRowResponse, ColumnType) {

    // Decode response for listing all tables in a special instance.
    this.decodeListTableResponse = function (body) {

        var listTableResponse = new ListTableResponse();
        listTableResponse.parseFromString(body);

        var response = [];
       
        for (var i = 0; i < listTableResponse.table_names_size() ; i++) {
            response.push(listTableResponse.table_names(i));
        }

        return response;
    };

    // Decode response created a table.
    this.decodeCreateTableResponse = function (body) {                
        return [];
    };

    // Decode response deleted a table.
    this.decodeDeleteTableResponse = function (body) {
        return [];
    };

    // Decode response got a row from a special table.
    this.decodeGetRowResponse = function (body) {

        var getRowResponse = new GetRowResponse();
        getRowResponse.parseFromString(body);
        
        var row = getRowResponse.row();
      
        var response = {};
        response.consumed = this.parseConsumed(getRowResponse.consumed());
        response.row = this.parseRow(row);

        return response;
    };

    // Decode response put a row to a special table.
    this.decodePutRowResponse = function (body) {

        var putRowResponse = new PutRowResponse();
        putRowResponse.parseFromString(body);

        var response = {};
        response.consumed = this.parseConsumed(putRowResponse.consumed());

        return response;
    };

    // Decode response update a row to a special table.
    this.decodeUpdateRowResponse = function (body) {

        var updateRowResponse = new UpdateRowResponse();
        updateRowResponse.parseFromString(body);

        var response = {};
        response.consumed = this.parseConsumed(updateRowResponse.consumed());

        return response;
    };

    // Decode response delete a row from a special table.
    this.decodeDeleteRowResponse = function (body) {

        var deleteRowResponse = new DeleteRowResponse();
        deleteRowResponse.parseFromString(body);

        var response = {};
        response.consumed = this.parseConsumed(deleteRowResponse.consumed());

        return response;
    };

    // Parse Consumed
    this.parseConsumed = function (pbMessage) {
        return this.parseCapacityUnit(pbMessage.capacity_unit());
    };

    // parse Capacity Unit
    this.parseCapacityUnit = function (pbMessage) {
        var val = {};
        val.capacity_unit = {
            read: pbMessage.read(),
            write: pbMessage.write()
        };
        return val;
    };

    // Parse Row
    this.parseRow = function (pbMessage) {
        var val = {};
        val.primary_key_columns = this.parseColumns(pbMessage, 'primary_key_columns');
        val.attribute_columns = this.parseColumns(pbMessage, 'attribute_columns');
        return val;
    };

    // Parse Column
    this.parseColumns = function (pbMessage, type) {
        var ret = {};
        
        var methodName = type + '_size';       
        var size = pbMessage[methodName]();
        
        for (var i = 0; i < size; i++) {
            var pkColumn = pbMessage[type](i);
            
            var pkColumnValue = pkColumn.values[2];
            
            var columnType = new ColumnType();

            switch (pkColumnValue.type()) {
                case columnType.INTEGER:
                    var realValue = pkColumnValue.v_int(); break;
                case columnType.STRING:
                    var realValue = pkColumnValue.v_string(); break;
                case columnType.BOOLEAN:
                    var realValue = pkColumnValue.v_bool();
                    if (pkColumnValue.v_bool()) {
                        realValue = true;
                    } else {
                        realValue = false;
                    }
                    break;
                case columnType.DOUBLE:
                    var realValue = pkColumnValue.v_double(); break;
                case columnType.BINARY:
                    var realValue = {};
                    realValue.type = BINARY;
                    realValue.value = pkColumnValue.v_binary(); break;
                default: throw new Error('You must be modified parseColumn function protoBufferDecode.js');
            }

            var name = pkColumn.name();
            ret[name] = realValue;
            
        }
        
        return ret;
    };
    
});
