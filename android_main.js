var line_flag = 0 // 为避免异步输出可能导致的数据混乱，加一个标号

function showStacks() {
    line_flag = line_flag + 1
    var Exception = Java.use("java.lang.Exception");
    var ins = Exception.$new("Exception");
    var straces = ins.getStackTrace();
    if (undefined == straces || null == straces) {
        return;
    }
    console.log(line_flag + "============================= Stack strat=======================");
    console.log("");
    for (var i = 0; i < straces.length; i++) {
        var str = "   " + straces[i].toString();
        console.log(str);
    }
    console.log("");
    console.log(line_flag + "============================= Stack end=======================\r\n");
    Exception.$dispose();
}

// 获取ro.serialno信息
function hookGetSystemInfo() {
    try {
        var SP = Java.use("android.os.SystemProperties");
        if (SP.get != undefined) {
            SP.get.overload('java.lang.String').implementation = function (p1) {
                if (p1.indexOf("ro.serialno") < 0) return this.get(p1);
                showStacks()
                var temp = this.get(p1);
                console.log("[*]" + p1 + " : " + temp);
                return temp;
            }
            SP.get.overload('java.lang.String', 'java.lang.String').implementation = function (p1, p2) {
                if (p1.indexOf("ro.serialno") < 0) return this.get(p1, p2);
                showStacks()
                var temp = this.get(p1, p2)
                console.log("[*]" + p1 + "," + p2 + " : " + temp);
                return temp;
            }
        }
    } catch (e) {
        console.log("Function hookGetSystemInfo-android.os.SystemProperties failed. reason:" + e)
    }
}

// 获取应用请求权限信息
function hookRequestPermission() {
    try {
        var AC = Java.use("android.support.v4.app.ActivityCompat")
        if (AC.requestPermissions != undefined) {
            AC.requestPermissions.overload('android.app.Activity', '[Ljava.lang.String;', 'int').implementation = function (p1, p2, p3) {
                showStacks();
                console.log("=============================[*]Called - requestPermissions=======================\r\n");
                var temp = this.requestPermissions(p1, p2, p3);
                console.log("requestPermissions: " + p2);
                return temp
            }
        }
    } catch (e) {
        console.log("Function hookRequestPermission-android.support.v4.app.ActivityCompat failed. reason:" + e)
    }

    try {
        var AC2 = Java.use("androidx.core.app.ActivityCompat")
        if (AC2.requestPermissions != undefined) {
            AC2.requestPermissions.overload('android.app.Activity', '[Ljava.lang.String;', 'int').implementation = function (p1, p2, p3) {
                showStacks();
                console.log("=============================[*]Called - requestPermissions=======================\r\n");
                var temp = this.requestPermissions(p1, p2, p3);
                console.log("requestPermissions: " + p2);
                return temp
            }
        }
    } catch (e) {
        console.log("Function hookRequestPermission-androidx.core.app.ActivityCompat failed. reason:" + e)
    }

    try {
        var AC3 = Java.use("android.app.Activity")
        if (AC3.requestPermissions != undefined) {
            AC3.requestPermissions.overload('[Ljava.lang.String;', 'int').implementation = function (p1, p2, p3) {
                showStacks();
                console.log("=============================[*]Called - requestPermissions=======================\r\n");
                var temp = this.requestPermissions(p1, p2, p3);
                console.log("requestPermissions: " + p2);
                return temp
            }
        }
    } catch (e) {
        console.log("Function hookRequestPermission-android.app.Activity failed. reason:" + e)
    }
}

// 获取AndroidId信息
function hookGetAndroidId() {
    try {
        var Secure = Java.use("android.provider.Settings$Secure");
        if (Secure.getString != undefined) {
            Secure.getString.implementation = function (p1, p2) {
                if (p2.indexOf("android_id") < 0) return this.getString(p1, p2);
                showStacks();
                console.log("=============================[*]Called - get android_ID=======================param is" + p2 + "\r\n");
                var temp = this.getString(p1, p2);
                console.log("get android_ID: " + temp);
                return temp;

            }
        }
    } catch (e) {
        console.log("Function hookGetAndroidId-android.provider.Settings$Secure failed. reason:" + e)
    }
}

// 获取IMSI信息
function hookGetIMSI() {
    try {
        var TelephonyManager = Java.use("android.telephony.TelephonyManager");
        if (TelephonyManager.getSimSerialNumber != undefined) {
            // 获取单个IMSI的方法
            TelephonyManager.getSimSerialNumber.overload().implementation = function () {
                showStacks();
                console.log("=============================[*]Called - getSimSerialNumber(String)=======================\r\n");
                var temp = this.getSimSerialNumber();
                console.log("getSimSerialNumber(String): " + temp);
                return temp;
            };

            // 应该也是获取IMSI的方法
            TelephonyManager.getSubscriberId.overload('int').implementation = function () {
                showStacks();
                console.log("=============================[*]Called - getSubscriberId(int)=======================\r\n");
                var temp = this.getSubscriberId();
                console.log("getSubscriberId(int): " + temp);
                return temp;
            }

            // 获取多个IMSI的方法
            TelephonyManager.getSimSerialNumber.overload('int').implementation = function (p) {
                showStacks();
                console.log("=============================[*]Called - getSimSerialNumber(int)==============param is" + p + "\r\n");
                var temp = this.getSimSerialNumber(p);
                console.log("getSimSerialNumber(int) " + temp);
                return temp;
            };
        }
    } catch (e) {
        console.log("Function hookGetIMSI-android.telephony.TelephonyManager failed. reason:" + e)
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
                showStacks();
                console.log("============================= [*]Called - getDeviceId()=======================\r\n");
                console.log("getDeviceId: " + 'Dawnnnnnn');
                // var temp = this.getDeviceId();
                // console.log("getDeviceId: " + temp);
                // 这里可能因为API LEVEL的关系导致调用getdeviceId时应用闪退，那就不调用了
                return 'Dawnnnnnn';
            };
            //获取多个IMEI的方法
            TelephonyManager.getDeviceId.overload('int').implementation = function (p) {
                showStacks();
                console.log("============================= [*]Called - getDeviceId()=======================param is" + p + "\r\n");
                var temp = this.getDeviceId(p);
                console.log("getDeviceId " + p + ": " + temp);
                return temp;
            };

            //API LEVEL26以上的获取单个IMEI方法
            TelephonyManager.getImei.overload().implementation = function () {
                showStacks();
                console.log("============================= [*]Called - getImei()=======================\r\n");
                var temp = this.getImei();
                console.log("getImei: " + temp);
                return temp;
            };


            // API LEVEL26以上的获取多个IMEI方法
            TelephonyManager.getImei.overload('int').implementation = function (p) {
                showStacks();
                console.log("============================= [*]Called - getImei()====================param is" + p + "\r\n");
                var temp = this.getImei(p);
                console.log("getImei: " + temp);
                return temp;
            };
        }
    } catch (e) {
        console.log("Function hookGetIMEI-android.telephony.TelephonyManager failed. reason:" + e)
    }
}

// 获取Mac地址信息
function hookGetMacAddress() {
    try {
        var wifiInfo = Java.use("android.net.wifi.WifiInfo");
        if (wifiInfo.getMacAddress != undefined) {
            wifiInfo.getMacAddress.implementation = function () {
                showStacks();
                console.log("============================= [*]Called - getMacAddress()=======================\r\n");
                var temp = this.getMacAddress();
                console.log("getMacAddress: " + temp);
                return temp;
            };
        }
    } catch (e) {
        console.log("Function hookGetMacAddress-android.net.wifi.WifiInfo failed. reason:" + e)
    }

    try {
        var networkInterface = Java.use("java.net.NetworkInterface");
        if (networkInterface.getHardwareAddress != undefined) {
            networkInterface.getHardwareAddress.overload().implementation = function () {
                showStacks();
                console.log("============================= [*]Called - getHardwareAddress()=======================\r\n");
                var temp = this.getHardwareAddress();
                console.log("getHardwareAddress: " + temp);
                return temp;
            };
        }
    } catch (e) {
        console.log("Function hookGetMacAddress-java.net.NetworkInterface failed. reason:" + e)
    }
}


// 获取IP地址信息
function hookGetIPAddress() {
    // This method was deprecated in API level 31.
    try {
        var wifiInfo = Java.use("android.net.wifi.WifiInfo");
        if (wifiInfo.getIpAddress != undefined) {
            wifiInfo.getIpAddress.implementation = function () {
                showStacks();
                console.log("============================= [*]Called - getIpAddress()=======================\r\n");
                var temp = this.getIpAddress();
                console.log("getIpAddress: " + temp);
                return temp;
            };
        }
    } catch (e) {
        console.log("Function hookGetIPAddress-android.net.wifi.WifiInfo failed. reason:" + e)
    }
}

// 获取RunningAppProcesses信息
function hookGetRunningAppProcesses() {
    try {
        var AM = Java.use("android.app.ActivityManager");
        if (AM.getRunningAppProcesses != undefined) {
            AM.getRunningAppProcesses.implementation = function () {
                showStacks();
                console.log("============================= [*]Called - getRunningAppProcesses()=======================\r\n");
                var temp = this.getRunningAppProcesses();
                console.log("getRunningAppProcesses: " + temp);
                return temp;
            }
        }
    } catch (e) {
        console.log("Function hookGetRunningAppProcesses-android.app.ActivityManager failed. reason:" + e)
    }

}

// 获取WIFI状态信息
function hookGetWifiState() {
    try {
        var wifiManager = Java.use("android.net.wifi.WifiManager");
        if (wifiManager.getWifiState != undefined) {
            wifiManager.getWifiState.implementation = function () {
                showStacks();
                console.log("============================= [*]Called - getWifiState()=======================\r\n");
                var temp = this.getWifiState();
                console.log("getWifiState: " + temp);
                return temp;
            }
        }
    } catch (e) {
        console.log("Function hookGetWifiState-android.net.wifi.WifiManager failed. reason:" + e)
    }
}

// 获取hostaddress、hostname信息
function hookGetHostInfo() {
    try {
        var socketAddress = Java.use("java.net.InetSocketAddress");
        if (socketAddress.getHostAddress != undefined) {
            socketAddress.getHostAddress.implementation = function () {
                showStacks();
                console.log("============================= [*]Called - getHostAddress()=======================\r\n");
                var temp = this.getHostAddress();
                console.log("getHostAddress: " + temp);
                return temp;
            };
            socketAddress.getAddress.implementation = function () {
                showStacks();
                console.log("============================= [*]Called - getAddress()=======================\r\n");
                var temp = this.getAddress();
                console.log("getAddress: " + temp);
                return temp;
            };
            socketAddress.getHostName.implementation = function () {
                showStacks();
                console.log("============================= [*]Called - getHostName()=======================\r\n");
                var temp = this.getHostName();
                console.log("getHostName: " + temp);
                return temp;
            };
        }
    } catch (e) {
        console.log("Function hookGetHostInfo-java.net.InetSocketAddress failed. reason:" + e)
    }

    try {
        var inetAddress = Java.use("java.net.InetAddress");
        if (inetAddress.getHostAddress != undefined) {
            inetAddress.getHostAddress.implementation = function () {
                showStacks();
                console.log("============================= [*]Called - getHostAddress()=======================\r\n");
                var temp = this.getHostAddress();
                console.log("getHostAddress: " + temp);
                return temp;
            };
            inetAddress.getAddress.implementation = function () {
                showStacks();
                console.log("============================= [*]Called - getAddress()=======================\r\n");
                var temp = this.getAddress();
                console.log("getAddress: " + temp);
                return temp;
            };
            inetAddress.getHostName.implementation = function () {
                showStacks();
                console.log("============================= [*]Called - getHostName()=======================\r\n");
                var temp = this.getHostName();
                console.log("getHostName: " + temp);
                return temp;
            };
        }
    } catch (e) {
        console.log("Function hookGetHostInfo-java.net.InetAddress failed. reason:" + e)
    }

    try {
        var inet4Address = Java.use("java.net.Inet4Address");
        if (inet4Address.getHostAddress != undefined) {
            inet4Address.getHostAddress.implementation = function () {
                showStacks();
                console.log("============================= [*]Called - getHostAddress()=======================\r\n");
                var temp = this.getHostAddress();
                console.log("getHostAddress: " + temp);
                return temp;
            };
        }
    } catch (e) {
        console.log("Function hookGetHostInfo-java.net.Inet4Address failed. reason:" + e)
    }
    try {
        var inet6Address = Java.use("java.net.Inet6Address");
        inet6Address.getHostAddress.implementation = function () {
            showStacks();
            console.log("============================= [*]Called - getHostAddress()=======================\r\n");
            var temp = this.getHostAddress();
            console.log("getHostAddress: " + temp);
            return temp;
        };
    } catch (e) {
        console.log("Function hookGetHostInfo-java.net.Inet6Address failed. reason:" + e)
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
                showStacks();
                console.log("============================= [*]Called - connect(p1,p2)=======================\r\n");
                console.log(p1, p2)
                var temp = this.connect(p1, p2);
                return temp;
            }
            socket.connect.overload('java.net.SocketAddress').implementation = function (p1) {
                showStacks();
                console.log("============================= [*]Called - connect(p1)=======================\r\n");
                console.log(p1)
                var temp = this.connect(p1);
                return temp;
            }
        }
    } catch (e) {
        console.log("Function hookGetSocketConnect-java.net.Socket failed. reason:" + e)
    }
}


// 获取定位信息
function hookGetLocation() {
    try {
        var geocoder = Java.use("android.location.Geocoder");
        if (geocoder.getFromLocation != undefined) {
            // This method was deprecated in API level 33.
            geocoder.getFromLocation.overload('double', 'double', 'int').implementation = function (p1, p2, p3) {
                showStacks();
                console.log("============================= [*]Called - getFromLocation(p1,p2,p3)=======================\r\n");
                var temp = this.getFromLocation(p1, p2, p3);
                console.log("getFromLocation: " + temp);
                return temp;
            }
            // This method was deprecated in API level 33.
            geocoder.getFromLocationName.overload('java.lang.String', 'int', 'double', 'double', 'double', 'double').implementation = function (p1, p2, p3, p4, p5, p6) {
                showStacks();
                console.log("============================= [*]Called - getFromLocationName(p1,p2,p3,p4,p5,p6)=======================\r\n");
                var temp = this.getFromLocationName(p1, p2, p3, p4, p5, p6);
                console.log("getFromLocationName: " + temp);
                return temp;
            }
            geocoder.getFromLocationName.overload('java.lang.String', 'int').implementation = function (p1, p2) {
                showStacks();
                console.log("============================= [*]Called - getFromLocationName(p1,p2)=======================\r\n");
                var temp = this.getFromLocationName(p1, p2);
                console.log("getFromLocationName: " + temp);
                return temp;
            }
        }
    } catch (e) {
        console.log("Function hookGetLocation-android.location.Geocoder failed. reason:" + e)
    }


    try {
        var LocationManager = Java.use("android.location.LocationManager");
        if (LocationManager.requestLocationUpdates != undefined) {
            LocationManager.requestLocationUpdates.overload('android.location.LocationRequest', 'android.app.PendingIntent').implementation = function (p1, p2) {
                showStacks();
                console.log("============================= [*]Called - requestLocationUpdates(p1,p2)=======================\r\n");
                var temp = this.requestLocationUpdates(p1, p2);
                console.log("requestLocationUpdates: " + temp);
                return temp;
            }
            LocationManager.requestLocationUpdates.overload('android.location.LocationRequest', 'android.location.LocationListener','android.os.Looper').implementation = function (p1, p2, p3) {
                showStacks();
                console.log("============================= [*]Called - requestLocationUpdates(p1,p2,p3)=======================\r\n");
                var temp = this.requestLocationUpdates(p1, p2, p3);
                console.log("requestLocationUpdates: " + temp);
                return temp;
            }
            LocationManager.requestLocationUpdates.overload('android.location.LocationRequest', 'java.util.concurrent.Executor', 'android.location.LocationListener').implementation = function (p1, p2, p3) {
                showStacks();
                console.log("============================= [*]Called - requestLocationUpdates(p1,p2,p3)=======================\r\n");
                var temp = this.requestLocationUpdates(p1, p2, p3);
                console.log("requestLocationUpdates: " + temp);
                return temp;
            }
            LocationManager.requestLocationUpdates.overload('long', 'float', 'android.location.Criteria', 'android.app.PendingIntent').implementation = function (p1, p2, p3, p4) {
                showStacks();
                console.log("============================= [*]Called - requestLocationUpdates(p1,p2,p3,p4)=======================\r\n");
                var temp = this.requestLocationUpdates(p1, p2, p3, p4);
                console.log("requestLocationUpdates: " + temp);
                return temp;
            }
            LocationManager.requestLocationUpdates.overload('java.lang.String', 'long', 'float', 'android.app.PendingIntent').implementation = function (p1, p2, p3, p4) {
                showStacks();
                console.log("============================= [*]Called - requestLocationUpdates(p1,p2,p3,p4)=======================\r\n");
                var temp = this.requestLocationUpdates(p1, p2, p3, p4);
                console.log("requestLocationUpdates: " + temp);
                return temp;
            }
            LocationManager.requestLocationUpdates.overload('java.lang.String', 'long', 'float','android.location.LocationListener').implementation = function (p1, p2, p3,p4) {
                showStacks();
                console.log("============================= [*]Called - requestLocationUpdates(p1,p2,p3,p4)=======================\r\n");
                var temp = this.requestLocationUpdates(p1, p2, p3,p4);
                console.log("requestLocationUpdates: " + temp);
                return temp;
            }
            LocationManager.requestLocationUpdates.overload('long', 'float', 'android.location.Criteria', 'android.location.LocationListener','android.os.Looper').implementation = function (p1, p2, p3, p4,p5) {
                showStacks();
                console.log("============================= [*]Called - requestLocationUpdates(p1,p2,p3,p4,p5)=======================\r\n");
                var temp = this.requestLocationUpdates(p1, p2, p3, p4,p5);
                console.log("requestLocationUpdates: " + temp);
                return temp;
            }
            LocationManager.requestLocationUpdates.overload('long', 'float', 'android.location.Criteria', 'java.util.concurrent.Executor', 'android.location.LocationListener').implementation = function (p1, p2, p3, p4,p5) {
                showStacks();
                console.log("============================= [*]Called - requestLocationUpdates(p1,p2,p3,p4,p5)=======================\r\n");
                var temp = this.requestLocationUpdates(p1, p2, p3, p4,p5);
                console.log("requestLocationUpdates: " + temp);
                return temp;
            }
            LocationManager.requestLocationUpdates.overload('java.lang.String', 'long', 'float', 'android.location.LocationListener', 'android.os.Looper').implementation = function (p1, p2, p3, p4, p5) {
                showStacks();
                console.log("============================= [*]Called - requestLocationUpdates(p1,p2,p3,p4,p5)=======================\r\n");
                var temp = this.requestLocationUpdates(p1, p2, p3, p4, p5);
                console.log("requestLocationUpdates: " + temp);
                return temp;
            }
            LocationManager.requestLocationUpdates.overload('java.lang.String', 'long', 'float', 'java.util.concurrent.Executor', 'android.location.LocationListener').implementation = function (p1, p2, p3, p4, p5) {
                showStacks();
                console.log("============================= [*]Called - requestLocationUpdates(p1,p2,p3,p4,p5)=======================\r\n");
                var temp = this.requestLocationUpdates(p1, p2, p3, p4, p5);
                console.log("requestLocationUpdates: " + temp);
                return temp;
            }
            LocationManager.getLastKnownLocation.overload('java.lang.String').implementation = function (p1) {
                showStacks();
                console.log("============================= [*]Called - getLastKnownLocation(p1)=======================\r\n");
                var temp = this.getLastKnownLocation(p1);
                console.log("getLastKnownLocation: " + temp);
                return temp;
            }
            LocationManager.getCurrentLocation.overload('java.lang.String', 'android.location.LocationRequest', 'android.os.CancellationSignal', 'java.util.concurrent.Executor', 'java.util.function.Consumer').implementation = function (p1, p2, p3, p4, p5) {
                showStacks();
                console.log("============================= [*]Called - getCurrentLocation(p1,p2,p3,p4,p5)=======================\r\n");
                var temp = this.getCurrentLocation(p1, p2, p3, p4, p5);
                console.log("getCurrentLocation: " + temp);
                return temp;
            }
            LocationManager.getCurrentLocation.overload('java.lang.String', 'android.os.CancellationSignal', 'java.util.concurrent.Executor', 'java.util.function.Consumer').implementation = function (p1, p2, p3, p4) {
                showStacks();
                console.log("============================= [*]Called - getCurrentLocation(p1,p2,p3,p4)=======================\r\n");
                var temp = this.getCurrentLocation(p1, p2, p3, p4);
                console.log("getCurrentLocation: " + temp);
                return temp;
            }
        }
    } catch (e) {
        console.log("Function hookGetLocation-android.location.LocationManager failed. reason:" + e)
    }

}

// 获取GetInstallPackages信息
function hookGetInstallPackages() {
    try {
        var pmPackageManager = Java.use("android.content.pm.PackageManager");
        if (pmPackageManager.getInstalledPackages != undefined) {
            pmPackageManager.getInstalledPackages.overload('int').implementation = function (p1) {
                showStacks();
                console.log("============================= [*]Called - pm-getInstalledPackages()=======================\r\n");
                var temp = this.getInstalledPackages(p1);
                console.log("getInstalledPackages: " + temp);
                return temp;
            };
            pmPackageManager.getInstalledApplications.overload('int').implementation = function (p1) {
                showStacks();
                console.log("============================= [*]Called - pm-getInstalledApplications()=======================\r\n");
                var temp = this.getInstalledApplications(p1);
                console.log("getInstalledApplications: " + temp);
                return temp;
            };
            pmPackageManager.getInstalledModules.overload('int').implementation = function (p1) {
                showStacks();
                console.log("============================= [*]Called - app-getInstalledModules()=======================\r\n");
                var temp = this.getInstalledModules(p1);
                console.log("getInstalledModules: " + temp);
                return temp;
            };
        }
    } catch (e) {
        console.log("Function hookGetInstallPackages-android.content.pm.PackageManager failed. reason:" + e)
    }

    try {
        var appPackageManager = Java.use("android.app.ApplicationPackageManager");
        if (appPackageManager.getInstalledPackages != undefined) {
            appPackageManager.getInstalledPackages.overload('int').implementation = function (p1) {
                showStacks();
                console.log("============================= [*]Called - app-getInstalledPackages()=======================\r\n");
                var temp = this.getInstalledPackages(p1);
                console.log("getInstalledPackages: " + temp);
                return temp;
            };
            appPackageManager.getInstalledApplications.overload('int').implementation = function (p1) {
                showStacks();
                console.log("============================= [*]Called - app-getInstalledApplications()=======================\r\n");
                var temp = this.getInstalledApplications(p1);
                console.log("getInstalledApplications: " + temp);
                return temp;
            };
            appPackageManager.queryIntentActivities.implementation = function (p1, p2) {
                showStacks();
                console.log("============================= [*]Called - app-queryIntentActivities()=======================\r\n");
                var temp = this.queryIntentActivities(p1, p2);
                console.log("queryIntentActivities: " + temp);
                return temp;
            };
            appPackageManager.getInstalledApplicationsAsUser.overload('int', 'int').implementation = function (p1, p2) {
                showStacks();
                console.log("============================= [*]Called - app-getInstalledApplicationsAsUser(p1,p2)=======================\r\n");
                var temp = this.getInstalledApplicationsAsUser(p1, p2);
                console.log("getInstalledApplicationsAsUser: " + temp);
                return temp;
            };
            appPackageManager.getInstalledPackagesAsUser.overload('int', 'int').implementation = function (p1, p2) {
                showStacks();
                console.log("============================= [*]Called - app-getInstalledPackagesAsUser(p1,p2)=======================\r\n");
                var temp = this.getInstalledPackagesAsUser(p1, p2);
                console.log("getInstalledPackagesAsUser: " + temp);
                return temp;
            };
        }
    } catch (e) {
        console.log("Function hookGetInstallPackages-android.app.ApplicationPackageManager failed. reason:" + e)
    }

}


Java.perform(function () {
    hookGetSystemInfo();
    hookRequestPermission();
    hookGetAndroidId();
    hookGetIMSI();
    hookGetIMEI();
    hookGetMacAddress();
    hookGetIPAddress();
    hookGetRunningAppProcesses();
    hookGetWifiState();
    hookGetHostInfo();
    hookGetLocation();
    hookGetInstallPackages();
})