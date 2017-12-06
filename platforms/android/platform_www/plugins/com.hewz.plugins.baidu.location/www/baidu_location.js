cordova.define("com.hewz.plugins.baidu.location.baidu_location", function(require, exports, module) {
var exec = require('cordova/exec');

var baidu_location = {
  getCurrentPosition: function(successFn, failureFn) {
    exec(successFn, failureFn, 'BaiduLocation', 'getCurrentPosition', []);
  },
  watchPosition: function(successFn, failureFn, span) {
    exec(successFn, failureFn, 'BaiduLocation', 'watchPosition', [span]);
  },
  clearWatch: function(successFn, failureFn) {
    exec(successFn, failureFn, 'BaiduLocation', 'clearWatch', []);
  }
};

module.exports = baidu_location;

});
