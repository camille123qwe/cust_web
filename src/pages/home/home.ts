import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NavController, App, NavParams, ModalController, Slides, AlertController, LoadingController, Platform } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpUrl, constVar, globalVar, isLogin, goLogin, showToast, globalimg, globalhead, commonwxshare } from '../../common/global';
import { AppVersion, Device } from 'ionic-native';
import { GlobalProvider } from '../../providers/global-provider';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  // providers: [AppPreferences],

})
export class HomePage {
  myInput: string = '';
  select_city: string = '';
  grid;
  ads;
  ads2;
  Val;
  val;
  userid;
  wodeshuliang = true;
  status = [10];
  center_banner;
  img_class: string = 'small_img_class';
  //city_page = 'CitySelectionPage';
  lunbo2 = 'assets/img/banner_sides2.png';
  shousuo_img = 'assets/img/shouye_shousuo-1@2x.png';
  ads_big = "assets/img/sy_imge_1@2x.png";
  ads_small_1 = "assets/img/sy_imge_2@2x.png";
  ads_small_2 = "assets/img/sy_imge_3@2x.png";
  sy_banner = "assets/img/sy_banner_qiandao@2x.png";
  jinxuan = "assets/img/sy_banner_jingxuan@2x.png";
  there1 = "assets/img/mmeaclmsmvcq1cjf3l8dfg6qh.jpg";
  there2 = "assets/img/himagm4trd01e1t.jpg";
  choujiang = 'assets/img/button_choujiang@2x.png';
  icon_cainixihuan = "assets/img/icon_cainixihuan@2x.png";
  icon_gengxin = "assets/img/icon_gengxin@2x.png";
  fistNews = { title: '', url: '' };
  guessLikeShops = [];
  storefaceurl_300 = constVar.storefaceurl_300;
  goodsface_900 = constVar.goodsfaceurl_900;
  isFirstIn = true;
  mapArr = [];
  youhui;
  maparen;
  mapitem;
  fujinmendian = false;
  dingweishibai = false;
  askSucess: boolean = true;
  flipper_page = 0;
  limit = 20;
  total = 0;
  infiniteScroll;

  hot_img = 'assets/img/icon_hot.png';
  shopcar = 'assets/img/icon_sy_gouwuche@2x.png';
  slide_img = 'slide_img';
  wodeyouhui = { id: "youhui", img: "assets/img/icon_wodedaijinquan@2x_1.png", txt: "我的优惠", number: 0, youhuishow: true, };
  xianshiyouhui = { id: "nearby", img: "assets/img/icon_xianshiyouhui@2x.png", txt: "附近门店", number: 0, xianshi: true, };
  zhaopin = { id: "zhaopin", img: "assets/img/icon_zhaopinxinxi@2x.png", txt: "招聘信息" }
  wodemendian = { id: "mendian", img: "assets/img/icon_changqudianpu@2x.png", txt: "常去店铺", number: 0, mendianshow: true, };
  loadingShops = false;
  banners: any[] = [
    // {imgsrc:'assets/banner/banner3.jpg',rushid:0,relativestoreid:25001827},
    { imgsrc: 'assets/banner/banner1.jpg', rushid: 0, relativestoreid: 0 ,goodsid:100007925},
    { imgsrc: 'assets/banner/banner2.jpg', rushid: 0, relativestoreid: 25001761 },
    // {imgsrc:'assets/banner/banner4.jpg',rushid:0,relativestoreid:25001813},
    // {imgsrc:'assets/banner/banner5.jpg',rushid:0,relativestoreid:25001815},
  ];


  loading;
  rushlist = [];
  rushtime: number;
  rushtimes = '';
  goodsface_300 = constVar.goodsfaceurl_300;
  scrollShow: boolean;
  onlineVersion;
  localVersion;
  isIOS = false;
  scrolltimes: boolean;
  giftName = [];
  jihui = 100;
  systemMessages = [];
  hotGoodRows = [];
  nosystem = false;

  constructor(public navCtrl: NavController, private app: App, public params: NavParams, public globalProvider: GlobalProvider, public navParams: NavParams,
    public modalCtrl: ModalController, private http: HttpGet, public cd: ChangeDetectorRef, private alertCtrl: AlertController, public _http: Http,
    private loadingCtrl: LoadingController, public platform: Platform, ) {
    this.userid = localStorage.getItem('custuserid');
    this.ads = [{ img: "assets/img/sy_imge2@2x.png" }, { img: "assets/img/sy_imge3@2x.png" },];
    this.ads2 = [{ img: "assets/img/sy_imge1@2x.png" }, { img: "assets/img/sy_imge2@2x.png" },];
    this.center_banner = "assets/img/bg_banner@2x.png";
    if (this.platform.is('ios')) {
      this.slide_img = 'top-slide-img'
    }
    this.guesslike();
    this.notification();
    console.log(history.state);
    if (history.state == "forward") {
      location.replace(globalhead);
    }
  }
  // 消息轮播
  notification() {
    let data = {
      'bean': {
        status: [10],
      }

    }
    this.http.httpMethodContext(HttpUrl.notification, data, (res, context) => {
      context.systemMessages = res;
      if (res.length == 0) {
        this.nosystem = true;
      }
    }, this)
  }
  rushindex() {
    let data = {
      'bean': {
        status: 20,
      }
    }
    this.http.httpMethodContext(HttpUrl.rushindex, data, (res, context) => {
      if (typeof (res) == 'undefined' || res.length == 0 || res == '') {
        this.scrollShow = false
      } else {
        this.scrollShow = true;
        context.rushlist = res;
        for (let i = 0; i < context.rushlist.length; i++) {
          context.rushtime = context.rushlist[0].rushendtime;
        }
      }


    }, this)
  }

  formatDuring(mss) {
    mss = mss - (new Date().getTime());
    if (mss < 0) {
      this.rushtimes = '抢购时间结束'
    } else {

      let days = Math.floor(mss / (1000 * 60 * 60 * 24));
      let hours = Math.floor((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((mss % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((mss % (1000 * 60)) / 1000);
      this.rushtimes = days + " 天 " + hours + " 小时 " + minutes + " 分" + seconds + "秒";
      if (isNaN(days)) {
        this.scrolltimes = false
      } else {
        if (this.scrollShow) {
          this.scrolltimes = true
        } else {
          this.scrolltimes = false
        }
      }
    }

  }
  ionViewDidLoad() {
    let timepiece = setInterval(() => {
      if (this.guessLikeShops.length == 0 && this.askSucess == true) {
        this.dingweishibai = true;
        clearInterval(timepiece);
      } else {
        this.dingweishibai = false;
        clearInterval(timepiece);
      }
    }, 6000);
    setInterval(() => {
      this.formatDuring(this.rushtime)
    }, 1000)
  }
  onBannerClick(item) {
    item.relativestoreid;
    item.followed = false;
    if (typeof (item.goodsid) !== 'undefined' && item.goodsid !== 0 && item.goodsid !== '') {
      let url = HttpUrl.aloneGoods + parseInt(item.goodsid).toString(36);
      this.http.httpMethodContext(url, {}, (res, context) => {
        if (typeof (res) !== 'undefined' || res !== '') {
          let goodsInfo = res;
          let navParams =  goodsInfo ;
          console.log(navParams);
          this.navCtrl.push('GoodsxiangqingPage', {info:navParams});
        }
      }, this)
    } else {
      if (item.relativestoreid !== 0 && item.rushid == 0) {

        let url = HttpUrl.oneShopInfo + parseInt(item.relativestoreid).toString(36)
        this.http.httpMethodContext(url, {}, (res, context) => {
          this.navCtrl.push('ShopDetailPage', {info:res});
        }, this)
      } else if (item.relativestoreid == 0 && item.rushid == 0) {
        console.log('')
      } else {
        let data = { storeid: item.relativestoreid, rushid: item.rushid }
        this.navCtrl.push('xianShiShopPage', data);
      }
    }
  }

  godelivery() {
    let custuserid = localStorage.getItem('custuserid');
    this.navCtrl.push('HomeDeliveryDetailPage');
  }
  baycar() {
    this.navCtrl.push('ShopCarPage')
  }
  ionViewDidEnter() {
    this.rushindex();
    this.cdaward();
  }

  /**
   * 右上角地图显示周边门店
   */
  // zhoubian() {
  //   this.http.httpMethodContext(HttpUrl.arroundShops, {}, (res, context) => {

  //     context.maparen = res.rows;
  //     for (let i = 0; i < context.maparen.length; i++) {
  //       let storeaddr = context.maparen[i].storeaddr;
  //       let storename = context.maparen[i].storename;
  //       let longitude = context.maparen[i].longitude;
  //       let latitude = context.maparen[i].latitude;
  //       let storeid = context.maparen[i].storeid;
  //       context.mapArr.push({ 'title': storeaddr, 'subtitle': storename + storeid, 'latitude': latitude, 'longtitude': longitude });


  //     }
  //   }, this);
  // }

  goSignIn() {
    let custuserid = localStorage.getItem('custuserid');
    if (custuserid == null || custuserid === 'undefined') {
      this.navCtrl.push(LoginPage, {});
      return false;
    } else {
      this.navCtrl.push('SignInPage')
    }
  }
  gengduo() {
    let custuserid = localStorage.getItem('custuserid');
    // if (custuserid == null || custuserid === 'undefined') {
    //    this.navCtrl.push('LoginPage', {});
    //   return false;
    // } else {
    this.navCtrl.push('xianShiYouHuiPage')
    // }

  }
  goRush(item) {
    let custuserid = localStorage.getItem('custuserid');
    // if (custuserid == null || custuserid === 'undefined') {
    //   this.navCtrl.push('LoginPage', {});
    //   return false;
    // } else {
    this.navCtrl.push('xianShiShopPage', { info: item, last: 'home' });
    // this.app.getRootNav().push('xianShiShopPage', item);
    //}

  }

  onSearchInput(event) {
    this.navCtrl.push('SearchShopPage', this.guessLikeShops)
  }

  // 加载猜你喜欢页面的图片
  guesslike() {
    this.http.httpMethodContext(HttpUrl.guessLike, {}, (res, context) => {
      if (res.length <= 6) {
        let newarry = [];
        for (let i = 0; i < res.length; i += 2) {
          newarry.push(res.slice(i, i + 2));
        }
        this.hotGoodRows = newarry;
      } else {
        let goodsRows = res;
        let num = 6;
        context.getArrayItems(goodsRows, num);
      }

    }, this)

  }
  sha(item) {
    if (item.marketprice <= item.sellprice) {
      return false;
    } else {
      return true;
    }
  }

  //更新猜你喜欢的商品


  //跳转详情页面
  goDetailPage(item) {
    this.goodsDetail(item)
  }
  goodsDetail(item) {
    let url = HttpUrl.oneShopInfo + item.storeid.toString(36);
    this.http.httpMethodContext(url, {}, (res, context) => {
      context.navCtrl.push('GoodsxiangqingPage', { info: item, last: 'home' });
    }, this)
  }


  govoucherPage() {
    if (globalVar.govoucher == false) {
      this.navCtrl.push('MyCouponPage');
      //this.app.getRootNav().push('MyCouponPage');
    };
  }
  card_setting(res) {
    // let myModal = this.modalCtrl.create(CardSettingPage, res);
    // myModal.onDidDismiss(data => {
    //   this.govoucherPage();
    // });
    // myModal.present();
  }
  chaxun(DtatTest) {
    let url = HttpUrl.findCar + DtatTest;

    this.http.httpMethodContext(url, {}, (res, context) => {
      if (res !== null) {
        context.card_setting(res);
      } else {
        let alert = context.alertCtrl.create({
          title: '输入的密码不正确',
          buttons: ['确定']
        })
        alert.present();
      }
    }, this)
  }
  obserAnotationClick(maparen) {
    (<any>window).Cordova.exec((res) => {
      let shopID = res;
      let j;
      for (let i = 0; i < maparen.length; i++) {
        j = maparen[i];
        //找到匹配相同id 的对象
        if (shopID == j.storeid) {
          this.mapitem = j;
        }
      };

      //添加页面
      this.app.getRootNav().push('ShopDetailPage', this.mapitem);
    }, (err) => { showToast('跳转门店失败'); }, "BDLocation", "obserAnotationClick");
    this.location();
  }

  location() {
    (<any>window).Cordova.exec((res) => {

    }, (err) => { showToast('地图展示失败'); }, "BDLocation", "showMap", this.mapArr);

  }





  getLocation(context) {
    (<any>window).Cordova.exec((res) => {
      context.setCity(res.city);
      globalVar.location.latitude = res.latitude;
      globalVar.location.longitude = res.longitude;
      globalVar.location.city = res.city;
      this.isFirstIn = false;
      let location_storage = { city: res.city, latitude: res.latitude, longitude: res.longitude };
      localStorage.setItem('location', JSON.stringify(location_storage));
      context.getGuessLikeShop();
      this.fujinmendian = false;
      this.dingweishibai = false;

    }, (err) => { showToast('定位失败'); this.dingweishibai = true; this.fujinmendian = false; }, "BDLocation", "getLocation", ["Hight_Accuracy", "bd09ll", 0, false, true, false]);
  }

  setCity(city) {
    this.select_city = city;
    this.cd.detectChanges();
  }
  selectCity() {
    // let modal = this.modalCtrl.create(CitySelectionPage);
    // modal.onDidDismiss(data => {
    //   let params = data.select_city;
    //   if (typeof (params) !== 'undefined') {
    //     this.select_city = params;
    //   }
    // });
    // modal.present();

  }
  goNextPage(id, youhui) {
    let custuserid = localStorage.getItem('custuserid');
    // if (custuserid == null || custuserid === 'undefined') {
    //   this.app.getRootNav().push('LoginPage', {});
    //   return false;
    // } else {
    let nextPage;
    switch (id) {
      case 'nearby':
        nextPage = 'NearbyStorePage';
        break;
      case 'xianshiyouhui':
        nextPage = 'LimitListPage';
        break;
      case 'youhui':
        this.wodeyouhui.youhuishow = true;
        globalVar.isbubble = true;
        nextPage = 'MyCouponPage';
        break;
      case 'mendian':
        nextPage = 'MyShopsPage';
        break;
      case 'zhaopin':
        nextPage = 'ZhaopinListPage';
      default:
        break;

    }
    //this.app.getRootNav().push(nextPage, youhui);
    this.navCtrl.push(nextPage, youhui);
    // }
  }
  myShopOnClick() {
    let custuserid = localStorage.getItem('custuserid');
    // if (custuserid == null || custuserid === 'undefined') {
    //   this.navCtrl.push('LoginPage', {});
    //   return false;
    // } else {
    // this.navCtrl.push('NearbyStorePage', {});
    this.navCtrl.push('ActivityPage');
    // this.app.getRootNav().push('NearbyStorePage')
    // }

  }
  refreshAgain() {
    //使用上次定位数据进行刷新
    if (this.loadingShops) {
      return;
    }
    this.loading = this.loadingCtrl.create({
      content: '加载中...'
    });
    this.loading.present();
    setTimeout(() => {
      this.loadingShops = false;
      this.loading.dismiss();
    }, 5000);
    if (typeof localStorage.getItem('location') == 'undefined' || localStorage.getItem('location') == null) {
      globalVar.location.latitude = '';
      globalVar.location.longitude = '';
      globalVar.location.city = '';
    } else {
      let last_location = JSON.parse(localStorage.getItem('location'));
      globalVar.location.latitude = last_location.latitude;
      globalVar.location.longitude = last_location.longitude;
      globalVar.location.city = last_location.city;
    }
    this.setCity(globalVar.location.city);
    this.getGuessLikeShop(this.infiniteScroll);
  }
  gridNum() {

    let dataParams = {
      "bean": {
        merchid: '',
        storeid: '',
        custuserid: localStorage.getItem('custuserid'),
        status: 10,
      },
    }

    this.http.httpMethodContext(HttpUrl.quanList, dataParams, (res, context) => {
      context.youhui = res.result;
      for (let i = 0; i < context.youhui.length; i++) {
        if (context.youhui[i].validday == 0) {
          context.youhui[i].validday = "长期有效";
        } else {
          let newDate1: any = new Date();
          newDate1.setTime(context.youhui[i].starttime);
          let start = newDate1.format('yyyy-MM-dd');
          let newDate2: any = new Date();
          newDate2.setTime(context.youhui[i].endtime);
          let end = newDate2.format('yyyy-MM-dd');
          context.youhui[i].validday = end;
        }
      };
      this.wodeyouhui.number = context.youhui.length;
      if (context.youhui.length == 0 || this.wodeyouhui.number == 0 || typeof (context.youhui.length) == 'undefined' && globalVar.isbubble == false) {
        this.wodeyouhui.youhuishow = true;
      } else {
        this.wodeyouhui.youhuishow = false;
      }

    }, this);
  }
  getShopDetails(item) {
    item.followed = false;
    // this.app.getRootNav().push('ShopDetailPage', item);
  }
  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    if (this.flipper_page + this.limit < this.total && !this.loadingShops) {
      this.flipper_page += this.limit;
      this.getGuessLikeShop(infiniteScroll);
      infiniteScroll.complete();
    } else {
      infiniteScroll.complete();
    }

  }
  //抽奖
  cdaward() {
    let data = {
      'bean': {
        status: [10]
      }
    }
    this.http.httpMethodContext(HttpUrl.cdaward, data, (res, context) => {
      context.giftName = [];
      for (let item of res.rows) {
        context.giftName.push({ 'awardtitle': item.awardtitle, 'awarddetail': item.awarddetail, 'cdrawardid': item.cdrawardid });
      }
    }, this)
  }
  goTurntable() {
    this.navCtrl.push('TurntablePage', { 'gift': this.giftName, 'restcdrcount': this.jihui })
  }
  getGuessLikeShop(infiniteScroll) {
    this.loadingShops = true;
    let data = {
      bean: {
        longitude: globalVar.location.longitude,
        latitude: globalVar.location.latitude,
        city: globalVar.location.city,
      },
      flipper: {
        offset: this.flipper_page,
        limit: 20,
      }
    }
    this.http.httpMethodContext(HttpUrl.arroundShops, data, (res, context) => {
      context.loadingShops = false;
      if (this.loading) {
        this.loading.dismiss();
      }
      if (typeof (infiniteScroll) !== 'undefined') {
        infiniteScroll.complete();
      }

      this.total = res.total;
      for (let item of res.rows) {

        if (item.buycount == 0) {
          item.Val = true;
        } else {
          item.Val = false;
        };
        if (item.goodscount == 0) {
          item.val = true;
        } else {
          item.val = false;
        };

        if (item.distance == 0) {
          item.distance = '';
        } else if (item.distance <= 1000) {

          item.distance = "<" + 10 + "m";

        } else if (item.distance >= 100000) {

          item.distance = Math.floor(item.distance / 1000) / 100 + "km"

        } else {

          item.distance = Math.floor(item.distance / 100) + "m";

        }
      }

      if (context.flipper_page == 0) {
        context.guessLikeShops = res.rows;
      } else {
        for (let item of res.rows) {
          context.guessLikeShops.push(item);
        }
      }
      if (typeof (context.guessLikeShops) == 'undefined' || context.guessLikeShops.length == 0) {
        context.askSucess = false;
        context.fujinmendian = true;
        context.dingweishibai = false;
      } else {
        context.askSucess = true;
        context.fujinmendian = false;
        context.dingweishibai = false;
      }
      this.cd.detectChanges();
    }, this);


  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.guesslike();
    this.notification();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  wxshare() {
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
    $.get('http://c.diancall.com/pipes/wechat/getaccesstoken?url=' + getsrc + '&noncestr=' + timestampNum, function (res) {
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
        var imgUrl = globalimg + "www/assets/img/login_imge.png";  //图片LOGO注意必须是绝对路径
        var lineLink = sharesrc;   //网站网址，必须是绝对路径
        var descContent = '更多好货，尽在店呼'; //分享给朋友或朋友圈时的文字简介
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
}
