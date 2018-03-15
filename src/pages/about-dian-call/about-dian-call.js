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
import { NavController, NavParams } from 'ionic-angular';
export var AboutDianCallPage = (function () {
    function AboutDianCallPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.logoSrc = "assets/img/gydh_logo@2x.png";
        this.introduction = "深圳市红柚子科技有限公司坐落于深圳市南山高新技术产业园区，是一家专业的通讯与互联网技术应用解决方案提供商和服务商，致力于为企业提供面向其用户的移动互联网营销通讯服务，公司核心团队来自于腾讯 .阿里.华为等一流的互联网通讯公司。通过数年积累，累积服务10000+企业商家，服务用户超过100，000，000+人。红柚子科技不仅对产品有较深设计能力以及运营服务经验，对通信、互联网行业具有深刻理解，并具有较强的技术、应用、模式创新能力，是一支追求 “服务、 创新、完美 ” 的专业化互联网运营团队。";
    }
    AboutDianCallPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AboutDianCallPage');
    };
    AboutDianCallPage = __decorate([
        Component({
            selector: 'page-about-dian-call',
            templateUrl: 'about-dian-call.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams])
    ], AboutDianCallPage);
    return AboutDianCallPage;
}());
//# sourceMappingURL=about-dian-call.js.map