var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { showToast, HttpUrl } from '../common/global';
import { HttpGet } from './http-get';
export var CallProvider = (function () {
    // http: HttpGet
    function CallProvider(http) {
        this.http = http;
        /*
         * 保存通话记录
         */
        this.saveCallRecords = function (contact) {
            console.log('saveCallRecords 保存通话记录');
            var record = { phoneNumber: '', displayName: '', callTime: '' };
            record.phoneNumber = contact.phoneNumber;
            record.displayName = contact.displayName;
            var dateStr = new Date().toString();
            record.callTime = dateStr.substring(16, 25);
            // console.log('record==' + JSON.stringify(record));
            var records = localStorage.getItem('allRecords');
            // console.log('records==' + records);
            if (records != '' && records != null && records != "undefined") {
                console.log('通话记录不为空');
                CallProvider.allRecords = JSON.parse(records);
            }
            CallProvider.allRecords.unshift(record);
            localStorage.setItem('allRecords', JSON.stringify(CallProvider.allRecords));
            // console.log('allRecords after ==' + localStorage.getItem('allRecords'));
            CallProvider.isRecordsEmpty = false;
        };
        this.phoneNumberFormat = function (originPhone) {
            return originPhone.replaceAll(" ", "").replaceAll("-", "").replace("+", "00").trim();
        };
        //回拨
        this.callSomebodyBack = function (contact) {
            console.log('callBack 回拨::' + contact.phoneNumber);
            var onSuccess = function (res, context) {
                if (res.retcode == 0) {
                    console.log('回拨成功!请等待接听来电！');
                    // localStorage.setItem('thirdcallno', data.result);
                    showToast('回拨成功!请等待接听来电！');
                }
                else {
                    alert(res.retinfo);
                }
            };
            this.http.httpMethodContext(HttpUrl.callback + contact.phoneNumber, {}, onSuccess, this);
        };
        //直拨 step1
        this.callDirect = function (contact) {
            // if(flagConnectedYZX) {
            // 	console.log('callDirect 直拨');
            // 	var data = {
            // 		phoneNumber: contact.phoneNumber,
            // 		name: contact.displayName,
            // 		local_name: '',
            // 		uid: localStorage.getItem('uid'),
            // 	};
            // 	console.log('callDirect data==' + angular.toJson(data));
            // 	cordova.exec(function(data) {
            // 	}, function() {}, "CzVoip", "direct", [data]);
            // } else {
            // 	console.log('callDirect 未连接，先连接云之讯!');
            // 	connect(localStorage.getItem('loginToken'), true, contact);
            // }
            console.log('callDirect 直拨');
            var data = {
                phoneNumber: contact.phoneNumber,
                name: contact.displayName,
                local_name: '',
            };
            console.log('callDirect data==' + JSON.stringify(data));
            var phone = data.phoneNumber;
            window.Cordova.exec(function (res) {
            }, function () { }, "RYZVoip", "direct", [{ "phoneNumber": data.phoneNumber, "name": data.name, "local_name": data.local_name }]);
        };
        console.log('Hello CallProvider Provider');
        /*
         * 格式化手机号
         */
        String.prototype.replaceAll = function (s1, s2) {
            return this.replace(new RegExp(s1, 'gm'), s2);
        };
    }
    /*
   * 初始化通话记录
   */
    CallProvider.prototype.initRecords = function () {
        console.log('initRecords 初始化通话记录');
        var records = localStorage.getItem('allRecords');
        // console.log('records==' + records);
        //angular.equals(records, '') || angular.equals(records, 'null')
        if (records == null || records == '' || records == 'undefined') {
            console.log('通话记录为空');
            CallProvider.allRecords = [];
            CallProvider.isRecordsEmpty = true;
        }
        else {
            CallProvider.allRecords = JSON.parse(records);
            CallProvider.isRecordsEmpty = false;
        }
        return CallProvider.allRecords;
    };
    //拨打电话
    CallProvider.prototype.callSomebody = function (contact) {
        //先保存
        this.saveCallRecords(contact);
        // CallProvider.phoneNumberService = '';  //清除拨号
        // openCallingModal(phoneNumberService);	//显示拨通页面
        contact.phoneNumber = this.phoneNumberFormat(contact.phoneNumber); //格式化号码
        switch (localStorage.getItem('call_type')) {
            case "call_back":
                //回拨
                // openCallingModal(contact.phoneNumber);
                this.callSomebodyBack(contact);
                break;
            case "call_direct":
                //直拨
                this.callDirect(contact);
                break;
            case "call_smart":
                //智能
                this.callSomebodyBack(contact);
                break;
            default:
                console.log('未设置默认拨打方式，自动设置为直拨');
                localStorage.setItem('call_type', 'call_back');
                this.callSomebodyBack(contact);
                break;
        }
    };
    CallProvider.phoneNumberService = "";
    CallProvider.formatContacts = [];
    CallProvider.allRecords = [];
    CallProvider.isRecordsEmpty = true;
    CallProvider = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [HttpGet])
    ], CallProvider);
    return CallProvider;
}());
//# sourceMappingURL=call-provider.js.map