import { Injectable } from '@angular/core';
import { getDataT } from './getData';
import { Http } from '@angular/http';
import 'rxjs';
import { File } from '@ionic-native/file';

/*
  Generated class for the Data provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Data {

    items: any;
    peoples: Array<{ firstName: string, name: string, mail: string, bureau: string, }>;
    constructor(public http: Http,
        public getData: getDataT,
        private file: File) {
        
        this.getData.getData().subscribe((data) => {
            this.peoples = data;
        });
    }


    filterItems(searchTerm) {
        var nameLong: string;

        if (searchTerm != '' ) {
            return this.peoples.filter((item) => {
                nameLong = item.firstName + ' ' + item.name;
                return (nameLong.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
            });
        }
    }

    decale(mot, lettre: string) {
        var i = 0;
        var newMot = "";

        for (i = 0; i < mot.length - 1; i++) {
            newMot += mot[i + 1];
        }
        newMot += lettre;

        return newMot;
        
    }

    test() {
        var testDecale ="etest";
        var lettre = "é";
        this.decale(testDecale, lettre);
    }

    createVCF(data){
        this.file.writeFile(this.file.dataDirectory, 'contact.vcf',
            `BEGIN:VCARD
VERSION:3.0
N:`+ data.name + `;` + data.firstName + `;;
FN:`+ data.firstName + ' ' + data.name + `
ORG:SERVICES INTERNES FRANCE;SOLUTIONS APPLICATIVES MOBILITE
TITLE:DEVELOPPEUR INFORMATIQUE
TEL;TYPE=GSM,MSG:`+ data.bureau + `
TEL;TYPE=WORK,VOICE:03 28 80 80 80
EMAIL;TYPE=PREF,INTERNET:`+ data.mail + `
REV:2017-06-13T15:58:29Z
END:VCARD`
            , true)
    }
}
