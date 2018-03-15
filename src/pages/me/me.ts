import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, App, AlertController } from 'ionic-angular';
import { Camera, ImagePicker, Transfer } from 'ionic-native';
import { HttpContents, HttpUrl, showToast, constVar, isLogin, goLogin } from '../../common/global';
import { HttpGet } from '../../providers/http-get';
import { GlobalProvider } from '../../providers/global-provider';
import { InvitePage } from '../invite/invite';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-me',
  templateUrl: 'me.html'
})
export class MePage {
  portrait: string;
  user_name: string = '';
  qrcode: string;
  col1_value: string = '';
  col1_key: string = '我的门店';
  col2_value: string = "";
  col2_key: string = "积分";
  col3_value: string = '';
  col3_key: string = "可通话时长";
  unread_count = 0;
  unread_show = false;

  constructor(private navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public globalProvider: GlobalProvider,
    public actionSheetCtrl: ActionSheetController, private http: HttpGet, private app: App) {
    // this.portrait = 'assets/img/th_imge.png';
    this.portrait = 'http://c.diancall.com/dir/custuser_128/' + localStorage.getItem('custuser36id') + '.jpg' + '?t=' + new Date().getTime();
    this.qrcode = 'assets/img/icon_erweima@2x.png';
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MePage');
  }
  ionViewDidEnter() {
    if (isLogin()) {
      //刷新头像
      this.portrait = 'http://c.diancall.com/dir/custuser_128/' + localStorage.getItem('custuser36id') + '.jpg' + '?t=' + new Date().getTime();
      this.getUserBaseData();
    } else {
      this.user_name = '点击登录';
    }
    this.getUnreadMsgCount();
  }
  getUnreadMsgCount() {
    this.http.httpMethodContext(HttpUrl.unReadMsgCount, {}, (res, context) => {
      if (res > 0) {
        this.unread_show = true;
        this.unread_count = res;
      }
    }, this);

  }
  ionViewWillEnter() {
    console.log('ionViewWillEnter MePage');
  }
  getUserBaseData() {
    this.http.httpMethodContext(HttpUrl.userbaseData, {}, this.onSuccess, this);
  }
  onSuccess(res, context) {
    // {"expers":0,"storecount":0,"voipvoicetimes":1800,"custuser36id":200000002,"custuserid":200000002,"username":""}
    console.log("个人信息获取成功！");
    if (res.username == "") {
      context.user_name = "设置昵称"
    } else {
      context.user_name = res.username;
    }
    localStorage.setItem("custusername", context.user_name);
    context.col1_value = res.storecount;
    context.col2_value = res.expers;
    context.col3_value = Math.floor(res.voipvoicetimes / 60 / 60) + "小时" + Math.floor(res.voipvoicetimes / 60 % 60) + '分';
  }
  qiandao() {
    if (!goLogin(this)) {
      return;
    }
    let alert = this.alertCtrl.create({
      title: '签到成功',
      buttons: ['确定']
    })
    alert.present();
  }

  login() {
    if (goLogin(this, true)) {
      this.changeNickNameAlert();
    }
  }
  changeNickNameAlert() {
    let prompt = this.alertCtrl.create({
      title: '更改用户名',
      message: "",
      inputs: [
        {
          name: 'username',
          placeholder: '用户名'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: data => {
            console.log(data);
            this.http.httpMethodContext(HttpUrl.changeNickname + '/username:' + data.username, {}, (res, context) => {
              if (res.retcode === 0) {
                this.user_name = data.username;
                localStorage.setItem("custusername", data.username);
              } else {
                showToast(res.retinfo);
              }
            }, this)
          }
        }
      ]
    });
    prompt.present();
  }
  editInfo() {
    if (goLogin(this)) {
       //this.app.getRootNav().push(InvitePage);
       this.navCtrl.push(InvitePage);
    }
  }
  editPortrait() {
    if (!goLogin(this)) {
      return;
    }
    let actionSheet = this.actionSheetCtrl.create({
      title: '更新头像',
      buttons: [
        {
          text: '从相册选择',
          cssClass: 'my_sheet_btn',
          handler: () => {
            console.log('从相册选择');
            this.getAlbumImage();

          }
        }, {
          text: '拍照',
          cssClass: 'my_sheet_btn',
          handler: () => {
            console.log('拍照');
            this.getCameraImage();
          }
        }, {
          text: '取消',
          cssClass: 'my_sheet_btn',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();

  }

  getAlbumImage() {
    //请求权限
    // ImagePicker.hasReadPermission().then((allow) => {
    //   if (allow) {
    //     console.log('相册权限允许');
    //     this.pickImages();
    //   } else {
    //     console.log('相册权限不允许,申请权限');

    //     ImagePicker.requestReadPermission().then( () => {
    //     console.log('相册权限申请');
    //       this.pickImages();
    //     })
    //   }
    // });

    this.pickImages();
  }

  pickImages() {
    let options = {
      maximumImagesCount: 1,
      width: 512,
      height: 512,
      quality: 70
    }
    console.log("options==" + JSON.stringify(options));

    ImagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI==' + results[i]);
      }
      this.upload(results[0]);
    }, (err) => { });
  }

  getCameraImage() {
    let options = {
      quality: 70,
      destinationType: 1,
      targetWidth: 512,
      targetHeight: 512,
      saveToPhotoAlbum: true,
      cameraDirection: 1,
      allowEdit: true,
    }
    console.log("options==" + JSON.stringify(options));

    Camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log('Image URI==' + imageData);
      this.upload(imageData);

    }, (err) => {
      // Handle error
    });
  }

  upload(file_path) {
    const fileTransfer = new Transfer();
    var options: any;
    // let portrait_file_name = 'custuser_128/' + localStorage.getItem('custuserid') + '_portrait_' + new Date().getTime() + '.jpg';
    // let portrait_file_name = localStorage.getItem('custuserid') + '.jpg';
    // console.log('portrait_file_name==' + portrait_file_name);

    options = {
      // fileKey: 'file',
      fileName: localStorage.getItem('custuser36id') + '.jpg',
      headers: { 'App-Agent': HttpContents.app_agent }

    }

    fileTransfer.upload(file_path, HttpUrl.changePortrait, options)
      .then((data) => {
        console.log('upload result==' + JSON.stringify(data));

        let res = JSON.parse(data.response);
        if (res.success) {
          showToast("图片上传成功！");
          console.log("图片上传成功！");
          this.portrait = 'http://c.diancall.com/dir/custuser_128/' + localStorage.getItem('custuser36id') + '.jpg' + '?t=' + new Date().getTime();

          // localStorage.setItem('portrait_file_name', portrait_file_name);
          // http://c.diancall.com/dir/custuser_128/3b2ozl.jpg

          // this.portrait = constVar.portrait_server_path + portrait_file_name;
        } else {
          let alert = this.alertCtrl.create({
            title: res.retinfo,
            buttons: ['确定'],
          })
          alert.present();
        }
      }, (err) => {
        // error
        console.log('upload error');
        let alert = this.alertCtrl.create({
          title: "图片上传失败",
          buttons: ['确定'],
        })
        alert.present();
      })
  }
  shezhi(){
    //this.app.getRootNav().push('SetPage')
    this.navCtrl.push('SetPage');
  }
  goNextPage(type) {
    if (!goLogin(this)) {
      return;
    }
    console.log("type==="+type);
    let nextPage;
    switch (type) {
      case 'message':
        this.unread_show = false;
        nextPage = 'MessagePage';
        break;
      case 'voucher':
        nextPage = 'MyCouponPage';
        break;
      case 'shop':
        nextPage = 'OpenStorePage';
        break;
      case 'invite':
        nextPage = InvitePage;
        break;
      case 'account':
        nextPage = 'AccountPage';
        break;
      case 'address':
        nextPage = 'MyAddressPage';
        break;
      case 'order': 
        nextPage = 'OrderOfGoodsPage';
        break;
      default:
        break;
    }

    //this.app.getRootNav().push(nextPage);
    this.navCtrl.push(nextPage);


  }

  myShopOnClick() {
    //this.app.getRootNav().push('MyShopPage');
    if (!goLogin(this)) {
      return;
    }
    this.navCtrl.push('MyShopPage');
  }
}
