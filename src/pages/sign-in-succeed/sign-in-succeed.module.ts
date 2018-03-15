import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignInSucceedPage } from './sign-in-succeed';

@NgModule({
  declarations: [
    SignInSucceedPage,
  ],
  imports: [
    IonicPageModule.forChild(SignInSucceedPage),
  ],
  exports: [
    SignInSucceedPage
  ]
})
export class SignInSucceedPageModule {}
