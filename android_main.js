function showStacks() {
    var Exception = Java.use("java.lang.Exception");
    var ins = Exception.$new("Exception");
    var straces = ins.getStackTrace();
    if (undefined == straces || null == straces) {
        return;
    }
    console.log("============================= Stack strat=======================");
    console.log("");
    for (var i = 0; i < straces.length; i++) {
        var str = "   " + straces[i].toString();
        console.log(str);
    }
    console.log("");
    console.log("============================= Stack end=======================\r\n");
    Exception.$dispose();
}

function hookGetSystemInfo() {
    var SP = Java.use("android.os.SystemProperties");
    SP.get.overload('java.lang.String').implementation = function (p1) {
        showStacks()
        var tmp = this.get(p1);
        console.log("[*]" + p1 + " : " + tmp);
        return tmp;
    }
    SP.get.overload('java.lang.String', 'java.lang.String').implementation = function (p1, p2) {
        showStacks()
        var tmp = this.get(p1, p2)
        console.log("[*]" + p1 + "," + p2 + " : " + tmp);
        return tmp;
    }
}


function hookRequestPermission(){
    var AC = Java.use("android.support.v4.app.ActivityCompat")
    AC.requestPermissions.overload('android.app.Activity','[Ljava.lang.String;','int').implementation = function (p1,p2,p3){
        showStacks();
        console.log("=============================[*]Called - requestPermissions=======================\r\n");
        var temp = this.requestPermissions(p1,p2,p3);
        console.log("requestPermissions: " + p2);
    }
}


function hookGetAndroidId() {
    var Secure = Java.use("android.provider.Settings$Secure");
    Secure.getString.implementation = function (p1, p2) {
        showStacks();
        if (p2.indexOf("android_id") < 0) return this.getString(p1, p2);
        console.log("=============================[*]Called - get android_ID=======================param is" + p2 + "\r\n");
        var temp = this.getString(p1, p2);
        console.log("get android_ID: " + temp);
        return temp;

    }
}

function hookGetIMSI() {
    var TelephonyManager = Java.use("android.telephony.TelephonyManager");
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


function hookGetIMEI() {
    var TelephonyManager = Java.use("android.telephony.TelephonyManager");
    // getDeviceId was deprecated in API level 26
    //获取单个IMEI
    TelephonyManager.getDeviceId.overload().implementation = function () {
        showStacks();
        console.log("============================= [*]Called - getDeviceId()=======================\r\n");
        var temp = this.getDeviceId();
        console.log("getDeviceId: " + temp);
        return temp;
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


function hookGetMacAddress() {
    var wifiInfo = Java.use("android.net.wifi.WifiInfo");
    wifiInfo.getMacAddress.implementation = function () {
        showStacks();
        console.log("============================= [*]Called - getMacAddress()=======================\r\n");
        var tmp = this.getMacAddress();
        console.log("getMacAddress: " + tmp);
        return tmp;
    };

    var networkInterface = Java.use("java.net.NetworkInterface");
    networkInterface.getHardwareAddress.overload().implementation = function () {
        showStacks();
        console.log("============================= [*]Called - getHardwareAddress()=======================\r\n");
        var temp = this.getHardwareAddress();
        console.log("getHardwareAddress: " + temp);
        return temp;
    };
}

function hookGetInstallSinglePackage(){
    // TODO
}



function hookGetInstallPackages() {
    var pmPackageManager = Java.use("android.content.pm.PackageManager");
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

    var appPackageManager = Java.use("android.app.ApplicationPackageManager");
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
    appPackageManager.queryIntentActivities.implementation = function (p1,p2) {
        showStacks();
        console.log("============================= [*]Called - app-queryIntentActivities()=======================\r\n");
        var temp = this.queryIntentActivities(p1,p2);
        console.log("queryIntentActivities: " + p1 + p2);
        return temp;
    };

}


Java.perform(function () {
    // hookRequestPermission();
    hookGetIMEI();
    hookGetIMSI();
    hookGetAndroidId();
    hookGetMacAddress();
    hookGetInstallPackages();
})