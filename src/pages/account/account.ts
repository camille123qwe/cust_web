import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,App,Navbar } from 'ionic-angular';
import { HttpGet } from '../../providers/http-get';
import { HttpContents, HttpUrl,isLogin, goLogin,backButtonClick } from '../../common/global';
import { GlobalProvider }from '../../providers/global-provider';

/**
 * Generated class for the AccountPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
 canvasx:number;
  canvasy:number;
  radius:number;
  col1_value: number;
  col1_textvalue:string="";
  col1_key: string = '本月获得流量';
  col2_value: number;
  col2_textvalue:string="";
  col2_key: string = "本月账户剩余流量";
  percent:number;
  fluxpoolid:string;
  custuserid:string;
  constructor(public navCtrl: NavController,private http: HttpGet, private navParams: NavParams,private app: App) {

  }
  @ViewChild(Navbar) navBar: Navbar; 

  ionViewDidLoad(){
    console.log('ionViewDidLoad AccountPage');
    //this.navBar.backButtonClick = backButtonClick; 
    //-----------获取当前账户流量池基本信息
     let data:Object={};
     this.http.httpMethodContext(HttpUrl.fluxPool,data,(res, context) => {
       console.log(res);
       console.log(context);
       context.col1_value=res.result.fluxgivecount/1024+res.result.fluxretcount/1024;
       context.col2_value=res.result.fluxretcount/1024;
       context.col1_textvalue=res.result.fluxgivecount/1024+res.result.fluxretcount/1024+"M";
       context.col2_textvalue=res.result.fluxretcount/1024+"M";
       context.custuserid = res.result.custuserid;
       context.fluxpoolid = res.result.fluxpoolid;
     
    //---------根据流量池流量剩余绘图---------------
    let canvas = <HTMLCanvasElement> document.getElementById('canvas');      //设置绘图环境      
    let box = document.getElementsByClassName('canvas-grid');
    let cxt = canvas.getContext('2d'); 
    canvas.width = box[0].clientWidth;
    canvas.height = box[0].clientHeight;
    this.canvasx = canvas.width/2;
    this.canvasy = canvas.height/2;
    if(this.canvasx>=this.canvasy){
      this.radius = this.canvasy-30;
    }else{
      this.radius = this.canvasx-30;
    }
 //（大虚线圆）----------------------------------  
   cxt.beginPath(); //画笔开始  
   cxt.lineWidth = 0;  //设置画笔的线宽  
   cxt.stroke ;  
   cxt.strokeStyle="#efeff4"; //设置画笔的颜色  
   cxt.setLineDash([3,5]);
   cxt.save(); //设置文字的样式
   cxt.fillStyle = '#333333';
   cxt.textAlign = 'center';
   cxt.textBaseline = 'middle';
   cxt.font = '18px bold arial';
   cxt.fillText('剩余流量', this.canvasx, this.canvasy/2+20);
   cxt.restore();
   cxt.arc(this.canvasx,this.canvasy,this.radius-30,0,360,false);  //绘制圆形，坐标250,250 半径200，整圆（0-360度），false表示顺时针  
   cxt.stroke();   //绘图  
   cxt.closePath();  //结束画布
//（小虚线园）------------------------------------
   cxt.beginPath();  //画笔开始  
   cxt.save();
   cxt.lineWidth = 0;  //设置画笔的线宽  
   cxt.stroke ;  
   cxt.strokeStyle="#efeff4";  
   cxt.setLineDash([2,2]);//设置虚线的宽和间隙
   cxt.restore();
   cxt.arc(this.canvasx,this.canvasy,this.radius/3,0,360,false);  //绘制圆形，坐标canvasx,canvasy 半径，整圆（0-360度），false表示顺时针  
   cxt.stroke();   //绘图
   cxt.closePath();  //结束画布
 //文字中间-------------------------------
   cxt.beginPath();
   cxt.save(); 
   cxt.fillStyle = '#fb6d07';
   cxt.textAlign = 'center';
   cxt.textBaseline = 'middle';
   cxt.font = '20px bold arial';
   cxt.fillText( context.col2_textvalue, this.canvasx, this.canvasy);
   cxt.restore();
   cxt.stroke();   //绘图
   cxt.closePath();  //结束画布
//灰色虚线圆环
   cxt.beginPath();  
   cxt.lineWidth = 40;  //设置画笔的线宽  
   cxt.stroke ;  
   cxt.strokeStyle="#efeff4";  
   cxt.setLineDash([11,11]);
   cxt.arc(this.canvasx,this.canvasy,this.radius,-(Math.PI/180)*90,(Math.PI/180)*(360-90),true);  //绘制圆形，坐标250,250 半径200，整圆（0-360度），false表示顺时针  
   cxt.stroke();   //绘图  
   cxt.closePath();  //结束画布
//（渐变圆环）----------------------------------  
  this.percent = (this.col1_value-this.col2_value)/this.col1_value*360;
  console.log(this.percent);
   cxt.beginPath();  //画笔开始  
   cxt.lineWidth = 40;  //设置画笔的线宽  
   cxt.stroke ;  
   cxt.setLineDash([11,11]);
   let grd=cxt.createLinearGradient(0,0,170,0); 
   grd.addColorStop(0,"#fbbf1c");
   grd.addColorStop(1,"#fb6d07"); 
   cxt.strokeStyle = grd; 
   cxt.arc(this.canvasx,this.canvasy,this.radius,-(Math.PI/180)*90,(Math.PI/180)*(this.percent-90),true);  //绘制圆形，坐标250,250 半径200，整圆（0-360度），false表示顺时针  
   cxt.stroke();   //绘图  
   cxt.closePath();  //结束画布
   },this);
  }
   goNextPage(type) {
    if (!goLogin(this)) {
      return;
    }
    let nextPage;
    switch (type) {
      case 'flowsCharge':
        nextPage = 'FluxChargePage';
        break;
      case 'flowsGive':
        nextPage = 'FluxGivePage';
        break;
      default:
        break;
    }
    //this.app.getRootNav().push(nextPage);
     this.navCtrl.push(nextPage,{
       custuserid:this.custuserid,
       fluxpoolid:this.fluxpoolid
     });

  }
  doRefresh(refresher) {
   
     setTimeout(() => {
       //console.log('Async operation has ended');
       refresher.complete();
     }, 2000);
   }
}
