import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { SocialSharing } from '@ionic-native/social-sharing';
import { Data } from '../../providers/data';

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
        private file: File,
        private dataService: Data) {

      // get the data from previous page
        this.data = navParams.get('data');

        this.file.checkFile(this.file.dataDirectory, 'contact.vcf').then(_ => {
            this.file.removeFile(this.file.dataDirectory, 'contact.vcf').then(_ =>
                this.dataService.createVCF(this.data)
        )})
            .catch(err => this.dataService.createVCF(this.data));
        
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

    // Send mail to
    writeMail(mail) {
        window.open('mailto:' + mail);
    }

    // Send SMS to
    console(numero) {
        window.open('sms:' + numero);
    }

    openPage(page, data) {
        this.navCtrl.push(page, { data });
    }

    shareContact() {
        this.socialSharing.share(null, null, this.file.dataDirectory + '/contact.vcf', null);
    }


  ionViewDidLoad() {
      console.log('ionViewDidLoad Resultat');
  }
    
  createFileIo() {
      this.file.createFile(this.file.dataDirectory, "vCard", false).then(_ => alert('File created')).catch(err => alert('File not created'));
  }

}

