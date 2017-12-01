angular.module('ctApp.convertor', [])

.provider('convertProvider', function () {
    this.$get = function () {
        return {
            // convert hex to binary
            hextobin: function (hex) {
                var bytes = [],
                    length = hex.length,
                    x;
                for (x = 0; x < length - 1; x += 2) {
                    bytes.push(parseInt(hex.substr(x, 2), 16));
                }
                return String.fromCharCode.apply(String, bytes);
            },
            // hmac sha1 function
            b64_hmac_sha1: function (k, d, _p, _z) {
                if (!_p) { _p = '='; } if (!_z) { _z = 8; } function _f(t, b, c, d) { if (t < 20) { return (b & c) | ((~b) & d); } if (t < 40) { return b ^ c ^ d; } if (t < 60) { return (b & c) | (b & d) | (c & d); } return b ^ c ^ d; } function _k(t) { return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514; } function _s(x, y) { var l = (x & 0xFFFF) + (y & 0xFFFF), m = (x >> 16) + (y >> 16) + (l >> 16); return (m << 16) | (l & 0xFFFF); } function _r(n, c) { return (n << c) | (n >>> (32 - c)); } function _c(x, l) { x[l >> 5] |= 0x80 << (24 - l % 32); x[((l + 64 >> 9) << 4) + 15] = l; var w = [80], a = 1732584193, b = -271733879, c = -1732584194, d = 271733878, e = -1009589776; for (var i = 0; i < x.length; i += 16) { var o = a, p = b, q = c, r = d, s = e; for (var j = 0; j < 80; j++) { if (j < 16) { w[j] = x[i + j]; } else { w[j] = _r(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1); } var t = _s(_s(_r(a, 5), _f(j, b, c, d)), _s(_s(e, w[j]), _k(j))); e = d; d = c; c = _r(b, 30); b = a; a = t; } a = _s(a, o); b = _s(b, p); c = _s(c, q); d = _s(d, r); e = _s(e, s); } return [a, b, c, d, e]; } function _b(s) { var b = [], m = (1 << _z) - 1; for (var i = 0; i < s.length * _z; i += _z) { b[i >> 5] |= (s.charCodeAt(i / 8) & m) << (32 - _z - i % 32); } return b; } function _h(k, d) { var b = _b(k); if (b.length > 16) { b = _c(b, k.length * _z); } var p = [16], o = [16]; for (var i = 0; i < 16; i++) { p[i] = b[i] ^ 0x36363636; o[i] = b[i] ^ 0x5C5C5C5C; } var h = _c(p.concat(_b(d)), 512 + d.length * _z); return _c(o.concat(h), 512 + 160); } function _n(b) { var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = ''; for (var i = 0; i < b.length * 4; i += 3) { var r = (((b[i >> 2] >> 8 * (3 - i % 4)) & 0xFF) << 16) | (((b[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4)) & 0xFF) << 8) | ((b[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4)) & 0xFF); for (var j = 0; j < 4; j++) { if (i * 8 + j * 6 > b.length * 32) { s += _p; } else { s += t.charAt((r >> 6 * (3 - j)) & 0x3F); } } } return s; } function _x(k, d) { return _n(_h(k, d)); } return _x(k, d);
            },
            // convert binary to decimal
            bin_to_dec: function (bstr) {
                return parseInt((bstr + '').replace(/[^01]/gi, ''), 2);
            },           
            // convert hex to str
            hexTostr: function (hex) {

                var str = '';
                for (var i = 0; i < hex.length; i += 2) {
                    str += this.chr(parseInt(hex.substr(i, 2), 16));
                }
                return str;
            },
            // evaluate to php's chr function
            chr: function (codePt) {
                if (codePt > 0xFFFF) {
                    codePt -= 0x10000;
                    return String.fromCharCode(0xD800 + (codePt >> 10), 0xDC00 + (codePt & 0x3FF));
                }
                return String.fromCharCode(codePt)
            },
                       
            // convert decimal to base128
            binary: function (decimal) {
                var string = decimal.toString(2);
                if (string.length < 8) {
                    var hexString = this.bin_to_dec(string).toString(16);
                    if (hexString.length % 2 == 1) {
                        hexString = '0' + hexString;
                    }
                    return this.hexTostr(hexString);
                }
                var string_array = [];
                var pre = '1';

                while (string.length > 0) {
                    if (string.length < 8) {
                        var temp = '00000000';
                        string = temp.substr(0, 7 - string.length % 7) + string;
                        pre = '0';
                    }
                    string_array.push(pre + string.substr(string.length - 7, 7));
                    string = string.substr(0, string.length - 7);
                    pre = '1';
                    if (string == '0000000') { break; }
                }
                hexString = '';
                for (var i = 0; i < string_array.length; i++) {                    
                    hexString += this.sprintf('%02X', this.bin_to_dec(string_array[i]));                    
                }
                return this.hexTostr(hexString);
            },
            // evaluate to php's sprintf function
            sprintf: function () {
                ////////////////////////////////
                var regex = /%%|%(\d+\$)?([\-+'#0 ]*)(\*\d+\$|\*|\d+)?(?:\.(\*\d+\$|\*|\d+))?([scboxXuideEfFgG])/g;
                var a = arguments;
                var i = 0;
                var format = a[i++];

                var _pad = function (str, len, chr, leftJustify) {
                    if (!chr) {
                        chr = ' ';
                    }
                    var padding = (str.length >= len) ? '' : new Array(1 + len - str.length >>> 0).join(chr);
                    return leftJustify ? str + padding : padding + str;
                };

                var justify = function (value, prefix, leftJustify, minWidth, zeroPad, customPadChar) {
                    var diff = minWidth - value.length;
                    if (diff > 0) {
                        if (leftJustify || !zeroPad) {
                            value = _pad(value, minWidth, customPadChar, leftJustify);
                        } else {
                            value = [
                              value.slice(0, prefix.length),
                              _pad('', diff, '0', true),
                              value.slice(prefix.length)
                            ].join('');
                        }
                    }
                    return value;
                };

                var _formatBaseX = function (value, base, prefix, leftJustify, minWidth, precision, zeroPad) {
                    // Note: casts negative numbers to positive ones
                    var number = value >>> 0;
                    prefix = (prefix && number && {
                        '2': '0b',
                        '8': '0',
                        '16': '0x'
                    }[base]) || '';
                    value = prefix + _pad(number.toString(base), precision || 0, '0', false);
                    return justify(value, prefix, leftJustify, minWidth, zeroPad);
                };

                // _formatString()
                var _formatString = function (value, leftJustify, minWidth, precision, zeroPad, customPadChar) {
                    if (precision !== null && precision !== undefined) {
                        value = value.slice(0, precision);
                    }
                    return justify(value, '', leftJustify, minWidth, zeroPad, customPadChar);
                };

                // doFormat()
                var doFormat = function (substring, valueIndex, flags, minWidth, precision, type) {
                    var number, prefix, method, textTransform, value;

                    if (substring === '%%') {
                        return '%';
                    }

                    // parse flags
                    var leftJustify = false;
                    var positivePrefix = '';
                    var zeroPad = false;
                    var prefixBaseX = false;
                    var customPadChar = ' ';
                    var flagsl = flags.length;
                    var j;
                    for (j = 0; j < flagsl; j++) {
                        switch (flags.charAt(j)) {
                            case ' ':
                                positivePrefix = ' ';
                                break;
                            case '+':
                                positivePrefix = '+';
                                break;
                            case '-':
                                leftJustify = true;
                                break;
                            case "'":
                                customPadChar = flags.charAt(j + 1);
                                break;
                            case '0':
                                zeroPad = true;
                                customPadChar = '0';
                                break;
                            case '#':
                                prefixBaseX = true;
                                break;
                        }
                    }

                    // parameters may be null, undefined, empty-string or real valued
                    // we want to ignore null, undefined and empty-string values
                    if (!minWidth) {
                        minWidth = 0;
                    } else if (minWidth === '*') {
                        minWidth = +a[i++];
                    } else if (minWidth.charAt(0) === '*') {
                        minWidth = +a[minWidth.slice(1, -1)];
                    } else {
                        minWidth = +minWidth;
                    }

                    // Note: undocumented perl feature:
                    if (minWidth < 0) {
                        minWidth = -minWidth;
                        leftJustify = true;
                    }

                    if (!isFinite(minWidth)) {
                        throw new Error('sprintf: (minimum-)width must be finite');
                    }

                    if (!precision) {
                        precision = 'fFeE'.indexOf(type) > -1 ? 6 : (type === 'd') ? 0 : undefined;
                    } else if (precision === '*') {
                        precision = +a[i++];
                    } else if (precision.charAt(0) === '*') {
                        precision = +a[precision.slice(1, -1)];
                    } else {
                        precision = +precision;
                    }

                    // grab value using valueIndex if required?
                    value = valueIndex ? a[valueIndex.slice(0, -1)] : a[i++];

                    switch (type) {
                        case 's':
                            return _formatString(value + '', leftJustify, minWidth, precision, zeroPad, customPadChar);
                        case 'c':
                            return _formatString(String.fromCharCode(+value), leftJustify, minWidth, precision, zeroPad);
                        case 'b':
                            return _formatBaseX(value, 2, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
                        case 'o':
                            return _formatBaseX(value, 8, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
                        case 'x':
                            return _formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
                        case 'X':
                            return _formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad)
                            .toUpperCase();
                        case 'u':
                            return _formatBaseX(value, 10, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
                        case 'i':
                        case 'd':
                            number = +value || 0;
                            // Plain Math.round doesn't just truncate
                            number = Math.round(number - number % 1);
                            prefix = number < 0 ? '-' : positivePrefix;
                            value = prefix + _pad(String(Math.abs(number)), precision, '0', false);
                            return justify(value, prefix, leftJustify, minWidth, zeroPad);
                        case 'e':
                        case 'E':
                        case 'f': // @todo: Should handle locales (as per setlocale)
                        case 'F':
                        case 'g':
                        case 'G':
                            number = +value;
                            prefix = number < 0 ? '-' : positivePrefix;
                            method = ['toExponential', 'toFixed', 'toPrecision']['efg'.indexOf(type.toLowerCase())];
                            textTransform = ['toString', 'toUpperCase']['eEfFgG'.indexOf(type) % 2];
                            value = prefix + Math.abs(number)[method](precision);
                            return justify(value, prefix, leftJustify, minWidth, zeroPad)[textTransform]();
                        default:
                            return substring;
                    }
                }

                return format.replace(regex, doFormat);

                //////////////////////////////
            }
        };
    };
});