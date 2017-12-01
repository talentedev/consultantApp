/*
 * This is middleware for database api.
 * 
 * @author: admin
 * @created at 2/8/2017
 */

angular.module('ctpApp.dbService', [])
.factory('DBService', function (Handler, ColumeType, RowExistenceExpectationConst, ComparatorTypeConst, LogicalOperatorConst) {

    var factory = function () {
       
    };

    /*********************************************************/
    /*                                                        *
    /*              Table Operations                          *
    /*                                                        *
    /*********************************************************/

    // create table operation
    factory.createTable = function () {
        var create_table = {              // create table request example
            table_meta: {
                table_name: "MyTable",
                primary_key_schema: {
                    ID: ColumeType.INTEGER,
                    name: ColumeType.STRING,
                }
            },
            reserved_throughput: {
                capacity_unit: {
                    read: 0,
                    write: 0
                }
            }
        };
    
        var response = Handler.doHandle('CreateTable', create_table);
        return response;
    };

    // delete table operation
    factory.deleteTable = function () {
        var delete_table = {                  // delete table request example
            table_name: "MyTable"
        };
        var response = Handler.doHandle('DeleteTable', delete_table);
        return response;
    };

    // list table operation
    factory.listTable = function () {
        var response = Handler.doHandle('ListTable', '');
        return response;
    };

    /*********************************************************/
    /*                                                        *
    /*              Single Row Operations                     *
    /*                                                        *
    /*********************************************************/

    // put row operation
    factory.putRow = function () {

        var put_row = {                              // put columns to a special row.
            table_name: "MyTable",
            condition: RowExistenceExpectationConst.CONST_IGNORE,
            primary_key: {
                PK0: 123,
                PK1: 'abc',
            },
            attribute_columns: {
                attr0: 145,
                attr1: 'Hangzhou',
                attr2: 3.14,          // warning : input integer instead double if data is double.
                attr3: true,
                //attr4: {
                 //  type: 'BINARY',
                 //  value: ''
               //}
            }
        };

        var put_row_with_filter = {                   // put columns with filter.
            table_name: "MyTable",
            condition: {
                row_existence: RowExistenceExpectationConst.CONST_EXPECT_EXIST,
                column_filter: {
                    column_name: 'attr0',
                    value: 123,
                    comparator: ComparatorTypeConst.CONST_EQUAL
                }
            },
            primary_key: {
                PK0: 123,
                PK1: 'abc',
            },
            attribute_columns: {
                attr0: 70,
                attr1: 'beijing',
                attr2: 31,          // warning : input integer instead double if data is double.
                attr3: false                
            }
        };

        var response = Handler.doHandle('PutRow', put_row);
        return response;
    };

    // get row opoeration
    factory.getRow = function () {

        var get_row = {                         // get all columns from a special row.
            table_name: "MyTable",
            primary_key: {
                PK0: 123,
                PK1: 'abc',
            }
        };

        var get_row_columns_to_get = {                         // get special columns from a special row.
            table_name: "MyTable",
            primary_key: {
                PK0: 123,
                PK1: 'abc',
            },
            columns_to_get: [
                'attr0',
                'attr3'
            ]
        };

        var get_row_with_single_column_filter = {                         // get special columns with single filter from a special row.
            table_name: "MyTable",
            primary_key: {
                PK0: 123,
                PK1: 'abc',
            },
            columns_to_get: [
                'attr0',
                'attr3'
            ],
            column_filter: {
                column_name: 'attr0',
                value: 123,
                comparator: ComparatorTypeConst.CONST_NOT_EQUAL
            }
        };

        var get_row_with_multiple_column_filter = {                         // get special columns with multiple filter from a special row.
            table_name: "MyTable",
            primary_key: {
                PK0: 123,
                PK1: 'abc',
            },
            columns_to_get: [
                'attr0',
                'attr3'
            ],
            column_filter: {
                logical_operator: LogicalOperatorConst.CONST_AND,
                sub_conditions: [
                    {
                        column_name: 'attr0',
                        value: 70,
                        comparator: ComparatorTypeConst.CONST_EQUAL
                    },
                    {
                        column_name: 'attr3',
                        value: false,
                        comparator: ComparatorTypeConst.CONST_EQUAL
                    }
                ]                
            }
        };

        var response = Handler.doHandle('GetRow', get_row);
        return response;
    };

    // delete row opoeration
    factory.deleteRow = function () {
        
        var delete_row = {
            table_name: "MyTable",
            condition: RowExistenceExpectationConst.CONST_IGNORE,
            primary_key: {
                PK0: 123,
                PK1: 'abc',
            }
        };


        var delete_row_with_column_filter = {
            table_name: "MyTable",
            condition: {
                row_existence: RowExistenceExpectationConst.CONST_IGNORE,
                column_filter: {
                    logical_operator: LogicalOperatorConst.CONST_AND,
                    sub_conditions: [
                        {
                            column_name: 'attr0',
                            value: 123,
                            comparator: ComparatorTypeConst.CONST_EQUAL
                        },
                        {
                            column_name: 'attr3',
                            value: true,
                            comparator: ComparatorTypeConst.CONST_EQUAL
                        }
                    ]
                }
            },
            primary_key: {
                PK0: 123,
                PK1: 'abc'
            }
        };

        var response = Handler.doHandle('DeleteRow', delete_row);
        return response;
    };

    // update row opoeration
    factory.updateRow = function () {

        var update_row_put = {                                         // put columns to a special row.
            table_name: "MyTable",
            condition: RowExistenceExpectationConst.CONST_IGNORE,
            primary_key: {
                PK0: 123,
                PK1: 'abc',
            },
            attribute_columns_to_put: {
                attr0: 70,
                new_column: 'abc'
            }
        };

        var update_row_delete = {                                     // delete columns from a special row.
            table_name: "MyTable",
            condition: RowExistenceExpectationConst.CONST_IGNORE,
            primary_key: {
                PK0: 123,
                PK1: 'abc',
            },
            attribute_columns_to_delete: {
                attr1: '',
                attr2: ''
            }
        };

        var update_row_with_filter = {                               // put or delete columns with filter.
            table_name: "MyTable",
            condition: {
                row_existence: RowExistenceExpectationConst.CONST_IGNORE,
                column_filter: {
                    column_name: 'attr0',
                    value: 123,
                    comparator: ComparatorTypeConst.CONST_EQUAL
                }
            },
            primary_key: {
                PK0: 123,
                PK1: 'abc',
            },           
            attribute_columns_to_delete: {
                attr1: '',
                attr2: ''
            }
        };

        var response = Handler.doHandle('UpdateRow', update_row_put);
        
        return response;
    };

    /*********************************************************/
    /*                                                        *
    /*              Multple Row Operations                    *
    /*                                                        *
    /*********************************************************/

    // Batch Get Row Operation
    factory.batchGetRow = function () {

        var batch_get_row = {
            tables: [
                {
                    table_name: "MyTable",
                    rows: [
                        {
                            primary_key: {
                                PK0: 1,
                                PK1: 'Zhejiang',
                            }
                        },
                        {
                            primary_key: {
                                PK0: 2,
                                PK1: 'Jiangsu',
                            }
                        },
                        {
                            primary_key: {
                                PK0: 3,
                                PK1: 'Guangdong',
                            }
                        }
                    ]
                },
            ],
        };

        var batch_get_row_columns_to_get= {
            tables: [
                {
                    table_name: "MyTable",
                    rows: [
                        {
                            primary_key: {
                                PK0: 1,
                                PK1: 'Zhejiang',
                            }
                        },
                        {
                            primary_key: {
                                PK0: 2,
                                PK1: 'Jiangsu',
                            }
                        },
                        {
                            primary_key: {
                                PK0: 3,
                                PK1: 'Guangdong',
                            }
                        }
                    ],
                    columns_to_get: [
                        'PK1',
                        'attr1'
                    ]
                },
            ],
        };
        
        var response = Handler.doHandle('BatchGetRow', batch_get_row_columns_to_get);

        return response;
    };
    
    return factory;
});