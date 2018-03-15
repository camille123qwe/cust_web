import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams ,AlertController,Navbar } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';
import { constVar,backButtonClick } from '../../common/global';
@Component({
  selector: 'page-invite',
  templateUrl: 'invite.html'
})
export class InvitePage {

  ponits: string = "20";
  invite_code: string;
  qrcode: any;
  file_name: string = 'invite_qrcode.png';

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
    this.invite_code = localStorage.getItem('custuser36id').toString().toUpperCase();
    console.log('this.invite_code==' + this.invite_code);
    this.createCode();
  }
  @ViewChild(Navbar) navBar: Navbar; 
  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitePage');
  //  this.navBar.backButtonClick = backButtonClick;
  }

  

  createCode() {
  
    let content = constVar.register_url+"?custuser36id="+this.invite_code;
     console.log('content=='+content);
     this.qrcode = content;
  }
}
