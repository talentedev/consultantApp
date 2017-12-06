cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "id": "cordova-plugin-statusbar.statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "file": "plugins/ionic-plugin-keyboard/www/android/keyboard.js",
        "id": "ionic-plugin-keyboard.keyboard",
        "clobbers": [
            "cordova.plugins.Keyboard"
        ],
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-ms-adal/www/utility.js",
        "id": "cordova-plugin-ms-adal.utility",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-ms-adal/www/AuthenticationContext.js",
        "id": "cordova-plugin-ms-adal.AuthenticationContext",
        "clobbers": [
            "Microsoft.ADAL.AuthenticationContext"
        ]
    },
    {
        "file": "plugins/cordova-plugin-ms-adal/www/CordovaBridge.js",
        "id": "cordova-plugin-ms-adal.CordovaBridge"
    },
    {
        "file": "plugins/cordova-plugin-ms-adal/www/AuthenticationResult.js",
        "id": "cordova-plugin-ms-adal.AuthenticationResult"
    },
    {
        "file": "plugins/cordova-plugin-ms-adal/www/TokenCache.js",
        "id": "cordova-plugin-ms-adal.TokenCache"
    },
    {
        "file": "plugins/cordova-plugin-ms-adal/www/TokenCacheItem.js",
        "id": "cordova-plugin-ms-adal.TokenCacheItem"
    },
    {
        "file": "plugins/cordova-plugin-ms-adal/www/UserInfo.js",
        "id": "cordova-plugin-ms-adal.UserInfo"
    },
    {
        "file": "plugins/cordova-plugin-ms-adal/www/AuthenticationSettings.js",
        "id": "cordova-plugin-ms-adal.AuthenticationSettings",
        "clobbers": [
            "Microsoft.ADAL.AuthenticationSettings"
        ]
    },
    {
        "file": "plugins/cordova-plugin-geolocation/www/android/geolocation.js",
        "id": "cordova-plugin-geolocation.geolocation",
        "clobbers": [
            "navigator.geolocation"
        ]
    },
    {
        "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
        "id": "cordova-plugin-geolocation.PositionError",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-camera/www/CameraConstants.js",
        "id": "cordova-plugin-camera.Camera",
        "clobbers": [
            "Camera"
        ]
    },
    {
        "file": "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
        "id": "cordova-plugin-camera.CameraPopoverOptions",
        "clobbers": [
            "CameraPopoverOptions"
        ]
    },
    {
        "file": "plugins/cordova-plugin-camera/www/Camera.js",
        "id": "cordova-plugin-camera.camera",
        "clobbers": [
            "navigator.camera"
        ]
    },
    {
        "file": "plugins/cordova-plugin-camera/www/CameraPopoverHandle.js",
        "id": "cordova-plugin-camera.CameraPopoverHandle",
        "clobbers": [
            "CameraPopoverHandle"
        ]
    },
    {
        "file": "plugins/com.hewz.plugins.baidu.location/www/baidu_location.js",
        "id": "com.hewz.plugins.baidu.location.baidu_location",
        "clobbers": [
            "baidu_location"
        ]
    },
    {
        "file": "plugins/es6-promise-plugin/www/promise.js",
        "id": "es6-promise-plugin.Promise",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-screen-orientation/www/screenorientation.js",
        "id": "cordova-plugin-screen-orientation.screenorientation",
        "clobbers": [
            "cordova.plugins.screenorientation"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-device": "1.1.4",
    "cordova-plugin-console": "1.0.5",
    "cordova-plugin-whitelist": "1.2.2",
    "cordova-plugin-splashscreen": "3.2.2",
    "cordova-plugin-statusbar": "2.1.3",
    "ionic-plugin-keyboard": "2.2.1",
    "cordova-plugin-compat": "1.1.0",
    "cordova-plugin-ms-adal": "0.9.0",
    "cordova-plugin-geolocation": "2.4.3-dev",
    "cordova-plugin-camera": "2.4.1-dev",
    "com.hewz.plugins.baidu.location": "1.0.0",
    "es6-promise-plugin": "3.0.2",
    "cordova-plugin-screen-orientation": "2.0.0"
};
// BOTTOM OF METADATA
});