import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpContents, HttpUrl, showToast, constVar } from '../../common/global';
import { CityPickerDemoPage } from '../city-picker-demo/city-picker-demo';  
/**
 * Generated class for the BookServicePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-book-service',
  templateUrl: 'book-service.html',
})
export class BookServicePage {
  times:String;
  days:String;
  maxtimes:String;
  serviceName:String;
  bookid:Number;
  minhour:String;
  maxhour:String;
  serviceprice:Number;
  shiplist = [];
  dizhiId='';
  mark='';
  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HttpGet,public alertCtrl: AlertController) {
    this.init();
    this.getAddr();
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookServicePage');
    this.getAddr();
  }
  ionViewDidEnter(){
   this.getAddr();
  }
  addrId(item){
    this.dizhiId=item;
    console.log(JSON.stringify(item))
  }
  init(){
    console.log("当前时间是"+new Date())
    let now = new Date();
    this.times = new Date(now.getTime()+8*60*60*1000).toISOString() ;
    this.maxtimes = new Date(now.getTime()+12*30*24*60*60*1000).toISOString();
    this.serviceName = this.navParams.get("servicename");
    this.bookid = this.navParams.get("bookid");
    this.serviceprice = this.navParams.data.serviceprice;
    let min = this.navParams.data.servicestarttime;
    let max = this.navParams.data.serviceendtime;
    let time = now.getFullYear()+"/"+Number(now.getMonth()+1)+"/"+now.getDate();
    let starttime = time + " "+min;
    this.minhour = new Date(Date.parse(starttime)+8*60*60*1000).toISOString();
    let endtime = time+" "+ max;
    this.maxhour = new Date(Date.parse(endtime)+8*60*60*1000).toISOString();
  }
  getAddr(){
     let data = {
        'bean':{
          custuserid:localStorage.getItem('custuserid'),
          status:[10]
        },'cols': '[""]'
    };
    this.http.httpMethodContext(HttpUrl['shipAddr'],data, (res, context) => {
      console.log(res);
      let id = 1;
      res.forEach(item => {
        item.id = "id"+id++;
      });
      context.shiplist = res;
    },this)
  }
  payment(){
    if(this.times=='' || this.days=='' || this.dizhiId==''){
      let alert = this.alertCtrl.create({
        title:'请完善预约信息',
        buttons: ['确定']
      })
      alert.present();
    }else{
    let haomiao=new Date(this.times.split('T')[0]+' '+this.days).getTime();
    console.log(haomiao);
    let data={storeid:this.navParams.get('storeid'),expecttime:haomiao,custshippingaddressid:this.dizhiId,comment:this.mark,merchbookinfoid:this.bookid,custuserid:localStorage.getItem('custuserid')}
    console.log(JSON.stringify(data))
    this.http.httpMethodContext(HttpUrl['bookservice'], {bean:data}, function (res, context) {
      if (context.loading) {
        context.isLoading = false;
        context.loading.dismiss();
      }
      if (res.retcode == 0) {
       console.log(res);
       console.log("cc"+res.result.custgoodsorderid);
       context.navCtrl.push('PaymentPage',{custgoodsorderid:res.result.custgoodsorderid,type:"bookservice",totalprice:context.serviceprice});
      }
       
    }, this)
  }


  }
  addship(){
    this.navCtrl.push(CityPickerDemoPage,{page:"BookServicePage"});
  }
  changeicon(item){
    console.log(this);
    console.log(item);
  }
}
