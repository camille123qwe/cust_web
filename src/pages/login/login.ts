import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, App } from 'ionic-angular';
import { md5 } from '../../common/md5';
import { HttpGet } from '../../providers/http-get';
import { URLSearchParams } from '@angular/http';
import { HttpContents, HttpUrl, saveLoginInfo, globalVar, changeCodeBtn } from '../../common/global';
// import { ConnectYZX } from '../../providers/connect-yzx';
import { GlobalProvider } from '../../providers/global-provider';
//import { ForgetPasswordPage } from '../forget-password/forget-password';
import { TabsPage } from '../tabs/tabs';
import { Http } from '@angular/http';
import * as $ from 'jquery';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  logoSrc: string;
  context: this;
  loginAfter;
  login_type = '账号密码登录';
  isByCode = false;
  password_value = '';
  code_value = '';
  imgcode_value = '';
  imgcode;
  phone_value = '';
  code_css = 'btnVerify';
  code_txt = '获取验证码';
  code_disable = false;

  constructor(private toastCtrl: ToastController, public navCtrl: NavController, public globalProvider: GlobalProvider, private app: App,
    public navParams: NavParams, private http: HttpGet, public alertCtrl: AlertController, public _http: Http) {
    this.logoSrc = "assets/img/login_imge.png";
    this.context = this;
    // webview.getSettings().setJavaScriptEnabled(true);
    // webview.getSettings().setBlockNetworkImage(false);
    if (this.navParams.get('later')) {
      this.loginAfter = true;
    } else {
      this.loginAfter = false;
    }
    this.refreshImgcode();
  }
  changeType() {
    if (this.isByCode) {
      this.isByCode = false;
      this.login_type = '短信验证码登录';
    } else {
      this.isByCode = true;
      this.login_type = '账号密码登录';
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }
  refreshImgcode() {
    console.log('refreshImgcode()');
    let url =  HttpUrl.validcodeImg + HttpContents.ip;
    this.imgcode = url+'?'+(new Date()).getTime();
  }
  getVerifyCode() {
    let register_phone = this.phone_value;
    console.log('register_phon==' + register_phone);
    if (register_phone.toString().length != 11) {
      let alert=this.alertCtrl.create({
        title:"手机号码不正确",
        buttons:['确定']
      })
      alert.present();
      return;
    }
    if(this.imgcode_value == ''){
      let alert=this.alertCtrl.create({
        title:"图形验证码不正确",
        buttons:['确定']
      })
      alert.present();
      return;    
    }
    changeCodeBtn(this);

    let dataParams = {
      mobile: register_phone
    }
    let url = HttpUrl.smsRegisterCode + "mobile:" + register_phone + "/ip:" + HttpContents.ip + "/validcode:" + this.imgcode_value;

    this.http.httpMethodContext(url, {}, function (res, context) {

      if (res.retcode == 0) {
        let alert=context.alertCtrl.create({
          title:"验证码发送成功",
          buttons:['确定']
        })
        alert.present();
      } else {
        let alert = context.alertCtrl.create({
          title: res.retinfo,
          buttons: ['确定'],
        })
        alert.present();
      }

    }, this);
  }
  onLogin() {
    globalVar.isbubble = false;
    if (this.isByCode) {
      this.loginByCode(this.phone_value, this.code_value);
    } else {
      this.loginByPsw(this.phone_value, this.password_value);
    }
  }

  loginByCode(register_phone, verify_code) {
    console.log('loginByCode()');
    let dataParams = {
      bean: {
        mobile: register_phone,
        // password: md5(register_psw),
        // apptoken: HttpContents.device_id,
        vercode: verify_code,
        // appos: HttpContents.appos,
        agent: HttpContents.app_agent,
        // username: username,
        // "storeid": 所属门店ID,saleuserid  int  所属导购员工ID，为0表示无导购邀请
        // pcid  long  邀请的用户ID
        //以上两个id根据邀请码长度来选择传哪个
        // 为0表示不属于任何门店,
        // "corpuserid": 所属导购员工ID， 为0表示无导购邀请,
        // "pcid ": 邀请的用户ID,
        // "remark": 备注,
        // "cacheday": 登录信息缓存天数， APP默认值： 1000
      }
    }

    this.http.httpMethodContext(HttpUrl.smsRegister, dataParams, this.onSuccess, this);

  }

  goForgetPassword() {
    this.navCtrl.push('ForgetPasswordPage', {});
  }
  goRegisterPage() {
    //this.app.getRootNav().setRoot('RegisterPage');
    this.navCtrl.push('RegisterPage')
  }

  onSuccess(res, context) {
    if (res.retcode == 0) {
      saveLoginInfo(res);
      console.log("登录成功！");
      if (context.loginAfter) {
        context.isFirstIn = true;
        // context.navCtrl.popToRoot();
        // context.app.getRootNav().first();
        let alert = context.alertCtrl.create({
          title: "登录成功",
          buttons: ['确定']
        })
        alert.present();
        console.log('后登陆');
        context.navCtrl.pop();
      } else {
        context.app.getRootNav().setRoot(TabsPage);
        console.log('前登陆');
      }

      // context.connect.connectYZX();
    } else {
      let alert = context.alertCtrl.create({
        title: res.retinfo,
        buttons: ['确定']
      })
      alert.present();

    }
  }


  // presentToast(mag) {
  //   let toast = this.toastCtrl.create({
  //     message: mag,
  //     duration: 2000,
  //     position: 'middle'
  //   });
  //   toast.present();
  // }


  loginByPsw(phone, password) {
    console.log('loginByPsw()');
    let dataParams = {
      "bean": {
        "account": phone,
        "password": md5(password),
        "apptoken": HttpContents.device_id,
        // "cacheday": 登录信息缓存天数， APP默认值： 1000,
        "netmode": HttpContents.netmode,
        "appversion": HttpContents.app_version,
        "appos": HttpContents.appos + '/' + HttpContents.device_version
      }
    }

    this.http.httpMethodContext(HttpUrl.login, dataParams, this.onSuccess, this.context);
  }
  onClickTopRight() {
    localStorage.setItem('skipLogin', 'true');
    this.app.getRootNav().setRoot(TabsPage);
  }
  phoneChange() {
    this.phone_value = this.phone_value.replace(/^\s+|\s+$/g,"");
  }
}
