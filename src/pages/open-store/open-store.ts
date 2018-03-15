import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, Platform,Navbar } from 'ionic-angular';
import { backButtonClick} from '../../common/global';

@IonicPage()
@Component({
  selector: 'page-open-store',
  templateUrl: 'open-store.html',
  //providers: [InAppBrowser]
})
export class OpenStorePage {
  logoSrc = "assets/img/logo_imge_1@2x.png";
  isIOS = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private plt: Platform, ) {
    this.isIOS = plt.is('ios');
    console.log('this.isIOS==' + this.isIOS);
  }

  @ViewChild(Navbar) navBar: Navbar; 
  
  ionViewDidLoad() {
      //this.navBar.backButtonClick = backButtonClick;
  }
  download() {
    // this.plt.ready().then(() => {        private iab: InAppBrowser
    //   if (this.isIOS) {
    //     console.log('ios download');
    //     const browser = this.iab.create('https://itunes.apple.com/cn/app/%E5%BA%97%E5%91%BC%E5%95%86%E5%AE%B6%E7%89%88/id1214778528?mt=8', '_system');
    //   } else {
    //     console.log('android download');
    //     const browser = this.iab.create('http://b.diancall.com/app/android/diancall-merch.apk', '_system');

    //   }
    // });
    location.href = "http://b.diancall.com/app/dl/appdl.html";

  }
}
