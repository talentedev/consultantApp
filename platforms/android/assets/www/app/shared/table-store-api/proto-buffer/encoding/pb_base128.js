/*
 * Base 128 varints - decodes and encodes base128 varints to/from decimal
 * 
 * @author: admin
 * @created at 2/7/2017
 */

angular.module('ctpApp.base128', [])
.factory('Base128', function (convertProvider) {

    var Base128 = function () {
        
    };
   
    Base128.prototype.setValue = function (value) {
        return convertProvider.binary(value);
    };

    Base128.prototype.getValue = function (value) {
        return convertProvider.bin_to_dec(value);
    };

    return Base128;
})