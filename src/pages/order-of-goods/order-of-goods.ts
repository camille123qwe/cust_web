import { Component } from '@angular/core';
import { constVar, globalVar, isLogin, HttpUrl, initFunction } from '../../common/global';
import { HttpGet } from '../../providers/http-get';
import { NavController, AlertController, NavParams, LoadingController, App, ModalController, IonicPage } from 'ionic-angular';
//import { OrderInformationPage } from '../order-information/order-information';
// import { DeliveryPage } from '../delivery/delivery';
// import { ShippingPage } from '../shipping/shipping';
// import { DeliveryDetailPage } from '../delivery-detail/delivery-detail';
import { TabsPage } from '../../pages/tabs/tabs';


/**
 * Generated class for the OrderOfGoodsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-order-of-goods',
  templateUrl: 'order-of-goods.html',
})
export class OrderOfGoodsPage {

  type = 'all';
  goodsorder = []
  txt_status = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12];
  isloading = true;
  flipper_page = 0;
  limit = 20;
  total = 0;
  infiniteScroll;
  loading;
  custuserid;

  constructor(public navParams: NavParams, public modalCtrl: ModalController, public navCtrl: NavController, public alertCtrl: AlertController, private http: HttpGet, public loadingCtrl: LoadingController, public app: App) {
    this.custuserid = localStorage.getItem("custuserid");
  }
  // daifahuo fukuan yifukuan tuikuan wancheng
  ionViewDidEnter() {
    this.chaxun(this.infiniteScroll);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad');

  }

  OnClick(item) {
    event.stopPropagation();
    this.type = item;
    console.log('type===' + this.type);
    // 1：等待买家付款；2：买家已付款，等待卖家确认；3：卖家已发货；4：买家确认收货；
    // 5：买家取消订单；6：订单发起退货；7：退货完成;8:订单处理中;9:发起货到付款，未发货；10：货到付款，已发货

    this.goodsorder = [];
    this.flipper_page = 0;
    this.total = 0;
    switch (item) {
      case 'all':
        this.txt_status = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12];
        break;
      case 'daifukuan':
        this.txt_status = [1];
        break;
      case 'daishouhuo':
        this.txt_status = [ 2, 3, 8, 9, 10];
        break;
      case 'yiwancheng':
        this.txt_status = [4, 7];
        break;
      case 'tuikuan':
        this.txt_status = [11,6,12];
        break;
      default:
        break;
    }
    if (!this.isloading) {
      this.chaxun(this.infiniteScroll);
    }

  }
   
  qufukaun(item){
    
  }
  shouhuo(item) {
    event.stopPropagation();
    let custgoodsorderid = item.custgoodsorderid;
    let alert = this.alertCtrl.create({
      title: '确认收货',
      message: '确定您已经收到所有商品了吗?',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确认',
          handler: () => {
            let dataParams = {};
            this.http.httpMethodContext(HttpUrl['confirmgoodsorder'] + custgoodsorderid, dataParams, (res, context) => {
              let qralert=context.alertCtrl.create({
                title:"确认收货成功",
                buttons:['确定']
              })
              qralert.present();
              this.chaxun(this.infiniteScroll);
            }, this);
          }
        }
      ]
    });
    alert.present();
  }
  tuihuo(item) {
    event.stopPropagation();
    this.navCtrl.push('ReturnRequestPage');//卖家同意退货请求,进入退货页面
     
  }
  xuangou(){
     event.stopPropagation();
    //去选购页面
    this.navCtrl.push('HomeDeliveryDetailPage');
  }

  // okybtn(item) {
  //   let url = HttpUrl['confirmgoodsorder'] + item.custgoodsorderid
  //   this.http.httpMethodContext(url, {}, (res, context) => {
  //     if (res.retcode == 0) {
  //       let alert = this.alertCtrl.create({
  //         subTitle: '操作成功',
  //         buttons: ['确定']
  //       })
  //       alert.present();
  //       context.chaxun();
  //       context.type = 'yiwancheng';
  //     }
  //   }, this)

  // }

  allOrder(item) {
   // event.stopPropagation();
    if(item.status==1){
      this.navCtrl.push('OrderInformationPage', { item: item ,type:"zhifu" });
    }else if(item.status==2||item.status==3||item.status==8||item.status==9||item.status==10){
      
      this.navCtrl.push('OrderInformationPage', { item: item ,type:"shouhuo" });
    }else if(item.status==4||item.status == 7){
      this.navCtrl.push('OrderInformationPage', { item: item ,type:"wancheng" });
    }else if(item.status==6||item.status ==11||item.status==12){
      this.navCtrl.push('OrderInformationPage', { item: item ,type:"tuikuan" });
    }
  }
  chaxun(infiniteScroll) {
    this.isloading = true;
    this.loading = this.loadingCtrl.create({
      content: '加载中...'
    });
    this.loading.present();
    setTimeout(() => {
      this.isloading = false;
      if (this.loading) {
        this.loading.dismiss();
      }
    }, 10000);

    console.log(this.txt_status);
    let data = {
      'bean': {
        custuserid: localStorage.getItem("custuserid"),
      },
      flipper: {
        offset: this.flipper_page,
        limit: this.limit,
      }
    }
    this.http.httpMethodContext(HttpUrl['querygoodsorder'], data, (res, context) => {
      context.isloading = false;
      if (context.loading) {
        context.loading.dismiss();
      }
      if (typeof (infiniteScroll) !== 'undefined') {
        infiniteScroll.complete();
      }
      context.total = res.result.total;
      if (this.txt_status.length == 12) {
        //全部
        for (let item of res.result.rows) {
          switch (item.status) {
            case 1:
              item.btnText = '待付款';
              item.status_class = 'right-span-default bg-red';
              item.hasbutton = true;
              item.this_order = '去付款';
              break;
            case 2: case 3: case 8: case 9: case 10:
              item.btnText = '待收货';
              item.status_class = 'right-span-default bg-blue';
              item.hasbutton = true;
              item.this_order = '确认收货';
              break;
            case 4: case 7:
              item.btnText = '已完成';
              item.status_class = 'right-span-default bg-gray';
              item.hasbutton = true;
              item.this_order = '再来一单';
              break;
            case 6: case 12:
              item.btnText = '退款中';
              item.status_class = 'right-span-default bg-green';
              item.hasbutton =false;
              item.this_order = '发货退货';
              break;
            case 11:
              item.btnText = '退款中';
              item.status_class = 'right-span-default bg-green';
              item.hasbutton =true;
              item.this_order = '发货退货';
              break;
             case 5:
              item.btnText = '已取消';
              item.status_class = 'right-span-default bg-gray';
              item.hasbutton =false;
              item.this_order = '发货退货';
              break;
            default:
              break;
          }

        };
      } else {
        for (let item of res.result.rows) {
          if (item.status == 1) {
            item.btnText = '待付款';
            item.status_class = 'right-span-default bg-red';
            item.this_order = '去付款';
            item.hasbutton =true;
          } else if (item.status == 2 ||item.status ==3 ||item.status == 8 || item.status == 9 ||item.status == 10) {
            item.btnText = '待收货';
            item.hasbutton =true;
            item.status_class = 'right-span-default bg-blue';
            item.this_order = '确认收货';
          } else if (item.status == 4 ||item.status == 7) {
            item.btnText = '已完成';
            item.hasbutton =true;
            item.status_class = 'right-span-default bg-gray';
            item.this_order = '再来一单';
          } else if (item.status == 11) {
            item.btnText = '退款中';
            item.hasbutton =true;
            item.status_class = 'right-span-default bg-green';
            item.this_order = '发货退货';
          }else if (item.status == 6||item.status == 12) {
            item.btnText = '退款中';
            item.hasbutton =false;
            item.status_class = 'right-span-default bg-green';
            item.this_order = '发货退货';
          }else{
            console.log("ckx"+item.status)
          }
        }
      }

      if (context.flipper_page == 0) {
        context.goodsorder = [];
        for(let item of res.result.rows){
            let newDate1: any = new Date();
          if(this.txt_status.indexOf(item.status)>=0){
            item.totalgoodsprice = (item.totalgoodsprice / 100).toFixed(2);
            newDate1.setTime(item.createtime);
            item.createtime = newDate1.format('YYYY-MM-dd hh:mm');

          if (item.status == 1) {
            item.fukuan_show = true;
          } else if (item.status == 2 || item.status == 3||item.status == 8 || item.status == 9||item.status == 10 ) {
            item.yifahuo_show = true;
          } else if(item.status == 4||item.status == 7){
            item.go_show = true;
          }else if(item.status ==6 ||item.status ==11||item.status==12){
            item.tuihuo_show = true;
          }else if(item.status == 5){
            item.tuihuo_show = true;
          }
            context.goodsorder.push(item);
          }
        }
       }

    }, this)
  }

  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    if (this.flipper_page + this.limit < this.total && !this.isloading) {
      console.log('加载更多...');
      this.flipper_page += this.limit;
      console.log('flipper_page==' + this.flipper_page);
      this.chaxun(infiniteScroll);
      infiniteScroll.complete();
    } else {
      infiniteScroll.complete();
      console.log(this.total)
    }
  }
  formatDate(now) {
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return  year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
  }
  

}
