import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Navbar } from 'ionic-angular';
import { backButtonClick } from '../../common/global';

/**
 * Generated class for the FluxChargeSuccessPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-flux-charge-success',
  templateUrl: 'flux-charge-success.html',
})
export class FluxChargeSuccessPage {
  @ViewChild(Navbar) navBar: Navbar; 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FluxChargeSuccessPage');
   //this.navBar.backButtonClick = backButtonClick; 
  }
 

}
