import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { GlobalProvider } from '../providers/global-provider';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpGet } from '../providers/http-get';
import { CityPickerModule } from  "ionic2-city-picker"
import {  CityPickerProvider } from '../providers/city-picker/city-picker';
import { QRCodeModule } from 'angular2-qrcode';
import { CityPickerDemoPage } from '../pages/city-picker-demo/city-picker-demo';
import { InvitePage } from '../pages/invite/invite';
import { HomePage } from '../pages/home/home';
import { MePage } from '../pages/me/me';
import { PrivilegeModaldulePage } from '../pages/privilege-modaldule/privilege-modaldule';
import { timeLimitAlertPage } from '../pages/time-limit-alert/time-limit-alert';
import { OrderBy } from '../pipes/order-by';
import { CallphonePage } from '../pages/callphone/callphone';

import { MyCouponPage } from '../pages/my-coupon/my-coupon';
import { NearbyStorePage } from '../pages/nearby-store/nearby-store';
import { ZhaopinListPage } from '../pages/zhaopin-list/zhaopin-list';
import { xianShiYouHuiPage } from '../pages/xianshiyouhui/xianshiyouhui';
import { xianShiShopPage } from '../pages/xianshishop/xianshishop';
import { HomeDeliveryDetailPage } from '../pages/home-delivery-detail/home-delivery-detail';
import { SignInPage } from '../pages/sign-in/sign-in';
import { LoginPage } from '../pages/login/login';
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    TabsPage,
    CityPickerDemoPage,
    InvitePage,
    HomePage,
    MePage,
    PrivilegeModaldulePage,
    timeLimitAlertPage,
    OrderBy,
    CallphonePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: 'true',         //ionic3隐藏全部子页面tabs
      mode: 'ios' 
    }),
    HttpModule,
    CityPickerModule,
    QRCodeModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    TabsPage,
    CityPickerDemoPage,
    InvitePage,
    HomePage,
    MePage,
    PrivilegeModaldulePage,
    timeLimitAlertPage,
    CallphonePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalProvider,
    HttpGet,
    CityPickerProvider,
    QRCodeModule
  ]
})
export class AppModule {}

