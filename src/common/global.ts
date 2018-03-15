///<reference path="../app/plugin/openinstall/openinstall.d.ts"/>
///<reference path="../app/plugin/redirect/redirect.d.ts"/>
import { Jsonp } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpGet } from '../providers/http-get';
import { LoginPage } from '../pages/login/login';
import * as $ from 'jquery';
import wx from 'weixin-js-sdk';

@Injectable()
export class Global {
	constructor(private jsonp: Jsonp, public http: HttpGet, ) {
		console.log('Global');
	}
}
export const globalVar = {

	//isDevice: true,
	openHotPush: true,

	 isDevice: false,
	// openHotPush: false,

	hasLoadContacts: false,
	rushShow: true,
	isbubble: false,

	govoucher: false,
	location: { latitude: '', longitude: '', city: '', storename: '', storeaddr: '' },
	// location:{latitude:'22.54926',longitude:'113.9656',city:'深圳市'}
	Pard_grids: [{ id: "wanghong", img: "assets/img/icon_wanghongzhibo@2x.png", txt: "网红直播", showNum: 1001, isShow: false },
	{ id: "meinv", img: "assets/img/icon_meinvzhaopian@2x.png", txt: "美女图片", showNum: 1002, isShow: false },
	{ id: "youxi", img: "assets/img/icon_qingsongyouxi@2x.png", txt: "轻松游戏", showNum: 1003, isShow: false },
	{ id: "kaixin", img: "assets/img/icon_kaixinyike@2x.png", txt: "开心一刻", showNum: 1004, isShow: false }
	],
	unreadcount: 0,
	welcomeImgs: [],		//引导页图片

	version_name: '2.1.4.20171104',

};
export var HttpContents = {

	appos: '', //	App平台名称Android，ios
	ptype: '',
	device_id: '',
	device_version: '',
	brand_name: 'diancall/1.0',		//need config
	app_version: '',
	screen_resolution: screen.width * window.devicePixelRatio + "*" + screen.height * window.devicePixelRatio,
	app_agent: '',
	netmode: '',
	ip: '121.35.103.141',
}


// var config_app = "/config/app";
var url_redyouzi = "https://c.diancall.com";
var url_redyouzi_test = 'http://192.168.1.128:6001';

var urlHost = url_redyouzi;
// var urlHost = url_redyouzi_test;

export const globalhead = 'https://c.diancall.com/diancall_web/www/index.html';
//export const globalhead = 'http://localhost:8100/';
//export const globalhead = 'http://c.diancall.com/diancall_test6/www/index.html';

export const globalimg = 'https://c.diancall.com/diancall_web/'

// callback: urlHost +  call_back_new
export const HttpUrl = {
	getSmsregcode: urlHost + '/pipes/custuser/smsregcode/',
	getSmsChangecode: urlHost + "/pipes/custuser/smsmobcode/",
	register: urlHost + "/pipes/custuser/signup",
	login: urlHost + "/pipes/custuser/login",
	logout: urlHost + "/pipes/custuser/logout",
	callback: urlHost + "/pipes/custvoipcall/zexuntocall/",
	callbackCancel: urlHost + "/pipes/custvoipcall/canceltoback/",
	getToken: urlHost + "/pipes/custvoipcall/uctoken",
	getGoods: urlHost + "/pipes/charge/pkgs", //查询充值套餐列表
	getRechargeParams: urlHost + "/pipes/charge/prepay",
	checkRechargePay: urlHost + '/pipes/chargepay/check/',
	getConfigApp: urlHost + "/config/app",
	getRecharge: urlHost + "/order/pay",
	getUserWallet: urlHost + "/user/wallet",
	changeNickname: urlHost + '/pipes/custuser/updateusername',
	changePassword: urlHost + '/pipes/custuser/updatepwd',
	getResetPswCode: urlHost + '/pipes/custuser/smspwdcode',
	// resetPassword: urlHost + '/pipes/custuser/updatepwd',
	appInstallCount: urlHost + '/pipes/appinstall/create',
	checkin: urlHost + '/pipes/custuser/checkin',

	//add
	// trafficCharge: urlHost + '/pipes/nwcharge/pkgs/',
	trafficCharge: urlHost + '/pipes/custexper/experthing/fluxs',
	exchangePoints: urlHost + '/pipes/custexper/experthing/out/',
	updatePhone: urlHost + '/pipes/custuser/updatemobile',
	getOldSmsregcode: urlHost + '/pipes/custuser/smsodmcode',
	changePortrait: urlHost + '/pipes/upload/custuser',
	userbaseData: urlHost + '/pipes/custinfo/mybasedata',
	myTrafficCharge: urlHost + '/pipes/custexper/myexperthing/fluxs',
	myVoiceCharge: urlHost + '/pipes/custexper/myexperthing/voips',
	getOneExperthing: urlHost + '/pipes/custexper/experthing/find/',
	myExper: urlHost + '/pipes/custexper/myexper',
	experDetails: urlHost + '/pipes/custexper/queryin',
	experExchangeRecords: urlHost + '/pipes/custexper/queryout',
	voiceTime: urlHost + '/pipes/custvoipcall/myvoicetime',
	readMessages: urlHost + '/pipes/custmessage/queryreaded',
	unReadMessages: urlHost + '/pipes/custmessage/queryunread',
	hasReadMessages: urlHost + '/pipes/custmessage/read/',
	shopFamiliar: urlHost + '/pipes/custstore/mystores/familiar',
	shopNearby: urlHost + '/pipes/custstore/mystores/recently',
	searchShop: urlHost + '/pipes/custstore/searchstore',
	unfollowShop: urlHost + '/pipes/custstore/unfollow/',
	shopAllowPush: urlHost + '/pipes/custstore/unforbit/',
	shopForbitPush: urlHost + '/pipes/custstore/forbit/',
	followShop: urlHost + '/pipes/custstore/follow/',
	beautyPhotos: urlHost + '/pipes/custinfo/querygirl',
	queryNews: urlHost + '/pipes/custinfo/querynews',
	newsType: urlHost + '/pipes/custinfo/newstypes',
	firstNews: urlHost + '/pipes/custinfo/firstnews',
	queryjoke: urlHost + '/pipes/custinfo/queryjoke',
	gameTop: urlHost + '/pipes/custinfo/games/top',
	gameNew: urlHost + '/pipes/custinfo/games/new',
	gameHot: urlHost + '/pipes/custinfo/games/hot',
	guessLikeShop: urlHost + '/pipes/custstore/guesslikes',
	shopGoodsGroup: urlHost + '/pipes/custgoods/goodsgroup/',
	shopGoods: urlHost + '/pipes/custgoods/query/',
	aloneGoods: urlHost + '/pipes/custgoods/find/',
	arroundShops: urlHost + '/pipes/custstore/recentlystore',
	myFlows: urlHost + '/pipes/custflux/querycost',
	privilege: urlHost + '/pipes/custquan/query/',
	retroaction: urlHost + '/pipes/custuser/feedback',
	parkGrid: urlHost + '/pipes/custinfo/edenList',
	addCards: urlHost + '/pipes/custcard/usecard',
	// quanList: urlHost + '/pipes/custcard/query',//custpromotion/query
	quanList: urlHost + '/pipes/custpromotion/query',
	ceshi: urlHost + '/pipes/custpromotion/query',


	findCar: urlHost + '/pipes/custcard/find/',
	smsRegisterCode: urlHost + '/pipes/custuser/smscodepost/',
	smsRegister: urlHost + '/pipes/custuser/smscodelogin',
	fenxiangrenwu: urlHost + '/pipes/share/createsharetask',
	fluxPool: urlHost + '/pipes/custflux/findfluxpool/',
	flowsData: urlHost + '/pipes/custflux/querycost',
	fluxPackge: urlHost + '/pipes/custflux/queryfluxpackage',
	payFlux: urlHost + '/pipes/custflux/payflux',
	updateFluxPool: urlHost + '/pipes/custflux/updatefluxpool',
	// getBanners: urlHost + '/app/frontcore/banner/banner_name_arr.txt',
	getBanners: urlHost + '/pipes/bannerpage/query',

	unReadMsgCount: urlHost + '/pipes/custmessage/unreadcount',
	huoqurenwu: urlHost + '/pipes/share/findshareaward/',
	oneShopInfo: urlHost + '/pipes/custstore/findstoreinfo/', // /pipes/share/findstoreinfo/ 
	querygoodsrush: urlHost + '/pipes/custrush/querygoodsrush',//抢购信息列表
	findgoodsrush: urlHost + '/pipes/custrush/findgoodsrush/',//,	查询抢购信息详情
	rushgoods: urlHost + '/pipes/custrush/rush',//	商品抢购
	jobList: urlHost + '/pipes/custjob/query',
	jonbDetails: urlHost + '/pipes/custjob/find',
	welcomeImgs: urlHost + '/pipes/startpage/query',
	validcodeImg: urlHost + '/pipes/validcode/get/',
	rushindex: urlHost + '/pipes/rush/querygoodsrushindex',//首页限时
	cdaward: urlHost + '/pipes/cdraward/query',//抽奖
	pointerDdaward: urlHost + '/pipes/cdraward/cdr',//抽奖
	qiandao: urlHost + '/pipes/custuser/checkin',//签到
	mycheckinfo: urlHost + '/pipes/custuser/mycheckinfo',//抢到状态
	giftList: urlHost + '/pipes/checkaward/query',//签到奖品列表
	shipAddr: urlHost+ '/pipes/custshipadder/find',//查询用户收货地址列表
	add2custcart: urlHost+ '/pipes/b2cmall/add2custcart',//商品添加购物车
	mycustcart: urlHost+ '/pipes/b2cmall/mycustcart',//查询我的购物车
	deletecustcart: urlHost+ '/pipes/b2cmall/deletecustcart',//删除购物车商品
	querycategoty: urlHost+ '/pipes/3km/querycategoty',//行业分类
	querygoods: urlHost+ '/pipes/3km/querygoods',//查询商品
	goodsorder: urlHost+ '/pipes/b2cmall/createcustgoodsorder',//生成订单
	myAddress: urlHost+ '/pipes/custshipadder/update',//我的地址

	queryService: urlHost + '/pipes/merchservice/query', //查询商家提供的预约服务列表
	querygoodsorder : urlHost + '/pipes/b2cmall/querycustgoodsorder',//查询当前用户的订单列表
	confirmgoodsorder : urlHost + '/pipes/b2cmall/confirmgoodsorder/', //确认收货
	cancelgoodsorder: urlHost + '/pipes/b2cmall/cancelgoodsorder/',//取消订单
	reminder: urlHost + '/pipes/b2cmall/reminder/',//催单
	shortcode : urlHost + '/pipes/s/generate/',//生成短连接的后缀
	shortlink : urlHost + '/pipes/s/' ,//生成短连接的链接
	findjob : urlHost + '/pipes/share/findjob/' ,//查看招聘详情
	mycdrcount: urlHost + '/pipes/cdraward/mycdrcount',//抽奖次数
    prepay: urlHost + '/pipes/b2cpay/prepay',//app支付
    bookservice: urlHost + '/pipes/b2cmall/bookservice',//预约服务下单
    sin_recently: urlHost + '/pipes/share/custshare/recently',//分享赠送
    custmerchdelivery: urlHost + '/pipes/custmerchdelivery/find/',

    recharge: urlHost + '/pipes/cdraward/recharge',
    guessLike: urlHost + '/pipes/custgoods/guess', //猜你喜欢
    notification: urlHost +'/pipes/notification/query', //通知信息

    fixorderinfo: urlHost + '/pipes/b2cmall/updategoodsorder/shippingaddress',//订单修改
    custcdhis: urlHost + '/pipes/custcdhis/check/',//活动商品核销

}
export var showToast = function (msg) {
	if (globalVar.isDevice) {
		(<any>window).plugins.toast.showShortCenter(msg);
	}
	
}
/**
 * 设备信息
 */
var initDeviceInfo = function () {
	let device = (<any>window).device;
	let cordova = (<any>window).cordova;
	HttpContents.appos = device.platform;
	HttpContents.device_id = device.uuid;
	HttpContents.ptype = device.manufacturer + ' ' + device.model;
	HttpContents.device_version = device.version;
	cordova.getAppVersion.getVersionNumber(function (version) {
		HttpContents.app_version = version;
		HttpContents.app_agent = HttpContents.brand_name + '/' + HttpContents.app_version + '; ' +
			HttpContents.appos + '/' + HttpContents.device_version + '; ' +
			device.manufacturer + '/' + device.model + '; ' + HttpContents.screen_resolution;
		console.log('app_agent==' + HttpContents.app_agent);
	});
}
/*
 * 获取网络状态
 */
var getNetWorkState = function () {
	let navigator = (<any>window).navigator;
	let networkState = navigator.connection.type;
	let Connection = (<any>window).Connection;
	//wifi、3g、4g、gprs
	var states = {};
	states[Connection.UNKNOWN] = 'gprs';
	states[Connection.ETHERNET] = 'gprs';
	states[Connection.WIFI] = 'wifi';
	states[Connection.CELL_2G] = 'gprs';
	states[Connection.CELL_3G] = '3g';
	states[Connection.CELL_4G] = '4g';
	states[Connection.CELL] = 'Cell generic connection';
	// states[Connection.NONE]     = 'No network connection'; 
	if (networkState === Connection.NONE) {
		showToast("网络断开！");
		return;
	}

	HttpContents.netmode = states[networkState];
}

/**
 * 初始化
 */
export var initNative = function () {
	initDeviceInfo();
	getNetWorkState();

}
export var initData = function () {
	//默认拨打方式
	if (localStorage.getItem('call_type') == null) {
		localStorage.setItem('call_type', 'call_back');
	}
	HttpContents.ip = (<any>window).returnCitySN["cip"];
}



export const constVar = {
	portrait_server_path: 'http://c.diancall.com/dir/custuser_128/',
	storefaceurl_300: 'http://c.diancall.com/dir/storeface_300/',
	storefaceurl_900: 'http://c.diancall.com/dir/storeface_900/',
	goodsfaceurl_300: 'http://c.diancall.com/pipes/img/goods_300/',
	goodsfaceurl_900: 'http://c.diancall.com/pipes/img/goods_900/',
	storeimgsurl_720: 'http://c.diancall.com/dir/storeimg_720/',
	qrcode: 'http://c.diancall.com/app/cdl/custuser36id:',
	// banner_url: 'http://c.diancall.com/app/frontcore/banner/',
	banner_url: urlHost + '/dir/custbanner/',

	welcome_url: urlHost + '/dir/startpage58/',
	register_url: 'http://merch.diancall.com/modules/share/shareLogin/shareLogin.html',
}

export var saveLoginInfo = function (res) {
	localStorage.setItem("custuserid", res.result.custuserid);
	localStorage.setItem("custuser36id", res.result.custuser36id);

	console.log('custuserid==' + res.result.custuserid);
	console.log('custuser36id==' + res.result.custuser36id);

	// localStorage.setItem("mobilex", res.result.mobilex);
	// localStorage.setItem("custuser36id", res.result.custuser36id);
	// localStorage.setItem("custuserid", res.result.custuserid);

	// localStorage.setItem("uid", res.result.brand36id);

}
export var loadScript = function (url, callback) {
	let script: any = document.createElement("script");
	script.type = "text/javascript";
	if (typeof (callback) != "undefined") {
		if (script.readyState) {
			script.onreadystatechange = function () {
				if (script.readyState == "loaded" || script.readyState == "complete") {
					script.onreadystatechange = null;
					callback();
				}
			};
		} else {
			script.onload = function () {
				callback();
			};
		}
	}
	script.src = url;
	document.body.appendChild(script);
}

export var code2Html = function (str: string) {
	let arrEntities = { 'nbsp': ' ' };
	str = str.replace(/&(nbsp);/ig, function (all, t) { return arrEntities[t] }).replace(/\r?\n/g, "<br />");
	return str;
}
/*
* 是否登录
*/
export var isLogin = function (): boolean {
	console.log('isLogin');
	let custuserid = localStorage.getItem('custuserid');
	if (custuserid == null || custuserid === 'undefined') {
		console.log('未登录');
		return false;
	} else {
		console.log('已经登录：' + custuserid);
		return true;
	}
}
/*
*
*登录超时
*/
// if (res.json().retcode == 30020001) {
//   showToast('登录超时');
//   console.log('登录超时');
//   context.navCtrl.push(LoginPage, { 'later': true });

// } else {
//   onSuccess(res.json(), context);
// }
/*
* 去登录
*/
export var goLogin = function (context, later?: boolean): boolean {
	console.log('isLogin');
	let custuserid = localStorage.getItem('custuserid');
	if (custuserid == null || custuserid === 'undefined') {
		console.log('未登录');
		context.app.getRootNav().push(LoginPage, { 'later': later });
	//	context.navCtrl.push(LoginPage, { 'later': later });
		return false;
	} else {
		console.log('已经登录：' + custuserid);
		return true;
	}
}
export var initFunction = function () {
	(String as any).prototype.replaceAll = function (s1, s2) {
		return this.replace(new RegExp(s1, 'gm'), s2);
	};
	(Date as any).prototype.format = function (format) {
		var date = {
			"M+": this.getMonth() + 1,
			"d+": this.getDate(),
			"h+": this.getHours(),
			"m+": this.getMinutes(),
			"s+": this.getSeconds(),
			"q+": Math.floor((this.getMonth() + 3) / 3),
			"S+": this.getMilliseconds()
		};
		if (/(y+)/i.test(format)) {
			format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
		}
		for (var k in date) {
			if (new RegExp("(" + k + ")").test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1
					? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
			}
		}
		return format;
	}

}

/**
 * 发送验证码按钮倒计时
 */
export var changeCodeBtn = function (context) {
	context.code_css = 'btnVerifyInable';
	context.code_disable = true;
	let cont = 59;
	let interval = setInterval(() => {
		context.code_txt = cont + '秒';
		cont--;
		if (cont == 0) {
			context.code_css = 'btnVerify';
			context.code_txt = '获取验证码';
			context.code_disable = false;
			clearInterval(interval);
		}
	}, 1000);
} 
export var isHistoryBack = function() {   
	if (window.history && window.history.pushState) {  
					 $(window).on('popstate', function () {  
									//window.location.href = "http://c.diancall.com/diancall_cust/www/index.html";
									//alert("页面回退了");
									//console.log("是我");
						});  
	  }
	  window.history.pushState('forward', null, '#'); //在IE中必须得有这两行  
	  
	  window.history.forward();  
}; 
export var set_param = function(param,value,src){
    var query = location.search.substring(1);
    var p = new RegExp("(^|&"+param+")=[^&]*");
    if(p.test(query)){
        query = query.replace(p,"$1="+value);
    }else{
        if(query == ''){
            location.hash = "#/"+src+'?'+param+'='+value;
        }else{
            location.hash = "#"+src+'?'+query+'&'+param+'='+value;
        }
    }    
} 
export var backButtonClick = (e: UIEvent) => {
	//location.href = "http://c.diancall.com/diancall_cust3/www/index.html";
	//this.navCtrl.pop();
//	console.log("不是我")
  }
export var commonwxshare = function(){
    function randomString() {
      let $chars = 'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
      let maxPos = $chars.length;
      let pwd = '';
      for (let i = 0; i < 32; i++) {
          pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
  }
  var src = location.href.split("#")[0];
  let timestampNum = randomString();
  let getsrc = encodeURIComponent(src);
  $.get('http://c.diancall.com/pipes/wechat/getaccesstoken?url='+getsrc+'&noncestr='+timestampNum,function(res){
      res = JSON.parse(res);
      console.log(res);
      var timestamp = res.timestamp;
      var signature = res.signature;
      var goodsname = "测试";
      wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: 'wx58861130a10e525b', // 必填，公众号的唯一标识
          timestamp: timestamp, // 必填，生成签名的时间戳
          nonceStr: timestampNum, // 必填，生成签名的随机串
          signature: signature,// 必填，签名，见附录1
          jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareAppMessage', 'onMenuShareQQ'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      wx.checkJsApi({
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
          success: function (res) {
              // 以键值对的形式返回，可用的api值true，不可用为false

              // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
          }
      });
      wx.ready(function () {
          var imgUrl = globalimg + "www/assets/img/huodong.png";  //图片LOGO注意必须是绝对路径
          var lineLink = src;   //网站网址，必须是绝对路径
          var descContent = '品牌商家联合大放价！万元大奖等你来拿！'; //分享给朋友或朋友圈时的文字简介
          var shareTitle = "店呼金浦家装节大转盘";  //分享title
          var appid = 'wx291eff92df433407'; //apiID，可留空
          //分享给朋友
          wx.onMenuShareAppMessage({
              title: shareTitle, // 分享标题
              desc: descContent, // 分享描述
              link: lineLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: imgUrl, // 分享图标
              type: '', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: function () {
                  // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                  // 用户取消分享后执行的回调函数
              }
          });
          //分享到朋友圈
          wx.onMenuShareTimeline({
              title: shareTitle, // 分享标题
              link: lineLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: imgUrl, // 分享图标
              success: function () {
                  // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                  // 用户取消分享后执行的回调函数
              }
          });
          //分享到qq
          wx.onMenuShareQQ({
              title: shareTitle, // 分享标题
              link: lineLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: imgUrl, // 分享图标
              success: function () {
                  // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                  // 用户取消分享后执行的回调函数
              }
          });
          //分享到qq空间
          wx.onMenuShareQZone({
              title: shareTitle, // 分享标题
              link: lineLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: imgUrl, // 分享图标
              success: function () {
                  // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                  // 用户取消分享后执行的回调函数
              }
          });
      });
 })
 
 }
//  export var  install = function(data:any){
//     new OpenInstall({
//         appKey : "fhgawx",
//         /*可选参数，自定义android平台的apk下载文件名，只有apk在openinstall托管时才有效；
//          个别andriod浏览器下载时，中文文件名显示乱码，请慎用中文文件名！*/
//         apkFileName : "diancall-cust.apk",
//         /*可选参数，是否优先考虑拉起app;某些android浏览器无法拉起app(或拉取体验不佳)的情况下，
//          将使用H5遮罩的形式提示用户用其他浏览器打开*/
//         preferWakeup:true,
//         onready : function() {
//             var m = this,button = document.getElementsByClassName("openApp");
//             for(var i =0;i<button.length;i++){
//                 button[i].style.visibility="visible";
//                 button[i].onclick=function(){
//                     //500毫秒后app尚未拉起，将安装app，可自定义超时时间，单位为毫秒
//                     m.wakeupOrInstall({timeout:2000});
//                 };

//             }
//         }
//     }, data);
// }
