/*
 * Reads string input.
 * 
 * @author: admin
 * @created at 2/16/2017
 */

angular.module('ctpApp.pbReader', [])

 // PBInputReader Object
.factory('PBInputReader', function (Base128) {

    var PBInputReader = function () {
        this.string = '';
        this.base128 = new Base128();
        this.pointer = 0;
    };
        
    PBInputReader.prototype.get_pointer = function () {
        return this.pointer;
    };

    PBInputReader.prototype.add_pointer = function (add) {
        this.pointer += add;
    };

    PBInputReader.prototype.get_message_from = function (from) {
        return this.string.substr(from, this.pointer - from);
    };

    return PBInputReader;
})

// PBInputStringReader Object
.factory('PBInputStringReader', function (PBInputReader) {

    var PBInputStringReader = function (string) {
        PBInputReader.apply(this, arguments);
        this.string = string;
        this.str_length = string.length;
    };

    PBInputStringReader.prototype = new PBInputReader();

    PBInputStringReader.prototype.next = function (is_string) {
        if (is_string == undefined) rec = false;

        var pack = '';

        while (true) {
            if (this.pointer >= this.str_length) {
                return false;
            }

            var string = '';
            string = this.string[this.pointer];
            this.pointer++;

            if (is_string == true) {
                return string.charCodeAt(0);
            }

            var value = string.charCodeAt(0).toString(2);
            if (value >= 10000000 && is_string == false) {
                pack += value;
            } else {
                value = '00000000'.substr(0, 8 - value.length % 8) + value;
                return this.base128.getValue(pack + value);
            }
            
        }
    };
       
    return PBInputStringReader;
});