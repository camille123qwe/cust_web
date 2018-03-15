
import { Component ,ChangeDetectorRef} from '@angular/core';
import { IonicPage,NavController, NavParams, ModalController, AlertController,LoadingController } from 'ionic-angular';
import { PrivilegeModaldulePage } from '../../pages/privilege-modaldule/privilege-modaldule';
//import { CardSettingPage } from '../../pages/card-setting/card-setting';
import { HttpGet } from '../../providers/http-get';
import { HttpContents, HttpUrl, showToast, constVar, globalVar ,set_param} from '../../common/global';
import { timeLimitAlertPage } from '../time-limit-alert/time-limit-alert';
/**
 * Generated class for the MyCouponPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-coupon',
  templateUrl: 'my-coupon.html',
})
export class MyCouponPage {

   tab1_class;
  tab2_class;
  userid;
  quanLibiao = [];
  achnr: boolean;
  Hquan = true;
  blquan = false;
  type: string;
  stader;
  status = 10;
  jdquan1 = false;
  jdquan2 = false;
  jdquan3 = false;
  xfquan1 = false;
  xfquan2 = false;
  xfquan3 = false;
  giftname = false;
  xiaofei = false;
  jindian = false;
  loading;
  arr=[];
  arr2=[];
  arr3 = [];
  postData=true;
  shareSrc = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private alertCtrl: AlertController,
    private http: HttpGet,public cd: ChangeDetectorRef,public loadingCtrl: LoadingController ) {
    this.tab1_class = "text-actived";
    this.tab2_class = "text-off";
    this.type = 'left';
    this.userid = localStorage.getItem('custuserid');
    // this.shareSrc = "http://c.diancall.com/diancall_web/www/index.html#/my-coupon?userid"+this.userid;
    // wxshare(this.shareSrc);
    let custuserid = localStorage.getItem('custuserid');
    if (custuserid == null || custuserid === 'undefined') {
      console.log('未登录');
      this.navCtrl.push('LoginPage', {});
      //return false;
    }else{
      this.ListQuan();
    }
    
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MyCouponPage'+location.href);
  }
  // ionViewDidEnter() {
  //   let custuserid = localStorage.getItem('custuserid');
  //   if (custuserid == null || custuserid === 'undefined') {
  //     console.log('未登录');
  //     this.navCtrl.push('LoginPage', {});
  //     return false;
  //   }else{
  //     this.ListQuan();
  //   }
  // }
  selectedLeft() {
    this.type = 'left';
    this.tab1_class = "text-actived";
    this.tab2_class = "text-off";
    this.status = 10;
    this.quanLibiao=[];
    this.arr=[];
    this.arr2=[];
    this.arr3 = [];
    if(this.postData){
      this.ListQuan();
    }

  }
  selectedRight() {
    this.type = 'right';
    this.tab1_class = "text-off";
    this.tab2_class = "text-actived";
    this.quanLibiao=[];
    this.arr=[];
    this.arr2=[];
    this.arr3 = [];
    this.status = 70;
    if(this.postData){
      this.ListQuan();
    }
  }

  //优惠卡
  favorable(item) {
    let myModal = this.modalCtrl.create(PrivilegeModaldulePage, item);
    myModal.present();
  }
  //限时优化
  xianshiyouhui(item){
    let myModal = this.modalCtrl.create(timeLimitAlertPage,item);
    debugger;
    console.log(item);
    myModal.present();
  }

  heixao(item){
    console.log(item.custcdrhisid)
    // custcdhis
    let alert = this.alertCtrl.create({
        title: '使用该优惠？',
        buttons: [
          {
            text: '确定',
            role: 'sure',
            handler: () => {
              console.log('sure clicked');
              this.http.httpMethodContext(HttpUrl.custcdhis+item.custcdrhisid, {}, (res, context) => {
                if(res.retcode==0){
                  this.ListQuan();
                }
    },this)
            }
          },
        ],
        
      })
    alert.present();
  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: '请输入需要添加的优惠券密码',
      cssClass: 'alertmodal',
      inputs: [
        {
          name: 'data',
        }
      ],
      buttons: [
        {
          text: '确认',
          role: 'cancel',
          handler: data => {
            let DtatTest = data.data;
            this.chaxun(DtatTest);
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: data => {
          }
        }
      ]
    });
    alert.present();
  }
  card_setting(res) {
    let myModal = this.modalCtrl.create('CardSettingPage', res);
    myModal.onDidDismiss(data => {
      this.ListQuan();
    });
    myModal.present();
  }
  //查询优惠卡
  chaxun(DtatTest) {
    let url = HttpUrl.findCar + DtatTest;

    this.http.httpMethodContext(url, {}, (res, context) => {

      if (res) {
        context.card_setting(res);
        console.log('wo de  ka ===' + JSON.stringify(res));
      } else {
        let alert = context.alertCtrl.create({
          title: '输入的密码不正确',
          buttons: ['确定']
        })
        alert.present();
      }

    }, this)
  }

  //状态为40 的优惠卡
  ListQuan2() {
    console.log('status')
    let dataParams = {
      "bean": {
        merchid: '',
        storeid: '',
        custuserid: this.userid,
        status: 40,
      },
    }

    this.http.httpMethodContext(HttpUrl.quanList, dataParams, (res, context) => {
      res=res.reverse();
      for (let item of res.result) {
        if(item.cardid==0){
           context.arr.push(item);
        }{
        if (item.promotionCard.fluxpkgid2 == 0 || item.promotionCard.fluxPackage2 == undefined) {
            item.promotionCard.liulang2 = 0;
            item.jdquan1 = true;
          } else {
            item.promotionCard.liulang2 = item.promotionCard.fluxPackage2.ydfluxkbs;
            item.jdquan1 = false;
          }
          if (item.promotionCard.cashvalue2 == 0) {
            item.jdquan2 = true;
          } else {
            item.jdquan2 = false;
          }
          if (item.promotionCard.voicetimes2 == 0) {
            item.jdquan3 = true;
          } else {
            item.jdquan3 = false;
          }
          if (item.jdquan1 == true && item.jdquan2 == true && item.jdquan3 == true) {
            item.jindian = true;
          } else {
            item.jindian = false;
          }
          // /////////////////////////
          if (item.promotionCard.fluxpkgid3 == 0 || item.promotionCard.fluxPackage3 == undefined) {
            item.promotionCard.liulang3 = 0;
            item.xfquan1 = true;
          } else {
            item.promotionCard.liulang3 = item.fluxPackage3.ydfluxkbs;
            item.xfquan1 = false;
          }
          if (item.promotionCard.cashvalue3 == 0) {
            item.xfquan2 = true;
          } else {
            item.xfquan2 = false;
          }
          if (item.promotionCard.voicetimes3 == 0) {
            item.xfquan3 = true;
          } else {
            item.xfquan3 = false;
          }
          if (item.xfquan1 == true && item.xfquan2 == true && item.xfquan3 == true) {
            item.xiaofei = true;
          } else {
            item.xiaofei = false;
          }
            context.arr2.push(item);
          }
      }
    }, this)
  }

  dataShowFn(data) {
    if (typeof (data) == 'undefined' || data == '') {
      return false;
    } else {
      return true;
    }
  }
  //获取优惠卡列表
  ListQuan() {
    
    this.loading = this.loadingCtrl.create({
      content: '加载数据中...'
    });
    this.loading.present();
    setTimeout(() => {
      this.loading.dismiss();
      // this.navCtrl.push('PaymentPage', { 'custgoodsorderid': this.custgoodsorderid, 'totalprice': this.totalgoodsprice, 'type': "orderservice" });
    }, 3000);
    this.postData=false;
    let dataParams = {
      "bean": {
        merchid: '',
        storeid: '',
        custuserid: this.userid,
        status: this.status,
      },
    };
    
    this.http.httpMethodContext(HttpUrl.quanList, dataParams, (res, context) => {
      context.arr=[];
      context.arr2=[];
      context.arr3 = [];
      // console.log('res===========' + JSON.stringify(res.result));
      if (res.result.length == 0) {
        this.Hquan = false;
        this.blquan = true;
      } else {
        this.Hquan = true;
        this.blquan = false;
        res.result = res.result.reverse();
        // context.quanLibiao = res.result;
        for (let item of res.result) {
          if (item.promotiontype == 2) {
            // let newDate1: any = new Date();
            // newDate1.setTime(item.goodsRush.validstarttime);
            // let start = newDate1.format('yyyy-MM-dd');
            // let newDate2: any = new Date();
            // newDate2.setTime(item.goodsRush.validendtime);
            // let end = newDate2.format('yyyy-MM-dd');
            // item.validday = end;
            // item.validday2 =start +"—"+ end;
            context.arr.push(item);

            context.arr = context.arr.reverse()
            // console.log('endtime===' + JSON.stringify(context.arr));
          } else if (item.promotiontype == 1) {
            if (item.promotionCard.fluxpkgid2 == 0 || item.promotionCard.fluxPackage2 == undefined) {
              item.promotionCard.liulang2 = 0;
              item.jdquan1 = true;
            } else {
              item.promotionCard.liulang2 = item.promotionCard.fluxPackage2.ydfluxkbs;
              item.jdquan1 = false;
            }
            if (item.promotionCard.cashvalue2 == 0) {
              item.jdquan2 = true;
            } else {
              item.jdquan2 = false;
            }
            if (item.promotionCard.voicetimes2 == 0) {
              item.jdquan3 = true;
            } else {
              item.jdquan3 = false;
            }
            if (item.jdquan1 == true && item.jdquan2 == true && item.jdquan3 == true) {
              item.jindian = true;
            } else {
              item.jindian = false;
            }
            // /////////////////////////
            if (item.promotionCard.fluxpkgid3 == 0 || item.promotionCard.fluxPackage3 == undefined) {
              item.promotionCard.liulang3 = 0;
              item.xfquan1 = true;
            } else {
              item.promotionCard.liulang3 = item.fluxPackage3.ydfluxkbs;
              item.xfquan1 = false;
            }
            if (item.promotionCard.cashvalue3 == 0) {
              item.xfquan2 = true;
            } else {
              item.xfquan2 = false;
            }
            if (item.promotionCard.voicetimes3 == 0) {
              item.xfquan3 = true;
            } else {
              item.xfquan3 = false;
            }
            if (item.xfquan1 == true && item.xfquan2 == true && item.xfquan3 == true) {
              item.xiaofei = true;
            } else {
              item.xiaofei = false;
            }

            let newDate1: any = new Date();
            newDate1.setTime(item.promotionCard.starttime);
            let start = newDate1.format('yyyy-MM-dd');
            let newDate2: any = new Date();
            newDate2.setTime(item.promotionCard.endtime);
            let end = newDate2.format('yyyy-MM-dd');
            item.validday = end;
            item.validday2 = start + "—" + end;
            // console.log('endtime===' + item.validday)
            context.arr2.push(item);
            context.arr2 = context.arr2.reverse()

          } else if (item.promotiontype == 3) {
            // {"cardid":0,"cdrAwardInfo":{"awarddetail":"200分钟通话&店呼200分钟通话卡","awardtitle":"参与鼓励奖","cdrawardid":10000003,
            // "createtime":1508321227858,"discountid":100003,"fluxpkgid":0,"giftname":"店呼200分钟通话卡","imgsrc":"7lfehohikq2ejpbgo99in62jnb.jpg",
            // "probability":1000,"status":10,"voicetimes":12000},"cdrawardid":10000003,"promotiontype":3,"storeid":0}
            context.arr3.push(item);
            console.log('endtime===' + JSON.stringify(context.arr3));
            context.arr2 = context.arr2.reverse()
          }

        }

      }
      //如果status==50；则继续请求获取状态为40的
      // if (this.status == 50) {
      //   console.log('context.ListQuan2()')
      //   this.ListQuan2();
      // } else {
      //   console.log(this.status);
      // }
      this.postData = true;
    }, this)
    
  }

}
