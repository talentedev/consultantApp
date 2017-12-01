/*
 * Define protocol buffer message.
 * 
 * @author: admin
 * @created at 2/3/2017
 */

angular.module('ctpApp.protocol', [])

    /*********************************************************/
    /*                                                        *
    /*              Table Operations Request                  *
    /*                                                        *
    /*********************************************************/

 // Create Table Request Object
.factory('CreateTableRequest', function (PBMessage) {

    var CreateTableRequest = function () {
        PBMessage.apply(this, arguments);
        this.fields[1] = 'TableMeta';
        this.values[1] = '';
        this.fields[2] = 'ReservedThroughput';
        this.values[2] = '';
        this.value = this;
    };

    CreateTableRequest.prototype = new PBMessage();

    CreateTableRequest.prototype.setTableMeta = function (value) {
        this.setValue(1, value);
    };

    CreateTableRequest.prototype.setReservedThroughput = function (value) {
        this.setValue(2, value);
    };

    return CreateTableRequest;
})

 // Delete Table Request Object
.factory('DeleteTableRequest', function (PBMessage) {

    var DeleteTableRequest = function () {
        PBMessage.apply(this, arguments);
        this.fields[1] = 'PBString';
        this.values[1] = '';
        this.value = this;
    };

    DeleteTableRequest.prototype = new PBMessage();

    DeleteTableRequest.prototype.setTableName = function (value) {
        this.setValue(1, value);
    };

    return DeleteTableRequest;
})


    /*********************************************************/
    /*                                                        *
    /*              Single Row Operations Request             *
    /*                                                        *
    /*********************************************************/

// Put Row Request Object
.factory('PutRowRequest', function (PBMessage) {

    var PutRowRequest = function () {
        PBMessage.apply(this, arguments);
        this.fields[1] = 'PBString';
        this.values[1] = '';
        this.fields[2] = 'Condition';
        this.values[2] = null;
        this.fields[3] = 'Column';
        this.values[3] = [];
        this.fields[4] = 'Column';
        this.values[4] = [];
        this.value = this;
    };

    PutRowRequest.prototype = new PBMessage();

    PutRowRequest.prototype.setTableName = function (value) {
        this.setValue(1, value);
    };

    PutRowRequest.prototype.setCondition = function (value) {
        this.setValue(2, value);
    };

    PutRowRequest.prototype.setPrimaryKey = function (index, value) {
        this.setArrValue(3, index, value);
    };

    PutRowRequest.prototype.setAttributeColumns = function (index, value) {
        this.setArrValue(4, index, value);
    };

    return PutRowRequest;
})

// Get Row Request Object
.factory('GetRowRequest', function (PBMessage, PBString) {

    var GetRowRequest = function () {
        PBMessage.apply(this, arguments);
        this.fields[1] = 'PBString';
        this.values[1] = '';
        this.fields[2] = 'Column';
        this.values[2] = [];
        this.fields[3] = 'PBString';
        this.values[3] = [];
        this.fields[4] = 'ColumnCondition';
        this.values[4] = null;
        this.value = this;
    };

    GetRowRequest.prototype = new PBMessage();

    GetRowRequest.prototype.setTableName = function (value) {
        this.setValue(1, value);
    };

    GetRowRequest.prototype.setPrimaryKey = function (index, value) {
        this.setArrValue(2, index, value);
    };

    GetRowRequest.prototype.setColumnsToGet = function (index, value) {
        var val = new PBString();
        val.value = value;
        this.setArrValue(3, index, val);
    };

    GetRowRequest.prototype.setFilter = function (value) {
        this.setValue(4, value);
    };

    return GetRowRequest;
})

 // Delete Row Request Object
.factory('DeleteRowRequest', function (PBMessage) {

    var DeleteRowRequest = function () {
        PBMessage.apply(this, arguments);
        this.fields[1] = 'PBString';
        this.values[1] = '';
        this.fields[2] = 'Condition';
        this.values[2] = null;
        this.fields[3] = 'Column';
        this.values[3] = [];
        this.value = this;
    };

    DeleteRowRequest.prototype = new PBMessage();

    DeleteRowRequest.prototype.setTableName = function (value) {
        this.setValue(1, value);
    };

    DeleteRowRequest.prototype.setCondition = function (value) {
        this.setValue(2, value);
    };

    DeleteRowRequest.prototype.setPrimaryKey = function (index, value) {
        this.setArrValue(3, index, value);
    };

    return DeleteRowRequest;
})

 // Update Row Request Object
.factory('UpdateRowRequest', function (PBMessage) {

    var UpdateRowRequest = function () {
        PBMessage.apply(this, arguments);
        this.fields[1] = 'PBString';
        this.values[1] = '';
        this.fields[2] = 'Condition';
        this.values[2] = null;
        this.fields[3] = 'Column';
        this.values[3] = [];
        this.fields[4] = 'ColumnUpdate';
        this.values[4] = [];
        this.value = this;
    };

    UpdateRowRequest.prototype = new PBMessage();

    UpdateRowRequest.prototype.setTableName = function (value) {
        this.setValue(1, value);
    };

    UpdateRowRequest.prototype.setCondition = function (value) {
        this.setValue(2, value);
    };

    UpdateRowRequest.prototype.setPrimaryKey = function (index, value) {
        this.setArrValue(3, index, value);
    };

    UpdateRowRequest.prototype.setAttributeColumns = function (index, value) {
        this.setArrValue(4, index, value);
    };

    return UpdateRowRequest;
})

    /*********************************************************/
    /*                                                        *
    /*              Multiple Row Operations Request           *
    /*                                                        *
    /*********************************************************/

// Batch Get Row Request Object
.factory('BatchGetRowRequest', function (PBMessage) {

    var BatchGetRowRequest = function (reader) {
        PBMessage.apply(this, arguments);
        if (typeof reader == 'undefined') reader = null;
        this.fields[1] = 'TableInBatchGetRowRequest';
        this.values[1] = [];
        this.reader = reader;
        this.value = this;
    };

    BatchGetRowRequest.prototype = new PBMessage();

    BatchGetRowRequest.prototype.set_tables = function (index, value) {
        this.setArrValue(1, index, value);
    };

    return BatchGetRowRequest;

})

// Table in Batch Get Row Request Object
.factory('TableInBatchGetRowRequest', function (PBMessage, PBString) {

    var TableInBatchGetRowRequest = function (reader) {
        PBMessage.apply(this, arguments);
        if (typeof reader == 'undefined') reader = null;
        this.fields[1] = 'PBString';
        this.values[1] = '';
        this.fields[2] = 'RowInBatchGetRowRequest';
        this.values[2] = [];
        this.fields[3] = 'PBString';
        this.values[3] = [];
        this.fields[4] = 'ColumnCondition';
        this.values[4] = null;
        this.reader = reader;
        this.value = this;
    };

    TableInBatchGetRowRequest.prototype = new PBMessage();

    TableInBatchGetRowRequest.prototype.setTableName = function (value) {
        this.setValue(1, value);
    };

    TableInBatchGetRowRequest.prototype.set_rows = function (index, value) {
        this.setArrValue(2, index, value);
    };

    TableInBatchGetRowRequest.prototype.set_columns_to_get = function (index, value) {
        var val = new PBString();
        val.set_value(value);        
        this.setArrValue(3, index, val);
    };

    return TableInBatchGetRowRequest;

})

// Row In Batch Get Row Request Object
.factory('RowInBatchGetRowRequest', function (PBMessage) {

    var RowInBatchGetRowRequest = function (reader) {
        PBMessage.apply(this, arguments);
        if (typeof reader == 'undefined') reader = null;
        this.fields[1] = 'Column';
        this.values[1] = [];
        this.reader = reader;
        this.value = this;
    };

    RowInBatchGetRowRequest.prototype = new PBMessage();

    RowInBatchGetRowRequest.prototype.setPrimaryKey = function (index, value) {
        this.setArrValue(1, index, value);
    };

    return RowInBatchGetRowRequest;

})

    /*********************************************************/
    /*                                                        *
    /*              Table Operations Response                 *
    /*                                                        *
    /*********************************************************/

// List Table Response Object
.factory('ListTableResponse', function (PBMessage) {

    var ListTableResponse = function (reader) {
        PBMessage.apply(this, arguments);
        if (typeof reader == 'undefined') reader = null;
        this.fields[1] = 'PBString';
        this.values[1] = [];
        this.reader = reader;
        this.value = this;
    };

    ListTableResponse.prototype = new PBMessage();

    ListTableResponse.prototype.table_names_size = function () {
        return this.getArrSize(1);
    };

    ListTableResponse.prototype.table_names = function (offset) {
        var val = this.getArrValue(1, offset);
        return val.get_value();
    };
       
    return ListTableResponse;
})

    /*********************************************************/
    /*                                                        *
    /*              Single Row Operations Response            *
    /*                                                        *
    /*********************************************************/

// Get Row Response Object
.factory('GetRowResponse', function (PBMessage) {

    var GetRowResponse = function (reader) {
        PBMessage.apply(this, arguments);
        if (typeof reader == 'undefined') reader = null;
        this.fields[1] = 'ConsumedCapacity';
        this.values[1] = '';
        this.fields[2] = 'Row';
        this.values[2] = '';
        this.reader = reader;
        this.value = this;
    };

    GetRowResponse.prototype = new PBMessage();
      
    GetRowResponse.prototype.consumed = function () {        
        return this.get_value(1);
    };

    GetRowResponse.prototype.row = function () {
        return this.get_value(2);
    };

    return GetRowResponse;
})

// Put Row Response Object
.factory('PutRowResponse', function (PBMessage) {

    var PutRowResponse = function (reader) {
        PBMessage.apply(this, arguments);
        if (typeof reader == 'undefined') reader = null;
        this.fields[1] = 'ConsumedCapacity';
        this.values[1] = '';        
        this.reader = reader;
        this.value = this;
    };

    PutRowResponse.prototype = new PBMessage();
      
    PutRowResponse.prototype.consumed = function () {
        return this.get_value(1);
    };

    PutRowResponse.prototype.set_consumed = function (value) {
        this.set_value(1, value);
    };

    return PutRowResponse;
})

// Update Row Response Object
.factory('UpdateRowResponse', function (PBMessage) {

    var UpdateRowResponse = function (reader) {
        PBMessage.apply(this, arguments);
        if (typeof reader == 'undefined') reader = null;
        this.fields[1] = 'ConsumedCapacity';
        this.values[1] = '';        
        this.reader = reader;
        this.value = this;
    };

    UpdateRowResponse.prototype = new PBMessage();
      
    UpdateRowResponse.prototype.consumed = function () {
        return this.get_value(1);
    };

    UpdateRowResponse.prototype.set_consumed = function (value) {
        this.set_value(1, value);
    };

    return UpdateRowResponse;
})

// Delete Row Response Object
.factory('DeleteRowResponse', function (PBMessage) {

    var DeleteRowResponse = function (reader) {
        PBMessage.apply(this, arguments);
        if (typeof reader == 'undefined') reader = null;
        this.fields[1] = 'ConsumedCapacity';
        this.values[1] = '';        
        this.reader = reader;
        this.value = this;
    };

    DeleteRowResponse.prototype = new PBMessage();
      
    DeleteRowResponse.prototype.consumed = function () {
        return this.get_value(1);
    };

    DeleteRowResponse.prototype.set_consumed = function (value) {
        this.set_value(1, value);
    };

    return DeleteRowResponse;
})

    /*********************************************************/
    /*                                                        *
    /*              Others                                    *
    /*                                                        *
    /*********************************************************/

// Table Meta Object
.factory('TableMeta', function (PBMessage) {

    var TableMeta = function () {
        PBMessage.apply(this, arguments);
        this.fields[1] = 'PBString';
        this.values[1] = '';
        this.fields[2] = 'ColumnSchema';
        this.values[2] = [];
        this.value = this;
    };

    TableMeta.prototype = new PBMessage();

    TableMeta.prototype.setTableName = function (value) {
        this.setValue(1, value);
    };

    TableMeta.prototype.setPrimaryKey = function (index, value) {
        this.setArrValue(2, index, value);
    };

    return TableMeta;
})

// Reserved Throughput Object
.factory('ReservedThroughput', function (PBMessage) {
    var ReservedThroughput = function () {
        PBMessage.apply(this, arguments);
        this.fields[1] = 'CapacityUnit';
        this.values[1] = '';
        this.value = this;
    };

    ReservedThroughput.prototype = new PBMessage();

    ReservedThroughput.prototype.setCapacityUnit = function (value) {
        this.setValue(1, value);
    };

    return ReservedThroughput;
})

// CapacityUnit Object
.factory('CapacityUnit', function (PBMessage) {
    var CapacityUnit = function (reader) {
        if (typeof reader == 'undefined') reader = null;
        PBMessage.apply(this, arguments);
        this.fields[1] = 'PBInt';
        this.values[1] = '';
        this.fields[2] = 'PBInt';
        this.values[2] = '';
        this.reader = reader;
        this.value = this;
    };

    CapacityUnit.prototype = new PBMessage();

    CapacityUnit.prototype.setRead = function (value) {
        this.setValue(1, value);
    };

    CapacityUnit.prototype.read = function () {
        return this.get_value(1);
    };

    CapacityUnit.prototype.setWrite = function (value) {
        this.setValue(2, value);
    };

    CapacityUnit.prototype.write = function () {
        return this.get_value(2);
    };

    return CapacityUnit;
})

// Column Schema Object
.factory('ColumnSchema', function (PBMessage) {

    var ColumnSchema = function () {
        PBMessage.apply(this, arguments);
        this.fields[1] = 'PBString';
        this.values[1] = '';
        this.fields[2] = 'ColumnType';
        this.values[2] = '';
        this.value = this;
    };

    ColumnSchema.prototype = new PBMessage();

    ColumnSchema.prototype.setName = function (value) {
        this.setValue(1, value);
    };

    ColumnSchema.prototype.setType = function (value) {
        this.setValue(2, value);
    };

    return ColumnSchema;
})

// Condition Object
.factory('Condition', function (PBMessage) {
    var Condition = function () {
        PBMessage.apply(this, arguments);
        this.fields[1] = 'RowExistenceExpectation';
        this.values[1] = '';
        this.fields[2] = 'ColumnCondition';
        this.values[2] = null;
        this.value = this;
    };

    Condition.prototype = new PBMessage();

    Condition.prototype.setRowExistence = function (value) {
        this.setValue(1, value);
    };

    Condition.prototype.setColumnCondition = function (value) {
        this.setValue(2, value);
    };

    return Condition;
})

// Relation Condition Object
.factory('RelationCondition', function (PBMessage) {
    var RelationCondition = function () {
        PBMessage.apply(this, arguments);
        this.fields[1] = 'ComparatorType';
        this.values[1] = '';
        this.fields[2] = 'PBString';
        this.values[2] = null;
        this.fields[3] = 'ColumnValue';
        this.values[3] = null;
        this.fields[4] = 'PBBool';
        this.values[4] = null;
        this.value = this;
    };

    RelationCondition.prototype = new PBMessage();
       
    RelationCondition.prototype.setComparator = function (value) {
        this.setValue(1, value);
    };

    RelationCondition.prototype.setColumnName = function (value) {
        this.setValue(2, value);
    };

    RelationCondition.prototype.setColumnValue = function (value) {
        this.setValue(3, value);
    };

    RelationCondition.prototype.setPassIfMissing = function (value) {
        this.setValue(4, value);
    };

    return RelationCondition;
})

// Composite Condition Object
.factory('CompositeCondition', function (PBMessage) {
    var CompositeCondition = function () {
        PBMessage.apply(this, arguments);
        this.fields[1] = 'LogicalOperator';
        this.values[1] = '';
        this.fields[2] = 'ColumnCondition';
        this.values[2] = [];
        this.value = this;
    };

    CompositeCondition.prototype = new PBMessage();

    CompositeCondition.prototype.setCombinator = function (value) {
        this.setValue(1, value);
    };

    CompositeCondition.prototype.setSubConditions = function (index, value) {
        this.setArrValue(2, index, value);
    };

    return CompositeCondition;
})

// Column Object
.factory('Column', function (PBMessage) {
    var Column = function (reader) {
        if (typeof reader == 'undefined') reader = null;
        PBMessage.apply(this, arguments);
        this.fields[1] = 'PBString';
        this.values[1] = '';
        this.fields[2] = 'ColumnValue';
        this.values[2] = null;
        this.reader = reader;
        this.value = this;
    };

    Column.prototype = new PBMessage();

    Column.prototype.setName = function (value) {
        this.setValue(1, value);
    };

    Column.prototype.name = function () {
        return this.get_value(1);
    };

    Column.prototype.set_value = function (value) {
        this.setValue(2, value);
    };

    Column.prototype.value = function () {
        return this.get_value(2);
    };

    return Column;
})

// Column Value Object
.factory('ColumnValue', function (PBMessage) {
    var ColumnValue = function (reader) {
        if (typeof reader == 'undefined') reader = null;
        PBMessage.apply(this, arguments);
        this.fields[1] = 'ColumnType';
        this.values[1] = null;
        this.fields[2] = 'PBInt';
        this.values[2] = null;
        this.fields[3] = 'PBString';
        this.values[3] = null;
        this.fields[4] = 'PBBool';
        this.values[4] = null;
        this.fields[5] = 'PBDouble';
        this.values[5] = null;
        this.fields[6] = 'PBString';
        this.values[6] = null;
        this.reader = reader;
        this.value = this;
    };

    ColumnValue.prototype = new PBMessage();

    ColumnValue.prototype.setType = function (value) {
        this.setValue(1, value);
    };

    ColumnValue.prototype.type = function () {
        return this.get_value(1);
    };

    ColumnValue.prototype.setVInt = function (value) {
        this.setValue(2, value);
    };

    ColumnValue.prototype.v_int = function () {
        return this.get_value(2);
    };

    ColumnValue.prototype.setVString = function (value) {
        this.setValue(3, value);
    };

    ColumnValue.prototype.v_string = function () {
        return this.get_value(3);
    };

    ColumnValue.prototype.setVBool = function (value) {
        this.setValue(4, value);
    };

    ColumnValue.prototype.v_bool = function () {
        return this.get_value(4);
    };

    ColumnValue.prototype.setVDouble = function (value) {
        this.setValue(5, value);
    };

    ColumnValue.prototype.v_double = function () {
        return this.get_value(5);
    };

    ColumnValue.prototype.setVBinary = function (value) {
        this.setValue(6, value);
    };

    ColumnValue.prototype.v_binary = function () {
        return this.get_value(6);
    };

    return ColumnValue;
})

// Column Condition Object
.factory('ColumnCondition', function (PBMessage) {
    var ColumnCondition = function () {
        PBMessage.apply(this, arguments);
        this.fields[1] = 'ColumnConditionType';
        this.values[1] = '';
        this.fields[2] = 'PBString';
        this.values[2] = '';
        this.value = this;
    };

    ColumnCondition.prototype = new PBMessage();

    ColumnCondition.prototype.setType = function (value) {
        this.setValue(1, value);
    };

    ColumnCondition.prototype.setCondition = function (value) {
        this.setValue(2, value);
    };

    return ColumnCondition;
})

// Column Update Object
.factory('ColumnUpdate', function (PBMessage) {
    var ColumnUpdate = function () {
        PBMessage.apply(this, arguments);
        this.fields[1] = 'OperationType';
        this.values[1] = '';
        this.fields[2] = 'PBString';
        this.values[2] = '';
        this.fields[3] = 'ColumnValue';
        this.values[3] = null;
        this.value = this;
    };

    ColumnUpdate.prototype = new PBMessage();

    ColumnUpdate.prototype.setType = function (value) {
        this.setValue(1, value);
    };

    ColumnUpdate.prototype.setName = function (value) {
        this.setValue(2, value);
    };

    ColumnUpdate.prototype.set_value = function (value) {
        this.setValue(3, value);
    };

    return ColumnUpdate;
})

// Consumed Capacity Object
.factory('ConsumedCapacity', function (PBMessage) {
    var ConsumedCapacity = function (reader) {
        if (typeof reader == 'undefined') reader = null;
        PBMessage.apply(this, arguments);
        this.fields[1] = 'CapacityUnit';
        this.values[1] = '';      
        this.reader = reader;
        this.value = this;
    };

    ConsumedCapacity.prototype = new PBMessage();

    ConsumedCapacity.prototype.set_capacity_unit = function (value) {
        return this.setValue(1, value);
    };

    ConsumedCapacity.prototype.capacity_unit = function () {
        return this.get_value(1);
    };

    return ConsumedCapacity;
})

// Row Object
.factory('Row', function (PBMessage) {
    var Row = function (reader) {
        if (typeof reader == 'undefined') reader = null;
        PBMessage.apply(this, arguments);
        this.fields[1] = 'Column';
        this.values[1] = [];
        this.fields[2] = 'Column';
        this.values[2] = [];
        this.reader = reader;
        this.value = this;
    };

    Row.prototype = new PBMessage();

    Row.prototype.primary_key_columns_size = function () {
        return this.getArrSize(1);
    };

    Row.prototype.primary_key_columns = function (offset) {
        return this.getArrValue(1, offset);
    };

    Row.prototype.attribute_columns_size = function () {
        return this.getArrSize(2);
    };

    Row.prototype.attribute_columns = function (offset) {
        return this.getArrValue(2, offset);
    };

    return Row;
})

// Column Type Object
.factory('ColumnType', function (PBEnum) {
    var ColumnType = function (reader) {
        if (typeof reader == 'undefined') reader = null;
        PBEnum.apply(this, arguments);
        this.INF_MIN = 0;
        this.INF_MAX = 1;
        this.INTEGER = 2;
        this.STRING = 3;
        this.BOOLEAN = 4;
        this.DOUBLE = 5;
        this.BINARY = 6;
        this.reader = reader;
    };

    ColumnType.prototype = new PBEnum(this.reader);

    return ColumnType;
})

// Row Existence Expectation Object
.factory('RowExistenceExpectation', function (PBEnum) {
    var RowExistenceExpectation = function () {
        PBEnum.apply(this, arguments);
        this.IGNORE = 0;
        this.EXPECT_EXIST = 1;
        this.EXPECT_NOT_EXIST = 2;
    };

    RowExistenceExpectation.prototype = new PBEnum();

    return RowExistenceExpectation;
})

// Column Condition Type Object
.factory('ColumnConditionType', function (PBEnum) {
    var ColumnConditionType = function () {
        PBEnum.apply(this, arguments);
        this.CCT_RELATION = 1;
        this.CCT_COMPOSITE = 2;
    };

    ColumnConditionType.prototype = new PBEnum();

    return ColumnConditionType;
})

// Operation Type Object
.factory('OperationType', function (PBEnum) {
    var OperationType = function () {
        PBEnum.apply(this, arguments);
        this.PUT = 1;
        this.DELETE = 2;
    };

    OperationType.prototype = new PBEnum();

    return OperationType;
})

// Logical Operator Type Object
.factory('LogicalOperator', function (PBEnum) {
    var LogicalOperator = function () {
        PBEnum.apply(this, arguments);
        this.LO_NOT = 1;
        this.LO_AND = 2;
        this.LO_OR = 3;
    };

    LogicalOperator.prototype = new PBEnum();

    return LogicalOperator;
})

// Comparator Type Object
.factory('ComparatorType', function (PBEnum) {
    var ComparatorType = function () {
        PBEnum.apply(this, arguments);
        this.CT_EQUAL = 1;
        this.CT_NOT_EQUAL = 2;
        this.CT_GREATER_THAN = 3;
        this.CT_GREATER_EQUAL = 4;
        this.CT_LESS_THAN = 5;
        this.CT_LESS_EQUAL = 6;
    };

    ComparatorType.prototype = new PBEnum();

    return ComparatorType;
});

