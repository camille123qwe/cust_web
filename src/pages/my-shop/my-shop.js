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
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpUrl, showToast, globalVar, constVar } from '../../common/global';
import { ShopDetailsPage } from '../shop-details/shop-details';
import { SearchShopPage } from '../search-shop/search-shop';
export var MyShopPage = (function () {
    function MyShopPage(navCtrl, navParams, alertCtrl, http, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.modalCtrl = modalCtrl;
        this.searchInput = "";
        this.shouldShowCancel = true;
        this.img_class = 'small_img_class';
        this.familar_shops = { rows: [], offset: 0, total: 0 }; //常去的店
        this.recently_shops = { rows: [], offset: 0, total: 0 }; //附近的店
        this.storefaceurl_300 = constVar.storefaceurl_300;
        this.tab1_class = "text-actived";
        this.tab2_class = "text-off";
        this.type = 'left';
        // this.useful_list = [{ img: "assets/img/ly_imge@2x.png", header: "云朵踢馆那英 只因她曾经讽刺刀郎歌太俗", content: "百度视频", time: "12-21" ,address:"南山区"},
        // { img: "assets/img/ly_imge@2x.png", header: "云朵踢馆那英 只因她曾经讽刺刀郎歌太俗", content: "百度视频", time: "12-21" },];
    }
    MyShopPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MyShopPage');
    };
    MyShopPage.prototype.ionViewDidEnter = function () {
        this.getData();
    };
    MyShopPage.prototype.search = function (event) {
        var modal = this.modalCtrl.create(SearchShopPage);
        // modal.onDidDismiss(data => {
        //   let params = data.shop;
        //   if (typeof (params) !== 'undefined') {
        //   }
        // });
        modal.present();
    };
    MyShopPage.prototype.getData = function () {
        this.getFamilar();
        // this.getRecently();
    };
    MyShopPage.prototype.getFamilar = function () {
        var dataParams = {
            // "bean": {
            // },
            "flipper": {
                offset: this.familar_shops.offset,
            }
        };
        this.http.httpMethodContext(HttpUrl.shopFamiliar, dataParams, function (res, context) {
            // {"buycount":1000,"custstoreid":"3b2ozm-evu4h","custuserid":200000002,"followtime":1487143706688,"forbidtime":0,"pushtype":10,"saleuserid":0,"store":{"city":"深圳市","costfluxkbs":0,"costmoney":0,"costvoicetimes":0,"createtime":1486536440817,"custusercount":1,"distance":0,"goodscount":0,"goodsradio":53,"latitude":22.549255,"longitude":113.965406,"merchid":30000002,"msmscount":0,"quancount":0,"status":10,"store36id":"evu4h","storeaddr":"尚美科技大厦","storeface":"31jtp1r2q2qpemjs2lu1pbm8rk.jpg","storeid":25000001,"storeimgs":"0dagdrsqgir58uhasalqekobv7.jpg;32pieg7vapl8hu3vlie3pm2k2n.jpg;7v2n59ma8ujddp7741u4q20pv8.jpg","storeman":"张生","storename":"尚美酒店大冲测试点"},"storeid":25000001,"weight":1000}
            context.familar_shops.total = res.total;
            if (context.familar_shops.offset === 0) {
                context.familar_shops.rows = res.rows;
                console.log('hhhh==' + JSON.stringify(context.familar_shops.rows));
            }
            else {
                for (var _i = 0, _a = res.rows; _i < _a.length; _i++) {
                    var item = _a[_i];
                    context.familar_shops.rows.push(item);
                }
            }
        }, this);
    };
    MyShopPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        setTimeout(function () {
            console.log('加载更多');
            switch (_this.type) {
                case 'left':
                    if (_this.familar_shops.offset < _this.familar_shops.total) {
                        _this.familar_shops.offset += 20;
                        _this.getFamilar();
                    }
                    break;
                case 'right':
                    if (_this.recently_shops.offset < _this.recently_shops.total) {
                        _this.recently_shops.offset += 20;
                        _this.getRecently();
                    }
                    break;
                default:
                    showToast('没有更多了...');
                    break;
            }
            infiniteScroll.complete();
        }, 500);
    };
    MyShopPage.prototype.getRecently = function () {
        var dataParams = {
            "bean": {
                longitude: globalVar.location.longitude,
                latitude: globalVar.location.latitude,
                city: globalVar.location.city
            },
            "flipper": {
                offset: this.recently_shops.offset,
            }
        };
        this.http.httpMethodContext(HttpUrl.shopNearby, dataParams, function (res, context) {
            context.recently_shops.total = res.total;
            if (context.recently_shops.offset === 0) {
                context.recently_shops.rows = res.rows;
            }
            else {
                for (var _i = 0, _a = res.rows; _i < _a.length; _i++) {
                    var item = _a[_i];
                    context.recently_shops.rows.push(item);
                }
            }
        }, this);
    };
    MyShopPage.prototype.selectedLeft = function () {
        this.type = 'left';
        this.tab1_class = "text-actived";
        this.tab2_class = "text-off";
        this.familar_shops = { rows: [], offset: 0, total: 0 };
        this.getFamilar();
    };
    MyShopPage.prototype.selectedRight = function () {
        this.type = 'right';
        this.tab1_class = "text-off";
        this.tab2_class = "text-actived";
        this.recently_shops = { rows: [], offset: 0, total: 0 };
        this.getRecently();
    };
    MyShopPage.prototype.onClickUnFolow = function (item) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: '门店关注',
            message: '是否取消关注?',
            buttons: [
                {
                    text: '确定',
                    handler: function () {
                        console.log('agree clicked');
                        _this.unFollow(item);
                    }
                },
                {
                    text: '取消',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                }
            ]
        });
        confirm.present();
    };
    MyShopPage.prototype.unFollow = function (item) {
        var url = HttpUrl.unfollowShop + item.store36id; //#	int	门店36ID
        this.http.httpMethodContext(url, {}, function (res, context) {
            showToast('取消关注成功');
        }, this);
    };
    MyShopPage.prototype.getShopDetails = function (item) {
        item.followed = true;
        this.navCtrl.push(ShopDetailsPage, item);
    };
    MyShopPage = __decorate([
        Component({
            selector: 'page-my-shop',
            templateUrl: 'my-shop.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams, AlertController, HttpGet, ModalController])
    ], MyShopPage);
    return MyShopPage;
}());
//# sourceMappingURL=my-shop.js.map