import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import { HttpContents, HttpUrl, showToast, constVar } from '../../common/global';
import { HttpGet } from '../../providers/http-get';
import { globalhead, globalimg } from '../../common/global';
import * as $ from 'jquery';
import wx from 'weixin-js-sdk';
/**
 * Generated class for the ActivityPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {
  @ViewChild(Navbar) navBar: Navbar;
  activeImg1 = 'assets/img/active@x1.jpg';
  activeImg2 = 'assets/img/active@x2.jpg';
  activeImg3 = 'assets/img/active@x3.jpg';
  pagename = "";
  store36id = "";
  merchid;
  flag = "";
  //  jiazhuang@1
  jiazhuang = [];
  jinping = [];
  yhPrivilege = [];
  giftName = [];
  pinpaiarr=[];
  footerShow = true;
  xunwei='assets/img/pinpai_imge_huaxun@2x.png';
  huanan='assets/img/pinpai_imge_nanguo@2x.png';
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpGet, ) {
    this.pagename = this.navParams.data.last;
    this.store36id = this.navParams.data.store36id;
    this.merchid = this.navParams.data.merchid;
    this.flag = this.navParams.data.flag;
    this.cdaward();
  
  }

  ionViewDidLoad() {
    this.cdaward();
    this.navBar.backButtonClick = this.backButtonClick;
    this.init();
    this.jiazhuang = [
      [
        { 'goodsid': '100007916', 'storeid': '25000791', 'goodsimg': 'http://c.diancall.com/pipes/img/goods_900/6kvgrf2vh5ugl75spikidt3lt2.jpg', 'goodsname': '诺贝尔瓷砖-全抛釉地砖  金谷雪灰', 'marketprice': '428', 'sellprice': '128' },
        { 'goodsid': '100007915', 'storeid': '25001838', 'goodsimg': 'http://c.diancall.com/pipes/img/goods_900/5s65g0if46gh48f25htb38hr85.jpg', 'goodsname': '首秀经典欧式窗帘', 'marketprice': '499', 'sellprice': '99' }
      ],
      [
        { 'goodsid': '100007922', 'storeid': '25001835', 'goodsimg': 'http://c.diancall.com/pipes/img/goods_900/7fio4dmpjk59qhub3onnk2qn9k.jpg', 'goodsname': '万家灯饰-客厅10头', 'marketprice': '1670', 'sellprice': '868' },
        { 'goodsid': '100007921', 'storeid': '25001767', 'goodsimg': 'http://c.diancall.com/pipes/img/goods_300/09etcec661fshm204pmmrvsj25.jpg', 'goodsname': '3M净水器-DWS1893', 'marketprice': '4699', 'sellprice': '2899' },
        // { 'goodsid': '100007858', 'storeid': '25001827', 'goodsimg': 'http://c.diancall.com/pipes/img/goods_900/2ampib9mdk7pngplpgng64utne.jpg', 'goodsname': '美大集成灶', 'marketprice': '17800', 'sellprice': '14500' }
      ],
      [
        { 'goodsid': '100007605', 'storeid': '25001767', 'goodsimg': 'http://c.diancall.com/pipes/img/goods_900/4q29cmjqjif6dlmdrr7fkq4srt.jpg', 'goodsname': '北极绒纯棉家访四件套', 'marketprice': '198', 'sellprice': '99.9' },
        { 'goodsid': '100007859', 'storeid': '25001815', 'goodsimg': 'http://c.diancall.com/pipes/img/goods_900/68nva3k04uo38hae04q64gid8a.jpg', 'goodsname': '欧美瓷砖卢娜灰  EDKMA88484', 'marketprice': '195', 'sellprice': '99' }
      ],
      // [
      //   // { 'goodsid': '100007937', 'storeid': '25001767', 'goodsimg': 'http://c.diancall.com/pipes/img/goods_900/2fu6flq4g0vmtpabq8516nk2tb.jpg', 'goodsname': '北极绒纯棉家访四件套', 'marketprice': '198', 'sellprice': '99.9' },
      //   // { 'goodsid': '100007859', 'storeid': '25001815', 'goodsimg': 'http://c.diancall.com/pipes/img/goods_900/68nva3k04uo38hae04q64gid8a.jpg', 'goodsname': '欧美瓷砖卢娜灰  EDKMA88484', 'marketprice': '195', 'sellprice': '99' }
      // ]
    ];
    this.jinping=[
      [
        { 'goodsid': '100007925', 'storeid': '25001767', 'goodsimg': 'http://c.diancall.com/pipes/img/goods_300/2c8787v32901p925h2lstju1vd.jpg', 'goodsname': '云南普洱-古树茶', 'marketprice': '168', 'sellprice': '29.9' },
        { 'goodsid': '100007605', 'storeid': '25001767', 'goodsimg': 'http://c.diancall.com/pipes/img/goods_900/4q29cmjqjif6dlmdrr7fkq4srt.jpg', 'goodsname': '北极绒纯棉家访四件套', 'marketprice': '198', 'sellprice': '169' },
      ],
      [
        { 'goodsid': '100000683', 'storeid': '25000771', 'goodsimg': 'http://c.diancall.com/pipes/img/goods_900/090jt08oilng28n54ft6d01vun.jpg', 'goodsname': '天下为公', 'marketprice': '568', 'sellprice': '450' },
        { 'goodsid': '100007328', 'storeid': '25001740', 'goodsimg': 'http://c.diancall.com/pipes/img/goods_900/6735lvmj4epc59risd8ldvk3bh.jpg', 'goodsname': '福友记野生黄花鱼', 'marketprice': '100'}, 
      ],
      [
        { 'goodsid': '100007951', 'storeid': '25001761', 'goodsimg': 'http://c.diancall.com/pipes/img/goods_900/7t7mb7vd8id44rgn39qpcp1650.jpg', 'goodsname': '叶苑黑珍珠生态养生茶    两盒', 'marketprice': '690', 'sellprice': '168' },
        { 'goodsid': '100007319', 'storeid': '25001740', 'goodsimg': 'http://c.diancall.com/pipes/img/goods_900/4mhci369pgmq96aeno1h5v7ook.jpg', 'goodsname': '福友记对虾A', 'marketprice': '80', 'sellprice': '65' }
      ],
      [
        { 'goodsid': '100007328', 'storeid': '25001740', 'goodsimg': 'http://c.diancall.com/pipes/img/goods_900/6735lvmj4epc59risd8ldvk3bh.jpg', 'goodsname': '福友记野生黄花鱼', 'marketprice': '100', 'sellprice': '70' }
      ]
    ];
    this.pinpaiarr=[
      [
        {'goodsid': '', 'storeid': '25001834','storeimgs':'assets/img/pinpai_imge_baoshilong@2x.png','goodsname': '店呼包年卡',},
        {'goodsid': '', 'storeid': '25001825','storeimgs':'assets/img/pinpai_imge_dajinni@2x.png','goodsname': '店呼包年卡',},
        {'goodsid': '', 'storeid': '25001813','storeimgs':'assets/img/pinpai_imge_furen@2x.png','goodsname': '店呼包年卡',},
        {'goodsid': '', 'storeid': '25001837','storeimgs':'assets/img/pinpai_imge_3m@2x.png','goodsname': '店呼包年卡',},
      ],
      [
        {'goodsid': '', 'storeid': '25001835','storeimgs':'assets/img/pinpai_imge_wanjia@2x.png','goodsname': '店呼包年卡',},
        {'goodsid': '', 'storeid': '25001838','storeimgs':'assets/img/pinpai_imge_shouxiu@2x.png','goodsname': '店呼包年卡',},
        {'goodsid': '', 'storeid': '25000834','storeimgs':'assets/img/pinpai_imge_shenlu@2x.png','goodsname': '店呼包年卡',},
        {'goodsid': '', 'storeid': '25001828','storeimgs':'assets/img/pinpai_imge_jiaodian@2x.png','goodsname': '店呼包年卡',}
      ],
      [
        {'goodsid': '', 'storeid': '25001826','storeimgs':'assets/img/pinpai_imge_jianan@2x.png','goodsname': '店呼包年卡',},
        {'goodsid': '', 'storeid': '25001815','storeimgs':'assets/img/pinpai_imge_oumei@2x.png','goodsname': '店呼包年卡',},
        {'goodsid': '', 'storeid': '25000791','storeimgs':'assets/img/pinpai_imge_nuobeier@2x.png','goodsname': '店呼包年卡',},
        {'goodsid': '', 'storeid': '25001827','storeimgs':'assets/img/pinpai_imge_meida@2x.png','goodsname': '店呼包年卡',}
      ],
      [
        
        // {'goodsid': '', 'storeid': '25001767','storeimgs':'pinpai_imge_3m@2x','goodsname': '店呼包年卡',},
        // {'goodsid': '', 'storeid': '25001767','storeimgs':'pinpai_imge_baoshilong@2x','goodsname': '店呼包年卡',}
      ],
    ];
  }
  ionViewDidEnter() {
    this.navBar.backButtonClick = this.backButtonClick;
  }
  init() {
    this.wxshare();
  }
  wxshare() {
    if (location.href.indexOf('?path=activity') < 0) {
      location.href = globalhead + '?path=activity9527#/%E9%A6%96%E9%A1%B5/activity';
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
    $.get('http://c.diancall.com/pipes/wechat/getaccesstoken?url=' + getsrc + '&noncestr=' + timestampNum, function (res) {
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
        var imgUrl = globalimg + "www/assets/img/sy_banner_jingxuan@2x.png";  //图片LOGO注意必须是绝对路径
        var lineLink = sharesrc;   //网站网址，必须是绝对路径
        var descContent = '金浦家装联盟大特价，你敢来我就敢减，万元大礼包等着你'; //分享给朋友或朋友圈时的文字简介
        var shareTitle = "店呼1212金浦家装节";  //分享title
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

  backButtonClick = (e: UIEvent) => {
    if (this.pagename == "shopdetail") {
      location.href = globalhead + '?path=shop-detail9527?store36id=' + this.store36id + '?merchid=' + this.merchid + '?flag=' + this.flag + '8576#/%E9%A6%96%E9%A1%B5/shop-detail';
    } else {
      location.href = globalhead;
    }
  }
  goGoods(item) {
    let type = 'alonegoods';
    console.log(item);
    this.oneShop(item, type)
  }


  //查询门店
  oneShop(item, type) {
    let url = HttpUrl.oneShopInfo + parseInt(item.storeid).toString(36)
    this.http.httpMethodContext(url, {}, (res, context) => {
      if (typeof (res) !== 'undefined' || res !== '') {
        let storeInfo = res
        context.goodsDetail(item, storeInfo, type)
      }
    }, this)
  }

  // 查询商品详情
  goodsDetail(item, storeInfo, type) {
    let url = HttpUrl.aloneGoods + parseInt(item.goodsid).toString(36)
    this.http.httpMethodContext(url, {}, (res, context) => {
      if (typeof (res) !== 'undefined' || res !== '') {
        let goodsInfo = res;
        console.log(goodsInfo);
        if (type == 'alonegoods') {
          this.navCtrl.push('GoodsxiangqingPage', { info: goodsInfo, last: 'active' });
        } else {
          this.navCtrl.push('GoodsxiangqingPage', { info: goodsInfo, last: 'active' });
          // this.navCtrl.push('ShopParticularsPage',{key1: goodsInfo,key2:context.yhPrivilege , key3: storeInfo })
        }

      }
    }, this)
  }

  // goDiancall(data){
  //   let type='group1';
  //   let item;
  //   if(data=='group1'){
  //      item={'goodsid': '100007919', 'storeid': '25001767',}
  //      this.priviLege(item)
  //      this.oneShop(item,type);
  //   }else{
  //     item={'goodsid': '100007920', 'storeid': '25001767',}
  //     this.priviLege(item)
  //     this.oneShop(item,type);
  //   }

  // }
  goDiancall(data) {
    let type = 'groupgoods';
    let item;
    console.log(data)
    if (data == 'group1') {
      item = { 'goodsid': '100007919', 'storeid': '25001767', }
      this.priviLege(item)
      this.oneShop(item, type);
    } else if (data == 'group2') {
      item = { 'goodsid': '100007920', 'storeid': '25001767', }
      this.priviLege(item)
      this.oneShop(item, type);
    } else {
      item = { 'goodsid': '100007923', 'storeid': '25001767', }
      this.priviLege(item)
      this.oneShop(item, type);
    }
    // 
  }

  priviLege(item) {

    let url = HttpUrl.privilege + parseInt(item.storeid).toString(36)
    this.http.httpMethodContext(url, {}, (res, context) => {

      context.yhPrivilege = res;
    }, this)
  }
  goturn() {
    // let giftNames = ["全国流量500M", "0分钟通话", "全国流量30", "猪肉丝"]
    // let gif=["10000001", "10000002", "10000003", "10000004", "10000005", "10000006",]
    this.navCtrl.push('TurntablePage', { 'gift': this.giftName, 'restcdrcount': '' })
  }
  cdaward() {
    let data = {
      'bean': {
        status: [10]
      }
    }
    this.http.httpMethodContext(HttpUrl.cdaward, data, (res, context) => {
      context.giftName = [];
      console.log('奖品' + JSON.stringify(res));
      for (let item of res.rows) {

        context.giftName.push({ 'awardtitle': item.awardtitle, 'awarddetail': item.awarddetail, 'cdrawardid': item.cdrawardid });

      }
      console.log('xxx==' + JSON.stringify(context.giftName));
    }, this)
  }
  dataShowFn(data){
    if(typeof(data)=='undefined' || data==''){
    return false;
    }else{
    return true;
    }
    }
    gostores(items){
      console.log(JSON.stringify(parseInt(items).toString(36)))
      let url = HttpUrl.oneShopInfo + parseInt(items).toString(36)
      this.http.httpMethodContext(url, {}, (res, context) => {
        if (typeof (res) !== 'undefined' || res !== '') {
          let storeInfo = res
          // items.followed = false;
          context.navCtrl.push('ShopDetailPage', {info:storeInfo,last:'active'});
        }
      }, this)
    }
  // {"categoryid":"c.114","createtime":1513047438714,"goods36id":"1njilr","goodsdesc":"买美大飞天1301集成灶送3米配套橱柜！",
  // "goodsface":"4vfsph4h0tgllgqnmrfqkcre55.jpg","goodsid":100007919,"goodsimgs":"643465orocg1pi60aljaql11fl.jpg;16c7l9e4v4v17hae3na4iu15m0.jpg;
  // 423m9fvtn22rv5222rl76u5099.jpg;23kn8j77qefpfaevd0kdnme4s2.jpg;0iqrivleiqeicqam79oe560g04.jpg","goodsname":"美大厨房超值套餐",
  // "goodsradio":53,"groupid":"evvhj.106","groupname":"超值套餐","isrecommend":0,"iswholesale":0,"marketprice":17800,"merchid":30000553,
  // "seen":2,"sellprice":14500,"status":10,"stocks":0,"storeid":25001767,"unit":"套","oldPriceShow":true}

  // {"buycount":0,"city":"深圳市","closetime":"20:00","costcashvalues":0,"costfluxkbs":0,"costmoney":0,"costvoicetimes":0,
  // "createtime":1506565795511,"custusercount":0,"distance":0,"goodscount":9,"goodsradio":53,"isfollowed":"false","latitude":22.551133311177,
  // "longitude":113.965483523485,"merchid":30000553,"msmscount":0,"opentime":"09:00","province":"广东省","quancount":0,"seen":2,"status":10,
  // "store36id":"evvhj","storeaddr":"沙河西路2009-2号","storeface":"1p3jl46mcnn59kli2c9m2hvcrv.jpg","storeid":25001767,
  // "storeimgs":"5jn80eu58p9a1f66g4bc84q3bt.jpg","storeman":"王培伟","storename":"店呼商品供应店","storetel":"15113807458","followed":false}
  doRefresh(refresher) {
     setTimeout(() => {
       //console.log('Async operation has ended');
       refresher.complete();
     }, 2000);
   }
}
