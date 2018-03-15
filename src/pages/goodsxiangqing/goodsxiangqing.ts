import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content, Navbar } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpContents, HttpUrl, constVar,globalhead,globalimg } from '../../common/global';
import * as $ from 'jquery';
import wx from 'weixin-js-sdk';
//import { global } from '@angular/core/src/util';
/**
 * Generated class for the GoodsxiangqingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-goodsxiangqing',
  templateUrl: 'goodsxiangqing.html',
})
export class GoodsxiangqingPage {
  @ViewChild(Content) content: Content;
  goodsdata;
  goodImg = [];
  goodsface_900 = constVar.goodsfaceurl_900;
  storeface_900 = constVar.storefaceurl_900;
  callimg = 'assets/img/icon_shangpudianhua@2x.png';
  goodsName = ''; sellPrice = ''; marketprice = ''; goodsDesc = ''; goodsdetail = '';
  storeIMg = ''; storeName = ''; disTance = ''; storeAddr = '';
  hotGoodRows = [];
  props;
  Opacity;
  tel_str = '';
  divShow = false;
  heightNUm = 0;
  followed = false;
  payPrice = 0;
  goodcunt = 1;
  shopcar = 'assets/img/icon_gouwuche@2x.png';
  Taskid;
  serveData = 0;
  servemoney;
  serviceDistance = '';
  storeid;
  goodsid;
  merchid;
  store36id;
  flag = "";
  //-------为了活动------------
  ifStore:boolean;
  diancallgoods:boolean;
  banners = [{'flag':'active','src':'assets/img/jinpuIMg.png'},
  {'flag':'turn','src':'assets/img/lottery.png'},
  {'flag':'active','src':'assets/img/jinpuIMg.png'},
  {'flag':'turn','src':'assets/img/lottery.png'},
  {'flag':'active','src':'assets/img/jinpuIMg.png'},
  {'flag':'turn','src':'assets/img/lottery.png'},
  {'flag':'active','src':'assets/img/jinpuIMg.png'},
  {'flag':'turn','src':'assets/img/lottery.png'}];
  giftName = [];
  jihui = 100;
  //------为了活动-----------------------------------------
  constructor(public navCtrl: NavController, public navParams: NavParams, public zone: NgZone, private http: HttpGet, public modalCtrl: ModalController, ) {
    let xiangqingsrc = window.location.href;
    if(xiangqingsrc.indexOf('?goodsid=')>0&&xiangqingsrc.indexOf('?merchid=')>0&&xiangqingsrc.indexOf("?storeid=")>0&&(location.hash).indexOf('/%E9%A6%96%E9%A1%B5/')<0){
      this.goodsid =  xiangqingsrc.substr(xiangqingsrc.indexOf("?goodsid="),18).split("=")[1];
      this.merchid = xiangqingsrc.substr(xiangqingsrc.indexOf("?merchid="),17).split("=")[1];
      let storeidtest = xiangqingsrc.substr(xiangqingsrc.indexOf("?storeid="),17).split("=")[1];
      this.storeid = storeidtest;
      this.store36id =  parseInt(storeidtest).toString(36);
      let flag1 =  xiangqingsrc.substr(xiangqingsrc.indexOf("?flag="),xiangqingsrc.indexOf("8576")).split("=")[1];
      this.flag = flag1.split("8576#")[0];
    } else {
      this.goodsid = this.navParams.data.info.goodsid;
      this.merchid = this.navParams.data.info.merchid;
      this.storeid = this.navParams.data.info.storeid;
      this.store36id = parseInt(this.navParams.data.info.storeid).toString(36);
      this.flag = this.navParams.data.last;
    }
    if(this.goodsid == 100007921||this.goodsid==100007925||this.goodsid==100007939||this.goodsid==100007632||this.goodsid==100007926||this.goodsid==100007937||this.goodsid==100007605){
      this.diancallgoods = true;
    }
    console.log(history.state);
    this.cdaward();
  }
  @ViewChild(Navbar) navBar: Navbar;
  ionViewDidLoad() {
    console.log('ionViewDidLoad GoodsxiangqingPage');
    this.goodsDetail();
    this.init();
    this.oneShop();
    this.hotGoods();
    this.navBar.backButtonClick = this.backButtonClick;
  }
 
  ionViewWillEnter() {
    this.scrollHandler(event)
    this.detilsShow();
    this.custmerchdelivery();
    this.navBar.backButtonClick = this.backButtonClick;
  }
  init(){
    this.wxshare();
  }

  backButtonClick = (e: UIEvent) => {
    
    if(this.flag=="shopdetail"){
      location.href = globalhead+'?path=shop-detail9527?store36id='+this.store36id+'?merchid='+this.merchid+'#/%E9%A6%96%E9%A1%B5/shop-detail'; 
    }else if(this.flag=="delivery"){
      location.href = globalhead+'?path=home-delivery-detail#/%E9%A6%96%E9%A1%B5/home-delivery-detail'; 
    }else if(this.flag=="active"){
      location.href = globalhead+'?path=activity9527#/%E9%A6%96%E9%A1%B5/activity';
    }else{
      location.href = globalhead; 
    }
  }
   wxshare(){

    if(location.href.indexOf('?path=goodsxiangqing')<0){
      location.replace(globalhead+'?path=goodsxiangqing9527?storeid='+this.storeid+'?merchid='+this.merchid+'?goodsid='+this.goodsid+'?flag='+this.flag+'8576#/%E9%A6%96%E9%A1%B5/goodsxiangqing');
    }
    let sharename = $('.goodsname').text();
    let shareimg = $('.goodinfoimg').attr('src');
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
          var imgUrl = globalimg+"www/assets/img/login_imge.png" ;  //图片LOGO注意必须是绝对路径
          var lineLink = sharesrc;   //网站网址，必须是绝对路径
          var descContent = '价格实惠，还获得了神秘礼品，赚到了，分享给你们'; //分享给朋友或朋友圈时的文字简介
          var shareTitle = "商品详情";  //分享title
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

  detilsShow() {
    let bannersHeight = $('#goodbanners').height()
    console.log('===bannersHeight' + bannersHeight)
    console.log('===screen.height' + screen.height)
    if (bannersHeight > screen.height - 95) {
      let timepiece = setInterval(() => {
        clearInterval(timepiece)
        this.divShow = true
      }, 500)
    } else {
      this.divShow = false
    }
    console.log(bannersHeight > screen.height - 95)
  }

  scrollHandler(event) {
    this.zone.run(() => {
      // let scrollHeight = this.content.getContentDimensions().scrollTop;
      // let bannersHeight = $('#goodbanners').height()
      // if (this.heightNUm < scrollHeight) {
      //   this.heightNUm = scrollHeight
      //   if (bannersHeight - screen.height - 95 - scrollHeight <= 0) {
      //     this.divShow = false
      //   } else {
      //     this.divShow = true
      //   }
      // } else {

      //   this.heightNUm = scrollHeight
      //   if (scrollHeight - bannersHeight -95+screen.height <= 0) {
      //     if (bannersHeight > screen.height - 95) {
      //       this.divShow = true
      //     } else {
      //       this.divShow = false
      //     }
      //   } else {
      //     this.divShow = false
      //   }
      // }
      let scrollHeight = this.content.getContentDimensions().scrollTop;
      let bannersHeight = $('#goodbanners').height()
      let hasshow = screen.height - 100;
      if (this.content.getContentDimensions().scrollTop < bannersHeight - hasshow) {
        this.divShow = true;
      } else {
        this.divShow = false;
      }

    });
  }


  goShop() {
    this.navCtrl.push('ShopCarPage')
  }

  // 查询商品详情
  goodsDetail() {
    let url = HttpUrl.aloneGoods + parseInt(this.goodsid).toString(36);
    this.http.httpMethodContext(url, {}, (res, context) => {
      if (typeof (res.goodsimgs) == 'undefined' || res.goodsimgs == '') {
        context.goodImg.push(context.goodsface_900 + res.goodsface)
      } else {
        for (let item of res.goodsimgs.split(';')) {
          context.goodImg.push(context.goodsface_900 + item)
        }
      }
      context.goodsName = res.goodsname;
      context.sellPrice = res.sellprice;
      context.marketprice = res.marketprice;
      context.goodsDesc = res.goodsdesc;
      context.goodsdetail = res.detail;
      context.props = res.propValues;
    }, this)
  }


  //关注
  toFollow() {
    let custuserid = localStorage.getItem('custuserid');
    if (custuserid == null || custuserid === 'undefined') {
      console.log('未登录');
      this.navCtrl.push('LoginPage', {});
      return false;
    } else {
      let url = HttpUrl.followShop + this.goodsid.toString(36);  //#	int	门店36ID
      this.http.httpMethodContext(url, {}, (res, context) => {
        let alert = context.alertCtrl.create({
          title: "关注成功",
          buttons: ['确定']
        })
        alert.present();
        context.followed = true;
        // context.navParams.data.isfollowed = 'true';
      }, this);
    }

  }

  // html  *ngIf='responseData(item)'
  responseData(item) {
    if (typeof (item) == 'undefined' || item == '') {
      return false;
    } else {
      return true;
    }
  }

  // 判断是否有多规格
  isEmptyObject(obj) {
    for (var key in obj) {
      console.log(666)
      return false;
    }
    return true;
  }

  // 结算 多规格选择   没有规格直接去购物车
  addgoods() {
    let modal = this.modalCtrl.create('DeliveryPopupPage', {goods36id:this.goodsid.toString(36)});
    modal.onDidDismiss((data) => {
      if (!data || typeof (data) == 'undefined' || data == 0) {
        this.goodcunt = 1;
      } else {
        this.goodcunt = data.afterDelte
      }

      console.log('this.goodcunt==' + this.goodcunt)
    });
    modal.present();
  }

  // 结算 多规格选择   没有规格直接去购物车
  addToCart() {
    event.stopPropagation();
    let data = {
      'bean': {
        cartgoodsitemsid: '',
        custuserid: localStorage.getItem("custuserid"),
        goodsid: this.goodsid,
        count: 1,
        storeid: this.storeid,
      }, 'cols': '[""]'
      , 'props': [],
    }
    this.http.httpMethodContext(HttpUrl.add2custcart, data, (res, context) => {
      if (res.retcode == 0) {
        context.navCtrl.push('ShopCarPage')
      }
    }, this)
  }

  //查询门店
  oneShop() {
    let url = HttpUrl.oneShopInfo + parseInt(this.storeid).toString(36);
    this.http.httpMethodContext(url, {}, (res, context) => {
      if(res.storeid==25001767){
        context.ifStore=false;
        }else{
        context.ifStore=true;
        }
       
      context.thisStore = res;
      context.storeIMg = res.storeface;
      context.storeName = res.storename;
      context.disTance = res.distance;

      if (context.disTance == 0) {
        context.disTance = '';
      } else if (context.disTance <= 1000) {

        context.disTance = "<" + 10 + "m";

      } else if (context.disTance >= 100000) {

        context.disTance = Math.floor(context.disTance / 1000) / 100 + "km"

      } else {

        context.disTance = Math.floor(context.disTance / 100) + "m";

      }
      context.storeAddr = res.storeaddr;
      context.tel_str = 'tel:' + res.storetel;
      context.followed = res.isfollowed
    }, this)
  }

  // 查询热门商品
  hotGoods() {
    // shopGoods
    let url = HttpUrl.shopGoods;
    let data = {
      'bean': {
        storeid: this.storeid,
        status: [10],
      }
    };
    this.http.httpMethodContext(url, data, (res, context) => {
      if (res.rows.length <= 4) {
        let newarry = [];
        for (let i = 0; i < res.rows.length; i += 2) {
          newarry.push(res.rows.slice(i, i + 2));
        }
        this.hotGoodRows = newarry;
      } else {
        let goodsRows = res.rows
        let num = 4;
        context.getArrayItems(goodsRows, num)
      }


    }, this)

  }

  // 4个随机热门商品
  getArrayItems(arr, num) {
    var temp_array = new Array();
    for (let index in arr) {
      temp_array.push(arr[index]);
    }
    var return_array = new Array();
    for (let i = 0; i < num; i++) {
      if (temp_array.length > 0) {
        var arrIndex = Math.floor(Math.random() * temp_array.length);
        return_array[i] = temp_array[arrIndex];
        temp_array.splice(arrIndex, 1);
      } else {
        break;
      }
    }

    let newarry = [];
    for (let i = 0; i < return_array.length; i += 2) {
      newarry.push(return_array.slice(i, i + 2));
    }
    this.hotGoodRows = newarry;
    // for (let item of this.hotGoodRows) {
    //   console.log(JSON.stringify(item))
    // }
  }


  goNextPage(item) {
    this.navCtrl.push('GoodsDetailsTwoPage', item)
  }
  custmerchdelivery() {
    this.http.httpMethodContext(HttpUrl.custmerchdelivery + parseInt(this.merchid).toString(36), {}, (res, context) => {
      context.serviceDistance = res.rows[0].serviceDistance;
      context.serveData = (res.rows[0].sendFreePrice / 100) - (context.sellPrice / 100) * context.goodcunt;
      if (context.serveData > 0) {
        context.servemoney = '还差' + context.serveData + '元免费送货'
      } else {
        context.servemoney = '免费送货';
      }
      if (context.serviceDistance == 0) {
        context.serviceDistance = '';
      } else if (context.serviceDistance <= 1000) {

        context.serviceDistance = 10 + "m送货上门";

      } else if (context.serviceDistance >= 100000) {

        context.serviceDistance = Math.floor(context.serviceDistance / 1000) / 100 + "Km送货上门"

      } else {

        context.serviceDistance = Math.floor(context.serviceDistance / 100) + "m送货上门";

      }
    }, this)
  }
  sha(item){
    if(item.marketprice<=item.sellprice){
      return false;
    }else{
      return true;
    }
  }
  doRefresh(refresher) {
   // console.log('Begin async operation', refresher);
    this.goodsDetail();
    this.init();
    this.oneShop();
    this.hotGoods();
    setTimeout(() => {
      //console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  //-------为了活动------------------------
  //抽奖
  cdaward() {
    console.log(666)
    let data = {
      'bean': {
        status: [10]
      }
    }
    this.http.httpMethodContext(HttpUrl.cdaward, data, (res, context) => {
      context.giftName=[];
      console.log('奖品' + JSON.stringify(res));
      for (let item of res.rows) {

        context.giftName.push({'awardtitle':item.awardtitle,'awarddetail':item.awarddetail,'cdrawardid':item.cdrawardid});

      }
      console.log('xxx==' + JSON.stringify(context.giftName));
    }, this)
  }
  active(item){
    console.log('flag: '+item.flag);
    if(item.flag == 'active'){
      this.navCtrl.push('ActivityPage')
    }else{
      this.navCtrl.push('TurntablePage', { 'gift': this.giftName, 'restcdrcount': this.jihui })
    }
  }
  //-------------------为了活动----------------------
}
