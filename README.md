# APPPrivacyDetect

为了响应工信部通报而写(抄)的一些检测APP违规收集信息的Frida脚本

## 说明

目前可以实现对以下信息收集的检测，可能hook的方法不全，但应付工信部大概足够了

- AndroidId
- IMEI
- IMSI
- MacAddress
- InstallPackages
- RequestPermission


## 环境

只在Pixel4A - Android11上测试通过

不同的API LEVEL在APP中有不同的处理函数，所以尽量使用Android11当测试机


## 用法

想要获取什么信息就在Java.perform里面加什么函数就可以了

frida -U -l main.js -f com.dawnnnnnn.test1 --no-pause


## 一些吐槽

1. 有时候不是APP本身出了问题，特别是手游，因为存在游戏渠道的原因，各渠道会打包自己的SDK进去，第三方的SDK出了问题，通报还是到我们这里来，不是很合理。
2. 网络应急技术处理协调中心某省分中心通报的很多安全漏洞简直就是无中生有，希望能好好做检测


## 鸣谢

本项目的很多函数来自以下项目或作者

[m4bln](https://mabin004.github.io/2018/12/20/%E5%88%A9%E7%94%A8Frida%E4%BF%AE%E6%94%B9Android%E8%AE%BE%E5%A4%87%E7%9A%84%E5%94%AF%E4%B8%80%E6%A0%87%E5%BF%97%E7%AC%A6/)

[移动安全王铁头](https://www.bilibili.com/read/cv9078155)