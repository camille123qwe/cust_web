import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { QRCodeModule } from 'angular2-qrcode';

@Component({
  selector: 'page-time-limit-alert',
  templateUrl: 'time-limit-alert.html'
})
export class timeLimitAlertPage {
  pageData;
  contents;
  file_names;
  erweimaImg: any;
  validDay;
  limit = true;
  yifu;
  dingjin: boolean;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, ) {
    console.log("data===" + JSON.stringify(this.navParams.data));
    this.pageData = this.navParams.data;
    // this.validDay=this.navParams.data.validday2;
    
    this.contents = 'QG' + this.navParams.data.goodsRushRecord.recordid;
    this.file_names = 'xianShiQiangGou' + this.navParams.data.goodsRush.rushid + '.png';
      
//  this.contents = 'QG' + this.navParams.data.goodsRush.rushid;
//  this.file_names = 'xianShiQiangGou' + this.navParams.data.goodsRush.rushid + '.png';
    console.log(this.contents)

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PrivilegeModaldulePage');
    let newDate1: any = new Date();
    newDate1.setTime(this.pageData.goodsRush.validstarttime);
    let start = newDate1.format('yyyy-MM-dd');
    let newDate2: any = new Date();
    newDate2.setTime(this.pageData.goodsRush.validendtime);
    let end = newDate2.format('yyyy-MM-dd');
    this.validDay = start + "—" + end;
    console.log('endtime===' + this.pageData.goodsRush.validstarttime);
    let today = new Date().getTime();
    if (this.pageData.goodsRush.validstarttime > today) {
      this.limit = false;
    }

    let RushSellprice = this.pageData.goodsRush.sellprice;
    let RushCheckmoney = this.pageData.goodsRushRecord.checkmoney;
    let statu = this.pageData.goodsRushRecord.status;
    if (statu == 40) {
      this.dingjin = true;
      this.yifu = '已退货'
    } else {
      if (RushCheckmoney == 0) {
        this.dingjin = false;
      } else {
        this.dingjin = true;
        if (RushSellprice > RushCheckmoney) {
          this.yifu = "已付定金 : ￥" + ((RushCheckmoney) / 100);
        } else if (RushSellprice == RushCheckmoney) {
          this.yifu = '已付全款'
        } else {
          this.dingjin = false;
        }
      }
    }
      // this.sale();
  }
  present(event) {
    //点击阴影部分推出此页面
    let target = event.target || event.srcElement;
    if (typeof target.attributes["class"] != 'undefined') {
      if (target.attributes["class"].nodeValue != 'model') {
        this.navCtrl.pop();
      }
    }
  }

  // sale() {
  //   (<any>window).Cordova.exec((res) => {
  //     console.log('qrcode_path==' + res);
  //     this.erweimaImg = res;
  //   }, (err) => { let alerts = this.alertCtrl.create({ title: ' 二维码生成失败', buttons: ["确定"] }); alerts.present(); },
  //     "BarcodeScanner", "encode", [{
  //       "type": "PHONE_TYPE", "desString": this.contents,
  //       "fileName": this.file_names, "hasLogo": "1", "iconPath": "", "size": "200",
  //       "errorRate": "0.3", "color": "#fb6d07"
  //     }]);
  // }



}
