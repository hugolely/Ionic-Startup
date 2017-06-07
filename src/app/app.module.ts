﻿import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { getData } from '../pages/resultat/getData';

import { SearchPage } from '../pages/search/search';
import { ResultatPage } from '../pages/resultat/resultat';
import { ElasticHeader } from '../components/elastic-header/elastic-header';

import { Data } from '../providers/data';
import { getDataT } from '../providers/getData';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SocialSharing } from '@ionic-native/social-sharing';
import { File } from '@ionic-native/file';
import { Keyboard } from '@ionic-native/keyboard';

@NgModule({
  declarations: [
    MyApp,
      SearchPage,
      ResultatPage,
      ElasticHeader
  ],
  imports: [
      BrowserModule,
      HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
      SearchPage,
      ResultatPage
      
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
      getDataT,
      getData,
      Data,
      SocialSharing,
      File,
      Keyboard

  ]
})
export class AppModule {}
