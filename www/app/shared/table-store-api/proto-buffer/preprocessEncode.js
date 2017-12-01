/*
 * Preprocess before encoding request body.
 * In other words,  convert constants to interger.
 * 
 * @author: admin
 * @created at 2/3/2017
 */

angular.module('ctpApp.preprocessEncode', [])
.service('preprocessEncode', function (ColumnType, OperationType) {


    /*********************************************************/
    /*                                                        *
    /*              Table Operations Preprocess               *
    /*                                                        *
    /*********************************************************/

    // preprocess request for creating table operation
    this.createTableRequest = function (request) {
        var pkSchema_length = Object.keys(request.table_meta.primary_key_schema).length;
        var pkSchema = [];
        var name = [];
        var type = [];
        for (key in request.table_meta.primary_key_schema) {
            name.push(key);
            type.push(this.preprocessColumeType(request.table_meta.primary_key_schema[key]));
        }
        for (var i = 0; i < pkSchema_length; i++) {
            var pkSchemaItem = {};
            pkSchemaItem.name = name[i];
            pkSchemaItem.type = type[i];
            pkSchema.push(pkSchemaItem);            
        }
        request.table_meta.primary_key_schema = pkSchema;        
        return request;
    };

    /*********************************************************/
    /*                                                        *
    /*              Single Row Operations Preprocess          *
    /*                                                        *
    /*********************************************************/

    // preprocess request to put a row in a specified table.
    this.putRowRequest = function (request) {

        request.condition = this.preprocessCondition(request.condition);
        request.primary_key = this.preprocessColumns(request.primary_key);

        if (typeof request.attribute_columns == 'undefinded') {
            request.attribute_columns = [];
        }        
        request.attribute_columns = this.preprocessColumns(request.attribute_columns);
        
        return request;
    };

    // preprocess request to get a row from a specified table.
    this.getRowRequest = function (request) {
               
        request.primary_key = this.preprocessColumns(request.primary_key);
        if (typeof request.column_filter != 'undefined') {
            request.column_filter = this.preprocessColumnCondition(request.column_filter);
        }
        
        return request;
    };

    // preprocess request to delete a row from a specified table.
    this.deleteRowRequest = function (request) {

        request.condition = this.preprocessCondition(request.condition);
        request.primary_key = this.preprocessColumns(request.primary_key);
        return request;
    };

    // preprocess request to update a row in a specified table.
    this.updateRowRequest = function (request) {
        
        var ret = {};
        ret.table_name = request.table_name;
        ret.condition = this.preprocessCondition(request.condition);
        ret.primary_key = this.preprocessColumns(request.primary_key);

        var attributeColumns = [];
        if (typeof request.attribute_columns_to_put != 'undefined') {
            var columnsToPut = this.preprocessPutInUpdateRowRequest(request.attribute_columns_to_put);
            attributeColumns = attributeColumns.concat(columnsToPut);
        }

        if (typeof request.attribute_columns_to_delete != 'undefined') {
            
            var columnsToDelete = this.preprocessDeleteInUpdateRowRequest(request.attribute_columns_to_delete);
            attributeColumns = attributeColumns.concat(columnsToDelete);
        }

        ret.attribute_columns = attributeColumns;
        return ret;
    };

    // preprocess columns for putting in update row operation.
    this.preprocessPutInUpdateRowRequest = function (columnsToPut) {
        var ret = [];
        var operationType = new OperationType();

        for (index in columnsToPut) {
            var data = {};
            data.type = operationType.PUT;
            data.name = index;
            data.value = this.preprocessColumnValue(columnsToPut[index]);
            ret.push(data);
        }
        return ret;
    };

    // preprocess columns for delete in update row operation.
    this.preprocessDeleteInUpdateRowRequest = function (columnsToDelete) {
        var ret = [];
        var operationType = new OperationType();

        for (index in columnsToDelete) {
            var data = {};
            data.type = operationType.DELETE;
            data.name = index;
            ret.push(data);
        }
        //console.log(ret);
        return ret;
    };

    /*********************************************************/
    /*                                                        *
    /*              Multiple Row Operations Preprocess        *
    /*                                                        *
    /*********************************************************/

    this.batchGetRowRequest = function (request) {
        var ret = {};
        ret.tables = [];

        if (typeof request.tables != 'undefined') {
            
            var tables_count = request.tables.length;
            for (var i = 0; i < tables_count; i++) {
                var table = {};
                table.rows = [];

                var tbl_name = request.tables[i].table_name;
                table.table_name = tbl_name;

                if (typeof request.tables[i].columns_to_get != 'undefined') {
                    table.columns_to_get = request.tables[i].columns_to_get;
                }

                if (typeof request.tables[i].rows != 'undefined') {
                    var rows = request.tables[i].rows;
                    for (var j = 0; j < rows.length; j++) {
                        var pk = {
                            primary_key: this.preprocessColumns(rows[j].primary_key)
                        };
                        table.rows.push(pk);
                    }
                }

                if (typeof request.tables[i].column_filter != 'undefined') {
                    table.column_filter = this.preprocessColumnCondition(request.tables[i].column_filter);
                }

                ret.tables.push(table);
            }
        }
         
        return ret;
    };

    /*********************************************************/
    /*                                                        *
    /*              Others Preprocess                         *
    /*                                                        *
    /*********************************************************/

    // convert data type to integer.
    this.preprocessColumeType = function (type) {
        var columnType = new ColumnType();
        switch (type) {
            case 'INF_MIN': return columnType.INF_MIN;
            case 'INF_MAX': return columnType.INF_MAX;
            case 'INTEGER': return columnType.INTEGER;
            case 'STRING' : return columnType.STRING;
            case 'BOOLEAN': return columnType.BOOLEAN;
            case 'DOUBLE' : return columnType.DOUBLE;
            case 'BINARY' : return columnType.BINARY;
       }
    };

    // convert objects to array
    this.preprocessColumns = function (columns) {
        var ret = [];
        for (index in columns) {
            var data = {};
            data.name = index;
            data.value = this.preprocessColumnValue(columns[index]);
            ret.push(data);
        }
        return ret;
    };

    // preprocessColumnValue
    this.preprocessColumnValue = function (columnValue) {
        var ret = {};
        if (typeof columnValue == 'number') {
            if (Number(columnValue) === columnValue && columnValue % 1 === 0) {
                columnValue = { type: 'INTEGER', value: columnValue};
            } else if (Number(columnValue) === columnValue && columnValue % 1 !== 0) {
                columnValue = { type: 'DOUBLE', value: columnValue };
            }
        } else if (typeof columnValue == 'boolean') {
            columnValue = { type: 'BOOLEAN', value: columnValue };
        } else if (typeof columnValue == 'string') {
            columnValue = { type: 'STRING', value: columnValue };
        } else if (typeof columnValue == 'object') {
            if (typeof columnValue.type == 'undefined') {
                throw new Error('An array column value must has type field.');
            }
            if (typeof columnValue.type != 'INF_MIN' && typeof columnValue.type != 'INF_MAX' && typeof columnValue.value == 'undefined') {
                throw new Error('A column value wth type INTEGER, STRING, BOOLEAN, DOUBLE, or BINARY must has value field.');
            }
        } else {
            throw new Error('You must be modified preprocecceColumnValue function in preprocessEncode.js');
        }

        var type = this.preprocessColumeType(columnValue.type);
        ret.type = type;
        
        var columnType = new ColumnType();
        switch (type) {
            case columnType.INTEGER: ret.v_int = columnValue.value; break;
            case columnType.STRING: ret.v_string = columnValue.value; break;
            case columnType.BOOLEAN: ret.v_bool = columnValue.value; break;
            case columnType.DOUBLE: ret.v_double = columnValue.value; break;
            case columnType.BINARY: ret.v_binary = columnValue.value; break;
            case columnType.INF_MIN: break;
            case columnType.INF_MAX: break;
        }
        return ret;
    };

    // convert string to object.
    this.preprocessCondition = function (condition) {
        var res = {};
        if (typeof condition == 'string') {
            var condition = this.preprocessRowExistence(condition);
            res.row_existence = condition;
        } else if (typeof condition == 'object') {
            if (condition.row_existence != null) {
                res.row_existence = this.preprocessRowExistence(condition.row_existence);
                if (typeof condition.column_filter != 'undefined') {
                    res.column_filter = this.preprocessColumnCondition(condition.column_filter);
                }
            } else {
                throw new Error('You must modiry preprocessCondition function in proprocessEncode.js');
            }
        }
        //console.log(res);
        return res;
    };

    // column condition
    this.preprocessColumnCondition = function (column_filters) {
        var ret = {};

        for (key in column_filters) {
            if (key == 'logical_operator' || key == 'sub_conditions') {

                if (key == 'logical_operator') {
                    ret[key] = column_filters[key];
                } else if (key == 'sub_conditions') {

                    var sub_conditions = [];
                    var column_filter = column_filters[key];

                    for (index in column_filter) {

                        if (typeof column_filter[index] == 'object') {
                            var column_condition = this.preprocessColumnCondition(column_filter[index]);
                            sub_conditions.push(column_condition);
                        } else {
                            throw new Error('You must modiry preprocessColumnCondition function in proprocessEncode.js');
                        }
                    }
                    
                    ret['sub_conditions'] = sub_conditions;
                }

            } else if (key == 'column_name' || key == 'value' || key == 'comparator') {

                if (key == 'value') {
                    ret[key] = this.preprocessColumnValue(column_filters[key]);
                } else if (key == 'comparator') {
                    ret[key] = this.preprocessComparatorType(column_filters[key]);
                } else {
                    ret[key] = column_filters[key];
                }

            } else {
                throw new Error('You must modiry preprocessColumnCondition function in proprocessEncode.js');
            }
        }
        
        return ret;
    };

    // preprocess Comparator type
    this.preprocessComparatorType = function (type) {
        return type;
    };

    // convert condition data to integer.
    this.preprocessRowExistence = function (condition) {
        switch (condition) {
            case 'IGNORE': return 0;
            case 'EXPECT_EXIST': return 1;
            case 'EXPECT_NOT_EXIST': return 2;
            default: throw new Error('Condition must be set by IGNORE or EXPECT_EXIST, EXPECT_NOT_EXIST');
        }
    };
});