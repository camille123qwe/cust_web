import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpContents, HttpUrl, showToast, globalVar, constVar } from '../../common/global';
import { HomePage } from '../home/home'
@IonicPage()
@Component({
  selector: 'page-search-shop',
  templateUrl: 'search-shop.html'
})
export class SearchShopPage {
  myInput: string = '';
  historys = [];
  historyShow = false;
  shop_list = [];
  img_class: string = 'small_img_class';
  storefaceurl_300 = constVar.storefaceurl_300;
  Val_goodscount = false;
  Val_buycount = false;
  searchGoods = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private http: HttpGet) {
    // this.searchGoods = this.navParams.data;
    this.initHistory();
  }

  ionViewDidLoad() {
  }
  initHistory() {
    let local = localStorage.getItem('search_shop_history');
    if (local == null) {
      this.historyShow = false;
    } else {
      this.historyShow = true;
      this.historys = local.split(',');
      this.historys.reverse();
    }
  }



  onSearchInput(value) {
    this.search(value);
  }

  close() {
    this.navCtrl.pop();
  }

  clearHistory() {
    localStorage.removeItem('search_shop_history');
    this.historys = [];
    this.historyShow = false;
  }
  searchHistoryShop(shop_name) {
    this.myInput=shop_name;
    this.search(shop_name)
  }
  search(shop_name) {
    if (shop_name == '') {
      return;
    }
    this.addToHistorys(shop_name);
    this.historyShow = false;
    localStorage.setItem('search_shop_history', this.historys.toString());

    let dataParams = {
      "bean": {
        longitude: '',
        latitude: '',
        city: '',
        storename: shop_name
      },
    }
    this.http.httpMethodContext(HttpUrl.searchShop, dataParams, (res, context) => {
      context.shop_list = res.rows;
      for (let i = 0; i < context.shop_list.length; i++) {

        if (context.shop_list[i].goodscount == 0) {
          this.Val_goodscount = true;
        } else {
          this.Val_goodscount = false;
        }

        if (context.shop_list[i].buycount == 0) {
          this.Val_buycount = true;
        } else {
          this.Val_buycount = false;
        }
        if (context.shop_list[i].distance === 0) {

          context.shop_list[i].distance = "";

        } else if (context.shop_list[i].distance <= 1000) {

          context.shop_list[i].distance = "<" + 10 + "m";

        } else if (context.shop_list[i].distance >= 100000) {

          context.shop_list[i].distance = Math.floor(context.shop_list[i].distance / 1000) / 100 + "km"

        } else {

          context.shop_list[i].distance = Math.floor(context.shop_list[i].distance / 1000) + "m";

        }
      }
    }, this);
  }
  addToHistorys(shop_name) {
    let included = false
    for (let item of this.historys) {
      if (item === shop_name) {
        included = true;
        break;
      }
    }
    if (!included) {
      this.historys.push(shop_name);
    }

  }
  searchBarFocus() {
    this.initHistory();
  }
  getShopDetails(item) {
    item.followed = false;
    this.navCtrl.push('ShopDetailPage', {info:item});
  }
}








