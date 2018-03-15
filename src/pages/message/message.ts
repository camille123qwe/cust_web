import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Navbar } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpContents, HttpUrl,backButtonClick } from '../../common/global';

/**
 * Generated class for the MessagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

 tab1_class;
  tab2_class;
  msg_type: string;
  readList = [];
  unReadList = [];
  xiSh = true;
  infiniteScroll;
  left_side = { rows: [], offset: 0, total: 0 };  //未读
  right_side = { rows: [], offset: 0, total: 0 }; //已读
  limit = 20;
  loadingShops = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpGet) {
    this.tab1_class = "text-actived";
    this.tab2_class = "text-off";
    this.msg_type = 'unreadMsg';
  }
  @ViewChild(Navbar) navBar: Navbar; 

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
    this.getUnReadMsg(this.infiniteScroll);
    //this.navBar.backButtonClick = backButtonClick;
    
  }

  getReadMsg(infiniteScroll) {
    this.loadingShops = true;
    let dataParams = {
      flipper: {
        limit: this.limit,
        offset: this.right_side.offset,
      }
    }
    this.http.httpMethodContext(HttpUrl.readMessages, dataParams, (res, context) => {
      context.loadingShops = false;
      if (typeof (infiniteScroll) !== 'undefined') {
        infiniteScroll.complete();
      }
      context.right_side.rows = res.rows;
      context.right_side.total = res.total;
      if (res.total == -1) {
        this.xiSh = false
      } else {
        this.xiSh = true;
        let newDate1: any = new Date();
        for (let item of res.rows) {
          newDate1 = new Date();
          newDate1.setTime(item.readtime);
          item.readtime = newDate1.format('MM-dd hh:mm');
        }
        context.right_side.total = res.total;
        if (context.right_side.offset == 0) {
          context.right_side.rows = res.rows;
        } else {
          for (let item of res.rows) {
            context.right_side.rows.push(item);
          }
        }
      }
    }, this);
  }
  getUnReadMsg(infiniteScroll) {
    this.loadingShops = true;
    let dataParams = {
      flipper: {
        limit: this.limit,
        offset: this.left_side.offset,
      }
    }
    this.http.httpMethodContext(HttpUrl.unReadMessages, dataParams, (res, context) => {
      console.log('rows===1'+JSON.stringify(res.rows))
      context.loadingShops = false;
      if (typeof (infiniteScroll) !== 'undefined') {
        infiniteScroll.complete();
      }
      if (res.total == -1) {
        console.log('rows===2'+JSON.stringify(res.rows))
        this.xiSh = false;
      } else {
        this.xiSh = true;
        let newDate1: any = new Date();
        for (let item of res.rows) {
          newDate1 = new Date();
          newDate1.setTime(item.createtime);
          item.createtime = newDate1.format('MM-dd hh:mm');
        }
        context.left_side.total = res.total;
        if (context.left_side.offset == 0) {
          context.left_side.rows = res.rows;
        } else {
          for (let item of res.rows) {
            context.left_side.rows.push(item);
          }
        }
      }
    }, this);
  }

  formatData(array) {
    let newDate1: any = new Date();
    for (let item of array) {
      newDate1 = new Date();
      newDate1.setTime(item.createtime);
      item.createtime = newDate1.format('yyyy-MM-dd');
    }
    return array;
  }
  selectedUnread() {
    this.msg_type = 'unreadMsg';
    this.tab1_class = "text-actived";
    this.tab2_class = "text-off";
    this.getUnReadMsg(this.infiniteScroll);
  }
  selectedRead() {
    this.msg_type = 'readMsg';
    this.tab1_class = "text-off";
    this.tab2_class = "text-actived";
    this.getReadMsg(this.infiniteScroll);
  }
  toRead(item) {
    let url = HttpUrl.hasReadMessages + item.custmessageid;  //加id
    this.http.httpMethodContext(url, {}, (res, context) => {
      if (res.retcode == 0) {
        context.left_side.rows.splice(context.left_side.rows.indexOf(item), 1);
      } else {
        console.log('阅读消息失败');
      }


    }, this);
  }

  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;

    switch (this.msg_type) {
      case 'unreadMsg':
        if (this.left_side.offset + this.limit < this.left_side.total && !this.loadingShops) {
          console.log('加载更多');
          this.left_side.offset += this.limit;
          this.getUnReadMsg(infiniteScroll);
        }
        break;
      case 'readMsg':
        if (this.right_side.offset + this.limit < this.right_side.total && !this.loadingShops) {
          console.log('加载更多');
          this.right_side.offset += + this.limit;
          this.getReadMsg(infiniteScroll);
        }
        break;
      default:
        break;
    }
    infiniteScroll.complete();
  }

}
