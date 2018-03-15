import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpContents, HttpUrl,saveLoginInfo } from '../../common/global';
import { GlobalProvider }from '../../providers/global-provider';
import { md5 } from '../../common/md5';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the ChangePasswordsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-change-passwords',
  templateUrl: 'change-passwords.html',
})
export class ChangePasswordsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpGet,public globalProvider: GlobalProvider, public alertCtrl: AlertController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }
  submmit(old_psw, new_psw, confirm_psw) {
    if (new_psw == confirm_psw) {
      let dataParams = {
        bean: {
          oldpwd: md5(old_psw),
          newpwd: md5(new_psw)
        }
      }
      this.http.httpMethodContext(HttpUrl.changePassword, dataParams, function (res,context) {
        debugger;
        if (res.retcode == 0) {
          let alert = context.alertCtrl.create({
            subTitle: "密码修改成功！",
            buttons: ['确定']
            });
            alert.present();
          saveLoginInfo(res);
          context.navCtrl.pop();
        } else {
          let alert=context.alertCtrl.create({
            title:res.retinfo,
            buttons:['确定']
          })
          alert.present();
        }

      },this);
    }
  }

}
