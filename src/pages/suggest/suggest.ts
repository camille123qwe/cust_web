import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { HttpContents, HttpUrl, constVar } from '../../common/global';
import { HttpGet } from '../../providers/http-get';

/**
 * Generated class for the SuggestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-suggest',
  templateUrl: 'suggest.html',
})
export class SuggestPage {
  userid;
  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HttpGet,public alertCtrl:AlertController) {
     this.userid = localStorage.getItem('custuserid');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuggestPage');
  }

  submmit(suggestion,userid){
    if(suggestion.length==0){
      let alert = this.alertCtrl.create({
        subTitle: "请输入反馈内容",
        buttons: ['确定']
        });
        alert.present();

    }else{
       let dataParams = {
      "bean": {
        "content": suggestion,
        "userid": userid,
        "usertype": 10,
      }
    }

    this.http.httpMethodContext(HttpUrl.retroaction, dataParams , function (res,context) {
      if(res.retcode==0){
       let alert = context.alertCtrl.create({
        subTitle: "反馈成功",
        buttons: ['确定']
        });
        alert.present();
        context.navCtrl.pop();
      }
    },this);
    console.log("suggestion_text=="+suggestion);
    }
   
  }
}
