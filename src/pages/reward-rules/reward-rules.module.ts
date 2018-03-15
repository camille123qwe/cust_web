import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RewardRulesPage } from './reward-rules';

@NgModule({
  declarations: [
    RewardRulesPage,
  ],
  imports: [
    IonicPageModule.forChild(RewardRulesPage),
  ],
  exports: [
    RewardRulesPage
  ]
})
export class RewardRulesPageModule {}
