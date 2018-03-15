import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpContents, HttpUrl, showToast } from '../../common/global';
import { HttpGet } from '../../providers/http-get';
import { TabsPage } from '../tabs/tabs';
import { GlobalProvider } from '../../providers/global-provider';
/**
 * Generated class for the SetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-set',
  templateUrl: 'set.html',
})
export class SetPage {
 customer_service_number: string = '0755-8666-5265';
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private http: HttpGet, public globalProvider: GlobalProvider) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetPage');
  }
  goNextPage(type) {
    let nextPage;
    switch (type) {
      case 'changePhone':
        nextPage = 'ChangePhonenumPage';
        break;
      case 'changeParssword':
        nextPage = 'ChangePasswordsPage';
        break;
      case 'suggestions':
        nextPage = 'SuggestPage';
        break;
      case 'aboutDianCall':
        nextPage = 'AboutDianCallPage';
        break;
      default:
        break;
    }
    this.navCtrl.push(nextPage);
  }
  clearCache() {
    let confirm = this.alertCtrl.create({
      title: '缓存',
      message: '是否清除缓存?',
      buttons: [
        {
          text: '确定',
          handler: () => {
            console.log('agree clicked');
          }
        },
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        }
      ]
    });
    confirm.present();

  }
  logout() {
    let confirm = this.alertCtrl.create({
      title: '确定退出登录？',
      buttons: [
        {
          text: '确定',
          handler: () => {
            console.log('111')
            this.http.httpMethod(HttpUrl.logout, {}, () => {

            console.log('222')

              localStorage.removeItem('custuserid');
              localStorage.removeItem('loginToken');
              localStorage.removeItem('custuser36id');
              localStorage.removeItem('skipLogin');

              this.navCtrl.push(TabsPage);
              showToast("退出登录成功！");
              console.log('退出登录成功！');
            });
          }
        },
        {
          text: '取消',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }

}
