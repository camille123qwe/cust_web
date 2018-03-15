import { Component } from '@angular/core';
import { NavController, NavParams, ModalController,IonicPage } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpUrl, showToast, constVar, globalVar } from '../../common/global';
/*
  Generated class for the ShopParticulars page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-shop-particulars',
  templateUrl: 'shop-particulars.html'
})
export class ShopParticularsPage {
  goodsList;
  Priv;
  ShopInfo;
  StoreId;
  GoodsId;
  GoodsName
  aloneDetail;
  shangpingImg = [];
  jieshao = true;
  hPriv = false;
  pric = false;
  tedian = false;
  FxIMg = 'assets/img/icon_fenxiang@2x.png';
  goodsface_900 = constVar.goodsfaceurl_900;
  Taskid;
  zengsong = true;
  fenxiangzengnsong = {};
  fenxiang1 = false;
  fenxiang2 = false;
  fenxiang3 = false;
  zengsongmoshi = true;
  Privlist = [];
  cang = true;
  danwei = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private http: HttpGet, ) {

    if (!!this.navParams.get('isOpenInstall')) {
      console.log('isOpenInstall');
      
    } else {
      this.initFromLastPage();
    }



  }
  initFromLastPage() {

    this.goodsList = this.navParams.data.key1;
    this.StoreId = parseInt(this.goodsList.storeid).toString(36);
    this.GoodsId = parseInt(this.goodsList.goodsid).toString(36);
    this.GoodsName = this.goodsList.goodsname



    this.Priv = this.navParams.data.key2;
    //加上分享赠送和优惠不能超过3条列表


    this.ShopInfo = this.navParams.data.key3;

    //轮播图片
    if (typeof (this.navParams.data.key1.goodsimgs) == 'undefined') {
      this.shangpingImg.push(this.navParams.data.key1.goodsface);
    } else {
      let imgs = [];
      imgs = this.navParams.data.key1.goodsimgs.split(";");
      console.log('aaa===' + imgs.length)
      if (imgs.length > 5) {
        for (let i = 0; i < imgs.length; i++) {
          this.shangpingImg.push(imgs[i])
          if (i >= 4) {
            break;
          }
        }
        console.log('img===' + this.shangpingImg.length)
      } else {
        this.shangpingImg = imgs;
      }

    }


    //   console.log('价钱==='+this.navParams.data.key1.marketprice)
    if (this.navParams.data.key1.marketprice == 0 || this.navParams.data.key1.sellprice >= this.navParams.data.key1.marketprice) {

      this.pric = true;
    } else {
      this.pric = false;
    };
    if (this.Priv.length == 0) {
      this.hPriv = true;
    } else {
      this.hPriv = false;
    };
    if (this.navParams.data.key1.goodsdesc == undefined) {
      this.tedian = false;
    } else {
      this.tedian = true;
    }
    if (this.goodsList.unit == undefined || this.goodsList.unit.length == 0) {
      this.danwei = false;
    } else {
      this.danwei = true;
    }
  }
  ionViewWillEnter() {
    this.zengsonglist()
    if (this.navParams.data.key2.length > 2 && this.cang == true) {
      if (this.zengsong == true) {
        this.Privlist.push(this.Priv[0]);
        this.Privlist.push(this.Priv[1]);
      } else {
        if (this.zengsong == false) {
          this.cang = false;
        }
        this.Privlist.push(this.Priv[0]);
        this.Privlist.push(this.Priv[1]);
        this.Privlist.push(this.Priv[2]);
      }
    } else {
      this.Privlist = this.navParams.data.key2;
      this.cang = false;
    }
    // if(this.navParams.data.key2.length>2 && this.cang==true){
    //     if(this.navParams.data.key4==true){
    //       this.Privlist.push(this.Priv[0]);
    //       this.Privlist.push(this.Priv[1]);



    //     }else{
    //       if(this.navParams.data.key2.length>2){
    //         this.Privlist.push(this.Priv[0]);
    //         this.Privlist.push(this.Priv[1]);
    //       }else{
    //         this.Privlist.push(this.Priv[0]);
    //         this.Privlist.push(this.Priv[1]);
    //         this.Privlist.push(this.Priv[2]);
    //       }

    //       if(this.navParams.data.key4==false){
    //         this.cang=false;
    //       }
    //     }
    //   }else{
    //     this.Privlist=this.Priv;
    //     this.cang=false;
    //   }
    //   if(this.navParams.data.key2.length==0){
    //     this.cang=false;
    //   }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopParticularsPage');
    this.aloneGoods();
    this.chaxunrenwu();

  }
  huoqugenduo() {
    this.Privlist = this.navParams.data.key2;
    this.cang = false;
  }
  zengsonglist() {
    let res = this.navParams.data.key4;
    if (typeof (res) == 'undefined' || res == null) {
      this.zengsong = false;
    } else {

      this.zengsong = true;
      //代金券
      if (typeof (res.cashvalue) == 'undefined' || res.cashvalue == 0) {
        this.fenxiang1 = false;
      } else {
        res.cashvalue = Math.floor(res.cashvalue);
        this.fenxiang1 = true;
      }

      //通话
      if (typeof (res.voicetimes) == 'undefined' || res.voicetimes == 0) {
        this.fenxiang2 = false;
      } else {
        res.voicetimes = Math.floor(res.voicetimes);
        this.fenxiang2 = true;
      }

      // 流量
      if (typeof (res.fluxpkgid) == 'undefined' || res.fluxpkgid == 0 || typeof (res.fluxPackage) == 'undefined') {
        this.fenxiang3 = false;
      } else {
        res.fluxPackage.ydfluxkbs = Math.floor(res.fluxPackage.ydfluxkbs);
        this.fenxiang3 = true;
      }
      if (typeof (res.costmoneyneed) == 'undefined' || res.costmoneyneed == 0) {
        this.zengsongmoshi = true;
      } else {
        this.zengsongmoshi = false;
      }
      let newDate1: any = new Date();
      newDate1.setTime(res.starttime);
      let start = newDate1.format('yyyy-MM-dd');

      let newDate2: any = new Date();
      newDate2.setTime(res.endtime);
      let end = newDate2.format('yyyy-MM-dd');
      res.qishiriqi = start + '起—' + end + '止';
      if (res.validday == 0) {

        res.qishiriqi = '长期有效';
      }
      this.fenxiangzengnsong = res;
    }
    console.log('任务==' + JSON.stringify(res));
  }

  aloneGoods() {
    let url = HttpUrl.aloneGoods + this.GoodsId;
    this.http.httpMethodContext(url, {}, (res, context) => {
      // 
      // context.isEmptyObject(res.propValues)
      // console.log('ssss='+JSON.stringify(context.isEmptyObject(res.propValues)))
      this.aloneDetail = res.detail;
      if (res.detail == undefined) {
        this.jieshao = false;
      } else {
        this.jieshao = true;
      }
      console.log('详情======' + JSON.stringify(this.aloneDetail));
    }, this)
  }

 



  Preferential(ShopInfo, item) {
    let myModal = this.modalCtrl.create('PreferentialModulePage', { key1: ShopInfo, key2: item, });
    myModal.present();
  }

  Back() {
    this.navCtrl.pop();
  }
  chaxunrenwu() {
    //查询分享任务
    let Taskid;
    let data = {
      bean: {
        type: 2,
        storeid: this.goodsList.storeid,
      }
    }
    this.http.httpMethodContext(HttpUrl.fenxiangrenwu, data, (res, context) => {
      // console.log(res)
      if (typeof (res.result) == 'undefined' || typeof (res.result.taskid) == 'undefined') {
        context.Taskid = '';

      } else {
        context.Taskid = res.result.taskid;
      }


    }, this);
  }
  fenxiang() {
    //查询分享任务
    
    console.log(JSON.stringify(this.GoodsName));
    console.log(JSON.stringify(this.StoreId));
    console.log(JSON.stringify(this.GoodsId));
    console.log(JSON.stringify(this.goodsface_900+this.goodsList.goodsface,));
    console.log(this.Taskid );
    (<any>window).Cordova.exec((res) => {

    }, (err) => { showToast('分享失败'); },
      "RyzShare", "share",
      [{
        "shareButtonLabe": "分享",
        "cancelButtonLabel": "取消",
        "shareTitle": "分享内容",
        "title": this.GoodsName,
        "text": "价格实惠，还获得了神秘礼品，赚到了，分享给你们",
        "url": "http://merch.diancall.com/modules/share/sharegoods/goods.html" + "?StoreId=" + this.StoreId + "?GoodsId=" + this.GoodsId + "?TaskId=" + this.Taskid,
        "imagePath": this.goodsface_900 + this.goodsList.goodsface,
      }]);
  }

}
