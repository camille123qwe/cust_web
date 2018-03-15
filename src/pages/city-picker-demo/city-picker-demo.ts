import { CityPickerProvider } from "../../providers/city-picker/city-picker";
import { HttpGet } from '../../providers/http-get';
import { HttpUrl, showToast, constVar, globalVar, isLogin, goLogin } from '../../common/global';
import { Component } from "@angular/core";
import { NavController, NavParams, ModalController, AlertController } from "ionic-angular";

@Component({
  selector: 'page-city-picker-demo',
  templateUrl: 'city-picker-demo.html'
})
export class CityPickerDemoPage {

  cityData: any[] = []; //城市数据
  cityName: string = '点击输入收货地址'; //初始化城市名
  code: string; //城市编码
  yoursNmae='';
  yoursPhone='';
  xiangxidizhi='';
  constructor(public navCtrl: NavController,
    public navParams: NavParams, private http: HttpGet,
    public modalCtrl: ModalController,
    public CityPickerProvider: CityPickerProvider, public alertCtrl: AlertController, ) {

  }

  ionViewDidLoad() {
    //获取城市数据
    this.CityPickerProvider.geCityData().subscribe(res => {
      this.cityData = res;
    })
  }

  //城市选择器被改变时触发的事件
  cityChange(event) {
    this.code = event['region'].value;
    console.log(this.cityName);
  }

  // myAddress
  myAddress() {
    if (this.yoursPhone == '' || this.yoursNmae == '' || this.xiangxidizhi == '' || this.cityName == '') {
      let alert = this.alertCtrl.create({
        title: '地址信息不完整',
        buttons: ['确定']
      })
      alert.present();
    } else {
      let data = {
        bean: {
          custuserid: localStorage.getItem("custuserid"),
          receivername: this.yoursNmae,
          address: this.cityName.split("-").join("")+this.xiangxidizhi,
          mobile: this.yoursPhone,
          
          //tag: this.xiangxidizhi,
        }, 'clos': '[""]'
      }
      console.log(data)
      this.http.httpMethodContext(HttpUrl.myAddress, data, (res, context) => {
        if (res.retcode == 0) {
          showToast('新增地址成功');
          this.navCtrl.pop();
        }
      }, this)
    }

  }




}
