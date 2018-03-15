import { Component, Directive, ElementRef, HostListener, Input,ViewChild } from '@angular/core';
import { IonicPage,NavController, NavParams, App, AlertController, ModalController, ViewController,Navbar } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpContents, HttpUrl, constVar, isLogin, goLogin,backButtonClick } from '../../common/global';
import { GlobalProvider } from '../../providers/global-provider';

/**
 * Generated class for the FluxChargePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-flux-charge',
  templateUrl: 'flux-charge.html',
})
export class FluxChargePage {
 charge_number: string = '';
  charge_title: string = '请选择充入的流量';
  items = [];
  items1 = [];
  items2 = [];
  isActive = { item: 0 };
  obj = { name: 100, activecolor: "activecolor" };
  flag: boolean;
  custuserid: string;
  fluxpoolid: string;
  fluxpkgid: number;
  commonkbs: string;
  constructor(public navCtrl: NavController, private http: HttpGet, private navParams: NavParams, private app: App, public alertCtrl: AlertController, public modalCtrl: ModalController) {

  }
  @ViewChild(Navbar) navBar: Navbar; 
  ionViewDidLoad() {
    //this.navBar.backButtonClick = backButtonClick; 
    console.log('ionViewDidLoad FlowsCharge');
    this.custuserid = this.navParams.get('custuserid');
    this.fluxpoolid = this.navParams.get('fluxpoolid');
    let data: Object = {};
    this.http.httpMethodContext(HttpUrl.fluxPackge, data, (res, context) => {
      console.log(res);
      console.log(context);
      res.forEach(element => {
        if (element.pkgscope == 10) {
          context.items.push(element);
        }
      });
      context.items.shift();
      let ilength = context.items.length;
      if (ilength <= 3) {
        if (ilength == 0) {
          context.charge_title = '您目前的流量不足，无法充值';
        }
        this.items1 = context.items;
        this.isActive.item = this.items[0];
        this.fluxpkgid = this.items[0].fluxpkgid;
        this.commonkbs = this.items[0].commonkbs;
      } else if (ilength <= 6) {
        this.items1 = this.items.slice(0, 3);
        this.items2 = this.items.slice(3, ilength);
        this.isActive.item = this.items[0];
        this.fluxpkgid = this.items[0].fluxpkgid;
        this.commonkbs = this.items[0].commonkbs;
      } else {
        this.isActive.item = this.items[0];
        this.items1 = this.items.slice(0, 3);
        this.items2 = this.items.slice(3, 6);
        this.fluxpkgid = this.items[0].fluxpkgid;
        this.commonkbs = this.items[0].commonkbs;
      }
    }, this);
  }
  phoneChange() {
    if (this.charge_number != '') {
      let mValue = this.charge_number.replace(/\D/g, '');
      let mLength = mValue.length;
      if (mLength <= 3) {
        this.charge_number = mValue + "";
      } else {
        if (mLength <= 7) {
          this.charge_number = mValue.substring(0, 3) + ' ' + mValue.substring(3, mLength)
        } else {
          this.charge_number = mValue.substring(0, 3) + ' ' + mValue.substring(3, 7) + ' ' + mValue.substring(7, 11)
        }
      }
    }
  }
  colorChange(item) {
    this.isActive.item = item;
    this.fluxpkgid = item.fluxpkgid;
    this.commonkbs = item.commonkbs;
  }
  regphone() {
    let mobile = this.charge_number.replace(/\D/g, '');
    if (!(/^1[0-9]{10}$/.test(mobile))) {
      this.errorAlert();
    } else {
      this.showAlert();
    }
  }
  showAlert() {
    let mobile = this.charge_number.replace(/\D/g, '');
    let commonkbs = this.commonkbs;
    console.log(commonkbs);
    let showMessage = "<div><p class='test'><span>充入手机号：</span>" + mobile + "</p>" + "<p class='test'><span>充入流量：</span>" + commonkbs + "</p>" + "确定要充值？</div>";
    let alert = this.alertCtrl.create({
      title: "提示",
      message: showMessage,
      buttons: [
        {
          text: '确定',
          handler: () => {
            console.log('确定充值');
            let dataParams = {
              "bean": {
                fluxpkgid: this.fluxpkgid,
                fluxpoolid: this.fluxpoolid,
                custuserid: this.custuserid,
                mobile: mobile,
                fluxpoolrecordid: "",
                createtime: ""
              },
            }
            this.http.httpMethodContext(HttpUrl.payFlux, dataParams, (res, context) => {
              console.log(res);
              if(res.retcode==0){
                 this.presentModal();
              }else{
                let alert=context.alertCtrl.create({
                  title:res.retinfo,
                  buttons:['确定']
                })
                alert.present();
              }
            }, this)

          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('取消充值');
          }
        }
      ]
    });
    alert.present();
  }
  errorAlert() {
    let alert = this.alertCtrl.create({
      title: '提示',
      subTitle: '您的手机号码有误，请检查后重新输入',
      buttons: ['确定']
    });
    alert.present();
  }
  presentModal() {
    let modal = this.modalCtrl.create('FluxChargeSuccessPage');
    modal.present();
  }
}
