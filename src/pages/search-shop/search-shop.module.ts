import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchShopPage } from './search-shop';

@NgModule({
  declarations: [
    SearchShopPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchShopPage),
  ],
  exports: [
    SearchShopPage
  ]
})
export class SearchShopPageModule {}