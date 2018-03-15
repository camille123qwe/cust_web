import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, App } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpContents, HttpUrl, showToast, globalVar, constVar } from '../../common/global';
import { TabsPage } from '../../pages/tabs/tabs';

/**
 * Generated class for the PaymentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  yu_e = true;
  weixin = false;
  zhifubao = false;
  huodaofukuan = false;
  paystatus1 = true;
  paystatus2 = false;
  paystatus3 = false;
  paystatus4 = false;
  money = 0;
  bankCardCount = 0;
  ordernum = 0;
  bankCardList = [];
  loading;
  isLoading = false;
  storeaddr = false;
  goodsorderid: String;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private http: HttpGet, public modalCtrl: ModalController, public loadingCtrl: LoadingController, public app: App, ) {
    this.goodsorderid = this.navParams.get('custgoodsorderid');
    this.money = this.navParams.get('totalprice');
    console.log( "dd"+this.goodsorderid);
   // this.init();
   
    console.log('PaymentPage==' + JSON.stringify(this.navParams.data));

  }
  // init(){
  //   if(this.navParams.data.type=="bookservice"){
  //      this.money = this.navParams.get('totalprice');
  //   }else{
  //     this.money = this.navParams.get('totalprice');
  //     this.ordernum = this.navParams.get('ordernum');
  //    // this.goodsorderid = this.navParams.data.custgoodsorderid;
  //   }
  //   console.log( this.goodsorderid);
  // }

  // payment2() {
  //   this.paystatus1 = false;
  //   this.paystatus3 = false;
  //   this.paystatus4 = false;
  //   this.paystatus2 = !this.paystatus2;
  //   console.log(this.paystatus2)
  //   if (this.paystatus2 == true) {
  //     this.yu_e = false
  //     this.weixin = true;
  //     this.zhifubao = false;
  //     this.huodaofukuan = false;
  //   } else {
  //     this.yu_e = false;
  //     this.weixin = false;
  //     this.zhifubao = false;
  //     this.huodaofukuan = false;
  //   }

  // }
  payment3() {
    this.paystatus2 = false;
    this.paystatus1 = false;
    this.paystatus4 = false;
    this.paystatus3 = !this.paystatus3;
    console.log(this.paystatus3)
    if (this.paystatus3 == true) {
      this.yu_e = false
      this.weixin = false;
      this.zhifubao = true;
      this.huodaofukuan = false;
    } else {
      this.yu_e = false;
      this.weixin = false;
      this.zhifubao = false;
      this.huodaofukuan = false;
    }

  }
  queding() {


    // console.log(this.paystatus1)
    // if (this.yu_e == true && this.paystatus1 == true) {
    //   console.log('我选择银行卡快捷支付');

    //   if (this.bankCardCount > 0) {
    //     let obj = { orderInfo: this.navParams.data, cardList: this.bankCardList }
    //     this.navCtrl.push('UnionPayPage', obj);
    //   } else {
    //     let myModal = this.modalCtrl.create('PromptModalPage', this.navParams.data);
    //     myModal.present();
    //   }

    // } else if (this.weixin == true && this.paystatus2 == true) {
    //   console.log('我选择微信支付');
    //   //this.weChatPay();
    // } else if (this.zhifubao == true && this.paystatus3 == true) {
    //   console.log('我选择支付宝');
    //   this.zhifubaopay()

    // } else if (this.huodaofukuan == true && this.paystatus4 == true) {
    //   console.log('我选择货到付款');
    //   // this.daofu();
    // } else {
    //   this.zhifubaopay()
    //   console.log('请选择支付方式')
    // }

  }

  zhifubaopay() {

    this.isLoading = true;
    this.loading = this.loadingCtrl.create({
      content: '上传数据中...'
    });
    this.loading.present();
    setTimeout(() => {
      this.isLoading = false;
      this.loading.dismiss();
    }, 7000);

  
      let data = {
        bean: {
          payway: 30,
          paytype: 30,
          clientAddr: "192.168.1.128",
          payno: this.goodsorderid,
        }
      }
      this.http.httpMethodContext(HttpUrl['prepay'], data, function (res, context) {
        if (context.loading) {
          context.isLoading = false;
          context.loading.dismiss();
        }
        if (res.retcode == 0) {
          console.log(res);
          (<any>window).Cordova.exec((res) => {
            console.log('支付宝支付插件回调==' + res);
          }, (err) => { showToast('支付失败'); },
            "alipay", "payment", [{ "orderString": res.result, }]);
        }
      }, this)

    }
}
