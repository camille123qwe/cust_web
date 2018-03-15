import { Component } from '@angular/core';
import { NavController ,NavParams,AlertController,ViewController} from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';

@IonicPage()
@Component({
  selector: 'page-provision-alert',
  templateUrl: 'provision-alert.html'
})
export class provisionAlertPage {
  MyVoucherPage;
  store=[]
  constructor(public navCtrl: NavController,public alertCtrl:AlertController,public navParams:NavParams,private viewCtrl: ViewController) {
    // console.log(JSON.stringify(this.navParams.data));
    for(let item of this.navParams.data){
      this.store.push({storename:item.storename,distance:item.distance})
    }
    for(let item of this.store){
      if (item.distance == 0) {
        item.distance = '';
      } else if (item.distance <= 1000) {
        item.distance = "<" + 10 + "m";
      } else if (item.distance >= 100000) {
        item.distance = Math.floor(item.distance / 1000) / 100 + "km"
      } else {
        item.distance = Math.floor(item.distance / 100) + "m";
      }
    }
    // console.log(JSON.stringify(this.store));
  }
  giveData(item){
    let storename=item.storename
    let Item=this.navParams.data;
    for(let i=0;i<Item.length;i++){
      
      let store=Item[i];
      if(storename==store.storename){
        this.viewCtrl.dismiss(store);
        // console.log('xxxxx'+JSON.stringify(store));
        return;
      }
      
    }
    
  }
  present(event) {
    //点击阴影部分推出此页面
    let target = event.target || event.srcElement;
    if (typeof target.attributes["class"] != 'undefined') {
      if (target.attributes["class"].nodeValue != 'model') {
        this.navCtrl.pop();
      }
    }
  }
  
}


