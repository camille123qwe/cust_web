import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, ModalController, AlertController, NavParams,Navbar } from 'ionic-angular';
import { HttpContents, HttpUrl, showToast, constVar, globalVar, isLogin, goLogin,globalhead ,globalimg} from '../../common/global';
import { HttpGet } from '../../providers/http-get';
import * as $ from 'jquery';
import wx from 'weixin-js-sdk';
@IonicPage()
@Component({
  selector: 'page-xianshishop',
  templateUrl: 'xianshishop.html'
})
export class xianShiShopPage {
  // 剩余抢券时间{{surplusTime}}天
  more = false;
  FxIMg = 'assets/img/icon_fenxiang@2x.png';
  goodsName = ''; sellprice = ''; marketprice = ''; baifenbi = ''; distance; storeName = ''; storeaddr = '';
  openTime = ''; closeTime = ''; start_stop = ''; surplusTime; goodsdesc = ''; goodsface; phonenum; unit = '';
  limttime;
  activeStore = [];
  storeId;
  rushId;
  jindu;
  rushshow;
  tel_str;
  goodsface_900 = constVar.goodsfaceurl_900;
  qiangTxt = '抢券';
  qiangClass = 'qiang';
  rushStoreid;
  rushid;
  StoreImg;
  maxDistance;
  src = '';
  flag = "";
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public modalCtrl: ModalController, private http: HttpGet, public navParams: NavParams, ) {
    this.rushshow = globalVar.rushShow;
    let xianshisrc = window.location.href;
    if(xianshisrc.indexOf('?rushStoreid')>0){
      this.rushStoreid =  xianshisrc.substr(xianshisrc.indexOf("?rushStoreid="),21).split("=")[1];
      this.rushid = xianshisrc.substr(xianshisrc.indexOf("?rushid="),21).split("=")[1]; 
      let flag1 =  xianshisrc.substr(xianshisrc.indexOf("?flag="),xianshisrc.indexOf("8576")).split("=")[1];
      if(flag1){
        this.flag = flag1.split("8576#")[0];
      }
    } else {
      this.rushStoreid = this.navParams.data.info.storeids;
      this.rushid = this.navParams.data.info.rushid; 
      this.flag = this.navParams.data.last;
    }
    
  }
  @ViewChild(Navbar) navBar: Navbar; 

  ionViewDidLoad() {
    this.init();
    this.navBar.backButtonClick = this.backButtonClick;
    this.findSrush();
    if (this.more == true) {
      let tel = document.getElementById('xs_tel');
      tel.ontouchstart = function () {
        tel.style.backgroundColor = "#efeff4";
      };
      tel.ontouchend = function () {
        // 还原白色
        tel.style.backgroundColor = "transparent";
      };
    }
  }
  ionViewDidEnter(){
    this.navBar.backButtonClick = this.backButtonClick;
  }
  init(){
    this.wxshare();
  }
  backButtonClick = (e: UIEvent) => {
    if(this.flag=="list"){
      location.href = globalhead+'?path=xianshiyouhui9527#/%E9%A6%96%E9%A1%B5/xianshiyouhui';
    }else{
      location.href = globalhead; 
    }
   }
  wxshare(){
    if(location.href.indexOf('?path=xianshishop')<0){
      location.replace(globalhead+'?path=xianshishop9527?rushStoreid='+this.rushStoreid+'?rushid='+this.rushid+'?flag='+this.flag+'8576#/%E9%A6%96%E9%A1%B5/xianshishop');
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
          var descContent = '强力推荐！更多精彩，尽在店呼'; //分享给朋友或朋友圈时的文字简介
          var shareTitle = "限时抢购";  //分享title
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
  genduo() {
    this.more = true;
  }

  fnAlert(text) {
    let alert = this.alertCtrl.create({
      title: text,
      buttons: ['确定']
    })
    alert.present();
  }
  provision() {
    let myModal = this.modalCtrl.create('provisionAlertPage', this.activeStore);
    myModal.onDidDismiss((data) => {
      if (data) {
        this.rushStoreid = data.storeid;
        this.maxDistance = data.distance;
        this.distance = data.distance;
        if (this.distance == 0) {
          this.distance = '';
        } else if (this.distance <= 1000) {
          this.distance = "<" + 10 + "m";
        } else if (this.distance >= 100000) {
          this.distance = Math.floor(this.distance / 1000) / 100 + "km"
        } else {
          this.distance = Math.floor(this.distance / 100) + "m";
        }
        this.storeName = data.storename;
        this.storeaddr = data.storeaddr;
        this.tel_str = 'tel:' + data.storetel;
        this.phonenum = data.storetel;
        let o = '09:00';
        let c = '18:00 ';
        data.opentime == undefined ? this.openTime = o : this.openTime = data.opentime;
        data.closetime == undefined ? this.closeTime = c : this.closeTime = data.closetime;
      }

    })
    myModal.present();
  }
  // 

  retAlert(text) {
    if (typeof (text) == 'undefined' || text.length == 0) {
      return false;
    } else {
      return true;
    }
  }


  findSrush() {
    let data = {
      bean: {
        rushid: this.rushid,
        longitude: globalVar.location.longitude,
        latitude: globalVar.location.latitude,
        city: globalVar.location.city,
      }
    }

    this.http.httpMethodContext(HttpUrl.findgoodsrush, data, (res, context) => {
      context.storeId = res.storeInfos[0].storeid;
      context.rushId = res.rushid;
      context.activeStore = res.storeInfos;
      context.goodsName = res.goodsname;
      context.sellprice = res.sellprice / 100;
      context.marketprice = res.marketprice / 100;
      context.baifenbi = "已抢" + Math.floor((res.releasequality - res.retquality) / res.releasequality * 100) + '%';
      context.surplusTime = Math.ceil((res.rushendtime - (new Date().getTime())) / 86400000);
      context.limttime = '剩余抢券时间' + context.surplusTime + '天';
      context.storeName = res.storeInfos[0].storename;
      context.storeaddr = res.storeInfos[0].storeaddr;
      context.goodsdesc = res.goodsdesc;
      context.phonenum = res.storeInfos[0].storetel;
      context.tel_str = 'tel:' + res.storeInfos[0].storetel;
      context.goodsface = res.goodsface;
      let imgs=[];
       imgs= res.goodsimgs.split(";");
      if(imgs.length>5){
          for (let i=0; i<imgs.length; i++) {
              context.StoreImg.push(imgs[i])
              if(i>=4){
                break;
              }
          }
        }else{
          context.StoreImg=imgs;
        }
      context.unit = res.unit;
      if (res.isRushed == 'true') {
        context.qiangTxt = '已抢';
        context.qiangClass = 'yiqiang';
      } else {
        context.qiangTxt = '抢券';
        context.qiangClass = 'qiang';
        if (res.retquality == 0) {
          context.qiangTxt = '已抢完';
          context.qiangClass = 'yiqiang';
        }
      };

      context.maxDistance = res.storeInfos[0].distance;
      context.distance = res.storeInfos[0].distance;
      if (context.distance == 0) {
        context.distance = '';
      } else if (context.distance <= 1000) {
        context.distance = "<" + 10 + "m";
      } else if (context.distance >= 100000) {
        context.distance = Math.floor(context.distance / 1000) / 100 + "km";
      } else {
        context.distance = Math.floor(context.distance / 100) + "m";
      }
      let o = '09:00';
      let c = '18:00 ';
      if (globalVar.rushShow == true) {
        context.jindu = {
          'width': Math.floor((res.releasequality - res.retquality) / res.releasequality * 100) + '%',
        };
      } else {
        context.limttime = '抢购即将开始';
        context.jindu = {
          'width': 0 + 'px',
        };
        context.baifenbi = '抢购即将开始';

      }

      res.storeInfos[0].opentime == undefined ? context.openTime = o : context.openTime = res.storeInfos[0].opentime;
      res.storeInfos[0].closetime == undefined ? context.closeTime = c : context.closeTime = res.storeInfos[0].closetime;

      let newDate1: any = new Date();
      newDate1.setTime(res.validstarttime);
      let start = newDate1.format('MM-dd');

      let newDate2: any = new Date();
      newDate2.setTime(res.validendtime);
      let end = newDate2.format('MM-dd');
      context.start_stop = start + '—' + end;
    }, this);
  }

  ngshow(txt) {
    if (typeof (txt) == 'undefined' || txt.length == 0) {
      return false;
    } else {
      return true;
    }
  }
  maxdistance() {
    if (this.qiangTxt == '已抢' || this.qiangTxt == '已抢完') {
      this.rushGoods();
    } else {
      if (this.maxDistance >= 10000000) {
        let Distances = Math.floor(this.maxDistance / 100 / 1000) + 'km'
        let showMessage = '<p>' + this.storeName + '</p>' + '<p>相距' + Distances + '距离较远</p>' + '<p>是否确认继续抢购?</p>';
        let alert = this.alertCtrl.create({
          title: '提示',
          subTitle: '您与提货商铺',
          message: showMessage,
          buttons: [
            {
              text: '确定',
              role: 'cancel',
              handler: () => {
                this.rushGoods();
              }
            },
            {
              text: '取消',
              handler: () => {
              }
            }
          ]
        })
        alert.present();
      } else {
        this.rushGoods();
      }
    }
  }

  rushGoods() {
    event.stopPropagation();

    let data = {
      bean: {
        rushid: this.rushid,
        storeid: this.storeId,
        custuserid: localStorage.getItem('custuserid'),
      },

    }
    this.http.httpMethodContext(HttpUrl.rushgoods, data, (res, context) => {
      if (res.retcode == 0) {
        let alert = this.alertCtrl.create({
          title: '提示',
          subTitle: '成功抢得一张优惠券',
          message: '请在“我的优惠”中查看',
          buttons: ['我知道了']
        })
        alert.present();
        this.qiangTxt = '已抢';
        this.qiangClass = 'yiqiang';
      } else {
        this.fnAlert(res.retinfo)
      }
    }, this)
  }
  doRefresh(refresher) {
    this.findSrush();
    if (this.more == true) {
      let tel = document.getElementById('xs_tel');
      tel.ontouchstart = function () {
        tel.style.backgroundColor = "#efeff4";
      };
      tel.ontouchend = function () {
        // 还原白色
        tel.style.backgroundColor = "transparent";
      };
    }
     setTimeout(() => {
       //console.log('Async operation has ended');
       refresher.complete();
     }, 2000);
   }
}
