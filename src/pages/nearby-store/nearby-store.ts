import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { IonicPage,NavController, App, NavParams, ModalController, Slides, AlertController, LoadingController, Platform ,Navbar} from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpUrl, showToast, constVar, globalVar, isLogin, goLogin,globalhead ,globalimg} from '../../common/global';
import { AppVersion, Device } from 'ionic-native';
import { GlobalProvider } from '../../providers/global-provider';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';
import wx from 'weixin-js-sdk';

@IonicPage()
@Component({
  selector: 'page-nearby-store',
  templateUrl: 'nearby-store.html',
})
export class NearbyStorePage {
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
  city_page = 'CitySelectionPage';
  lunbo2 = 'assets/img/banner_sides2.png';
  shousuo_img = 'assets/img/shouye_shousuo-1@2x.png';
  ads_big = "assets/img/sy_imge_1@2x.png";
  ads_small_1 = "assets/img/sy_imge_2@2x.png";
  ads_small_2 = "assets/img/sy_imge_3@2x.png";
  fistNews = { title: '', url: '' };
  guessLikeShops = [];
  storefaceurl_300 = constVar.storefaceurl_300;
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

  slide_img = 'slide_img';
  wodeyouhui = { id: "youhui", img: "assets/img/icon_wodedaijinquan@2x_1.png", txt: "我的优惠", number: 0, youhuishow: true, };
  xianshiyouhui = { id: "nearby", img: "assets/img/icon_xianshiyouhui@2x.png", txt: "附近门店", number: 0, xianshi: true, };
  zhaopin = { id: "zhaopin", img: "assets/img/icon_zhaopinxinxi@2x.png", txt: "招聘信息" }
  wodemendian = { id: "mendian", img: "assets/img/icon_changqudianpu@2x.png", txt: "常去店铺", number: 0, mendianshow: true, };
  loadingShops = false;
  banners: any[] = ['assets/img/banner_sides2.png',];
  loading;
  shareSrc = "";

  constructor(public navCtrl: NavController, private app: App, public params: NavParams, public globalProvider: GlobalProvider, public navParams: NavParams,
    public modalCtrl: ModalController, private http: HttpGet, public cd: ChangeDetectorRef, private alertCtrl: AlertController, public _http: Http,
    private loadingCtrl: LoadingController, public platform: Platform, ) {
    this.ads = [{ img: "assets/img/sy_imge2@2x.png" }, { img: "assets/img/sy_imge3@2x.png" },];
    this.ads2 = [{ img: "assets/img/sy_imge1@2x.png" }, { img: "assets/img/sy_imge2@2x.png" },];
    this.center_banner = "assets/img/bg_banner@2x.png";
    this.getBanners();
    if (this.platform.is('ios')) {
      this.slide_img = 'top-slide-img'
    }
  }
  @ViewChild(Navbar) navBar: Navbar; 

  ionViewDidLoad() {
    this.navBar.backButtonClick = this.backButtonClick;
    this.init();
    let timepiece = setInterval(() => {
      if (this.guessLikeShops.length == 0 && this.askSucess == true) {
        this.dingweishibai = true;
        clearInterval(timepiece);
      } else {
        this.dingweishibai = false;
        clearInterval(timepiece);
      }
    }, 6000)
  }
  init(){
    this.wxshare();
  }
  backButtonClick = (e: UIEvent) => {
    location.href = globalhead;   
   }

   wxshare(){
    if(location.href.indexOf('?path=nearby-store')<0){
      location.href = globalhead+'?path=nearby-store9527#/%E9%A6%96%E9%A1%B5/nearby-store';
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
          var descContent = '更多精彩，尽在店呼'; //分享给朋友或朋友圈时的文字简介
          var shareTitle = "附近门店";  //分享title
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


  refreshData() {
    console.log('refreshData()');
    if (globalVar.isDevice && globalVar.location.latitude == '') {
      console.log('开始定位');
      this.getLocation(this);
     
    } else {
      console.log('直接获取附近门店');
      this.setCity(globalVar.location.city);
      this.getGuessLikeShop(this.infiniteScroll);
    }
  }
  getBanners() {
    this._http.get(HttpUrl.getBanners).map(res => res.text()).subscribe(data => {
      let arr = data.replace('\n', '').split(';');
      for (let i = 0; i < arr.length; i++) {
        this.banners[i] = constVar.banner_url + arr[i];
      }
      console.log('getBanners res==' + this.banners);
 
    });
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter()home');
    this.refreshData();
  }

  /**
   * 右上角地图显示周边门店
   */
  zhoubian() {
    this.http.httpMethodContext(HttpUrl.arroundShops, {}, (res, context) => {

      context.maparen = res.rows;
      for (let i = 0; i < context.maparen.length; i++) {
        let storeaddr = context.maparen[i].storeaddr;
        let storename = context.maparen[i].storename;
        let longitude = context.maparen[i].longitude;
        let latitude = context.maparen[i].latitude;
        let storeid = context.maparen[i].storeid;
        context.mapArr.push({ 'title': storeaddr, 'subtitle': storename + storeid, 'latitude': latitude, 'longtitude': longitude });
      }
      // console.log('周边门店' + JSON.stringify(context.mapArr))
    }, this);
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
      console.log('距离1=====' + JSON.stringify(res.rows.length));
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
      console.log("chenkaixin"+JSON.stringify(context.guessLikeShops));
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
  onSearchInput(event) {
    this.navCtrl.push('SearchShopPage', this.guessLikeShops);
  }

  // obserAnotationClick(maparen) {
  //   console.log('this.mapArr===' + JSON.stringify(this.mapArr));

  //   (<any>window).Cordova.exec((res) => {
  //     let shopID = res;
  //     let j;
  //     for (let i = 0; i < maparen.length; i++) {
  //       j = maparen[i];
  //       //找到匹配相同id 的对象
  //       if (shopID == j.storeid) {
  //         console.log('jjjj=' + JSON.stringify(j))
  //         this.mapitem = j;
  //       }
  //     };
  //     //添加页面
  //     this.navCtrl.push('ShopDetailPage', this.mapitem);
  //   }, (err) => { showToast('跳转门店失败'); }, "BDLocation", "obserAnotationClick");
  //   this.location();
  // }

  location() {

    (<any>window).Cordova.exec((res) => {

    }, (err) => { showToast('地图展示失败'); }, "BDLocation", "showMap", this.mapArr);

  }
  getLocation(context) {
    console.log('getLocation()');
    (<any>window).Cordova.exec((res) => {
      context.setCity(res.city);
      globalVar.location.latitude = res.latitude;
      globalVar.location.longitude = res.longitude;
      globalVar.location.city = res.city;
      this.isFirstIn = false;
      let location_storage = { city: res.city, latitude: res.latitude, longitude: res.longitude };
      console.log('location_storage==' + JSON.stringify(location_storage));
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
    let modal = this.modalCtrl.create('CitySelectionPage');
    modal.onDidDismiss(data => {
      let params = data.select_city;
      if (typeof (params) !== 'undefined') {
        this.select_city = params;
      }
    });
    modal.present();

  }
  goNextPage(id, youhui) {
      let nextPage;
      switch (id) {
        case 'nearby':
          nextPage = 'NearbyStorePage';
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
          nextPage = 'RecruitListPage';
        default:
          break;

      }
     this.navCtrl.push(nextPage, youhui);
  }
  refreshAgain() {
    //使用上次定位数据进行刷新
    if (this.loadingShops) {
      console.log('正在加载，请稍后...');
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
    console.log('lastLocation==' + localStorage.getItem('location'));
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
    console.log('LastCity==' + globalVar.location.city);
    console.log('直接获取附近门店');
    this.setCity(globalVar.location.city);
    this.getGuessLikeShop(this.infiniteScroll);
  }
  

  getShopDetails(item) {
    item.followed = false;
    this.navCtrl.push('ShopDetailPage', {info:item,last:'nearby'});
  }


  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    if (this.flipper_page + this.limit < this.total && !this.loadingShops) {
      console.log('加载更多...');
      this.flipper_page += this.limit;
      console.log('flipper_page==' + this.flipper_page);
      this.getGuessLikeShop(infiniteScroll);
      infiniteScroll.complete();
    } else {
      infiniteScroll.complete();
      console.log(this.total)
    }

  }
  doRefresh(refresher) {
    // console.log('Begin async operation', refresher);
    this.refreshData();
     setTimeout(() => {
       //console.log('Async operation has ended');
       refresher.complete();
     }, 2000);
   }

}
