import { Component,ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { IonicPage, NavController, NavParams, ModalController, AlertController,Navbar } from 'ionic-angular';
import { HttpUrl, constVar, globalVar, isLogin, goLogin,globalhead } from '../../common/global';
import { HttpGet } from '../../providers/http-get';

@IonicPage()
@Component({
  selector: 'page-home-delivery-detail',
  templateUrl: 'home-delivery-detail.html',
})
export class HomeDeliveryDetailPage {
  shopname = '3公里免费送货上门';
  callimg = 'assets/img/icon_shangpudianhua@2x.png';
  shopcarimg = 'assets/img/icon_gouwuche@2x.png';
  shousuo_img = 'assets/img/wodemendian_shousuo@2x.png';
  banner = 'assets/img/songhuo_banner@2x.png';
  // categories = [1, 2, 3, 4, 5, 6, 7];
  guessLikeShops = [];
  selectedMenuTarget: any;
  hasmore = true;
  islock = false;
  params = {
    favoritesId: 0,
    pageNo: 1
  }
  count_number = 0;
  payPrice = 0;
  faceurl_900 = constVar.goodsfaceurl_900
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public _http: Http,
    private http: HttpGet, public alertCtrl: AlertController, ) {
  }
  @ViewChild(Navbar) navBar: Navbar; 

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeDeliveryDetailPage');
    this.chaxunIndustry();
    let categoryid = '';
    this.chaxungoods(categoryid);
    this.navBar.backButtonClick = this.backButtonClick; 
  }
  backButtonClick = (e: UIEvent) => {
      location.href = globalhead;
  }
  itemClick(c, event) {

    var initSelected: any = document.getElementsByClassName('menuItem');
    if (initSelected[0].classList.contains("active")) {
      initSelected[0].classList.remove("active")
    }


    //移除上次选中菜单的样式
    if (this.selectedMenuTarget) {
      this.selectedMenuTarget.classList.remove("active")
    }

    //修改本次选中菜单的样式
    event.currentTarget.classList.add("active");

    //将本次选中的菜单记录
    this.selectedMenuTarget = event.currentTarget;

    this.hasmore = true;

    this.params.favoritesId = c.FavoritesId;
    this.params.pageNo = 1;

    this.chaxungoods(c.categoryid);
  }



  reduce(item) {
    if (item.count <= 0) {
      let prompt = this.alertCtrl.create({
        title: "输入错误",
        buttons: [
          {
            text: "确定",
            handler: data => {
              console.log("确定 clicked");
            },
          }
        ]
      });
      prompt.present();
      item.count = 0;
    } else {
      item.count--;
      this.payPrice -= item.goodsInfo.sellprice;
    }
  }

  search(){
    console.log('search clicked');
  }

  add(item) {
    item.count++;
    this.payPrice += item.goodsInfo.sellprice;
  }

  addToCart() {
    this.navCtrl.push('ShopCarPage')
  }
  goShop() {
    let myModal = this.modalCtrl.create('DeliveryPopupPage', { data: 'car' });
    myModal.present();
    // this.navCtrl.push('DeliveryPopupPage')
  }

  rules() {
    let myModal = this.modalCtrl.create('DeliveryPopupPage', { data: 'goods' });
    myModal.present();
  }
  menu() {

  }

  //行业分类
  chaxunIndustry() {
    let dataParams = {
      "bean": {
        longitude: globalVar.location.longitude,
        latitude: globalVar.location.latitude,
        city: globalVar.location.city
      }
    }
    this.http.httpMethodContext(HttpUrl.querycategoty, dataParams, (res, context) => {
      console.log(JSON.stringify(res.result))
      let allGroup = { "categoryid": "", "categoryname": "全部", "createtime": '', "display": '' };
      context.categories = res.result;
      context.categories.unshift(allGroup)
    }, this)
  }


  // 查询商品
  chaxungoods(categoryid) {

    let dataParams = {
      "bean": {
        categoryid: categoryid,
        longitude: globalVar.location.longitude,
        latitude: globalVar.location.latitude,
        city: globalVar.location.city
      }
    }
    this.http.httpMethodContext(HttpUrl.querygoods, dataParams, (res, context) => {
      context.guessLikeShops = res.result;
      for (let item of context.guessLikeShops) {
        if (item.distance == 0) {
          item.distance = '';
        } else if (item.distance <= 1000) {

          item.distance = "<" + 10 + "m";

        } else if (item.distance >= 100000) {

          item.distance = Math.floor(item.distance / 1000) / 100 + "km"

        } else {

          item.distance = Math.floor(item.distance / 100) + "m";

        }
        if (context.isEmptyObject(item.goodsInfo.propValues) == true) {
          item.goodsInfo.moreRule = true;
        } else {
          item.goodsInfo.moreRule = false;
        }
        item.count = 0;
      };

    }, this)

  }
  isEmptyObject(obj) {
    for (var key in obj) {
      console.log(666)
      return false;
    }
    return true;
  }
  gonext(item) {
    this.navCtrl.push('GoodsxiangqingPage', {info:item.goodsInfo,last:'delivery'});
    console.log(JSON.stringify(item))
  }

  maimaimai(item) {
    event.stopPropagation();
    console.log(JSON.stringify(item))
    let data = {
      'bean': {
        cartgoodsitemsid: '',//	String	【主键】 c端商城购物车id，类单品id,6位custuser36id-5位storeid-9位create36time
        custuserid: localStorage.getItem("custuserid"),//		long	c端用户id
        goodsid: item.goodsid,//		int	商品id
        count: 2,//		int	件数
        storeid: item.storeid,//		int	商品关联门店id
        // status:'',//		short	状态: 10:正常;20:待审批;30：隐藏;40:下架;70:过期;80:删除;
        // props:''//	
      }, 'cols': '[""]'
      , 'props': [],
    }
    console.log(JSON.stringify(JSON.stringify(data)))
    this.http.httpMethodContext(HttpUrl.add2custcart, data, (res, context) => {

    }, this)
  }
}


