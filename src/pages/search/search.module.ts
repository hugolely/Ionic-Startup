import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchPage } from './search';
import { ResultatPage } from '../resultat/resultat';

@NgModule({
  declarations: [
      SearchPage,
      ResultatPage
  ],
  imports: [
    IonicPageModule.forChild(SearchPage),
  ],
  exports: [
      SearchPage,
      ResultatPage
  ]
})
export class SearchModule {}
