import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Navbar } from 'ionic-angular';
import { HttpContents, HttpUrl, showToast, constVar,globalhead,globalimg } from '../../common/global';
import { HttpGet } from '../../providers/http-get';
import * as $ from 'jquery';
import wx from 'weixin-js-sdk';

@IonicPage()
@Component({
  selector: 'page-zhaopin-details',
  templateUrl: 'zhaopin-details.html',
})
export class ZhaopinDetailsPage {
  // goodsList = { sellprice: '', goodsface: '' };
  // ShopInfo;
  // StoreId;
  // GoodsId;
  // GoodsName
  // aloneDetail;
  // shangpingImg = [];
  // jieshao = true;
  // tedian = false;
  // FxIMg = 'assets/img/icon_fenxiang@2x.png';
  // goodsface_900 = constVar.goodsfaceurl_900;
  // danwei = true;

  zhaopinInfo;
  StoreImg = [];
  title_banner = "";
  storefaceurl_300 = constVar.storefaceurl_300;
  storefaceurl_900 = constVar.storefaceurl_900;
  storeimgsurl_720 = constVar.storeimgsurl_720;
  tel_str = '';
  call_mendian = true;
  storename = '';
  storeaddr = '';
  distanceShow = '';
  jobname = '';
  workyear = '';
  recordschool = '';
  saleryshow;
  isdeduct = 0;
  jobdesc = ''
  jobid;


  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpGet) {
    let zhaopindetail = window.location.href;
    if(zhaopindetail.indexOf('?jobid')>0){
      this.jobid = zhaopindetail.substr(zhaopindetail.indexOf("?jobid="),15).split("=")[1];
    }else{
      this.jobid = this.navParams.data;
    }
  }
  @ViewChild(Navbar) navBar: Navbar; 
  ionViewDidLoad() {
    this.navBar.backButtonClick = this.backButtonClick;//触发返回按钮的事件
    this.init();
    
    this.initData();
  }
  ionViewDidEnter(){
    this.navBar.backButtonClick = this.backButtonClick;
  }
  init(){
    this.wxshare();
  }
  backButtonClick = (e: UIEvent) => {
    //location.href = "http://localhost:8100/?path=zhaopin-list9527#/%E9%A6%96%E9%A1%B5/zhaopin-list";
    //location.href = "http://c.diancall.com/diancall_cust5/www/index.html?path=zhaopin-list9527#/%E9%A6%96%E9%A1%B5/zhaopin-list";
    location.href = globalhead+'?path=zhaopin-list9527#/%E9%A6%96%E9%A1%B5/zhaopin-list';
   }
 wxshare(){
   if(location.href.indexOf('?path=zhaopin-details')<0){
     //location.href = 'http://localhost:8100/?path=zhaopin-details9527?jobid='+this.jobid+'#/%E9%A6%96%E9%A1%B5/zhaopin-details';
    // location.href = 'http://c.diancall.com/diancall_cust5/www/index.html?path=zhaopin-details9527?jobid='+this.jobid+'#/%E9%A6%96%E9%A1%B5/zhaopin-details';
    location.href = globalhead+'?path=zhaopin-details9527?jobid='+this.jobid+'#/%E9%A6%96%E9%A1%B5/zhaopin-details'; 
  }

   function randomString() {
     let $chars = 'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
     let maxPos = $chars.length;
     let pwd = '';
     for (let i = 0; i < 32; i++) {
         pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
     }
     return pwd;
 }
 var sharesrc = location.href.split('#')[0];
 let timestampNum = randomString();
 let getsrc = encodeURIComponent(sharesrc);
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
         var imgUrl = globalimg+"www/assets/img/login_imge.png";  //图片LOGO注意必须是绝对路径
         var lineLink = sharesrc;   //网站网址，必须是绝对路径
         var descContent = '招聘信息'; //分享给朋友或朋友圈时的文字简介
         var shareTitle = "招聘详情";  //分享title
         var appid = ''; //apiID，可留空
         //分享给朋友
         wx.onMenuShareAppMessage({
             title: shareTitle, // 分享标题
             desc: descContent, // 分享描述
             link: lineLink, // 分享链接，该链接域名或路径必须与s当前页面对应的公众号JS安全域名一致
             imgUrl: imgUrl, // 分享图标
             type: 'link', // 分享类型,music、video或link，不填默认为link
             dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
             success: function () {
                 // 用户确认分享后执行的回调函数
                // location.href = srcdemo;
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
       })
     })
   }
  initData() {
    this.http.httpMethodContext(HttpUrl.findjob+this.jobid,{}, (res, context) => {
        let titleBanner = this.storefaceurl_900 + res.storeInfo.storeface;
        if (res.storeInfo.storeimgs == undefined) {
          context.StoreImg.push(titleBanner);
        } else {
          context.StoreImg = res.storeInfo.storeimgs.split(";");
          for (let i = 0; i < context.StoreImg.length; i++) {
            context.StoreImg[i] = this.storeimgsurl_720 + context.StoreImg[i];
          }
        }
        this.storename = res.storeInfo.storename;
        this.storeaddr = res.storeInfo.storeaddr;
        this.distanceShow = res.storeInfo.distanceShow;
        this.jobname = res.jobname;
         //工作年限
      if (!res.workyear) {
        this.workyear = '不限';
      }else{
        this.workyear = res.workyear;
      }
      if (!res.recordschool) {
        this.recordschool = '不限';
      }else{
        this.recordschool = res.recordschool;
      }
      if (typeof res.telno == 'undefined' || res.telno == 'null') {
        
        context.call_mendian = false;
        // this.telno = '暂无';
      } else {
       context.tel_str = 'tel:' + res.telno;
      }
      if (res.salery) {
        this.saleryshow = res.salery / 100;
      } else {
       this.saleryshow = '面议';
      }
      this.isdeduct = res.isdeduct;
      this.jobdesc = res.jobdesc;
    },this)
  }
}
