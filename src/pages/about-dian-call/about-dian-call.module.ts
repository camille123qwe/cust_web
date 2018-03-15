import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutDianCallPage } from './about-dian-call';

@NgModule({
  declarations: [
    AboutDianCallPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutDianCallPage),
  ],
  exports: [
    AboutDianCallPage
  ]
})
export class AboutDianCallPageModule {}