import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ModalController ,ActionSheetController,AlertController} from 'ionic-angular';
import { HttpUrl, isLogin, goLogin } from '../../common/global';
import { HttpGet } from "../../providers/http-get";
import { CityPickerDemoPage } from '../city-picker-demo/city-picker-demo'

/**
 * Generated class for the MyAddressPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-address',
  templateUrl: 'my-address.html',
})
export class MyAddressPage {
  myaddr = [];
  addrStatus=10;
  selectDefaultAdd = false;
  constructor(public actionSheetCtrl: ActionSheetController,private alertCtrl: AlertController, public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, private http: HttpGet, private app: App) {
   

  }

  
  ionViewDidEnter() {
    this.chaxun();
  }
  addAddr() {
    this.navCtrl.push(CityPickerDemoPage,{page:"MyAddressPage"});
  }

  chaxun() {
    let data = {
        'bean':{
          custuserid:localStorage.getItem('custuserid'),
          status:[10,20]
        },'cols': '[""]'
    };
    this.http.httpMethodContext(HttpUrl['shipAddr'], data , (res, context) => {
     debugger;
      context.myaddr = res;
      for (let item of context.myaddr){
        if(item.defaultorno==10){
            item.selectStatus=true;
        }else{
            item.selectStatus=false;
        }
      }
    }, this);

  }
  // 
  rmaddress(item,defaultorno){
    this.addrStatus=80
    this.updataItem(item,defaultorno)
  }
  updataItem(item,defaultorno) {
    
    let data = {
      'bean': { 
        custshippingaddressid:item.custshippingaddressid,
        custuserid: localStorage.getItem('custuserid'),
        status:this.addrStatus,
        defaultorno:defaultorno
      }, 'cols': '["status","defaultorno"]'
    
    };
   
    this.http.httpMethodContext(HttpUrl['myAddress'], data , (res, context) => {
      debugger;
      let content = "";
      if(context.addrStatus==80){
        context.myaddr.splice(context.myaddr.indexOf(item), 1);
        content = '地址删除成功';
        console.log('地址删除成功')
      }else if(context.addrStatus==10){
        content = '设置成功';
        console.log('设置成功')
      }
      let alert = context.alertCtrl.create({
        title: content,
        buttons: ['确定']
      })
      alert.present();
    }, this);
  }

  more() {
    this.selectDefaultAdd = true;
  }

  checkboxClick(item, status) {
    if (status == true) {
      for (let obj of this.myaddr) {
        if (obj == item) {
          this.updataItem(item,10);
        } else {
          obj.selectStatus = false;
        }
      }
    } else {
      console.log('取消');
    }
  }

  shezhi(item){
  //   let defaultorno=10
  //   let confirm = this.alertCtrl.create({
  //     message: '是否设置为默认收货地址?',
  //     buttons: [
  //       {
  //         text: '确定',
  //         handler: () => {
  //           this.updataItem(item,defaultorno)
  //           console.log('agree clicked');
  //         }
  //       },
  //       {
  //         text: '取消',
  //         handler: () => {
  //           console.log('Disagree clicked');
  //         }
  //       }
  //     ]
  //   });
  //   confirm.present();
   }
}
