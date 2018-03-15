import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { md5 } from '../../common/md5';
import { HttpGet } from '../../providers/http-get';
import { URLSearchParams } from '@angular/http';
import { HttpContents, HttpUrl, showToast, saveLoginInfo, changeCodeBtn } from '../../common/global';
// import { ConnectYZX } from '../../providers/connect-yzx';
import { GlobalProvider } from '../../providers/global-provider';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';

@IonicPage()
@Component({
	selector: 'page-register',
	templateUrl: 'register.html'
})
export class RegisterPage {
	code_css = 'btnVerify';
	code_txt = '获取验证码';
	code_disable = false;

	constructor(public navCtrl: NavController, public globalProvider: GlobalProvider, public navParams: NavParams, private http: HttpGet, public alertCtrl: AlertController) { }

	ionViewDidLoad() {
		console.log('ionViewDidLoad RegisterPage');
	}

	getVerifyCode(register_phone) {
		if (register_phone.toString().length != 11) {
			showToast("手机号码不正确");
			return;
		}

		changeCodeBtn(this);
		
		let dataParams = {
			mobile: register_phone
		}
		let url = HttpUrl.smsRegisterCode + "mobile:" + register_phone;

		this.http.httpMethodContext(url, {}, function (res, context) {

			// showToast(res.retinfo);
			if (res.retcode == 0) {
				showToast("验证码发送成功！");
			} else {
				let alert = context.alertCtrl.create({
					title: res.retinfo,
					buttons: ['确定'],
				})
				alert.present();
			}

		}, this);
	}

	register(register_phone, verify_code, username) {
		let dataParams = {
			bean: {
				mobile: register_phone,
				// password: md5(register_psw),
				// apptoken: HttpContents.device_id,
				vercode: verify_code,
				// appos: HttpContents.appos,
				agent: HttpContents.app_agent,
				username: username,
				// "storeid": 所属门店ID,saleuserid	int	所属导购员工ID，为0表示无导购邀请
				// pcid	long	邀请的用户ID
				//以上两个id根据邀请码长度来选择传哪个
				// 为0表示不属于任何门店,
				// "corpuserid": 所属导购员工ID， 为0表示无导购邀请,
				// "pcid ": 邀请的用户ID,
				// "remark": 备注,
				// "cacheday": 登录信息缓存天数， APP默认值： 1000
			}
		}

		this.http.httpMethodContext(HttpUrl.smsRegister, dataParams, function (res, context) {

			if (res.retcode == 0) {
				console.log("注册成功！");
				saveLoginInfo(res);
				context.navCtrl.popToRoot();
				// context.connect.connectYZX();

			} else {
				let alert = context.alertCtrl.create({
					title: res.retinfo,
					buttons: ['确定'],
				})
				alert.present();
			}

		}, this);

	}

}
