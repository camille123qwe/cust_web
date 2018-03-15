import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangePasswordsPage } from './change-passwords';

@NgModule({
  declarations: [
    ChangePasswordsPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangePasswordsPage),
  ],
  exports: [
    ChangePasswordsPage
  ]
})
export class ChangePasswordsPageModule {}
