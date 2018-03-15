import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { HttpUrl, showToast, constVar, globalVar, isLogin, goLogin } from '../../common/global';
import { HttpGet } from '../../providers/http-get';
/// <reference path="plugin/openinstall/openinstall.d.ts"/>  
import * as $ from 'jquery';
/**
 * Generated class for the ShopCarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-shop-car',
  templateUrl: 'shop-car.html',
})
export class ShopCarPage {
  shopcart = [];
  goodsNum = 0;
  money = 0;
  url_900 = constVar.goodsfaceurl_900;
  storefaceurl_300 = constVar.storefaceurl_300;
  tishi: boolean;
  cartid = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,private http: HttpGet,) {
    // this.chaxun();
    this.install();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopCarPage');

  }

  ionViewDidEnter() {
    this.chaxun();
    this.payList();
  }

  payList() {
    let goodsLength = [];
    if (this.shopcart.length == 0) {
      this.tishi = true;
      // console.log(this.shopcart.length)
    } else {
      this.tishi = false;
      // console.log(this.shopcart.length)
    }
    for (let i = 0; i < this.shopcart.length; i++) {
      // console.log('xxxxxxx=====' + JSON.stringify(this.shopcart[i]));
      this.shopcart[i].nameshow=true;
      for (let item of this.shopcart[i]) {
        
        goodsLength.push(item);
        this.cartid.push(item.shopcartid)
      }
    }
    // console.log('ididiidid==='+JSON.stringify(this.cartid))
    this.goodsNum = goodsLength.length
  }

  //是否全选
  mendian(data, item) {
    // this.money=0;
    let paystatus = false;
    //如果门店为选中  则该门店下所以商品都选中
    for (let obj of item) {
      // console.log('xxx=='+obj.goodsStatus)
      if (obj.goodsStatus == true) {
        this.money = this.money - 0;
        // obj.sellprice
        paystatus = true;
      } else {
        this.money = this.money + obj.goodsInfo.sellprice * obj.count;
      }
      if (data == true) {
        obj.goodsStatus = true;
        // this.money=this.money+obj.sellprice
      } else {
        obj.goodsStatus = false;
        // if(paystatus==false){
        if (this.money > 0) {
          this.money = this.money - obj.goodsInfo.sellprice * obj.count
        } else {
          this.money = 0;
        }
        // }else{
        //    this.money=this.money+obj.sellprice
        // }

      }

    }

  }

  //是否全选
  thisGoods(data, item, str) {
    //找到选中的商品
    let arrLength = [];
    for (let obj of item) {
      if (obj.goodsStatus == true) {
        arrLength.push(obj.goodsStatus);
      }
    }

    //如果该门店下所以商品都选中则  门店为选中
    for (let arr of this.shopcart) {
      if (item == arr) {
        if (arrLength.length == arr.length) {
          arr.payStatus = true;
        } else {
          arr.payStatus = false;
        }
      }
    }
    //计算选中商品的总价钱
    if (str.goodsStatus == true) {
      this.money = this.money + str.goodsInfo.sellprice * str.count
    } else {
      if (this.money > 0) {
        this.money = this.money - str.goodsInfo.sellprice * str.count
      } else {
        this.money = 0;
      }

    }
  }

  onClickUnFolow(obj, item) {
    let confirm = this.alertCtrl.create({
      // title: '',
      message: '是否删除?',
      buttons: [
        {
          text: '确定',
          handler: () => {
            // console.log('agree clicked');
            this.goodsNum = this.shopcart.length
            this.unFollow(obj, item)
          }
        },
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  unFollow(obj, item) {
    let data = {
      "shopcartids": '[' +obj.cartgoodsitemsid + ']',
    }

    this.http.httpMethodContext(HttpUrl.deletecustcart, data, function (res, context) {
          if(res.retcode==0){
            showToast('删除成功');
            let alert=context.alertCtrl.create({
              title:'删除成功',
              buttons:['确定']
            })
            alert.present();
            item.splice(item.indexOf(obj), 1);
            if(item.length==0){
              item.nameshow=false;
            }
          }else{
            let alert=context.alertCtrl.create({
              title:'删除失败',
              buttons:['确定']
            })
            alert.present();
          }
      },this)

     
      
  }

 chaxun(){
  //
  this.shopcart = []
  this.money = 0; 
  let data={
    'bean':{

    }
  }
  this.http.httpMethodContext(HttpUrl.mycustcart, data, function (res, context) {
      let name = Object.keys(res.result)
      for (let item of name) {
        res.result[item].thisStoreName = item;
        res.result[item].payStatus = false;
        for (let obj of res.result[item]) {
          obj.goodsStatus = false;
        }
        context.shopcart.push(res.result[item]);
      }
      context.payList();
  },this)
 }

 order() {
  console.log(JSON.stringify(this.shopcart))
  let oders=[];
  if (this.goodsNum == 0 || this.money == 0) {
    let alert = this.alertCtrl.create({
      title: '您还没有选择宝贝哟！',
      buttons: ['确定'],
    })
    alert.present();
  } else {
    this.install();

    }
  }

install(){
  let data = {"pageName":"ShopCarPage"};
    new OpenInstall({
        appKey : "fhgawx",
        /*可选参数，自定义android平台的apk下载文件名，只有apk在openinstall托管时才有效；
         个别andriod浏览器下载时，中文文件名显示乱码，请慎用中文文件名！*/
        apkFileName : "diancall-cust.apk",
        /*可选参数，是否优先考虑拉起app;某些android浏览器无法拉起app(或拉取体验不佳)的情况下，
         将使用H5遮罩的形式提示用户用其他浏览器打开*/
        preferWakeup:true,
        onready : function() {
            var m = this,button = $(".fukuan");
            button[0].style.visibility="visible";
            button[0].onclick=function(){
              //500毫秒后app尚未拉起，将安装app，可自定义超时时间，单位为毫秒
              m.wakeupOrInstall({timeout:2000});
            };
        }
      }, data);
}
}
