import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { SocialSharing } from '@ionic-native/social-sharing';

import { File } from '@ionic-native/file';


declare var window:any;
/**
 * Generated class for the Resultat page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Injectable()
@Component({
  selector: 'page-resultat',
  templateUrl: 'resultat.html'
})
export class ResultatPage {

    data:{ firstName: string, name: string, mail: string, bureau: string };
    posts: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        private socialSharing: SocialSharing,
        private file: File) {

      // get the data from previous page
        this.data = navParams.get('data');
        console.log(this.data);
    }

    
    // call the number
    showConfirm(nbr) {
        let confirm = this.alertCtrl.create({
            title: 'Appel',
            message: 'Voulez vous appeler ce numéro ?',
            buttons: [
                {
                    text: 'Non',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Appeler',
                    handler: () => {
                        console.log('Agree clicked');
                        window.open('tel:' + nbr);
                    }
                }
            ]
        });
        confirm.present();
    }

    writeMail(wrd) {
        window.location = 'mailto:wrd';
    }

    console() {
        console.log("sms sending");
    }

    openPage(page) {
        this.navCtrl.setRoot(page);
    }

    shareContact() {
        this.socialSharing.share("hello", null, null, null);
    }

    shareMail() {
        this.socialSharing.shareViaEmail("Hello", "Test", ["hule@hotmail.fr"], null, null, null)
    }


  ionViewDidLoad() {
      console.log('ionViewDidLoad Resultat');
  }

    // Test writing mail
  createFileIo() {
      alert(this.file.getFreeDiskSpace());
      this.file.createFile("premierTest/temp", "vCard", true).then(_ => alert('Directory exists')).catch(err => alert('Directory doesnt exist'));;
  }

}

