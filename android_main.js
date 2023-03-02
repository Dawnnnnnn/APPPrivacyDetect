var line_flag = 0 // 为避免异步输出可能导致的数据混乱，加一个标号

function get_tmp_index() {
    line_flag = line_flag + 1;
    return line_flag
}

function log_with_index(index, data) {
    console.log(index + "|" + data)
}

function showStacks(tmp_index) {
    var Exception = Java.use("java.lang.Exception");
    var ins = Exception.$new("Exception");
    var straces = ins.getStackTrace();
    if (undefined == straces || null == straces) {
        return;
    }
    log_with_index(tmp_index, "============================= Stack strat=======================");
    log_with_index(tmp_index, "");
    for (var i = 0; i < straces.length; i++) {
        var str = "   " + straces[i].toString();
        log_with_index(tmp_index, str);
    }
    log_with_index(tmp_index, "");
    log_with_index(tmp_index, "============================= Stack end=======================\r\n");
    Exception.$dispose();
}

// 获取ro.serialno信息
function hookGetSystemInfo() {
    try {
        var SP = Java.use("android.os.SystemProperties");
        if (SP.get != undefined) {
            SP.get.overload('java.lang.String').implementation = function (p1) {
                if (p1.indexOf("ro.serialno") < 0) return this.get(p1);
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                var temp = this.get(p1);
                log_with_index(tmp_index, "[*]" + p1 + " : " + temp);
                return temp;
            }
            SP.get.overload('java.lang.String', 'java.lang.String').implementation = function (p1, p2) {
                if (p1.indexOf("ro.serialno") < 0) return this.get(p1, p2);
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                var temp = this.get(p1, p2)
                log_with_index(tmp_index, "[*]" + p1 + "," + p2 + " : " + temp);
                return temp;
            }
        }
    } catch (e) {
        log_with_index(-1, "Function hookGetSystemInfo-android.os.SystemProperties failed. reason:" + e)
    }
}

// 获取应用请求权限信息
function hookRequestPermission() {
    try {
        var AC = Java.use("android.support.v4.app.ActivityCompat")
        if (AC.requestPermissions != undefined) {
            AC.requestPermissions.overload('android.app.Activity', '[Ljava.lang.String;', 'int').implementation = function (p1, p2, p3) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "=============================[*]Called - requestPermissions=======================\r\n");
                var temp = this.requestPermissions(p1, p2, p3);
                log_with_index(tmp_index, "requestPermissions: " + p2);
                return temp
            }
        }
    } catch (e) {
        log_with_index(-1, "Function hookRequestPermission-android.support.v4.app.ActivityCompat failed. reason:" + e)
    }

    try {
        var AC2 = Java.use("androidx.core.app.ActivityCompat")
        if (AC2.requestPermissions != undefined) {
            AC2.requestPermissions.overload('android.app.Activity', '[Ljava.lang.String;', 'int').implementation = function (p1, p2, p3) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "=============================[*]Called - requestPermissions=======================\r\n");
                var temp = this.requestPermissions(p1, p2, p3);
                log_with_index(tmp_index, "requestPermissions: " + p1 + p2 + p3);
                return temp
            }
        }
    } catch (e) {
        log_with_index(-1, "Function hookRequestPermission-androidx.core.app.ActivityCompat failed. reason:" + e)
    }

    try {
        var AC3 = Java.use("android.app.Activity")
        if (AC3.requestPermissions != undefined) {
            AC3.requestPermissions.overload('[Ljava.lang.String;', 'int').implementation = function (p1, p2) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "=============================[*]Called - requestPermissions=======================\r\n");
                var temp = this.requestPermissions(p1, p2);
                log_with_index(tmp_index, "requestPermissions: " + p1 + p2);
                return temp
            }
        }
    } catch (e) {
        log_with_index(-1, "Function hookRequestPermission-android.app.Activity failed. reason:" + e)
    }
}

// 获取AndroidId信息
function hookGetAndroidId() {
    try {
        var Secure = Java.use("android.provider.Settings$Secure");
        if (Secure.getString != undefined) {
            Secure.getString.implementation = function (p1, p2) {
                if (p2.indexOf("android_id") < 0) return this.getString(p1, p2);
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "=============================[*]Called - get android_ID=======================param is" + p2 + "\r\n");
                var temp = this.getString(p1, p2);
                log_with_index(tmp_index, "get android_ID: " + temp);
                return temp;

            }
        }
    } catch (e) {
        log_with_index(-1, "Function hookGetAndroidId-android.provider.Settings$Secure failed. reason:" + e)
    }
}

// 获取IMSI信息
function hookGetIMSI() {
    try {
        var TelephonyManager = Java.use("android.telephony.TelephonyManager");
        if (TelephonyManager.getSimSerialNumber != undefined) {
            // 获取单个IMSI的方法
            TelephonyManager.getSimSerialNumber.overload().implementation = function () {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "=============================[*]Called - getSimSerialNumber(String)=======================\r\n");
                var temp = this.getSimSerialNumber();
                log_with_index(tmp_index, "getSimSerialNumber(String): " + temp);
                return temp;
            };

            // 应该也是获取IMSI的方法
            TelephonyManager.getSubscriberId.overload('int').implementation = function () {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "=============================[*]Called - getSubscriberId(int)=======================\r\n");
                var temp = this.getSubscriberId();
                log_with_index(tmp_index, "getSubscriberId(int): " + temp);
                return temp;
            }

            // 获取多个IMSI的方法
            TelephonyManager.getSimSerialNumber.overload('int').implementation = function (p) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "=============================[*]Called - getSimSerialNumber(int)==============param is" + p + "\r\n");
                var temp = this.getSimSerialNumber(p);
                log_with_index(tmp_index, "getSimSerialNumber(int) " + temp);
                return temp;
            };

            TelephonyManager.getLine1Number.overload('int').implementation = function (p) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "=============================[*]Called - getLine1Number(int)==============param is" + p + "\r\n");
                var temp = this.getLine1Number(p);
                log_with_index(tmp_index, "getLine1Number(int) " + temp);
                return temp;
            };
        }
    } catch (e) {
        log_with_index(-1, "Function hookGetIMSI-android.telephony.TelephonyManager failed. reason:" + e)
    }

}

// 获取IMEI信息
function hookGetIMEI() {
    try {
        var TelephonyManager = Java.use("android.telephony.TelephonyManager");
        if (TelephonyManager.getDeviceId != undefined) {
            // getDeviceId was deprecated in API level 26
            //获取单个IMEI
            TelephonyManager.getDeviceId.overload().implementation = function () {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getDeviceId()=======================\r\n");
                log_with_index(tmp_index, "getDeviceId: " + 'Dawnnnnnn');
                // var temp = this.getDeviceId();
                // log_with_index(tmp_index, "getDeviceId: " + temp);
                // 这里可能因为API LEVEL的关系导致调用getdeviceId时应用闪退，那就不调用了
                return 'Dawnnnnnn';
            };
            //获取多个IMEI的方法
            TelephonyManager.getDeviceId.overload('int').implementation = function (p) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getDeviceId()=======================param is" + p + "\r\n");
                var temp = this.getDeviceId(p);
                log_with_index(tmp_index, "getDeviceId " + p + ": " + temp);
                return temp;
            };

            //API LEVEL26以上的获取单个IMEI方法
            TelephonyManager.getImei.overload().implementation = function () {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getImei()=======================\r\n");
                var temp = this.getImei();
                log_with_index(tmp_index, "getImei: " + temp);
                return temp;
            };


            // API LEVEL26以上的获取多个IMEI方法
            TelephonyManager.getImei.overload('int').implementation = function (p) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getImei()====================param is" + p + "\r\n");
                var temp = this.getImei(p);
                log_with_index(tmp_index, "getImei: " + temp);
                return temp;
            };
        }
    } catch (e) {
        log_with_index(-1, "Function hookGetIMEI-android.telephony.TelephonyManager failed. reason:" + e)
    }
}


// 获取MEID信息
function hookGetMEID() {
    try {
        var TelephonyManager = Java.use("android.telephony.TelephonyManager");
        if (TelephonyManager.getMeid != undefined) {
            TelephonyManager.getMeid.overload().implementation = function () {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getMeid()=======================\r\n");
                var temp = this.getMeid();
                log_with_index(tmp_index, "getDeviceId: " + temp);
                return temp;
            };
            TelephonyManager.getMeid.overload('int').implementation = function (p) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getMeid()=======================param is" + p + "\r\n");
                var temp = this.getMeid(p);
                log_with_index(tmp_index, "getMeid " + p + ": " + temp);
                return temp;
            };
        }
    } catch (e) {
        log_with_index(-1, "Function hookGetMEID-android.telephony.TelephonyManager failed. reason:" + e)
    }
}


// 获取Mac地址信息
function hookGetMacAddress() {
    try {
        var wifiInfo = Java.use("android.net.wifi.WifiInfo");
        if (wifiInfo.getMacAddress != undefined) {
            wifiInfo.getMacAddress.implementation = function () {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getMacAddress()=======================\r\n");
                var temp = this.getMacAddress();
                log_with_index(tmp_index, "getMacAddress: " + temp);
                return temp;
            };
        }
    } catch (e) {
        log_with_index(-1, "Function hookGetMacAddress-android.net.wifi.WifiInfo failed. reason:" + e)
    }

    try {
        var networkInterface = Java.use("java.net.NetworkInterface");
        if (networkInterface.getHardwareAddress != undefined) {
            networkInterface.getHardwareAddress.overload().implementation = function () {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getHardwareAddress()=======================\r\n");
                var temp = this.getHardwareAddress();
                log_with_index(tmp_index, "getHardwareAddress: " + temp);
                return temp;
            };
        }
    } catch (e) {
        log_with_index(-1, "Function hookGetMacAddress-java.net.NetworkInterface failed. reason:" + e)
    }
}


// 获取IP地址信息
function hookGetIPAddress() {
    // This method was deprecated in API level 31.
    try {
        var wifiInfo = Java.use("android.net.wifi.WifiInfo");
        if (wifiInfo.getIpAddress != undefined) {
            wifiInfo.getIpAddress.implementation = function () {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getIpAddress()=======================\r\n");
                var temp = this.getIpAddress();
                log_with_index(tmp_index, "getIpAddress: " + temp);
                return temp;
            };
        }
    } catch (e) {
        log_with_index(-1, "Function hookGetIPAddress-android.net.wifi.WifiInfo failed. reason:" + e)
    }
}

// 获取RunningAppProcesses信息
function hookGetRunningAppProcesses() {
    try {
        var AM = Java.use("android.app.ActivityManager");
        if (AM.getRunningAppProcesses != undefined) {
            AM.getRunningAppProcesses.implementation = function () {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getRunningAppProcesses()=======================\r\n");
                var temp = this.getRunningAppProcesses();
                log_with_index(tmp_index, "getRunningAppProcesses: " + temp);
                return temp;
            }
        }
    } catch (e) {
        log_with_index(-1, "Function hookGetRunningAppProcesses-android.app.ActivityManager failed. reason:" + e)
    }

}

// 获取WIFI状态信息
function hookGetWifiState() {
    try {
        var wifiManager = Java.use("android.net.wifi.WifiManager");
        if (wifiManager.getWifiState != undefined) {
            wifiManager.getWifiState.implementation = function () {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getWifiState()=======================\r\n");
                var temp = this.getWifiState();
                log_with_index(tmp_index, "getWifiState: " + temp);
                return temp;
            };
        if (wifiManager.getSSID != undefined) {
            wifiManager.getSSID.implementation = function () {
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getSSID()=======================\r\n");
                var temp = this.getSSID();
                log_with_index(tmp_index, "getSSID: " + temp);
                return temp;
            }

        }
        }

    } catch (e) {
        log_with_index(-1, "Function hookGetWifiState-android.net.wifi.WifiManager failed. reason:" + e)
    }
}

// 获取网络状态信息
function hookGetActiveNetworkInfo() {
    // This method was deprecated in API level 29.
    try {
        var CM = Java.use("android.net.ConnectivityManager");
        if (CM.getActiveNetworkInfo != undefined) {
            CM.getActiveNetworkInfo.implementation = function () {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getActiveNetworkInfo()=======================\r\n");
                var temp = this.getActiveNetworkInfo();
                log_with_index(tmp_index, "getActiveNetworkInfo: " + temp);
                return temp;
            }
        }
    } catch (e) {
        log_with_index(-1, "Function hookGetActiveNetworkInfo-android.net.ConnectivityManager failed. reason:" + e)
    }
}

// 获取hostaddress、hostname信息
function hookGetHostInfo() {
    try {
        var socketAddress = Java.use("java.net.InetSocketAddress");
        if (socketAddress.getHostAddress != undefined) {
            socketAddress.getHostAddress.implementation = function () {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getHostAddress()=======================\r\n");
                var temp = this.getHostAddress();
                log_with_index(tmp_index, "getHostAddress: " + temp);
                return temp;
            };
            socketAddress.getAddress.implementation = function () {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getAddress()=======================\r\n");
                var temp = this.getAddress();
                log_with_index(tmp_index, "getAddress: " + temp);
                return temp;
            };
            socketAddress.getHostName.implementation = function () {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getHostName()=======================\r\n");
                var temp = this.getHostName();
                log_with_index(tmp_index, "getHostName: " + temp);
                return temp;
            };
        }
    } catch (e) {
        log_with_index(-1, "Function hookGetHostInfo-java.net.InetSocketAddress failed. reason:" + e)
    }

    try {
        var inetAddress = Java.use("java.net.InetAddress");
        if (inetAddress.getHostAddress != undefined) {
            inetAddress.getHostAddress.implementation = function () {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getHostAddress()=======================\r\n");
                var temp = this.getHostAddress();
                log_with_index(tmp_index, "getHostAddress: " + temp);
                return temp;
            };
            inetAddress.getAddress.implementation = function () {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getAddress()=======================\r\n");
                var temp = this.getAddress();
                log_with_index(tmp_index, "getAddress: " + temp);
                return temp;
            };
            inetAddress.getHostName.implementation = function () {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getHostName()=======================\r\n");
                var temp = this.getHostName();
                log_with_index(tmp_index, "getHostName: " + temp);
                return temp;
            };
        }
    } catch (e) {
        log_with_index(-1, "Function hookGetHostInfo-java.net.InetAddress failed. reason:" + e)
    }

    try {
        var inet4Address = Java.use("java.net.Inet4Address");
        if (inet4Address.getHostAddress != undefined) {
            inet4Address.getHostAddress.implementation = function () {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getHostAddress()=======================\r\n");
                var temp = this.getHostAddress();
                log_with_index(tmp_index, "getHostAddress: " + temp);
                return temp;
            };
        }
    } catch (e) {
        log_with_index(-1, "Function hookGetHostInfo-java.net.Inet4Address failed. reason:" + e)
    }
    try {
        var inet6Address = Java.use("java.net.Inet6Address");
        inet6Address.getHostAddress.implementation = function () {
            var tmp_index = get_tmp_index();
            showStacks(tmp_index);
            log_with_index(tmp_index, "============================= [*]Called - getHostAddress()=======================\r\n");
            var temp = this.getHostAddress();
            log_with_index(tmp_index, "getHostAddress: " + temp);
            return temp;
        };
    } catch (e) {
        log_with_index(-1, "Function hookGetHostInfo-java.net.Inet6Address failed. reason:" + e)
    }

}

// 获取网络连接信息
function hookGetSocketConnect() {
    try {
        var socket = Java.use("java.net.Socket");
        // 这里有个bug，当p1的值中不包含域名时(猜测)，this.connect会失败导致应用和Frida闪退，原因不明，该函数暂时弃用
        // https://stackoverflow.com/questions/56146503/can-anyone-help-me-how-to-hook-java-net-socket-connectjava-net-socketaddress-i
        if (socket.connect != undefined) {
            socket.connect.overload('java.net.SocketAddress', 'int').implementation = function (p1, p2) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - connect(p1,p2)=======================\r\n");
                log_with_index(tmp_index, p1, p2)
                var temp = this.connect(p1, p2);
                return temp;
            }
            socket.connect.overload('java.net.SocketAddress').implementation = function (p1) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - connect(p1)=======================\r\n");
                log_with_index(tmp_index, p1)
                var temp = this.connect(p1);
                return temp;
            }
        }
    } catch (e) {
        log_with_index(-1, "Function hookGetSocketConnect-java.net.Socket failed. reason:" + e)
    }
}


// 获取定位信息
function hookGetLocation() {
    try {
        var geocoder = Java.use("android.location.Geocoder");
        if (geocoder.getFromLocation != undefined) {
            // This method was deprecated in API level 33.
            geocoder.getFromLocation.overload('double', 'double', 'int').implementation = function (p1, p2, p3) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getFromLocation(p1,p2,p3)=======================\r\n");
                var temp = this.getFromLocation(p1, p2, p3);
                log_with_index(tmp_index, "getFromLocation: " + temp);
                return temp;
            }
            // This method was deprecated in API level 33.
            geocoder.getFromLocationName.overload('java.lang.String', 'int', 'double', 'double', 'double', 'double').implementation = function (p1, p2, p3, p4, p5, p6) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getFromLocationName(p1,p2,p3,p4,p5,p6)=======================\r\n");
                var temp = this.getFromLocationName(p1, p2, p3, p4, p5, p6);
                log_with_index(tmp_index, "getFromLocationName: " + temp);
                return temp;
            }
            geocoder.getFromLocationName.overload('java.lang.String', 'int').implementation = function (p1, p2) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getFromLocationName(p1,p2)=======================\r\n");
                var temp = this.getFromLocationName(p1, p2);
                log_with_index(tmp_index, "getFromLocationName: " + temp);
                return temp;
            }
        }
    } catch (e) {
        log_with_index(-1, "Function hookGetLocation-android.location.Geocoder failed. reason:" + e)
    }


    try {
        var LocationManager = Java.use("android.location.LocationManager");
        if (LocationManager.requestLocationUpdates != undefined) {
            LocationManager.requestLocationUpdates.overload('android.location.LocationRequest', 'android.app.PendingIntent').implementation = function (p1, p2) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - requestLocationUpdates(p1,p2)=======================\r\n");
                var temp = this.requestLocationUpdates(p1, p2);
                log_with_index(tmp_index, "requestLocationUpdates: " + temp);
                return temp;
            }
            LocationManager.requestLocationUpdates.overload('android.location.LocationRequest', 'android.location.LocationListener', 'android.os.Looper').implementation = function (p1, p2, p3) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - requestLocationUpdates(p1,p2,p3)=======================\r\n");
                var temp = this.requestLocationUpdates(p1, p2, p3);
                log_with_index(tmp_index, "requestLocationUpdates: " + temp);
                return temp;
            }
            LocationManager.requestLocationUpdates.overload('android.location.LocationRequest', 'java.util.concurrent.Executor', 'android.location.LocationListener').implementation = function (p1, p2, p3) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - requestLocationUpdates(p1,p2,p3)=======================\r\n");
                var temp = this.requestLocationUpdates(p1, p2, p3);
                log_with_index(tmp_index, "requestLocationUpdates: " + temp);
                return temp;
            }
            LocationManager.requestLocationUpdates.overload('long', 'float', 'android.location.Criteria', 'android.app.PendingIntent').implementation = function (p1, p2, p3, p4) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - requestLocationUpdates(p1,p2,p3,p4)=======================\r\n");
                var temp = this.requestLocationUpdates(p1, p2, p3, p4);
                log_with_index(tmp_index, "requestLocationUpdates: " + temp);
                return temp;
            }
            LocationManager.requestLocationUpdates.overload('java.lang.String', 'long', 'float', 'android.app.PendingIntent').implementation = function (p1, p2, p3, p4) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - requestLocationUpdates(p1,p2,p3,p4)=======================\r\n");
                var temp = this.requestLocationUpdates(p1, p2, p3, p4);
                log_with_index(tmp_index, "requestLocationUpdates: " + temp);
                return temp;
            }
            LocationManager.requestLocationUpdates.overload('java.lang.String', 'long', 'float', 'android.location.LocationListener').implementation = function (p1, p2, p3, p4) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - requestLocationUpdates(p1,p2,p3,p4)=======================\r\n");
                var temp = this.requestLocationUpdates(p1, p2, p3, p4);
                log_with_index(tmp_index, "requestLocationUpdates: " + temp);
                return temp;
            }
            LocationManager.requestLocationUpdates.overload('long', 'float', 'android.location.Criteria', 'android.location.LocationListener', 'android.os.Looper').implementation = function (p1, p2, p3, p4, p5) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - requestLocationUpdates(p1,p2,p3,p4,p5)=======================\r\n");
                var temp = this.requestLocationUpdates(p1, p2, p3, p4, p5);
                log_with_index(tmp_index, "requestLocationUpdates: " + temp);
                return temp;
            }
            LocationManager.requestLocationUpdates.overload('long', 'float', 'android.location.Criteria', 'java.util.concurrent.Executor', 'android.location.LocationListener').implementation = function (p1, p2, p3, p4, p5) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - requestLocationUpdates(p1,p2,p3,p4,p5)=======================\r\n");
                var temp = this.requestLocationUpdates(p1, p2, p3, p4, p5);
                log_with_index(tmp_index, "requestLocationUpdates: " + temp);
                return temp;
            }
            LocationManager.requestLocationUpdates.overload('java.lang.String', 'long', 'float', 'android.location.LocationListener', 'android.os.Looper').implementation = function (p1, p2, p3, p4, p5) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - requestLocationUpdates(p1,p2,p3,p4,p5)=======================\r\n");
                var temp = this.requestLocationUpdates(p1, p2, p3, p4, p5);
                log_with_index(tmp_index, "requestLocationUpdates: " + temp);
                return temp;
            }
            LocationManager.requestLocationUpdates.overload('android.location.LocationRequest', 'android.location.LocationListener', 'android.os.Looper', 'android.app.PendingIntent').implementation = function (p1, p2, p3, p4) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - requestLocationUpdates(p1,p2,p3,p4)=======================\r\n");
                var temp = this.requestLocationUpdates(p1, p2, p3, p4);
                log_with_index(tmp_index, "requestLocationUpdates: " + temp);
                return temp;
            }
            LocationManager.requestLocationUpdates.overload('java.lang.String', 'long', 'float', 'java.util.concurrent.Executor', 'android.location.LocationListener').implementation = function (p1, p2, p3, p4, p5) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - requestLocationUpdates(p1,p2,p3,p4,p5)=======================\r\n");
                var temp = this.requestLocationUpdates(p1, p2, p3, p4, p5);
                log_with_index(tmp_index, "requestLocationUpdates: " + temp);
                return temp;
            }
            LocationManager.getLastKnownLocation.overload('java.lang.String').implementation = function (p1) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getLastKnownLocation(p1)=======================\r\n");
                var temp = this.getLastKnownLocation(p1);
                log_with_index(tmp_index, "getLastKnownLocation: " + temp);
                return temp;
            }
            LocationManager.getCurrentLocation.overload('java.lang.String', 'android.location.LocationRequest', 'android.os.CancellationSignal', 'java.util.concurrent.Executor', 'java.util.function.Consumer').implementation = function (p1, p2, p3, p4, p5) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getCurrentLocation(p1,p2,p3,p4,p5)=======================\r\n");
                var temp = this.getCurrentLocation(p1, p2, p3, p4, p5);
                log_with_index(tmp_index, "getCurrentLocation: " + temp);
                return temp;
            }
            LocationManager.getCurrentLocation.overload('java.lang.String', 'android.os.CancellationSignal', 'java.util.concurrent.Executor', 'java.util.function.Consumer').implementation = function (p1, p2, p3, p4) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getCurrentLocation(p1,p2,p3,p4)=======================\r\n");
                var temp = this.getCurrentLocation(p1, p2, p3, p4);
                log_with_index(tmp_index, "getCurrentLocation: " + temp);
                return temp;
            }
        }
    } catch (e) {
        log_with_index(-1, "Function hookGetLocation-android.location.LocationManager failed. reason:" + e)
    }

}

// 获取GetInstallPackages信息
function hookGetInstallPackages() {
    try {
        var pmPackageManager = Java.use("android.content.pm.PackageManager");
        if (pmPackageManager.getInstalledPackages != undefined) {
            pmPackageManager.getInstalledPackages.overload('int').implementation = function (p1) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - pm-getInstalledPackages()=======================\r\n");
                var temp = this.getInstalledPackages(p1);
                log_with_index(tmp_index, "getInstalledPackages: " + temp);
                return temp;
            };
            pmPackageManager.getInstalledApplications.overload('int').implementation = function (p1) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - pm-getInstalledApplications()=======================\r\n");
                var temp = this.getInstalledApplications(p1);
                log_with_index(tmp_index, "getInstalledApplications: " + temp);
                return temp;
            };
            pmPackageManager.getInstalledModules.overload('int').implementation = function (p1) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - app-getInstalledModules()=======================\r\n");
                var temp = this.getInstalledModules(p1);
                log_with_index(tmp_index, "getInstalledModules: " + temp);
                return temp;
            };
        }
    } catch (e) {
        log_with_index(-1, "Function hookGetInstallPackages-android.content.pm.PackageManager failed. reason:" + e)
    }

    try {
        var appPackageManager = Java.use("android.app.ApplicationPackageManager");
        if (appPackageManager.getInstalledPackages != undefined) {
            appPackageManager.getInstalledPackages.overload('int').implementation = function (p1) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - app-getInstalledPackages()=======================\r\n");
                var temp = this.getInstalledPackages(p1);
                log_with_index(tmp_index, "getInstalledPackages: " + temp);
                return temp;
            };
            appPackageManager.getInstalledApplications.overload('int').implementation = function (p1) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - app-getInstalledApplications()=======================\r\n");
                var temp = this.getInstalledApplications(p1);
                log_with_index(tmp_index, "getInstalledApplications: " + temp);
                return temp;
            };
            appPackageManager.queryIntentActivities.implementation = function (p1, p2) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - app-queryIntentActivities()=======================\r\n");
                var temp = this.queryIntentActivities(p1, p2);
                log_with_index(tmp_index, "queryIntentActivities: " + temp);
                return temp;
            };
            appPackageManager.getInstalledApplicationsAsUser.overload('int', 'int').implementation = function (p1, p2) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - app-getInstalledApplicationsAsUser(p1,p2)=======================\r\n");
                var temp = this.getInstalledApplicationsAsUser(p1, p2);
                log_with_index(tmp_index, "getInstalledApplicationsAsUser: " + temp);
                return temp;
            };
            appPackageManager.getInstalledPackagesAsUser.overload('int', 'int').implementation = function (p1, p2) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - app-getInstalledPackagesAsUser(p1,p2)=======================\r\n");
                var temp = this.getInstalledPackagesAsUser(p1, p2);
                log_with_index(tmp_index, "getInstalledPackagesAsUser: " + temp);
                return temp;
            };
        }
    } catch (e) {
        log_with_index(-1, "Function hookGetInstallPackages-android.app.ApplicationPackageManager failed. reason:" + e)
    }

}


// 获取国内特色信息
// 这个需要在特定品牌手机上才能测试，原生系统不存在对应SDK,以下为小米品牌SDK
// 参考 https://www.ichdata.com/wp-content/uploads/2020/06/2021032423172817.pdf
// https://github.com/gzu-liyujiang/Android_CN_OAID
//xiaomi
function hookGetIdProvider() {
    try {
        var IdProvider = Java.use("com.android.id.impl.IdProviderImpl");
        if (IdProvider.getUDID != undefined) {
            IdProvider.getUDID.implementation = function () {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getUDID()=======================\r\n");
                var temp = this.getUDID();
                log_with_index(tmp_index, "getUDID: " + temp);
                return temp;
            };
        }
        if (IdProvider.getOAID != undefined) {
            IdProvider.getOAID.overload('android.content.Context').implementation = function (p1) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getOAID(p1)=======================\r\n");
                var temp = this.getOAID(p1);
                log_with_index(tmp_index, "getOAID: " + temp);
                return temp;
            };
        }
        if (IdProvider.getVAID != undefined) {
            IdProvider.getVAID.implementation = function () {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getVAID()=======================\r\n");
                var temp = this.getVAID();
                log_with_index(tmp_index, "getVAID: " + temp);
                return temp;
            };
        }
        if (IdProvider.getAAID != undefined) {
            IdProvider.getAAID.implementation = function () {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getAAID()=======================\r\n");
                var temp = this.getAAID();
                log_with_index(tmp_index, "getAAID: " + temp);
                return temp;
            };
        }       

    } catch (e) {
        log_with_index(-1, "Function hookGetIdProvider-com.android.id.impl.IdProviderImpl failed. reason:" + e)
    }
}

// samsung
function hookGetIDeviceIdService() {
    try {
        var IdProvider = Java.use("com.samsung.android.deviceidservice.IDeviceIdService$Stub$Proxy");
        if (IdProvider.getOAID != undefined) {
            IdProvider.getOAID.implementation = function () {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getOAID()=======================\r\n");
                var temp = this.getOAID();
                log_with_index(tmp_index, "getOAID: " + temp);
                return temp;
            };
        }
        if (IdProvider.getVAID != undefined) {
            IdProvider.getVAID.overload('java.lang.String').implementation = function (p1) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getVAID(p1)=======================\r\n");
                var temp = this.getVAID(p1);
                log_with_index(tmp_index, "getVAID: " + temp);
                return temp;
            };
        }
        if (IdProvider.getAAID != undefined) {
            IdProvider.getAAID.overload('java.lang.String').implementation = function (p1) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getAAID(p1)=======================\r\n");
                var temp = this.getAAID(p1);
                log_with_index(tmp_index, "getAAID: " + temp);
                return temp;
            };
        }       

    } catch (e) {
        log_with_index(-1, "Function hookGetIDeviceIdService-com.samsung.android.deviceidservice.IDeviceIdService$Stub$Proxy failed. reason:" + e)
    }

    try {
        var IdProvider = Java.use("repeackage.com.samsung.android.deviceidservice.IDeviceIdService$Stub$Proxy");
        if (IdProvider.getOAID != undefined) {
            IdProvider.getOAID.implementation = function () {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getOAID()=======================\r\n");
                var temp = this.getOAID();
                log_with_index(tmp_index, "getOAID: " + temp);
                return temp;
            };
        }
        if (IdProvider.getVAID != undefined) {
            IdProvider.getVAID.overload('java.lang.String').implementation = function (p1) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getVAID(p1)=======================\r\n");
                var temp = this.getVAID(p1);
                log_with_index(tmp_index, "getVAID: " + temp);
                return temp;
            };
        }
        if (IdProvider.getAAID != undefined) {
            IdProvider.getAAID.overload('java.lang.String').implementation = function (p1) {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getAAID(p1)=======================\r\n");
                var temp = this.getAAID(p1);
                log_with_index(tmp_index, "getAAID: " + temp);
                return temp;
            };
        }       

    } catch (e) {
        log_with_index(-1, "Function hookGetIDeviceIdServicerepeackage.com.samsung.android.deviceidservice.IDeviceIdService$Stub$Proxy failed. reason:" + e)
    }
}

function hookGetICCID() {
    try {
        var UC = Java.use("android.telephony.UiccCardInfo");
        if (UC.getUDID != undefined) {
            IdProvider.getIccId.implementation = function () {
                var tmp_index = get_tmp_index();
                showStacks(tmp_index);
                log_with_index(tmp_index, "============================= [*]Called - getIccId()=======================\r\n");
                var temp = this.getIccId();
                log_with_index(tmp_index, "getIccId: " + temp);
                return temp;
            };
        }   

    } catch (e) {
        log_with_index(-1, "Function hookGetICCID-android.telephony.UiccCardInfo failed. reason:" + e)
    }
}

Java.perform(function () {
    hookGetSystemInfo();
    hookRequestPermission();
    hookGetAndroidId();
    hookGetIMSI();
    hookGetIMEI();
    hookGetMEID();
    hookGetMacAddress();
    hookGetIPAddress();
    hookGetRunningAppProcesses();
    hookGetWifiState();
    hookGetActiveNetworkInfo();
    hookGetHostInfo();
    hookGetLocation();
    hookGetInstallPackages();
    hookGetIdProvider();
    hookGetIDeviceIdService();
    hookGetICCID()
})