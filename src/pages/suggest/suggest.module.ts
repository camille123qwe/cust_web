import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuggestPage } from './suggest';

@NgModule({
  declarations: [
    SuggestPage,
  ],
  imports: [
    IonicPageModule.forChild(SuggestPage),
  ],
  exports: [
    SuggestPage
  ]
})
export class SuggestPageModule {}
