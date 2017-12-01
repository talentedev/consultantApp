/*
 * Encode object to protocol buffer.
 * 
 * @author: admin
 * @created at 2/3/2017
 */

angular.module('ctpApp.protoBufferEncode', [])
.service('protoBufferEncode', function (PBMessage, CreateTableRequest, DeleteTableRequest, PutRowRequest, GetRowRequest, DeleteRowRequest, UpdateRowRequest, BatchGetRowRequest, TableInBatchGetRowRequest, RowInBatchGetRowRequest, ColumnUpdate, TableMeta, ColumnSchema, ReservedThroughput, CapacityUnit, preprocessEncode, Condition, ColumnCondition, CompositeCondition, ColumnConditionType, RelationCondition, Column, ColumnValue, ColumnType) {
    
    this.request = {};

    /*********************************************************/
    /*                                                        *
    /*              Table Operations Encode                   *
    /*                                                        *
    /*********************************************************/

    // Encode request for listing the existing tables.
    this.encodeListTableRequest = function (request) {
        return '';
    };

    // Encode request for deleting the existing table.
    this.encodeDeleteTableRequest = function (request) {
        var deleteTableRequest = new DeleteTableRequest();
        deleteTableRequest.setTableName(request.table_name);
        return deleteTableRequest.serializeToString();
    };

    // Encode request for creating new table.
    this.encodeCreateTableRequest = function (request) {
        
        var request = preprocessEncode.createTableRequest(request);
        
        var createTableRequest = new CreateTableRequest();

        var tableMeta = new TableMeta();
        tableMeta.setTableName(request.table_meta.table_name);       
       
        var pkSchema_count = Object.keys(request.table_meta.primary_key_schema).length;
        for (var i = 0; i < pkSchema_count; i++) {
            var columnSchema = new ColumnSchema();
            columnSchema.setName(request.table_meta.primary_key_schema[i].name);
            columnSchema.setType(request.table_meta.primary_key_schema[i].type);
            tableMeta.setPrimaryKey(i, columnSchema);
        }
        
        var reservedThroughput = new ReservedThroughput();

        var capacityUnit = new CapacityUnit();
        capacityUnit.setRead(request.reserved_throughput.capacity_unit.read);
        capacityUnit.setWrite(request.reserved_throughput.capacity_unit.write);

        reservedThroughput.setCapacityUnit(capacityUnit);
       
        createTableRequest.setTableMeta(tableMeta);
        createTableRequest.setReservedThroughput(reservedThroughput);
        return createTableRequest.serializeToString();
    };

    /*********************************************************/
    /*                                                        *
    /*              Single Row Operations Encode              *
    /*                                                        *
    /*********************************************************/

    // Encode request to put a row in a specified table.
    this.encodePutRowRequest = function (request) {
        
        var request = preprocessEncode.putRowRequest(request);
        
        var putRowRequest = new PutRowRequest();

        var condition = new Condition();
        condition.setRowExistence(request.condition.row_existence);
        if (typeof request.condition.column_filter != 'undefined') {
            condition.setColumnCondition(this.encodeColumnCondition(request.condition.column_filter));
        }
        
        for (var i = 0; i < request.primary_key.length; i++) {
            var pkColumn = new Column();
            var columnValue = new ColumnValue();

            pkColumn.setName(request.primary_key[i].name);

            var columnType = new ColumnType();

            columnValue.setType(request.primary_key[i].value.type);            

            switch (request.primary_key[i].value.type) {
                case columnType.INTEGER:
                    columnValue.setVInt(request.primary_key[i].value.v_int);
                    break;
                case columnType.STRING:
                    columnValue.setVString(request.primary_key[i].value.v_string);
                    break;
                case columnType.BOOLEAN:
                    columnValue.setVBool(request.primary_key[i].value.v_bool);
                    break;
                case columnType.DOUBLE:
                    columnValue.setVDouble(request.primary_key[i].value.v_double);
                    break;
                case columnType.BINARY:
                    columnValue.setVBinary(request.primary_key[i].value.v_binary);
                    break;
                default:
                    columnValue.setVString(request.primary_key[i].value.v_string);
            }            
            pkColumn.set_value(columnValue);
            putRowRequest.setPrimaryKey(i, pkColumn);            
        }

        if (typeof request.attribute_columns != 'undefined') {
            for (var i = 0; i < request.attribute_columns.length; i++) {
                var attributeColumn = new Column();
                var columnValue = new ColumnValue();

                attributeColumn.setName(request.attribute_columns[i].name);
                columnValue.setType(request.attribute_columns[i].value.type);

                switch (request.attribute_columns[i].value.type) {
                    case columnType.INTEGER:
                        columnValue.setVInt(request.attribute_columns[i].value.v_int);
                        break;
                    case columnType.STRING:
                        columnValue.setVString(request.attribute_columns[i].value.v_string);
                        break;
                    case columnType.BOOLEAN:
                        columnValue.setVBool(request.attribute_columns[i].value.v_bool);
                        break;
                    case columnType.DOUBLE:
                        columnValue.setVDouble(request.attribute_columns[i].value.v_double);
                        break;
                    case columnType.BINARY:
                        columnValue.setVBinary(request.attribute_columns[i].value.v_binary);
                        break;
                    default:
                        columnValue.setVString(request.attribute_columns[i].value.v_string);
                }

                attributeColumn.set_value(columnValue);               
                putRowRequest.setAttributeColumns(i, attributeColumn);
            }            
        }

        putRowRequest.setTableName(request.table_name);
        putRowRequest.setCondition(condition);
        
        return putRowRequest.serializeToString();
    };

    // Encode request for getting a single row.
    this.encodeGetRowRequest = function (request) {
        var request = preprocessEncode.getRowRequest(request);

        var getRowRequest = new GetRowRequest();

        for (var i = 0; i < request.primary_key.length; i++) {
            var pkColumn = new Column();
            var columnValue = new ColumnValue();

            pkColumn.setName(request.primary_key[i].name);

            var columnType = new ColumnType();

            columnValue.setType(request.primary_key[i].value.type);

            switch (request.primary_key[i].value.type) {
                case columnType.INTEGER:
                    columnValue.setVInt(request.primary_key[i].value.v_int);
                    break;
                case columnType.STRING:
                    columnValue.setVString(request.primary_key[i].value.v_string);
                    break;
                case columnType.BOOLEAN:
                    columnValue.setVBool(request.primary_key[i].value.v_bool);
                    break;
                case columnType.DOUBLE:
                    columnValue.setVDouble(request.primary_key[i].value.v_double);
                    break;
                case columnType.BINARY:
                    columnValue.setVBinary(request.primary_key[i].value.v_binary);
                    break;
                default:
                    columnValue.setVString(request.primary_key[i].value.v_string);
            }
            pkColumn.set_value(columnValue);
            getRowRequest.setPrimaryKey(i, pkColumn);
        }

        if (typeof request.columns_to_get != 'undefined') {
            for (var i = 0; i < request.columns_to_get.length; i++) {
                getRowRequest.setColumnsToGet(i, request.columns_to_get[i]);
            }
        }

        if (typeof request.column_filter != 'undefined') {
            getRowRequest.setFilter(this.encodeColumnCondition(request.column_filter));
        }

        getRowRequest.setTableName(request.table_name);
        
        return getRowRequest.serializeToString();
    };

    // Encode request for deleting a row from a specified table.
    this.encodeDeleteRowRequest = function (request) {
        var request = preprocessEncode.deleteRowRequest(request);

        var deleteRowRequest = new DeleteRowRequest();
        deleteRowRequest.setTableName(request.table_name);

        var condition = new Condition();
        condition.setRowExistence(request.condition.row_existence);
        if (typeof request.condition.column_filter != 'undefined') {
            condition.setColumnCondition(this.encodeColumnCondition(request.condition.column_filter));
        }
        deleteRowRequest.setCondition(condition);

        for (var i = 0; i < request.primary_key.length; i++) {
            var pkColumn = new Column();
            var columnValue = new ColumnValue();

            pkColumn.setName(request.primary_key[i].name);

            var columnType = new ColumnType();

            columnValue.setType(request.primary_key[i].value.type);

            switch (request.primary_key[i].value.type) {
                case columnType.INTEGER:
                    columnValue.setVInt(request.primary_key[i].value.v_int);
                    break;
                case columnType.STRING:
                    columnValue.setVString(request.primary_key[i].value.v_string);
                    break;
                case columnType.BOOLEAN:
                    columnValue.setVBool(request.primary_key[i].value.v_bool);
                    break;
                case columnType.DOUBLE:
                    columnValue.setVDouble(request.primary_key[i].value.v_double);
                    break;
                case columnType.BINARY:
                    columnValue.setVBinary(request.primary_key[i].value.v_binary);
                    break;
                default:
                    columnValue.setVString(request.primary_key[i].value.v_string);
            }
            pkColumn.set_value(columnValue);
            deleteRowRequest.setPrimaryKey(i, pkColumn);
        }
        //console.log(deleteRowRequest);
        return deleteRowRequest.serializeToString();
    };

    // Encode request for listing the existing tables.
    this.encodeUpdateRowRequest = function (request) {
        
        var request = preprocessEncode.updateRowRequest(request);
        
        var updateRowRequest = new UpdateRowRequest();
        updateRowRequest.setTableName(request.table_name);

        var condition = new Condition();
        condition.setRowExistence(request.condition.row_existence);

        if (typeof request.condition.column_filter != 'undefined') {
            condition.setColumnCondition(this.encodeColumnCondition(request.condition.column_filter));
        }

        updateRowRequest.setCondition(condition);

        for (var i = 0; i < request.primary_key.length; i++) {
            var pkColumn = new Column();
            var columnValue = new ColumnValue();

            pkColumn.setName(request.primary_key[i].name);

            var columnType = new ColumnType();

            columnValue.setType(request.primary_key[i].value.type);

            switch (request.primary_key[i].value.type) {
                case columnType.INTEGER:
                    columnValue.setVInt(request.primary_key[i].value.v_int);
                    break;
                case columnType.STRING:
                    columnValue.setVString(request.primary_key[i].value.v_string);
                    break;
                case columnType.BOOLEAN:
                    columnValue.setVBool(request.primary_key[i].value.v_bool);
                    break;
                case columnType.DOUBLE:
                    columnValue.setVDouble(request.primary_key[i].value.v_double);
                    break;
                case columnType.BINARY:
                    columnValue.setVBinary(request.primary_key[i].value.v_binary);
                    break;
                default:
                    columnValue.setVString(request.primary_key[i].value.v_string);
            }
            pkColumn.set_value(columnValue);
            updateRowRequest.setPrimaryKey(i, pkColumn);
        }

        if (typeof request.attribute_columns != 'undefined') {
            for (var i = 0; i < request.attribute_columns.length; i++) {
                var attributeColumn = new ColumnUpdate();
                var columnValue = new ColumnValue();

                attributeColumn.setName(request.attribute_columns[i].name);
                attributeColumn.setType(request.attribute_columns[i].type);

                if (typeof request.attribute_columns[i].value != 'undefined') {
                    columnValue.setType(request.attribute_columns[i].value.type);

                    switch (request.attribute_columns[i].value.type) {
                        case columnType.INTEGER:
                            columnValue.setVInt(request.attribute_columns[i].value.v_int);
                            break;
                        case columnType.STRING:
                            columnValue.setVString(request.attribute_columns[i].value.v_string);
                            break;
                        case columnType.BOOLEAN:
                            columnValue.setVBool(request.attribute_columns[i].value.v_bool);
                            break;
                        case columnType.DOUBLE:
                            columnValue.setVDouble(request.attribute_columns[i].value.v_double);
                            break;
                        case columnType.BINARY:
                            columnValue.setVBinary(request.attribute_columns[i].value.v_binary);
                            break;
                        default:
                            columnValue.setVString(request.attribute_columns[i].value.v_string);
                    }

                    attributeColumn.set_value(columnValue);
                }
                
                updateRowRequest.setAttributeColumns(i, attributeColumn);
            }
        }

        //console.log(updateRowRequest);
        return updateRowRequest.serializeToString();
    };

    /*********************************************************/
    /*                                                        *
    /*              Multiple Row Operations Encode            *
    /*                                                        *
    /*********************************************************/

    // Encode request for several rows from one and more tables.
    this.encodeBatchGetRowRequest = function (request) {
       
        var request = preprocessEncode.batchGetRowRequest(request);
       // console.log(request);
        var batchGetRowRequest = new BatchGetRowRequest();

        if (typeof request.tables != 'undefined') {
            var tables = request.tables;
            for (var i = 0; i < tables.length; i++) {
                var tableInBatchGetRowRequest = new TableInBatchGetRowRequest();
                tableInBatchGetRowRequest.setTableName(request.tables[i].table_name);

                if (typeof request.tables[i].rows != 'undefined') {
                    var rows = request.tables[i].rows;
                    for (var j = 0; j < rows.length; j++) {
                        var rowInBatchGetRowRequest = new RowInBatchGetRowRequest();

                        var pk = rows[j].primary_key;
                        for (var k = 0; k < pk.length; k++) {
                            var pkColumn = new Column();
                            var columnValue = new ColumnValue();

                            pkColumn.setName(pk[k].name);

                            var columnType = new ColumnType();

                            columnValue.setType(pk[k].value.type);
                            
                            switch (pk[k].value.type) {
                                case columnType.INTEGER:
                                    columnValue.setVInt(pk[k].value.v_int);
                                    break;
                                case columnType.STRING:
                                    columnValue.setVString(pk[k].value.v_string);
                                    break;
                                case columnType.BOOLEAN:
                                    columnValue.setVBool(pk[k].value.v_bool);
                                    break;
                                case columnType.DOUBLE:
                                    columnValue.setVDouble(pk[k].value.v_double);
                                    break;
                                case columnType.BINARY:
                                    columnValue.setVBinary(pk[k].value.v_binary);
                                    break;
                                default:
                                    columnValue.setVString(pk[k].value.v_string);
                            }

                            pkColumn.set_value(columnValue);
                            rowInBatchGetRowRequest.setPrimaryKey(k, pkColumn);
                        }

                        tableInBatchGetRowRequest.set_rows(j, rowInBatchGetRowRequest);
                    }
                }

                if (typeof request.tables[i].columns_to_get != 'undefined') {
                    var columns = request.tables[i].columns_to_get;
                    for (var p = 0; p < columns.length; p++) {
                        tableInBatchGetRowRequest.set_columns_to_get(p, columns[p]);
                    }
                }

                batchGetRowRequest.set_tables(i, tableInBatchGetRowRequest);
            }
        }

        console.log(batchGetRowRequest);

        return batchGetRowRequest.serializeToString();
    };

    /*********************************************************/
    /*                                                        *
    /*              Others Encode                             *
    /*                                                        *
    /*********************************************************/

    // Encode Column Condition
    this.encodeColumnCondition = function (column_filter) {
        var res = null;
        
        if (typeof column_filter.logical_operator != 'undefined' && typeof column_filter.sub_conditions != 'undefined') {
            
            var compositeCondition = new CompositeCondition();
            compositeCondition.setCombinator(column_filter.logical_operator);

            for (var i = 0; i < column_filter.sub_conditions.length; i++) {
                var sub_cond = column_filter.sub_conditions[i];
                compositeCondition.setSubConditions(i, this.encodeColumnCondition(sub_cond));
            }

            var columnCondition = new ColumnCondition();
            var columnConditionType = new ColumnConditionType();
            columnCondition.setType(columnConditionType.CCT_COMPOSITE);
            columnCondition.setCondition(compositeCondition.serializeToString());

            res = columnCondition;
        } else if (typeof column_filter.column_name != 'undefined' && typeof column_filter.value != 'undefined' && typeof column_filter.comparator != 'undefined') {

            var relationCondition = new RelationCondition();

            relationCondition.setComparator(column_filter.comparator);
            relationCondition.setColumnName(column_filter.column_name);

            var columnValue = new ColumnValue();
            columnValue.setType(column_filter.value.type);

            var columnType = new ColumnType();

            switch (column_filter.value.type) {
                case columnType.INTEGER:
                    columnValue.setVInt(column_filter.value.v_int);
                    break;
                case columnType.STRING:
                    columnValue.setVString(column_filter.value.v_string);
                    break;
                case columnType.BOOLEAN:
                    columnValue.setVBool(column_filter.value.v_bool);
                    break;
                case columnType.DOUBLE:
                    columnValue.setVDouble(column_filter.value.v_double);
                    break;
                case columnType.BINARY:
                    columnValue.setVBinary(column_filter.value.v_binary);
                    break;
                default:
                    columnValue.setVString(column_filter.value.v_string);
            }

            relationCondition.setColumnValue(columnValue);
            
            if (typeof column_filter.pass_if_missing == 'undefined') {
                relationCondition.setPassIfMissing(true);
            } else {
                relationCondition.setPassIfMissing(column_filter.pass_if_missing);
            }

            var columnCondition = new ColumnCondition();

            var columnConditionType = new ColumnConditionType();

            columnCondition.setType(columnConditionType.CCT_RELATION);
            columnCondition.setCondition(relationCondition.serializeToString());

            res = columnCondition;
        }
                
        return res;
    };
});
