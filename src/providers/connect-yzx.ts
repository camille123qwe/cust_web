import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { HttpGet } from './http-get';
import { HttpContents, HttpUrl } from '../common/global';

@Injectable()
export class ConnectYZX {

  constructor(public http: HttpGet,public alertCtrl: AlertController) {
    console.log('Hello ConnectYZX Provider');
  }
  /*
   * 获取token
   */
  connectYZX() {
    let local_token = localStorage.getItem('loginToken');
    if (local_token != null && local_token != 'undefined') {
      this.connect(local_token);
    } else {
      console.log("开始获取token");
      this.http.httpMethodContext(HttpUrl.getToken, {}, (data,context) => {
        if (data.retcode == 0) {
          let yzxToken = data.result;
          localStorage.setItem("loginToken", yzxToken);
          console.log('token获取成功==' + yzxToken);
          //连接云之讯，不用判断，重新连接
          context.connect(yzxToken);
        } else {
          let alert = context.alertCtrl.create({
            title: data.retinfo,
            // subTitle: '请输入8-15位有效号码',
            buttons: ['确定'],
          })
    	    alert.present();



          // alert();
          // showToast(res.retinfo);
        }

      },this);
    }

  }

  connect(yzxToken) {
    (<any>window).Cordova.exec(function (res) {

    }, function () { }, "RYZVoip", "connect", [{ "token": yzxToken }]);
  }
}
