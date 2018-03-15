import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
/*
  Generated class for the PrivilegeModaldule page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-privilege-modaldule',
  templateUrl: 'privilege-modaldule.html'
})
export class PrivilegeModaldulePage {
  Item;
  contents;
  file_names;
  jdquan1 = false;
  jdquan2 = false;
  jdquan3 = false;
  xfquan1 = false;
  xfquan2 = false;
  xfquan3 = false;
  jindian = false;
  xiaofei = false;
  erweimaImg: any;
  erweima = 'assets/img/{16CF1D4C-D926-45A2-AE0C-3EB13BFF0EEB}.png';
  qishitime;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, ) {
    this.Item = this.navParams.data;
    this.contents = 'YHK' + this.navParams.data.cardid;
    this.file_names = 'youhuika' + this.navParams.data.cardid + '.png';
    console.log('itme===='+this.Item.promotionCard.starttime);
    console.log('6666')

    if (this.Item.promotionCard.fluxpkgid2 == 0 || this.Item.promotionCard.fluxPackage2 == undefined) {
      this.jdquan1 = true;
    } else {
      this.jdquan1 = false;
    }

    if(this.Item.promotionCard.cashvalue2==undefined || this.Item.promotionCard.cashvalue2==0){
      this.jdquan2=true;
    }else{
       this.jdquan2=false;
    }
   
    if(this.Item.promotionCard.voicetimes2==undefined || this.Item.promotionCard.voicetimes2==0){
      this.jdquan3=true;
    }else{
      
       this.jdquan3=false;
    } 
    if (this.jdquan1 == true && this.jdquan2 == true && this.jdquan3 == true) {
      this.jindian = true;
    } else {
      this.jindian = false;
    }
    // // /////////////////////////
    if (this.Item.promotionCard.fluxpkgid3 == 0 || this.Item.promotionCard.fluxPackage3 == undefined) {
      this.xfquan1 = true;
    } else {
      this.xfquan1 = false;
    }

    if(this.Item.promotionCard.cashvalue3==undefined || this.Item.promotionCard.cashvalue3==0){
      this.xfquan2=true;
    }else{
       this.xfquan2=false;
    }

    if(this.Item.promotionCard.voicetimes3==undefined || this.Item.promotionCard.voicetimes3==0){
      this.xfquan3=true;
    }else{
       this.xfquan3=false;
    }
    if (this.xfquan1 == true && this.xfquan2 == true && this.xfquan3 == true) {
      this.xiaofei = true;
    } else {
      this.xiaofei = false;
    }
    console.log(this.Item);
    // console.log(this.contents);
    // console.log(this.file_names);
    
    if(this.Item.promotionCard.starttime==0 || this.Item.promotionCard.endtime==0){
      this.qishitime = '长期有效';
    }{
      let newDate1: any = new Date();
        newDate1.setTime(this.Item.promotionCard.starttime);
        let start = newDate1.format('yyyy-MM-dd');
        let newDate2: any = new Date();
        newDate2.setTime(this.Item.promotionCard.endtime);
        let end = newDate2.format('yyyy-MM-dd');
        this.qishitime=end
    }
    
        
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrivilegeModaldulePage');
   // this.sale();
  }


   judge(data){
      if(typeof(data)=='undefined' || data==0){
        return false;
      }else{
        return true;
      }
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
