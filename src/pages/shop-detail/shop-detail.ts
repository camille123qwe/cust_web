import { Component, ChangeDetectorRef,ViewChild } from '@angular/core';
import {  IonicPage,NavController, NavParams, App, ModalController, Slides, ActionSheetController,Navbar } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpContents, HttpUrl, showToast, constVar,globalhead ,globalimg} from '../../common/global';
import { LoginPage } from '../login/login';
import * as $ from 'jquery';
import wx from 'weixin-js-sdk';

/**
 * Generated class for the ShopDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-shop-detail',
  templateUrl: 'shop-detail.html',
})
export class ShopDetailPage {

  title_banner = "";
  img_class: string = 'middle_img';
  setting_page;
  setting_params;
  followed;
  shopInfo;
  Storename;
  Storeface;
  shopYouhui;
  StoreID;
  infiniteScroll;
  StoreImg = [];
  flipper_page = 0;
  total = 0;
  status = [10];
  tel_str = '';
  call_mendian = true;
  FxIMg = 'assets/img/icon_fenxiang@2x.png';
  goods_list = [];
  pric = false;
  yhPrivilege = [];
  yhPrivilegelist = [];
  yhfirst = {};
  tho = false;
  tholist = true;
  moreShop = false;
  goodsface_300 = constVar.goodsfaceurl_300;
  goodsface_900 = constVar.goodsfaceurl_900;
  storefaceurl_300 = constVar.storefaceurl_300;
  storefaceurl_900 = constVar.storefaceurl_900;
  storeimgsurl_720 = constVar.storeimgsurl_720;
  limit = 20;
  Taskid;
  zengsong = true;
  fenxiangzengnsong = {};
  fenxiang1 = false;
  fenxiang2 = false;
  fenxiang3 = false;
  zengsongmoshi = true;
  cang = true;
  silderimg;
  isService = false;
  isDelivery = false;
  booklist = [];
  deliverylist = [];
  merchid = "";
  store36id= "";
  opentime = "";
  closetime = "";
  storeimgs;
  storeaddr = "";
  distance = "";
  storeid;
  flag = "";
  //---------为了活动
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

  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController,
    public navParams: NavParams, private app: App, private http: HttpGet, public modalCtrl: ModalController, public cd: ChangeDetectorRef) {
    this.setting_page = 'ShopSettingPage';
    let shopdetail = window.location.href;
    if(shopdetail.indexOf('?store36id')>0&&(location.hash).indexOf('/')<0){
      this.store36id =  shopdetail.substr(shopdetail.indexOf("?store36id="),16).split("=")[1];
      this.merchid = shopdetail.substr(shopdetail.indexOf("?merchid="),17).split("=")[1];
      let flag1 =  shopdetail.substr(shopdetail.indexOf("?flag="),shopdetail.indexOf("8576")).split("=")[1];
      if(flag1){
        this.flag = flag1.split("8576#")[0];
      }
    } else {
      this.store36id = this.navParams.data.info.store36id; 
      this.merchid = this.navParams.data.info.merchid;
      this.flag = this.navParams.data.last;
    }
    this.storeid = parseInt(this.store36id,36);
    this.cdaward();
  }

  @ViewChild(Navbar) navBar: Navbar; 
  ionViewDidLoad() {
    this.navBar.backButtonClick = this.backButtonClick;
    this.init();    
    this.initData();
    this.zengsonglist();
    console.log('ionViewDidLoad ShopDetailsPage');
    this.getGoods(this.store36id, this.infiniteScroll);
    this.chaxunrenwu();
    this.priviLege();
    this.service();
    let tel = document.getElementById('a_tel');
    tel.ontouchstart = function () {
      tel.style.backgroundColor = "#efeff4";
    };
    tel.ontouchend = function () {
      tel.style.backgroundColor = "transparent";
    };
  }
  init(){
    this.wxshare();
  }
  backButtonClick = (e: UIEvent) => {
    if(this.flag=="nearby"){
      location.href = globalhead+'?path=nearby-store9527#/%E9%A6%96%E9%A1%B5/nearby-store';
    }else if(this.flag=="active"){
      location.href = globalhead + '?path=activity9527#/%E9%A6%96%E9%A1%B5/activity';
    }else{
      location.href = globalhead; 
    }
   
   }

   wxshare(){
    if(location.href.indexOf('?path=shop-detail')<0){
     location.href = globalhead+'?path=shop-detail9527?store36id='+this.store36id+'?merchid='+this.merchid+'?flag='+this.flag+'8576#/%E9%A6%96%E9%A1%B5/shop-detail';
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
          var shareTitle = "门店详情";  //分享title
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
    this.http.httpMethodContext(HttpUrl.oneShopInfo+this.store36id, {}, (res, context) => {
      this.storeaddr = res.storeaddr;
      if(res.distance==0){
          this.distance = "";
      }else{
        this.distance = res.distance;
      }
      if (res.isfollowed == 'true') {
        this.followed = true;
      } else {
        this.followed = false;
      }
      this.storeimgs = res.storeimgs;
        //没有门店图片，默认门店首图为门店图片，
    if (this.storeimgs == undefined) {
      this.StoreImg.push(this.title_banner);
    } else {
      this.StoreImg = this.storeimgs.split(";");
      for (let i = 0; i < this.StoreImg.length; i++) {
        this.StoreImg[i] = this.storeimgsurl_720 + this.StoreImg[i];
      }

    }
      this.Storename = res.storename;
      //营业时间
      if (typeof (res.opentime) == 'undefined') {
        this.opentime = '9:00';
      }else{
        this.opentime = res.opentime;
      }
      if (typeof (res.closetime) == 'undefined') {
        this.closetime = '18:00';
      }else{
        this.closetime = res.closetime;
      }
      this.title_banner = this.storefaceurl_900 + res.storeface;
      this.setting_params = { title: res.storename };
  
      if (typeof res.storetel == 'undefined' || res.storetel == 'null') {
        this.call_mendian = false;
      } else {
        this.tel_str = 'tel:' + res.storetel;
      }

    },this)

    // if (this.navParams.data.followed) {
    //   console.log('从我的门店跳转而来');
    //   //从我的门店跳转而来
    //   this.shopInfo = this.navParams.data.store;
    // } else {
    //   console.log('从首页跳转而来');
    //   this.shopInfo = this.navParams.data;
    // }

   
  }
  
  ifshow(item){
    if(typeof(item)=='undefined' || item==''){
      return false
    }else{
      return true;
    }
  }
  // active(){
  //   this.navCtrl.push('ActivityPage',{last:'shopdetail',store36id:this.store36id,merchid:this.merchid,flag:this.flag});
  //   }
  getGoods(id, infiniteScroll) {
    let data = {
      bean: {
        storeid: parseInt(id, 36),
        status: this.status,
      }, flipper: {
        offset: this.flipper_page,
        limit: this.limit
      }
    }
    this.http.httpMethodContext(HttpUrl.shopGoods, data, (res, context) => {
      if (typeof (infiniteScroll) == undefined) {
        infiniteScroll.complete();
      }

      this.total = res.total;
      for (let item of res.rows) {
        item.sellprice = item.sellprice / 100;
        item.marketprice = item.marketprice / 100;
        if (item.sellprice == '') {
          item.sellprice = '待定';
        } else if (item.sellprice == 0) {
          item.sellprice = '免费';
        }
        if (item.marketprice == 0 || item.marketprice == item.sellprice || item.marketprice < item.sellprice) {
          item.pric = true;
        } else {
          item.pric = false;
        }

      }

      //爆款置顶
      if (res.rows.length <= 5) {
        res.rows = res.rows;
      } else {
        let resoult = [];
        for (let i = 0; i < res.rows.length; i++) {
          if (res.rows[i].isrecommend != 0) {
            resoult.push(res.rows[i]);
            console.log('resoultresoultresoult===' + JSON.stringify(resoult));
          } else {
            res.rows = res.rows;
          }

          if (resoult.length < 5) {
            if (res.rows[i].isrecommend == 0) {
              resoult.push(res.rows[i]);
            }
          } else {
            resoult;
          }
        }
        res.rows = resoult;
      }
      if (context.flipper_page === 0) {
        context.goods_list = res.rows;
        this.StoreID = context.goods_list[0].storeid.toString(36);
      } else {
        for (let item of res.rows) {
          context.goods_list.push(item);
          this.StoreID = context.goods_list[0].storeid.toString(36);
        }
      };
      //门店商品少于5个，则‘查看更多商品’不显示
      if (context.goods_list.length >= 5) {
        this.moreShop = true;
      } else {
        this.moreShop = false;
      }

    }, this);
  }

  toFollow() {
    let custuserid = localStorage.getItem('custuserid');
    if (custuserid == null || custuserid === 'undefined') {
      console.log('未登录');
      this.navCtrl.push(LoginPage, {});
      return false;
    } else {
      let url = HttpUrl.followShop + this.store36id;  //#	int	门店36ID
      this.http.httpMethodContext(url, {}, (res, context) => {
       // showToast('关注成功');
        let alert=context.actionSheetCtrl.create({
          title:'关注成功',
          buttons:['确定']
        })
        alert.present();
        context.followed = true;
        context.navParams.data.isfollowed = 'true';
      }, this);
    }

  }


  Preferential(shopInfo, item) {
    let myModal = this.modalCtrl.create('PreferentialModulePage', { key1: shopInfo, key2: item, });
    myModal.present();
  }


  priviLege() {
    let url = HttpUrl.privilege + this.store36id;
    this.http.httpMethodContext(url, {}, (res, context) => {
      if (res.length == 0) {
        this.cang = false;
      }
      console.log('res.length===' + JSON.stringify(res));
      if (typeof (res) == 'undefined' || res.length == 0) {
        this.tho = true;
      } else {
        for (let i = 0; i < res.length; i++) {
          if (res[i].validday == 0) {
            res[i].validday = "长期有效";
            res[i].youxiaoriqi = true;
            res[i].kaishi = true;

          } else {

            let newDate1: any = new Date();
            newDate1.setTime(res[i].starttime);
            let start = newDate1.format('yyyy-MM-dd');

            let newDate2: any = new Date();
            newDate2.setTime(res[i].endtime);
            let end = newDate2.format('yyyy-MM-dd');
            res[i].validday = start + '起—' + end + '止';

            //过期优惠列表不显示；
            let today = new Date();
            let myDate = today.toLocaleDateString();
            let daytime = new Date(myDate).getTime();
            if (new Date(end).getTime() >= daytime) {
              res[i].youxiaoriqi = true;
            } else {
              res[i].youxiaoriqi = false;
            }

            //未开始的活动 按钮
            if (res[i].starttime > daytime) {
              res[i].weikaishi = true;
              res[i].kaishi = false;
            } else {
              res[i].weikaishi = false;
              res[i].kaishi = true;
            }
          }

        }
        context.yhPrivilege = res;
        //加上分享赠送和优惠不能超过3条列表
        if (context.yhPrivilege.length > 2 && context.cang == true) {
          if (context.zengsong == true) {
            context.yhPrivilegelist.push(context.yhPrivilege[0]);
            context.yhPrivilegelist.push(context.yhPrivilege[1]);
          } else {
            if (context.zengsong == false) {
              context.cang = false;
            }
            context.yhPrivilegelist.push(context.yhPrivilege[0]);
            context.yhPrivilegelist.push(context.yhPrivilege[1]);
            context.yhPrivilegelist.push(context.yhPrivilege[2]);
          }
        } else {
          context.yhPrivilegelist = context.yhPrivilege;
          context.cang = false;
        }
        context.tho = false;
        context.yhfirst = context.yhPrivilegelist[0];
        context.yhPrivilegelist.shift();
        
      }

    }, this)
  }

  huoqugenduo() {
    this.cang = false;
    this.priviLege();
  }


  // 商品详情
  detail(item, yhPrivilege, shopInfo) {
    console.log('item==='+JSON.stringify(item));
    console.log('shopInfo=='+JSON.stringify(shopInfo));
    //let modalDet = this.modalCtrl.create('ShopParticularPage', { key1: item, key2: yhPrivilege, key3: shopInfo, key4: this.fenxiangzengnsong });
    //modalDet.present();
    this.navCtrl.push('GoodsxiangqingPage', {info:item,last:'shopdetail'});

  }

  zengsonglist() {
    let url = HttpUrl.huoqurenwu + this.store36id;
    this.http.httpMethodContext(url, {}, (res, context) => {
      console.log('rw===' + JSON.stringify(res))
      console.log('rwID' + this.store36id);
      this.fenxiangzengnsong = res;
      if (typeof (res) == 'undefined' || res == null) {
        this.zengsong = false;
      } else {
        res = res;
        this.zengsong = true;
        context.merchid = res.merchid;
        //代金券
        if (typeof (res.cashvalue) == 'undefined' || res.cashvalue == 0) {
          this.fenxiang1 = false;
        } else {
          res.cashvalue = Math.floor(res.cashvalue / 100);
          this.fenxiang1 = true;
        }

        //通话
        if (typeof (res.voicetimes) == 'undefined' || res.voicetimes == 0) {
          this.fenxiang2 = false;
        } else {
          res.voicetimes = Math.floor(res.voicetimes / 60);
          this.fenxiang2 = true;
        }

        // 流量
        if (typeof (res.fluxpkgid) == 'undefined' || res.fluxpkgid == 0 || typeof (res.fluxPackage) == 'undefined') {
          this.fenxiang3 = false;
        } else {
          res.fluxPackage.ydfluxkbs = Math.floor(res.fluxPackage.ydfluxkbs / 1024);
          this.fenxiang3 = true;
        }


        if (typeof (res.costmoneyneed) == 'undefined' || res.costmoneyneed == 0) {
          this.zengsongmoshi = true;
        } else {
          this.zengsongmoshi = false;
        }
        let newDate1: any = new Date();
        newDate1.setTime(res.starttime);
        let start = newDate1.format('yyyy-MM-dd');

        let newDate2: any = new Date();
        newDate2.setTime(res.endtime);
        let end = newDate2.format('yyyy-MM-dd');
        res.qishiriqi = start + '起—' + end + '止';
        if (res.validday == 0) {

          res.qishiriqi = '长期有效';
        }
      }
      console.log('任务==' + JSON.stringify(res));
    }, this);
  }

  chaxunrenwu() {
    //查询分享任务
    // var ;
    let data = {
      bean: {
        type: 1,
        storeid: this.storeid,
      }
    }
    this.http.httpMethodContext(HttpUrl.fenxiangrenwu, data, (res, context) => {
      console.log('任务==IDIDID' + JSON.stringify(res.result));
      if (typeof (res.result) == 'undefined' || typeof (res.result.taskid) == 'undefined') {
        context.Taskid = '';
      } else {
        context.Taskid = res.result.taskid;
      }

      console.log('asdasasd' + context.Taskid)
    }, this);

  }

  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    if (this.flipper_page < this.total) {
      this.flipper_page += this.limit;
      this.getGoods(this.storeid, infiniteScroll);
      infiniteScroll.complete();
    } else {
      infiniteScroll.complete();
      console.log(this.total);
    }

  }
  //查看全部商品
  getAllGoods() {
    let data = { 'yhPrivilege': this.yhPrivilege, 'store36id': this.store36id };
    this.navCtrl.push('GoodsManagePage', data);
  }
  //展开优惠列表
  zhankai(){
    this.tholist = !this.tholist;
  }
  //查询预约服务列表
  service(){
    console.log('进入service');
    let dataparams = {
      bean:{merchid:this.merchid}
    };

     this.http.httpMethodContext(HttpUrl.queryService, dataparams, (res, context) => {
      context.booklist = [];
        if(res.bookinfosheet.rows.length>=0){
          let arr = res.bookinfosheet.rows;
          arr.forEach(element => {
            element.serviceprice = (element.serviceprice/100).toFixed(2);
            context.booklist.push(element);
          });
        }
        if(res.deliveryrecordsheet.rows.length>0){
          let arr = res.deliveryrecordsheet.rows;
          context.deliverylist.push(arr[0]);
        }
        
       if(context.booklist.length>0){
         context.isService = true;
         
       }
       if(context.deliverylist.length>0){
         context.isDelivery = true;
       }
     },this)
  }
  //预约服务页面
  book(item){
    console.log(JSON.stringify(item));
    this.navCtrl.push('BookServicePage',{bookid:item.bookid,storeid:this.storeid,servicename:item.servicename,servicestarttime:item.servicestarttime,serviceendtime:item.serviceendtime,serviceprice:item.serviceprice});
  }
  //点击门店图片进入滑动查看图片页面
 preview(item) {
  let modal = this.modalCtrl.create('SlideImgPage', { currentImg: item, allImgs: this.StoreImg });
  modal.onDidDismiss((data) => {
  console.log("onDidDismiss==" + JSON.stringify(data));
  });
  modal.present();

}
qianggou(){
  this.navCtrl.push('HomeDeliveryDetailPage');
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
  doRefresh(refresher) {
    // console.log('Begin async operation', refresher);
    this.init();    
    this.initData();
    this.zengsonglist();
    this.getGoods(this.store36id, this.infiniteScroll);
    this.chaxunrenwu();
    this.priviLege();
   // this.service();
    let tel = document.getElementById('a_tel');
    tel.ontouchstart = function () {
      tel.style.backgroundColor = "#efeff4";
    };
    tel.ontouchend = function () {
      tel.style.backgroundColor = "transparent";
    };
     setTimeout(() => {
       //console.log('Async operation has ended');
       refresher.complete();
     }, 2000);
   }
}
