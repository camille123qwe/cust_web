import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import * as $ from 'jquery';
import { HttpUrl, showToast, constVar, globalVar, isLogin, goLogin } from '../../common/global';
import { HttpGet } from '../../providers/http-get';



@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {
  grid = [];
  unm = 0;
  days = 0;
  jihui = 0;
  gift_img = 'assets/img/icon_weiqiandao@2x.png';
  gift_img1 = 'assets/img/icon_yiqiandao@2x.png';
  money_img = 'assets/img/icon_fenxiangsong@2x.png';
  giftName = [];
  gifImg=[];
  shareShw:boolean;
  shearArr = [];
  distanceShow:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpGet, public modalCtrl: ModalController, public alertCtrl: AlertController) {
    this.cdaward()
    this.fenxiang();
  }

  cdaward() {
    console.log(666)
    let data = {
      'bean': {
        status: [10]
      }
    }
    this.http.httpMethodContext(HttpUrl.cdaward, data, (res, context) => {
      console.log('奖品' + JSON.stringify(res));
      for (let item of res.rows) {

        context.giftName.push(item.awarddetail);
        context.gifImg.push(item.imgsrc)

      }
      console.log('xxx==' + JSON.stringify(context.giftName));
    }, this)
  }
  mycdrcount() {
    this.http.httpMethodContext(HttpUrl.mycdrcount, {}, (res, context) => {
      this.jihui = res.restcdrcount
    }, this)
  }
  ionViewDidLoad() {
    this.mycheckinfo();
    this.giftList();
    this.mycdrcount();

  }
  ionViewDidEnter() {
    this.mycheckinfo();
    this.mycdrcount();
  }
  mycheckinfo() {
    console.log(666)
    this.http.httpMethodContext(HttpUrl.mycheckinfo, {}, (res, context) => {
      console.log('res===' + JSON.stringify(res))
      this.days = res.dutys;
      let src = { 'src_img': this.gift_img };
      let src1 = { 'src_img': this.gift_img1 };
      let item = []
      for (let k = 0; k < 30; k++) {
        if (this.days > k) {
          item.push(src1);
        } else {
          item.push(src);
        }

      }
      for (let i = 0; i < 5; i++) {
        this.grid[i] = [];
        for (let j = 0; j < 6; j++) {
          this.grid[i].push(item.shift())
        }
      }
    }, this)
  }
  giftList() {
    this.http.httpMethodContext(HttpUrl.giftList, {}, (res, context) => {

    }, this)
  }
  qiandao() {

    // qiandao
    let data = {
      'bean': {
        custuserid: localStorage.getItem("custuserid"),//		long	C端用户ID
      }
    }
    this.http.httpMethodContext(HttpUrl.qiandao, data, (res, context) => {
      if (res.retcode == 0) {
        console.log(res.awarddetail)

        let myModal = context.modalCtrl.create('SignInSucceedPage', { awarddetail: res.awarddetail });
        myModal.present();
        context.mycheckinfo();
      }
       else {
        let alert = context.alertCtrl.create({
          title: res.retinfo,
          buttons: ['确定']
        })
        alert.present();
      }
    }, this)
  }

  presentPrompt() {
    let myModal = this.modalCtrl.create('RewardRulesPage');
    myModal.present();
  }
  goTurntable() {
    // let giftNames = ["全国流量500M", "0分钟通话", "全国流量30", "猪肉丝"]
    // let gif=["10000001", "10000002", "10000003", "10000004", "10000005", "10000006",]
    this.navCtrl.push('TurntablePage', { 'gift': this.giftName, 'restcdrcount': this.jihui })
  }

  fenxiang() {
   
    // let data = {
    //   'bean': {
    //     lontitude: 0,
    //     latitude: 0
    //   }
    // }
    // this.http.httpMethodContext(HttpUrl.sin_recently, data, (res, context) => {
    //   if(res.result.length==0 ||　res.result =='' || typeof(res.result)=='undefined'){
    //     context.shareShw=false;
    //   }else{
    //     context.shareShw=true;
    //   }
    //   for(let item of res.result){
    //     item.storeInfo.distance>0?context.distanceShow=true:context.distanceShow=false;

    //     if (item.storeInfo.distance == 0) {
    //       item.storeInfo.distance = 100 + "km";
          
    //     } else if (item.storeInfo.distance <= 1000) {

    //       item.storeInfo.distance = "<" + 10 + "m";
         
    //     } else if (item.storeInfo.distance >= 100000) {

    //       item.storeInfo.distance = Math.floor(item.storeInfo.distance / 1000) / 100 + "km"

    //     } else {

    //       item.storeInfo.distance = Math.floor(item.storeInfo.distance / 100) + "m";

    //     }


    //     item.shreaGift='';
    //     if(item.cashvalue==0 || typeof(item.cashvalue)=='undefined'){
    //       if(item.fluxpkgid==0 || typeof(item.fluxpkgid)=='undefined' || item.fluxPackage=='' || typeof(item.fluxPackage)=='undefined' || item.fluxPackage.ydfluxkbs==0 || typeof(item.fluxPackage.ydfluxkbs)=='undefined'){
    //         item.shreaGift='分享即送'+item.voicetimes/60+'分钟免费通话'
    //       }else{
    //         item.shreaGift='分享即送'+item.fluxPackage.ydfluxkbs/1024+'M流量'
    //       }
    //     }else{
    //       item.shreaGift='分享领取'+item.cashvalue/100+'代金券'
    //     }


    //   }
    //   context.shearArr = res.result

    // }, this)
  }

  shera(item) {
    // item.followed = false;
    this.navCtrl.push('ShopDetailsPage', item);
    console.log('asdasasd' + JSON.stringify(item));
  }

}
