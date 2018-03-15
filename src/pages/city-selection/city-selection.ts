import { Component, ViewChild } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { Content } from 'ionic-angular';
import { loadScript } from '../../common/global';
import { HomePage } from '../home/home';
// import { $ } from 'zepto';

@Component({
  selector: 'page-city-selection',
  templateUrl: 'city-selection.html'
})
export class CitySelectionPage {
  myInput: string = '';
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
    let that = this;
    loadScript("http://zeptojs.com/zepto.min.js", function () { //加载,并执行回调函数
      that.indexOnClick();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CitySelectionPage');
  }
  onSearchInput(event) {

  }
  indexOnClick() {
    let $ = (<any>window).$;
    let context = this;
    //选择城市 start
    $('body').on('click', '.city-list p', function () {
      var type = $('.container').data('type');
      $('#zone_ids').html($(this).html()).attr('data-id', $(this).attr('data-id'));
      $('#gr_zone_ids').html($(this).html()).attr('data-id', $(this).attr('data-id'));

      console.log("html::" + $(this).html());
      console.log("data-id::" + $(this).attr('data-id'));
      context.close($(this).html());

    });

    //侧边栏索引
    $('body').on('click', '.letter a', function () {
      var s = $(this).html();
      let yOffset = document.getElementById(s + '1').offsetTop;
      context.content.scrollTo(0, yOffset + 350, 200);
    });

  }
  close(city) {
    this.viewCtrl.dismiss({ 'select_city': city });
  }
  selectNormal(event) {
    let target = event.target || event.srcElement;
    this.close(target.innerHTML);
  }
}
