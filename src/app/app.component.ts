import { Component,ViewChild } from '@angular/core';
import { Platform,Navbar ,App} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { initNative, initData, globalVar, initFunction, isLogin, HttpUrl, constVar ,isHistoryBack} from '../common/global';
import { TabsPage } from '../pages/tabs/tabs';
import { HttpGet } from '../providers/http-get';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private http: HttpGet,public app:App) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.init();
    });
  }

  init() {
    if (globalVar.isDevice) {
      (<any>window).navigator.splashscreen.hide();
      initNative();
    }
    initFunction();
    isHistoryBack();

    //this.getBanners();

}
// getBanners() {
//   this.http.httpMethodContext(HttpUrl.welcomeImgs, {bean: { status: [10], type: 10 }}, (res, context) => {

//     for (let i = 0; i < res.length; i++) {
//       globalVar.welcomeImgs[i] = constVar.welcome_url + res[i]['imgsrc'];
//     }
//     console.log('welcomeImgs res==' + globalVar.welcomeImgs);

//   }, this);

// }
}

