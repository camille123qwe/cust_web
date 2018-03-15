import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { globalVar, showToast, HttpUrl } from '../common/global'
import { HttpGet } from './http-get';
//import { CallbackPage } from '../pages/callback/callback';
//import { TelephonePage } from '../pages/call-modal/call-modal';

@Injectable()
export class CallProvider {

  static phoneNumberService: string = "";
  static formatContacts = [];
  static allSearchContacts = [];
  static allRecords = [];
  static isRecordsEmpty: boolean = true;
  // http: HttpGet
  constructor(private http: HttpGet, public alertCtrl: AlertController) {
    console.log('Hello CallProvider Provider');

    /*
     * 格式化手机号
     */
    (String as any).prototype.replaceAll = function (s1, s2) {
      return this.replace(new RegExp(s1, 'gm'), s2);
    }
  }
 
  /*
 * 初始化通话记录
 */
   initRecords() {
    console.log('initRecords 初始化通话记录');

    var records = localStorage.getItem('allRecords');
    // console.log('records==' + records);
    //angular.equals(records, '') || angular.equals(records, 'null')
    if (records == null || records == '' || records == 'undefined') {
      console.log('通话记录为空');
      CallProvider.allRecords = [];
      CallProvider.isRecordsEmpty = true;
    } else {
      CallProvider.allRecords = JSON.parse(records);
      CallProvider.isRecordsEmpty = false;
    }
    return CallProvider.allRecords;
  }
  /*
   * 保存通话记录
   */
  saveCallRecords = function (contact) {
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

  }

  //拨打电话


  callSomebody(contact) {
    //先保存

    if(contact.phoneNumber.length !==0){
        this.saveCallRecords(contact);
    }
    
    // CallProvider.phoneNumberService = '';  //清除拨号

    // openCallingModal(phoneNumberService);	//显示拨通页面
    contact.phoneNumber = this.phoneNumberFormat(contact.phoneNumber); //格式化号码
  
//  console.log('aaaaaaaaaaaaaaaaaa'+ JSON.stringify(contact.phoneNumber.length))
    if(contact.phoneNumber.length==0 || contact.phoneNumber.length<7 || contact.phoneNumber.length>15){
      let alert = this.alertCtrl.create({
        title: '号码格式不正确',
        subTitle: '请输入8-15位有效号码',
        buttons: ['确定'],
      })
      alert.present();
      //  this.saveCallRecords(contact);
    }
    // else if(contact.phoneNumber.length<7){
    // let alert = this.alertCtrl.create({
    //     title: '号码格式不正确',
    //     subTitle: '请输入8-15位有效号码',
    //     buttons: ['确定'],
    //   })
    //   alert.present();
    // }else if(contact.phoneNumber.length>15){
    //   let alert = this.alertCtrl.create({
    //     title: '号码格式不正确',
    //     subTitle: '请输入8-15位有效号码',
    //     buttons: ['确定'],
    //   })
    // }
    else{
	    switch (localStorage.getItem('call_type')) {
	      case "call_back":
	        //回拨
	        this.callSomebodyBack(contact);
	        
	        break;
	      // case "call_direct":
	      //   //直拨
	      //   this.callDirect(contact);
	      //   break;
	      // case "call_smart":
	      //   //智能
	      //   this.callSomebodyBack(contact);
	      //   break;
	      default:
	        console.log('未设置默认拨打方式，自动设置为直拨');
	        localStorage.setItem('call_type', 'call_back');
	        this.callSomebodyBack(contact);
	
	        break;
	    }
	  }  
  }

  phoneNumberFormat = function (originPhone) {
    return originPhone.replaceAll(" ", "").replaceAll("-", "").replace("+", "00").trim();
  }
  //回拨
  callSomebodyBack = function (contact) {
//  console.log('callBack 回拨::' + contact.phoneNumber);
    var onSuccess = function (res, context) {
    	console.log('rereereeeeeeeeeeeee'+JSON.stringify(res))
      if (res.retcode == 0) {
//      console.log('回拨成功!请等待接听来电！');
        // localStorage.setItem('thirdcallno', data.result);
//      showToast('回拨成功!请等待接听来电！');
      	this.callpage.callBackShow();
      } else {
        // let alert = this.alertCtrl.create({
        //   title:res.retinfo +',请返回',
        //   buttons: ['确定'],
        // })
        // alert.present();
        alert(res.retinfo +',请返回')
      }

    }
    this.http.httpMethodContext(HttpUrl.callback + contact.phoneNumber, {}, onSuccess, this);
  }
  //直拨 step1
// callDirect = function(contact) {

		
// 			console.log('callDirect 直拨');
// 			var data = {
// 				phoneNumber: contact.phoneNumber,
// 				name: contact.displayName,
// 				local_name: '',
// 				// uid: localStorage.getItem('uid'),
// 			};
// 			console.log('callDirect data==' + JSON.stringify(data));
//       let phone = data.phoneNumber;
//       (<any>window).Cordova.exec(function(res) {

// 			}, function() {}, "RYZVoip", "direct", [{"phoneNumber":data.phoneNumber,"name":data.name,"local_name":data.local_name}]);
// 	}
}
