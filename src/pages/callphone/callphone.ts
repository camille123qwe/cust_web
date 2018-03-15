import { Component } from '@angular/core';
import { NavController, NavParams,App } from 'ionic-angular';

/**
 * Generated class for the CallphonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-callphone',
  templateUrl: 'callphone.html',
})
export class CallphonePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CallphonePage'+location.href);
  }

  go_test(){

    console.log("执行了这个方法=====");
     //判断用户有没有登录
    // let custuserid = localStorage.getItem('custuserid');
    // //如果没有登录直接进入登录界面
    //   if (custuserid == null || custuserid === 'undefined') {
    //     console.log('未登录');
    //     // this.navCtrl.push('LoginPage', {});
    //     this.app.getRootNav().push('LoginPage');
    //     return false;
    //   }else{
        //如果登录就直接进入电话页面
       // this.app.getRootNav().push('TextPage');
       location.href = "http://c.diancall.com/app/dl/appdl.html"
     //}
  }

}
