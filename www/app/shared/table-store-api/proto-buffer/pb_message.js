/*
 * Define protocol buffer message.
 * 
 * @author: admin
 * @created at 2/3/2017
 */

angular.module('ctpApp.pbMessage', [])
.factory('PBMessage', function (parseService, PBString, ColumnType, ColumnConditionType, PBInt, RowExistenceExpectation, PBBool, PBDouble, OperationType, ComparatorType, LogicalOperator, WiredType, Base128, PBInputStringReader, convertProvider) {

    var PBMessage = function () {
        this.fields = [];
        this.values = [];
        this.wired_type = WiredType.WIRED_LENGTH_DELIMITED;
        this.base128 = new Base128();
        this.reader = null;
        this.chunk = '';
        this.value = this;
    };

    PBMessage.prototype.setValue = function (index, value) {

        if (typeof value == 'object') {
            this.values[index] = value;
        }
        else {
            switch (this.fields[index]) {
                case 'PBString':
                    this.values[index] = new PBString(); this.values[index].value = value;
                    break;
                case 'ColumnType':
                    this.values[index] = new ColumnType(); this.values[index].value = value;
                    break;
                case 'PBInt':
                    this.values[index] = new PBInt(); this.values[index].value = value;
                    break;
                case 'RowExistenceExpectation':
                    this.values[index] = new RowExistenceExpectation(); this.values[index].value = value;
                    break;
                case 'PBBool':
                    this.values[index] = new PBBool();
                    this.values[index].value = (value == true) ? 1 : 0;
                    break;
                case 'PBDouble':
                    this.values[index] = new PBDouble(); this.values[index].value = value;
                    break;
                case 'OperationType':
                    this.values[index] = new OperationType(); this.values[index].value = value;
                    break;
                case 'ComparatorType':
                    this.values[index] = new ComparatorType(); this.values[index].value = value;
                    break;
                case 'ColumnConditionType':
                    this.values[index] = new ColumnConditionType(); this.values[index].value = value;
                    break;
                case 'LogicalOperator':
                    this.values[index] = new LogicalOperator(); this.values[index].value = value;
                    break;
            }
        }
        return;
    };

    PBMessage.prototype.setArrValue = function (index, index_arr, value) {
        this.values[index][index_arr] = value;
    };

    PBMessage.prototype.getArrValue = function (index, value) {
        return this.values[index][value];
    };

    PBMessage.prototype.getArrSize = function (index) {
        return this.values[index].length;
    };

    PBMessage.prototype.serializeToString = function (rec) {
        if (rec == undefined) rec = -1;
        var string = '';
        if (rec > -1) {
            string += this.base128.setValue((rec << 3) + this.wired_type);
        }
        var stringinner = '';
        
        for (index in this.fields) {
            var value = this.values[index];
            if (Array.isArray(value) && value.length > 0) {
                var indexArray = index;
                for (array in value) {
                    var newstring = '';
                    newstring += value[array].serializeToString(indexArray);
                    stringinner += newstring;
                }
            }
            else if (value != null && value != '') {
                var newstring = '';
                newstring += value.serializeToString(index);
                stringinner += newstring;
            }
        }

        if (this.wired_type == WiredType.WIRED_LENGTH_DELIMITED && rec > -1) {
            stringinner = this.base128.setValue(stringinner.length) + stringinner;
        }

        return string + stringinner;
    };

    PBMessage.prototype.parseFromString = function (message) {
        this.reader = new PBInputStringReader(message);
        this.parse_from_array();
    };

    PBMessage.prototype.parseFromArray = function () {
        this.chunk = '';
        var length = this.reader.next();
        this.parse_from_array(length);
    };

    PBMessage.prototype.parse_from_array = function (length) {
        if (typeof length == 'undefined') length = 99999999;

        var _begin = this.reader.get_pointer();

        while (this.reader.get_pointer() - _begin < length) {
            var next = this.reader.next();
            
            if (next === false) break;

            var messtypes = this.get_types(next);
            
            if (typeof this.fields[messtypes.field] == 'undefined') {

                if (messtypes.wired == WiredType.WIRED_LENGTH_DELIMITED) {
                    var consume = new PBString(this.reader);
                } else if (messtypes.wired == WiredType.WIRED_VARINT) {
                    var consume = new PBInt(this.reader);
                } else throw new Error('You must be modified _parseFromArray function in pb_message.js');

                var _oldpointer = this.reader.get_pointer();
                consume.parseFromArray();

                this.chunk += this.reader.get_message_from(_oldpointer);
                continue;
            }

            if (Array.isArray(this.values[messtypes.field])) {

                var className = this.fields[messtypes.field];
                this.values[messtypes.field].push(parseService.parseServiceNonArray(className, this.reader));

                var index = this.values[messtypes.field].length - 1;
                this.values[messtypes.field][index].parseFromArray();

            } else {
                var className = this.fields[messtypes.field];
                
                this.values[messtypes.field] = parseService.parseServiceNonArray(className, this.reader);
               
                this.values[messtypes.field].parseFromArray();
            }
        }
    };

    PBMessage.prototype.get_types = function (number) {
        var binstring = number.toString(2);
        var type = {};
        var low = binstring.substr(binstring.length - 3, binstring.length);
        var high = binstring.substr(0, binstring.length - 3) + '0000';

        type.wired = convertProvider.bin_to_dec(low);
        type.field = convertProvider.bin_to_dec(binstring) >> 3;

        return type;
    };

    PBMessage.prototype.get_value = function (index) {
        if (this.values[index] == null) return null;
        return this.values[index].value;
    };

    PBMessage.prototype.preprocessParse = function (index) {
        switch (this.fields[index]) {
            case 'PBString':
                this.values[index] = new PBString(); break;
        }
    };

    return PBMessage;
})

// Service for parseFromArray function.
.service('parseService', function ($injector) {
    this.parseServiceNonArray = function (name, reader) {
        var className = $injector.get(name);
        var instance = new className(reader);
        return instance;
    };
});

