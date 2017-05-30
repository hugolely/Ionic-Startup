﻿import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultatPage } from './resultat';

@NgModule({
  declarations: [
    ResultatPage,
  ],
  imports: [
    IonicPageModule.forChild(ResultatPage),
  ],
  exports: [
    ResultatPage
  ]
})
export class ResultatModule {}
