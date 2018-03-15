import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController,Navbar} from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpContents, HttpUrl, showToast, globalVar, constVar } from '../../common/global';
import { GlobalProvider } from '../../providers/global-provider';
@IonicPage()
@Component({
  selector: 'page-my-shop',
  templateUrl: 'my-shop.html'
})
export class MyShopPage {
  searchInput: string = "";
  shouldShowCancel: boolean = true;
  tab1_class;
  tab2_class;
  type: string;
  Val;
  val;
  CVal;
  cval;
  useful_list;
  infiniteScroll;
  changqu = false;
  fujin = false;
  shousuo_img = 'assets/img/wodemendian_shousuo@2x.png';
  img_class: string = 'small_img_class';

  familar_shops = { rows: [], offset: 0, total: 0 };  //常去的店
  recently_shops = { rows: [], offset: 0, total: 0 }; //附近的店
  storefaceurl_300 = constVar.storefaceurl_300;


  constructor(public navCtrl: NavController, public globalProvider: GlobalProvider, public navParams: NavParams, private alertCtrl: AlertController, private http: HttpGet, public modalCtrl: ModalController) {
    this.tab1_class = "text-actived";
    this.tab2_class = "text-off";
    this.type = 'left';
    // this.useful_list = [{ img: "assets/img/ly_imge@2x.png", header: "云朵踢馆那英 只因她曾经讽刺刀郎歌太俗", content: "百度视频", time: "12-21" ,address:"南山区"},
    // { img: "assets/img/ly_imge@2x.png", header: "云朵踢馆那英 只因她曾经讽刺刀郎歌太俗", content: "百度视频", time: "12-21" },];
  }

  @ViewChild(Navbar) navBar: Navbar; 
  ionViewDidLoad() {
  }
  ionViewDidEnter() {
    this.getData();
  }
  search(event) {
     this.navCtrl.push('SearchShopPage');
  }
  getData() {
    this.getFamilar(this.infiniteScroll);
    // this.getRecently();
  }
  getFamilar(infiniteScroll) {
    let dataParams = {
      // "bean": {

      // },
      "flipper": {
        offset: this.familar_shops.offset,
      }

    }
    this.http.httpMethodContext(HttpUrl.shopFamiliar, dataParams, (res, context) => {
      // {"buycount":1000,"custstoreid":"3b2ozm-evu4h","custuserid":200000002,"followtime":1487143706688,"forbidtime":0,"pushtype":10,"saleuserid":0,"store":{"city":"深圳市","costfluxkbs":0,"costmoney":0,"costvoicetimes":0,"createtime":1486536440817,"custusercount":1,"distance":0,"goodscount":0,"goodsradio":53,"latitude":22.549255,"longitude":113.965406,"merchid":30000002,"msmscount":0,"quancount":0,"status":10,"store36id":"evu4h","storeaddr":"尚美科技大厦","storeface":"31jtp1r2q2qpemjs2lu1pbm8rk.jpg","storeid":25000001,"storeimgs":"0dagdrsqgir58uhasalqekobv7.jpg;32pieg7vapl8hu3vlie3pm2k2n.jpg;7v2n59ma8ujddp7741u4q20pv8.jpg","storeman":"张生","storename":"尚美酒店大冲测试点"},"storeid":25000001,"weight":1000}
      if (typeof (infiniteScroll) == undefined) {
        infiniteScroll.complete();
      }
      context.familar_shops.total = res.total;
      for (let i = 0; i < res.rows.length; i++) {
          if (res.rows[i].buycount == 0) {
            res.rows[i].val = true;
          } else {
            res.rows[i].val = false;
          }

          if (res.rows[i].goodscount == 0) {
            res.rows[i].Val = true;
          } else {
           res.rows[i].Val = false;
          }
          if (typeof res.rows[i].store == 'undefined') {
            let store = { distance: "" };
            res.rows[i].store = store;
            res.rows[i].itemshow = true;
          } else {
            if (res.rows[i].store.distance === 0) {

              res.rows[i].store.distance = "";

            } else if (res.rows[i].store.distance <= 1000) {

              res.rows[i].store.distance = "<" + 10 + "m";

            } else if (res.rows[i].store.distance >= 100000) {

              res.rows[i].store.distance = Math.floor(res.rows[i].store.distance / 1000) / 100 + "km"

            } else {

              res.rows[i].store.distance = Math.floor(res.rows[i].store.distance / 100) + "m";

            }
          }
        }
      if (context.familar_shops.offset === 0) {
        context.familar_shops.rows = res.rows;
      } else {
        for (let item of res.rows) {
          context.familar_shops.rows.push(item);
        }
      }
      if (typeof (context.familar_shops.rows) == 'undefined' || context.familar_shops.rows.length == 0) {
        this.changqu = true;
      } else {
        this.changqu = false;
      }
    }, this);
  }
  doInfinite(infiniteScroll) {
    // setTimeout(() => {
    console.log('加载更多');
    switch (this.type) {
      case 'left':
        if (this.familar_shops.offset < this.familar_shops.total) {
          this.familar_shops.offset += 20;
          this.getFamilar(infiniteScroll);
        }
        break;
      case 'right':
        if (this.recently_shops.offset < this.recently_shops.total) {
          this.recently_shops.offset += 20;
          this.getRecently(infiniteScroll);
        }
        break;
      default:
        // context.globalProvider.presentToast('没有更多了...');
        break;
    }
    infiniteScroll.complete();
    // }, 200);
  }
  getRecently(infiniteScroll) {
    let dataParams = {
      "bean": {
        longitude: globalVar.location.longitude,
        latitude: globalVar.location.latitude,
        city: globalVar.location.city
      },
      "flipper": {
        offset: this.recently_shops.offset,
      }

    }

    this.http.httpMethodContext(HttpUrl.shopNearby, dataParams, (res, context) => {
      if (typeof (infiniteScroll) == undefined) {
        infiniteScroll.complete();
      }
      context.recently_shops.total = res.total;
      for (let i = 0; i < res.rows.length; i++) {
          if (res.rows[i].store == undefined) {
            res.rows[i].itemshow = true;
          }
          if (res.rows[i].buycount == 0) {
            res.rows[i].cval = true;
          } else {
            res.rows[i].cval = false;
          }

          if (res.rows[i].goodscount == 0) {
            res.rows[i].CVal = true;
          } else {
            res.rows[i].CVal = false;
          }

          if (typeof res.rows[i].store == 'undefined') {
            let store = { distance: "" };
            res.rows[i].store = store;
            res.rows[i].itemshow = true;
          } else {
            if (res.rows[i].store.distance === 0) {

              res.rows[i].store.distance = "";

            } else if (res.rows[i].store.distance <= 1000) {

              res.rows[i].store.distance = "<" + 10 + "m";

            } else if (res.rows[i].store.distance >= 100000) {

              res.rows[i].store.distance = Math.floor(res.rows[i].store.distance / 1000) / 100 + "km"

            } else {

              res.rows[i].store.distance = Math.floor(res.rows[i].store.distance / 100) + "m";

            }
          }
        }
      if (context.recently_shops.offset === 0) {
        context.recently_shops.rows = res.rows;
      } else {
        for (let item of res.rows) {
          context.recently_shops.rows.push(item);
        }
      }
      if (typeof (context.recently_shops.rows) == 'undefined' || context.recently_shops.rows.length == 0) {
        this.fujin = true;
      } else {
        this.fujin = false;
      }
    }, this);
  }


  selectedLeft(infiniteScroll) {
    this.type = 'left';
    this.tab1_class = "text-actived";
    this.tab2_class = "text-off";
    this.familar_shops = { rows: [], offset: 0, total: 0 };
    this.getFamilar(infiniteScroll);
  }
  selectedRight(infiniteScroll) {
    this.type = 'right';
    this.tab1_class = "text-off";
    this.tab2_class = "text-actived";
    this.recently_shops = { rows: [], offset: 0, total: 0 };
    this.getRecently(infiniteScroll);
  }
  onClickUnFolow(item) {
    let confirm = this.alertCtrl.create({
      title: '门店关注',
      message: '是否取消关注?',
      buttons: [
        {
          text: '确定',
          handler: () => {
            this.unFollow(item);
          }
        },
        {
          text: '取消',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }

  unFollow(item) {
    let url = HttpUrl.unfollowShop + item.store.store36id;   //#	int	门店36ID
    this.http.httpMethodContext(url, {}, (res, context) => {
      if (res.success) {
        showToast('已取消关注');
        switch (this.type) {
          case 'left':
            this.familar_shops.rows.splice(this.familar_shops.rows.indexOf(item), 1);
            break;
          case 'right':
            this.recently_shops.rows.splice(this.recently_shops.rows.indexOf(item), 1);
            break;
          default:
            // context.globalProvider.presentToast('没有更多了...');
            break;
        }
      } else {
        showToast('取消关注失败');
      }
    }, this);
  }

  getShopDetails(item) {
    item.followed = true;
    this.navCtrl.push('ShopDetailPage', {info:item.store});

  }
}
