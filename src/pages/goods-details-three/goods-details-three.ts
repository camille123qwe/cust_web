import { Component, ViewChild ,NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content,Navbar } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpContents, HttpUrl, showToast, constVar,backButtonClick } from '../../common/global';
import * as $ from 'jquery';

/**
 * Generated class for the GoodsDetailsTwoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-goods-details-three',
  templateUrl: 'goods-details-three.html',
})
export class GoodsDetailsThreePage {
  @ViewChild(Content) content: Content;
  goodsdata;
  goodImg;
  goodsface_900 = constVar.goodsfaceurl_900;
  storeface_900 = constVar.storefaceurl_900;
  callimg = 'assets/img/icon_shangpudianhua@2x.png';
  goodsName = ''; sellPrice = ''; marketprice = ''; goodsDesc = ''; goodsdetail = '';
  storeIMg = ''; storeName = ''; disTance = ''; storeAddr = '';
  hotGoodRows = [];
  props;
  Opacity;
  tel_str='';
  divShow=false;
  heightNUm = 0;
  followed;
  shopcar='assets/img/icon_gouwuche@2x.png';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpGet, public modalCtrl: ModalController, public zone: NgZone,) {
    this.goodsdata = this.navParams.data;
    this.detilsShow();
    this.cdaward();
  }
  @ViewChild(Navbar) navBar: Navbar; 
  ionViewDidLoad() {
    console.log('ionViewDidLoad GoodsxiangqingPage');
    this.goodsDetail();
    this.oneShop();
    this.hotGoods()
    this.detilsShow();
  //this.navBar.backButtonClick = backButtonClick; 
  
  }
  ionViewWillEnter() {
    this.detilsShow();
  }

  detilsShow() {
    let bannersHeight = $('#banner').height()
    console.log('===bannersHeight'+bannersHeight)
    if (bannersHeight > screen.height - 95) {
      let timepiece = setInterval(() => {
        clearInterval(timepiece)
        this.divShow = true
      }, 500)
    } else {
      this.divShow = false
    }
    console.log(bannersHeight > screen.height)
  }

  scrollHandler(event) {

    this.zone.run(()=>{
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
      let bannersHeight = $('#banner').height()
      let hasshow = screen.height - 100;
      if(this.content.getContentDimensions().scrollTop<bannersHeight-hasshow){
             this.divShow = true;
           }else{
             this.divShow = false;
           }
      
    })
  }

  goShop(){
    this.navCtrl.push('ShopCarPage')
  }

  // 查询商品详情
  goodsDetail(){
    console.log('store36id==='+JSON.stringify(this.goodsdata.storeid.toString(36)));
    let url = HttpUrl.aloneGoods + this.goodsdata.goods36id
    this.http.httpMethodContext(url, {}, (res, context) => {
      if (typeof (res.goodsimgs) == 'undefined' || res.goodsimgs == '') {
        context.goodImg=context.goodsface_900 + res.goodsface
      } else {
       
        context.goodImg=context.goodsface_900+res.goodsimgs.split(';')[0]
      }
     
      context.goodsName = res.goodsname;
      context.sellPrice = res.sellprice;
      context.marketprice = res.marketprice;
      context.goodsDesc = res.goodsdesc;
      context.goodsdetail=res.detail;
      context.props=res.propValues;
    }, this)
  }


  
  // html  *ngIf='responseData(item)'
  responseData(item){
    if(typeof(item)=='undefined' || item==''){
      return false;
    }else{
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
  addgoods(item) {
    // let props = this.goodsdata.goodsInfo.propValues;
    if (this.isEmptyObject(this.props) == true) {
      console.log('meiyou==' + JSON.stringify(this.props))
      this.addToCart(item)
    } else {
      let myModal = this.modalCtrl.create('DeliveryPopupPage', this.goodsdata);
      myModal.present();
      console.log('you==' + JSON.stringify(this.props))
    }
  }

  // 结算 多规格选择   没有规格直接去购物车
  addToCart(item) {
    event.stopPropagation();
    console.log(JSON.stringify(item))
    let data = {
      'bean': {
        cartgoodsitemsid: '',
        custuserid: localStorage.getItem("custuserid"),
        goodsid: this.goodsdata.goodsid,
        count: 1,
        storeid: this.goodsdata.storeid,
        // status:'',//		short
        // props:''
      }, 'cols': '[""]'
      , 'props': [],
    }
    console.log(JSON.stringify(JSON.stringify(data)))
    this.http.httpMethodContext(HttpUrl.add2custcart, data, (res, context) => {
      if (res.retcode == 0) {
        context.navCtrl.push('ShopCarPage')
      }
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
      let url = HttpUrl.followShop + this.goodsdata.goodsInfo.goods36id;  //#	int	门店36ID
      this.http.httpMethodContext(url, {}, (res, context) => {
        let alert = context.alertCtrl.create({
          title:"关注成功",
          buttons:['确定']
        })
        alert.present();
        context.followed = true;
        // context.navParams.data.isfollowed = 'true';
      }, this);
    }

  }
  //查询门店
  oneShop() {
    let url = HttpUrl.oneShopInfo + this.goodsdata.storeid.toString(36)
    this.http.httpMethodContext(url, {}, (res, context) => {
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
      context.followed=res.isfollowed
      console.log(JSON.stringify(context.thisStore));
    }, this)
  }

  // 查询热门商品
  hotGoods() {
    let url = HttpUrl.shopGoods;
    let data = {
      'bean': {
      storeid: this.goodsdata.storeid,
      status: [10],
      }
      };
    this.http.httpMethodContext(url, data, (res, context) => {
      if(res.rows.length<=4){
        let newarry = [];
        for (let i = 0; i < res.rows.length; i += 2) {
          newarry.push(res.rows.slice(i, i + 2));
        }
        this.hotGoodRows = newarry;
      }else{
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


  goNextPage(item){
    console.log(JSON.stringify(item))
    this.navCtrl.push('GoodsDetailsTwoPage',item)
  }
  sha(item){
    if(item.marketprice<=item.sellprice){
      return false;
    }else{
      return true;
    }
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
    this.goodsDetail();
    this.oneShop();
    this.hotGoods()
     setTimeout(() => {
       //console.log('Async operation has ended');
       refresher.complete();
     }, 2000);
   }
}
