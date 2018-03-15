import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController ,ModalController} from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { constVar, globalVar, isLogin, HttpUrl, initFunction } from '../../common/global';
import { CityPickerDemoPage } from '../city-picker-demo/city-picker-demo';  
/**
 * Generated class for the OrderInformationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-order-information',
  templateUrl: 'order-information.html',
})
export class OrderInformationPage {

  custgoodsorderid: Number;
  storeInfo = {};
  custOrder2Goodses = [];
  totalgoodsprice: String;
  expressmoney: Number;
  wuliu = true;//是否显示物流信息，未支付的订单不显示
  zhifu = false;//是否显示支付按钮
  shouhuo = false;//是否显示确认收货按钮
  wancheng = false;
  tuikuancuidan = false;
  show_more = true;//显示更多
  orderitem: any;
  ordertype = "";
  shouhuo_status = "";
  shouhuo_method = "";
  tuihuo_status = "";
  tuihuo_method = "";
  yoursName=''; yoursPhone=''; yoursAddr='';
  hasAddr = false;
  constructor(public modalCtrl:ModalController,public navCtrl: NavController, public navParams: NavParams, public actionCtrl: ActionSheetController, public alertCtrl: AlertController, private http: HttpGet) {

    this.custgoodsorderid = this.navParams.data.item.custgoodsorderid;
    this.storeInfo = this.navParams.data.item.storeInfo;
    this.expressmoney = this.navParams.data.item.expressmoney;
    this.totalgoodsprice = this.navParams.data.item.totalgoodsprice;
    this.custOrder2Goodses = this.navParams.data.item.custOrder2Goodses;
    this.ordertype = this.navParams.data.type;
    this.orderitem = this.navParams.data.item;
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WaitPaymentPage');
    this.chaxunAddr();
  }
  ionViewDidEnter() {
    this.chaxunAddr();
  
  }
  init() {
    if (this.ordertype == "zhifu") {
      this.wuliu = false;
      this.zhifu = true;
    } else if (this.ordertype == "shouhuo") {
      this.show_more = false;
      this.shouhuo = true;
      if (this.orderitem.status == 3 || this.orderitem.status == 10) {
        this.shouhuo_status = "订单已支付";
        this.shouhuo_method = "确认收货";
      } else if (this.orderitem.status == 2 || this.orderitem.status == 8 || this.orderitem.status == 9) {
        this.shouhuo_status = "已付款 商家未发货";
        this.shouhuo_method = "催单";
      }

    } else if (this.ordertype == "wancheng") {
      this.show_more = false;
      this.wancheng = true;
    } else if (this.ordertype == "tuikuan") {
      this.tuikuancuidan = true;
       this.show_more = false;
      if (this.orderitem.status == 6) {
        this.tuihuo_status = "申请退货中";
        this.tuihuo_method = "催单";
      } else if (this.orderitem.status == 11) {
        this.tuihuo_status = "退货申请已通过";
        this.tuihuo_method = "去发货";
      } else if (this.orderitem.status == 12) {
        this.tuihuo_status = "退货申请被拒绝";
        this.tuihuo_method = "再次申请";
      }

    }
  }
  payment() {
    this.navCtrl.push('PaymentPage', { custgoodsorderid: this.custgoodsorderid, totalprice: this.totalgoodsprice ,type:"orderservice"});
  }
  querenshouhuo() {
    if (this.orderitem.status == 3 || this.orderitem.status == 10) {
      const alert = this.actionCtrl.create({
        title: '您确定您已经收到所有商品了吗',
        buttons: [
          {
            text: '取消',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: '确定',
            handler: () => {
              this.http.httpMethodContext(HttpUrl['confirmgoodsorder'] + this.custgoodsorderid, {}, (res, context) => {
                let qralert = this.alertCtrl.create({
                  subTitle: '已确认收货',
                  buttons: ['确定']
                });
                qralert.present();
                console.log("操作成功");
                this.navCtrl.pop();
              }, this)
            }
          }
        ]
      });
      alert.present();
    } else if (this.orderitem.status == 2 || this.orderitem.status == 8 || this.orderitem.status == 9) {
      const alert = this.alertCtrl.create({
        title: '催单成功',
        subTitle: '催单请求已经发送给商家,请您等待商家回复',
        buttons: ['确定']
      });
      alert.present();
      this.http.httpMethodContext(HttpUrl['reminder'] + this.custgoodsorderid, {}, (res, context) => {
        console.log(res);

      }, this)
    }

  }
  cuidan() {
    if (this.orderitem.status == 6) {
      const alert = this.alertCtrl.create({
        title: '催单成功',
        subTitle: '催单请求已经发送给商家,请您等待商家回复',
        buttons: ['确定']
      });
      alert.present();
      this.http.httpMethodContext(HttpUrl['reminder'] + this.custgoodsorderid, {}, (res, context) => {
        console.log(res);

      }, this)
    } else if (this.orderitem.status == 11) {
      //进入发货页面
      this.navCtrl.push('');
    } else if (this.orderitem.status == 12) {
      //进入催单页面
      this.navCtrl.push('');
    }


  }
  more() {

    const zhifuSheet = this.actionCtrl.create({
      buttons: [
        {
          text: '取消订单',
          role: 'destructive',
          handler: () => {
            const alert = this.actionCtrl.create({
              title: '您确定取消此订单吗',
              buttons: [
                {
                  text: '我再想想',
                  role: 'cancel',
                  handler: () => {
                    console.log('Cancel clicked');
                  }
                },
                {
                  text: '确定',
                  handler: () => {
                    this.http.httpMethodContext(HttpUrl['cancelgoodsorder'] + this.custgoodsorderid, {}, (res, context) => {
                      let qralert = this.alertCtrl.create({
                        subTitle: '已取消订单',
                        buttons: ['确定']
                      });
                      qralert.present();
                      console.log("操作成功");
                      this.navCtrl.pop();
                    }, this)
                  }
                }
              ]
            });
            alert.present();

          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    const wanchengSheet = this.actionCtrl.create({
      buttons: [
        {
          text: '申请退货',
          role: 'destructive',
          handler: () => {
            console.log("老娘要退货！！！！！！！！！！！！！！！！");
          }

        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    if (this.ordertype == "zhifu") {
      zhifuSheet.present();
    } else if (this.ordertype == "wancheng") {
      wanchengSheet.present();
    }

  }

  updateAddr(){
    console.log(0)
    // let myModal = this.modalCtrl.create('MyAddressPage');
    // myModal.present();
    this.navCtrl.push('MyAddressPage');
  }

  chaxunAddr() {
    let data = {
        'bean':{
          custuserid:localStorage.getItem('custuserid'),
          defaultorno:10,
          status:[10]
        },'cols': '[""]'
    };
    this.http.httpMethodContext(HttpUrl['shipAddr'], data , (res, context) => {
      // console.log(res);
      // yoursName=''; yoursPhone=''; yoursAddr='';
      if(res.length>0){
        context.yoursName=res[0].receivername;
        context.yoursPhone=res[0].mobile;
        context.yoursAddr=res[0].address;
        context.hasAddr = true;
      }
    }, this);

  }
  addship(){
    this.navCtrl.push(CityPickerDemoPage,{page:"MyAddressPage"});
  }
}
