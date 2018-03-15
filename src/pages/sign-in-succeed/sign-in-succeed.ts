import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SignInSucceedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sign-in-succeed',
  templateUrl: 'sign-in-succeed.html',
})
export class SignInSucceedPage {
gift_img = 'assets/img/qd_imge_tishi@2x.png';
signSucc;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.signSucc=this.navParams.get('awarddetail');
    if(typeof(this.navParams.get('awarddetail')=='undefined') || this.navParams.get('awarddetail')==''){
      this.signSucc='恭喜签到成功'
    }else{
      this.signSucc=this.navParams.get('awarddetail')
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInSucceedPage');
  }

  presentProfileModal() {
    
        this.navCtrl.pop();
      }


}
