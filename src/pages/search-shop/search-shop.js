var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpUrl, globalVar, constVar } from '../../common/global';
export var SearchShopPage = (function () {
    function SearchShopPage(navCtrl, navParams, viewCtrl, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.http = http;
        this.myInput = '';
        this.historys = [];
        this.historyShow = false;
        this.shop_list = [];
        this.img_class = 'small_img_class';
        this.storefaceurl_300 = constVar.storefaceurl_300;
    }
    SearchShopPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SearchShopPage');
    };
    SearchShopPage.prototype.initHistory = function () {
        var local = localStorage.getItem('search_shop_history');
        if (local == null) {
            this.historyShow = false;
        }
        else {
            this.historyShow = true;
            this.historys = local.split(',');
        }
    };
    SearchShopPage.prototype.onSearchInput = function (event) {
        console.log('myInput==' + this.myInput);
        this.search(this.myInput);
    };
    SearchShopPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    SearchShopPage.prototype.clearHistory = function () {
        localStorage.removeItem('search_shop_history');
        this.historys = [];
        this.historyShow = false;
    };
    SearchShopPage.prototype.searchHistoryShop = function (shop_name) {
        this.search(shop_name);
    };
    SearchShopPage.prototype.search = function (shop_name) {
        this.addToHistorys(shop_name);
        this.historyShow = false;
        localStorage.setItem('search_shop_history', this.historys.toString());
        var dataParams = {
            "bean": {
                longitude: globalVar.location.longitude,
                latitude: globalVar.location.latitude,
                city: globalVar.location.city,
                storename: this.myInput
            },
        };
        // {"rows":[{"city":"深圳市","createtime":1486536440817,"custusercount":0,"distance":0,"goodsradio":53,"latitude":22.549255,"longitude":113.965406,"merchid":30000002,"status":10,"store36id":"evu4h","storeaddr":"尚美科技大厦","storeface":"31jtp1r2q2qpemjs2lu1pbm8rk.jpg","storeid":25000001,"storeimgs":"0dagdrsqgir58uhasalqekobv7.jpg;32pieg7vapl8hu3vlie3pm2k2n.jpg;7v2n59ma8ujddp7741u4q20pv8.jpg","storeman":"张生","storename":"尚美酒店大冲测试点"},{"city":"深圳市","createtime":1486540997349,"custusercount":0,"distance":0,"goodsradio":53,"latitude":22.539,"longitude":113.929469,"merchid":30000002,"status":10,"store36id":"evu4i","storeaddr":"南山桃园路1号","storeface":"0m2cn2bfu5044ogumj1nql0b68.jpg","storeid":25000002,"storeimgs":"65b4ee97t7o0knu3102dl6o032.jpg;54pkqdchls3mqmt8ctff0bufor.jpg","storeman":"张生","storename":"尚美酒店桃园测试点"}],"total":2}
        this.http.httpMethodContext(HttpUrl.searchShop, dataParams, function (res, context) {
            context.shop_list = res.rows;
            // context.fistNews.title = res.title;
            // context.fistNews.url = res.newsurl;
        }, this);
    };
    SearchShopPage.prototype.addToHistorys = function (shop_name) {
        var included = false;
        for (var _i = 0, _a = this.historys; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item === shop_name) {
                included = true;
                break;
            }
        }
        if (!included) {
            this.historys.push(shop_name);
        }
    };
    SearchShopPage.prototype.searchBarFocus = function () {
        this.initHistory();
        // this.historyShow = false;    
    };
    SearchShopPage.prototype.getShopDetails = function (item) {
        item.followed = false;
        this.navCtrl.push('ShopDetailsPage', item);
    };
    SearchShopPage = __decorate([
        Component({
            selector: 'page-search-shop',
            templateUrl: 'search-shop.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, ViewController, HttpGet])
    ], SearchShopPage);
    return SearchShopPage;
}());
//# sourceMappingURL=search-shop.js.map