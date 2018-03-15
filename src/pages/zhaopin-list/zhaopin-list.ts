import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Navbar } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpContents, HttpUrl, showToast, globalVar,globalhead,globalimg } from '../../common/global';
import * as $ from 'jquery';
import wx from 'weixin-js-sdk';

@IonicPage()
@Component({
  selector: 'page-zhaopin-list',
  templateUrl: 'zhaopin-list.html',
})
export class ZhaopinListPage {

  listData = { rows: [], offset: 0, total: 0 };  //未读
  xiSh = true;
  infiniteScroll;
  limit = 20;
  loadingShops = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpGet) {
  }
  @ViewChild(Navbar) navBar: Navbar; 

  ionViewDidLoad() {
    this.navBar.backButtonClick = this.backButtonClick;
    console.log('ionViewDidLoad ZhaopinListPage');
    this.getData(this.infiniteScroll);
    this.init();

  }
  ionViewDidEnter(){
    this.navBar.backButtonClick = this.backButtonClick;
  }
  init(){
    this.wxshare();
  }
  backButtonClick = (e: UIEvent) => {
    location.href = globalhead;
   }
 wxshare(){
   if(location.href.indexOf('?path=zhaopin-list')<0){
    location.href = globalhead+'?path=zhaopin-list9527#/%E9%A6%96%E9%A1%B5/zhaopin-list';
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
         var shareTitle = "招聘列表";  //分享title
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
   
  toDetails(item) {
    this.navCtrl.push('ZhaopinDetailsPage', item.jobid);
  }
  getData(infiniteScroll) {
    this.loadingShops = true;
    let dataParams = {
      flipper: {
        limit: this.limit,
        offset: this.listData.offset,
        // sort: 'createtime DESC'
      },
      bean: {
        status: [10],
        longitude: globalVar.location.longitude,
        latitude: globalVar.location.latitude
      }
    }
    this.http.httpMethodContext(HttpUrl.jobList, dataParams, (res, context) => {
      context.loadingShops = false;
      if (typeof (infiniteScroll) !== 'undefined') {
        infiniteScroll.complete();
      }
      for (let item of res.rows) {
        if (item.salery) {
          item.saleryshow = item.salery / 100;
        }else{
          item.saleryshow = '面议';        
        }
        //距离
        if (item.distance == 0) {
          item.storeInfo.distanceShow = '';
        } else if (item.distance <= 1000) {

          item.storeInfo.distanceShow = "<" + 10 + "m";

        } else if (item.distance >= 100000) {

          item.storeInfo.distanceShow = Math.floor(item.distance / 1000) / 100 + "km"

        } else {

          item.storeInfo.distanceShow = Math.floor(item.distance / 100) + "m";

        }


      }
      context.listData.total = res.total;
      if (context.listData.offset == 0) {
        context.listData.rows = res.rows;
      } else {
        for (let item of res.rows) {
          context.listData.rows.push(item);
        }
      }


      if (res.rows.length == 0) {
        context.xiSh = false;
      }

    }, this);
  }

  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;

    if (this.listData.offset + this.limit < this.listData.total && !this.loadingShops) {
      console.log('加载更多');
      this.listData.offset += this.limit;
      this.getData(infiniteScroll);
    }
    infiniteScroll.complete();
    // }, 200);
  }
}
