import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookServicePage } from './book-service';

@NgModule({
  declarations: [
    BookServicePage,
  ],
  imports: [
    IonicPageModule.forChild(BookServicePage),
  ],
  exports: [
    BookServicePage
  ]
})
export class BookServicePageModule {}
