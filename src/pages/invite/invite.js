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
export var InvitePage = (function () {
    function InvitePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ponits = "20";
        this.file_name = 'invite_qrcode.png';
        this.invite_code = localStorage.getItem('custuser36id').toString().toUpperCase();
        console.log('this.invite_code==' + this.invite_code);
        // this.qrcode = 'assets/img/icon_erweima@2x.png';
        // this.qrcode = 'file:///data/data/com.redyouzi.diancall.cust/cache/tmp_mmexport1486105139376-560116172.jpg';
        this.createCode();
    }
    InvitePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad InvitePage');
    };
    InvitePage.prototype.createCode = function () {
        // BarcodeScanner.encode('TEXT_TYPE', this.invite_code).then((res) => {
        //   this.qrcode = res.file;
        var _this = this;
        // }, (err) => {
        //   console.log(err);
        // });
        window.Cordova.exec(function (res) {
            console.log('qrcode_path==' + res);
            _this.qrcode = res;
        }, function (err) { alert('二维码生成失败'); }, "BarcodeScanner", "encode", [{ "type": "PHONE_TYPE", "desString": this.invite_code, "fileName": this.file_name }]);
        //扫描二维码
        // BarcodeScanner.scan().then((barcodeData) => {
        //   // Success! Barcode data is here
        //   alert(barcodeData.text );
        // }, (err) => {
        //   // An error occurred
        //   alert('扫描失败');
        // });
    };
    InvitePage = __decorate([
        Component({
            selector: 'page-invite',
            templateUrl: 'invite.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams])
    ], InvitePage);
    return InvitePage;
}());
//# sourceMappingURL=invite.js.map