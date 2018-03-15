import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import * as $ from 'jquery';
import { HttpContents, HttpUrl, showToast, constVar } from '../../common/global';
import { HttpGet } from '../../providers/http-get';

/**
 * Generated class for the DeliveryPopupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-delivery-popup',
  templateUrl: 'delivery-popup.html',
})
export class DeliveryPopupPage {
  arrs = [1, 2, 3, 4, 5, 6];
  count_number = 0;
  mian_show: boolean;
  ascertain: String;
  goods36id;
  specTitles = [];
  PropIds = {};
  yixuan = [];
  rule = [];
  rule2 = '';
  propvalueidArr = [];
  storeid;
  goodsface;
  goodsface_img900 = constVar.goodsfaceurl_900
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private http: HttpGet, public viewCtrl: ViewController) {
    this.init();
  }

  cancel() {
    event.stopPropagation();
    this.navCtrl.pop();
  }
  init() {
    console.log(this.navParams.data);
    this.goods36id = parseInt(this.navParams.data.goods36id).toString(36);
    this.http.httpMethodContext(HttpUrl.aloneGoods+this.goods36id,{},(res,context)=>{
      context.storeid = res.storeid;
      context.goodsface = res.goodsface;
        if (res.mincount) {
            context.count_number = res.mincount;
        }
        for (let item in res.propValues) {
          context.specTitles.push(item);
          console.log('this.specTitles==' + this.specTitles);
        }
    },this)
  }

  selectSpec(content) {
    console.log(JSON.stringify(this.rule.length));
    console.log(JSON.stringify(content));
    this.PropIds[content.propid] = content.propvalueid;
    if (this.rule.length == 0) {
      this.rule.push({ "rule1": content.valuename, 'rule2': content.propid });
    } else if (this.rule.length == 1) {
      for (let item of this.rule) {
        if (content.propid == item.rule2) {
          item.rule1 = content.valuename;
        } else {
          this.rule.push({ "rule1": content.valuename, 'rule2': content.propid });
        }
      }
    } else if (this.rule.length == 2) {
      for (let item of this.rule) {
        if (content.propid == item.rule2) {
          item.rule1 = content.valuename;
        }
      }

    }

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliveryPopupPage');
    $(function () {
      $(".Specifications").each(function () {
        let i = $(this);
        let p = i.find("ion-col");
        p.click(function () {
          p.removeClass("spec-selected");
          if (!!$(this).hasClass("spec-selected")) {
          } else {
            $(this).addClass("spec-selected");
          }
        })
      })
    });
  }

  reduce() {
    if (this.count_number <= 0) {
      let prompt = this.alertCtrl.create({
        title: "输入错误",
        buttons: [
          {
            text: "确定",
            handler: data => {
              console.log("确定 clicked");
            },
          }
        ]
      });
      prompt.present();
      this.count_number = 0;
    } else {
      this.count_number--;
    }
  }
  add() {
    this.count_number++;

  }

  present(event) {
    let target = event.target || event.srcElement;
    if (typeof target.attributes["class"] != 'undefined') {
      if (target.attributes["class"].nodeValue != 'model') {
        this.navCtrl.pop();
      }
    }
  }

  confirm() {
    if (this.count_number<=0) {
      let alert = this.alertCtrl.create({
        title: '商品数量有误',
        buttons: ['确定']
      })
      alert.present();
      console.log('数量不对');
      return;
    }

    for (let item in this.PropIds) {
      console.log(item)
      this.propvalueidArr.push(this.PropIds[item]);
    }

    console.log('propvalueidArr==' + this.propvalueidArr);
    let params = {
      bean: {
        cartgoodsitemsid: '',//	String	【主键】 c端商城购物车id，类单品id,6位custuser36id-5位storeid-9位create36time
        custuserid: localStorage.getItem("custuserid"),//		long	c端用户id
        goodsid: parseInt(this.goods36id,36),//		int	商品id
        count: this.count_number,//		int	件数
        storeid: this.storeid,//		int	商品关联门店id
      },
      cols: [],
      props: '[' + this.propvalueidArr + ']',
    }
    this.http.httpMethodContext(HttpUrl.add2custcart, params, (res, context) => {
      // {"result":{"count":12,"createtime":1503045219461,"merchuserid":100000032,"salegoodsid":10000017,"shopcartid":"1njcio-evu4w-j6hmbdrq","storeid":25000016},"retcode":0,"success":true}
      if (res.retcode == 0) {
        let prompt = this.alertCtrl.create({
          title: "提示",
          message: "商品已添加到购物车",
          buttons: [
            {
              text: "确定",
              handler: data => {
                console.log("确定 clicked");
                //  this.viewCtrl.dismiss({count_number:this.count_number})
                context.dismiss(this.count_number);
                
              },
            },
            {
              text: "去购物车结账",
              handler: data => {
                console.log("结账 clciked");
                this.navCtrl.push('ShopCarPage')

              }
            }
          ]
        });
        prompt.present();
      } else {
        let alert = context.alertCtrl.create({
          title: res.retinfo,
          buttons: ['确定']
        })
        alert.present();

       // showToast(res.retinfo);
      }
    }, this);
    this.propvalueidArr = [];
  }
  dismiss(item) {
    let data = { afterDelte: item };
    this.viewCtrl.dismiss(data);
    console.log("dismiss==" + JSON.stringify(data));

  }
}
