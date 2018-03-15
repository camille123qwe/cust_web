import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Navbar } from 'ionic-angular';
import { HttpContents, HttpUrl, constVar,backButtonClick } from '../../common/global';

/**
 * Generated class for the FluxGiveSuccessPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-flux-give-success',
  templateUrl: 'flux-give-success.html',
})
export class FluxGiveSuccessPage {

  needlogin:boolean;
  mobile:string;
  custuserid:string;
  mvalue:string;
  custusername:string;
  commonkbs:string;
  @ViewChild(Navbar) navBar: Navbar; 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FluxGiveSuccess');
    this.custusername = localStorage.getItem("custusername");
     this.needlogin = this.navParams.get('needlogin');
     this.mobile = this.navParams.get('mobile');
     this.mvalue = this.mobile.replace(/\D/g, '');
     this.commonkbs =  this.navParams.get('commonkbs');
    // this.navBar.backButtonClick = backButtonClick; 
  }

//  fenxiang() {
//     (<any>window).Cordova.exec((res) => {
//     }, (err) => { showToast('分享失败'); },
//       "RyzShare", "share",
//       [{
//         "shareButtonLabe": "分享",
//         "cancelButtonLabel": "取消",
//         "shareTitle": "分享内容",
//         "title": '您的好友为您的账户充值了'+this.commonkbs+'流量，快下载店呼领取吧',
//         "text": '更多惊喜等你来拿',
//         "url":'http://merch.diancall.com/modules/share/sharegive/sharegive.html?mobile='+this.mvalue+'?custusername='+this.custusername+"?end"+"?commonkbs="+this.commonkbs,
//       }]);
//   }
}
