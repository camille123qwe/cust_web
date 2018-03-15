
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import * as $ from 'jquery';
import { HttpUrl, showToast, constVar, globalVar, isLogin, goLogin,commonwxshare } from '../../common/global';
import { HttpGet } from '../../providers/http-get';
import { Button } from 'ionic-angular/components/button/button';
/// <reference path="plugin/openinstall/openinstall.d.ts"/>  
/**
 * Generated class for the TurntablePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info conmmon
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
	selector: 'page-turntable',
	templateUrl: 'turntable.html',
})
export class TurntablePage {
	turnplate = {
		restaraunts: [],				//大转盘奖品名称
		colors: [],					//大转盘奖品区块对应背景颜色
		outsideRadius: 192,			//大转盘外圆的半径
		textRadius: 155,				//大转盘奖品位置距离圆心的距离
		insideRadius: 68,			//大转盘内圆的半径
		startAngle: 0,				//开始角度
		bRotate: false				//false:停止;ture:旋转
	};
	shifoukaishi = false;
	cj_img = "assets/img/jt_img.png";
	structorAngles = 1080;
	giftname = '';
	giftTittle = '';
	jihui = 0;
	count_number = 0;
	footerShow = false;
	giftImg = [];
	//giftSrc = constVar.giftImg;
	yinying=false;
	relations=[];
	constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpGet, public alertCtrl: AlertController, public modalCtrl: ModalController, ) {
		this.giftImg = this.navParams.get('gifImg');
		this.pointer();
		commonwxshare();
		

	}
	aaa(data) {
		console.log('datadata==' + JSON.stringify(data))
	}
	ionViewDidEnter() {
		this.turnplate.restaraunts=[];
		this.mycdrcount();
		for (let item of this.navParams.get('gift')) {
			this.turnplate.restaraunts.push(item.awardtitle)
		}
		// this.turnplate.restaraunts=['一等奖','一等奖','而等奖','一等奖','三等奖','一等奖','四等奖','五等奖','一等奖','一等奖']
		if (this.turnplate.restaraunts.length !== 0) {
			this.drawRouletteWheel();
		}


	}
	back() {
		this.navCtrl.pop();
	}

	purchase() {
		this.yinying=true;
		this.footerShow = !this.footerShow;
	}
	conback(){
		this.yinying=false;
		this.footerShow = !this.footerShow;
	}
	reduce() {
		if (this.count_number <= 0) {
			showToast('不能在减啦');
			this.count_number = 0;
		} else {
			this.count_number--;
		}

	}
	add() {
		this.count_number++;
	}
	//抽奖机会
	mycdrcount() {
		this.http.httpMethodContext(HttpUrl.mycdrcount, {}, (res, context) => {
			this.jihui = res.restcdrcount||0
		}, this)
	}
	//{"result":{"createtime":1511855216305,"custgoodsorderid":"20171128154656792458","custuserid":200000001,"expecttime":0,"expressmoney":0,
	// "ordertitle":"抽奖次数充值：1","ordertype":30,"payedtime":0,"paystatus":10,"status":1,"storeid":0,"totalcount":1,"totalgoodsprice":100,
	// "totaltypecount":1,"updatetime":0},"retcode":0,"success":true}
	goPay() {
		if (this.count_number <= 0) {
			//showToast('最少购买一个哟！');
			let alert = this.alertCtrl.create({
				title:"最少购买一个哦",
				buttons: ['确定']
			})
			alert.present();
		} else {
			let data = {
				'bean': {
					custuserid: localStorage.getItem("custuserid"),
					ordertype: 30,
					totalgoodsprice: this.count_number,
					totalcount: this.count_number,
				}
			}
			this.http.httpMethodContext(HttpUrl.recharge, data, (res, context) => {
				if (res.retcode == 0) {
					this.navCtrl.push('PaymentPage', { custgoodsorderid: res.result.custgoodsorderid, totalprice: res.result.totalgoodsprice });
				}
			}, this)
		}


	}
	ionViewDidLoad() {
		this.turnplate.colors = ["#ffd67e", "#ff5335", "#ffd67e", "#ff5335", "#ffd67e", "#ff5335", "#ffd67e", "#ff5335", "#ffd67e", "#ff5335",
								 "#ffd67e", "#ff5335", "#ffd67e", "#ff5335", "#ffd67e", "#ff5335", "#ffd67e", "#ff5335", "#ffd67e", "#ff5335",
								 "#ffd67e", "#ff5335", "#ffd67e", "#ff5335", "#ffd67e", "#ff5335", "#ffd67e", "#ff5335", "#ffd67e", "#ff5335"
							    ];
	}
	pointerDdaward() {
		this.http.httpMethodContext(HttpUrl.pointerDdaward, {}, (res, context) => {
			if(typeof(res.result.discountInfo)=='undefined' || res.result.discountInfo=='' ){
				context.relations=''
			}else{
				context.relations=res.result.discountInfo.relations;
			}	
			
			context.giftname = res.result.awardtitle;
			let canvas = <HTMLCanvasElement>document.getElementById('wheelcanvas');
			let angles;

			//思路：第一个奖品是从90度开始排列，360-（90+（360/奖品个数）*第n个奖品即为该奖品指针的指向的奖品）
			let gifts = context.turnplate.restaraunts.length;//奖品个数
			let giftAngles = 360 / gifts;//奖品占比角度
			for (let i = 0; i < context.turnplate.restaraunts.length; i++) {
				if(context.navParams.get('gift')[i].cdrawardid==res.result.cdrawardid){
					angles = context.structorAngles + 360 - (90 + i * giftAngles) - context.rnd(1, giftAngles - 1);//计算该奖品需要转的角度
				}
			}
			canvas.style.transform = "rotate(" + angles + "deg)";
			canvas.style.transition = 'all 4s ease-in-out';
			context.structorAngles += 1080;
		}, this)
		let timepiece = setInterval(() => {
			for (let item of this.navParams.get('gift')) {
				if (this.giftname==item.awardtitle){ 
					this.giftTittle=item.awarddetail;
					let myModal = this.modalCtrl.create('SignInSucceedPage', { 'data': this.giftTittle,'relations':this.relations, 'type': 'truntable' });
					myModal.present();
					clearInterval(timepiece)
					this.structorAngles += 1080;
					this.shifoukaishi = false;
					this.mycdrcount();
				}
			}
			
		}, 5000)
	}
	pointer(){
		
		let data = {"pageName":"xianShiShopPage"};
		    new OpenInstall({
		        appKey : "fhgawx",
		        /*可选参数，自定义android平台的apk下载文件名，只有apk在openinstall托管时才有效；
		         个别andriod浏览器下载时，中文文件名显示乱码，请慎用中文文件名！*/
		        apkFileName : "diancall-cust.apk",
		        /*可选参数，是否优先考虑拉起app;某些android浏览器无法拉起app(或拉取体验不佳)的情况下，
		         将使用H5遮罩的形式提示用户用其他浏览器打开*/
		        preferWakeup:true,
		        onready : function() {
		            var m = this,button = $(".pointer");
					button[0].style.visibility="visible";
					button[0].onclick=function(){
						//500毫秒后app尚未拉起，将安装app，可自定义超时时间，单位为毫秒
						m.wakeupOrInstall({timeout:2000});
					};
		        }
			}, data);
		}
	rotateFn(item, txt) {
		let angles = item * (360 / this.turnplate.restaraunts.length) - (360 / (this.turnplate.restaraunts.length * 2));
		if (angles < 270) {
			angles = 270 - angles;
		} else {
			angles = 360 - angles + 270;
		}
	};


	rnd(n, m) {
		let random = Math.floor(Math.random() * (m - n + 1) + n);
		return random;
	}

	drawRouletteWheel() {
		let canvas = <HTMLCanvasElement>document.getElementById('wheelcanvas');
		if (canvas.getContext) {
			//根据奖品个数计算圆周角度
			var arc = Math.PI / (this.turnplate.restaraunts.length / 2);
			var ctx = canvas.getContext("2d");
			//在给定矩形内清空一个矩形
			ctx.clearRect(0, 0, 422, 422);
			//strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式  
			ctx.strokeStyle = "#FFBE04";
			//font 属性设置或返回画布上文本内容的当前字体属性
			ctx.font = 'bold 20px Microsoft YaHei';
			for (var i = 0; i < this.turnplate.restaraunts.length; i++) {
				var angle = this.turnplate.startAngle + i * arc;
				ctx.fillStyle = this.turnplate.colors[i];
				ctx.beginPath();
				//arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）    
				ctx.arc(211, 211, this.turnplate.outsideRadius, angle, angle + arc, false);
				ctx.arc(211, 211, this.turnplate.insideRadius, angle + arc, angle, true);
				ctx.stroke();
				ctx.fill();
				//锁画布(为了保存之前的画布状态)
				ctx.save();

				//改变画布文字颜色
				var b = i + 2;
				if (b % 2) {
					ctx.fillStyle = "#FFFFFF";
				} else {
					ctx.fillStyle = "#E5302F";
				};
				//----绘制奖品开始----
				var text = this.turnplate.restaraunts[i];
				var line_height = 17;
				//translate方法重新映射画布上的 (0,0) 位置
				ctx.translate(211 + Math.cos(angle + arc / 2) * this.turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * this.turnplate.textRadius);

				//rotate方法旋转当前的绘图
				ctx.rotate(angle + arc / 2 + Math.PI / 2);

				/** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
				if (text.indexOf("盘") > 0) {//判断字符进行换行
					var texts = text.split("盘");
					for (var j = 0; j < texts.length; j++) {
						ctx.font = j == 0 ? 'bold 20px Microsoft YaHei' : 'bold 18px Microsoft YaHei';
						if (j == 0) {
							ctx.fillText(texts[j] + "盘", -ctx.measureText(texts[j] + "盘").width / 2, j * line_height);
						} else {
							ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height * 1.2); //调整行间距
						}
					}
				} else if (text.indexOf("盘") == -1 && text.length > 8) {//奖品名称长度超过一定范围 
					text = text.substring(0, 8) + "||" + text.substring(8);
					var texts = text.split("||");
					for (var j = 0; j < texts.length; j++) {
						ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
					}
				} else {

					//在画布上绘制填色的文本。文本的默认颜色是黑色

					//measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
					ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
				}

				//添加对应图标

				for(let i=0;i<this.turnplate.restaraunts.length;i++){

					// ["四等奖","五等奖","参与鼓励奖","再接再厉哦","三等奖","二等奖","一等奖","特等奖"]
				if (text.indexOf(this.turnplate.restaraunts[i]) >= 0) {
					if(this.turnplate.restaraunts[i]=='再接再厉哦'){
						let img = <HTMLCanvasElement>document.getElementById("diy7-img");
						img.onload = function () {
							ctx.drawImage(img, -35, 15);
						};
						ctx.drawImage(img, -35, 15);
					};
					if(this.turnplate.restaraunts[i]=='四等奖'){
						let img = <HTMLCanvasElement>document.getElementById("diy8-img");
						img.onload = function () {
							ctx.drawImage(img, -35, 15);
						};
						ctx.drawImage(img, -35, 15);
					};if(this.turnplate.restaraunts[i]=='五等奖'){
						let img = <HTMLCanvasElement>document.getElementById("diy6-img");
						img.onload = function () {
							ctx.drawImage(img, -35, 15);
						};
						ctx.drawImage(img, -35, 15);
					};if(this.turnplate.restaraunts[i]=='参与鼓励奖'){
						let img = <HTMLCanvasElement>document.getElementById("diy5-img");
						img.onload = function () {
							ctx.drawImage(img, -35, 15);
						};
						ctx.drawImage(img, -35, 15);
					};if(this.turnplate.restaraunts[i]=='三等奖'){
						let img = <HTMLCanvasElement>document.getElementById("diy4-img");
						img.onload = function () {
							ctx.drawImage(img, -35, 15);
						};
						ctx.drawImage(img, -35, 15);
					};if(this.turnplate.restaraunts[i]=='二等奖'){
						let img = <HTMLCanvasElement>document.getElementById("diy3-img");
						img.onload = function () {
							ctx.drawImage(img, -35, 15);
						};
						ctx.drawImage(img, -35, 15);
					};if(this.turnplate.restaraunts[i]=='一等奖'){
						let img = <HTMLCanvasElement>document.getElementById("diy2-img");
						img.onload = function () {
							ctx.drawImage(img, -35, 15);
						};
						ctx.drawImage(img, -35, 15);
					};if(this.turnplate.restaraunts[i]=='特等奖'){
						let img = <HTMLCanvasElement>document.getElementById("diy1-img");
						img.onload = function () {
							ctx.drawImage(img, -35, 15);
						};
						ctx.drawImage(img, -35, 15);
					};
				};
			}
				//把当前画布返回（调整）到上一个save()状态之前 
				ctx.restore();
				//----绘制奖品结束----
			}
		}
	};

}
