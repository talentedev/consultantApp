/*
 * Define the constants for table store.
 * 
 * @author: admin
 * @created at 2/3/2017
 */

angular.module('ctpApp.constants', [])
// constants for access to table store
.constant('BASE_URL', 'http://Consultant.cn-hangzhou.ots.aliyuncs.com/')
.constant('ACCESSKEY_ID', 'LTAI7fP7ybpsawb9')
.constant('API_VERSION', '2014-08-08')
.constant('INSTANCE_NAME', 'Consultant')
.constant('SECRET_KEY', 'Vj7wNWxXVK9ToDhqf60k8M6L0kHbyw')

/////////////////////////////////////////////
// constants to be used for protocol buffer
/////////////////////////////////////////////

// ColumeType constants
.constant('ColumeType', {
    INF_MIN: "INF_MIN",
    INF_MAX: "INF_MAX",
    INTEGER: "INTEGER",
    STRING: "STRING",
    BOOLEAN: "BOOLEAN",
    DOUBLE: "DOUBLE",
    BINARY: "BINARY"
})
// Wired Type
.constant('WiredType', {
    WIRED_VARINT: 0,
    WIRED_64BIT: 1,
    WIRED_LENGTH_DELIMITED: 2,
    WIRED_START_GROUP: 3,
    WIRED_START_GROUP: 4,
    WIRED_32BIT: 5,
})

// These constants are used to describe the expected value for the existence of a data row.
.constant('RowExistenceExpectationConst', {
    CONST_IGNORE: 'IGNORE',
    CONST_EXPECT_EXIST: 'EXPECT_EXIST',
    CONST_EXPECT_NOT_EXIST: 'EXPECT_NOT_EXIST',
})

// Comparator Type Const
.constant('ComparatorTypeConst', {
    CONST_EQUAL: 1,
    CONST_NOT_EQUAL: 2,
    CONST_GREATER_THAN: 3,
    CONST_GREATER_EQUAL: 4,
    CONST_LESS_THAN: 5,
    CONST_LESS_EQUAL: 6,
})

// LogicalOperator Const
.constant('LogicalOperatorConst', {
    CONST_NOT: 1,
    CONST_AND: 2,
    CONST_OR: 3,    
});
