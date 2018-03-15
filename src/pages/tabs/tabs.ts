import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, Tabs, App } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MePage } from '../me/me';
import { CallphonePage } from '../callphone/callphone';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = HomePage;
  tab2Root: any = CallphonePage;
  tab3Root: any = MePage;
  
  constructor(public navCtrl:NavController) { 
  }
  call() {
    console.log("下载店呼app页面");
    this.navCtrl.push('CallphonePage');
  }
}
