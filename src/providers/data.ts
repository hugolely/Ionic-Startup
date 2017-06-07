import { Injectable } from '@angular/core';
import { getDataT } from './getData';
import { Http } from '@angular/http';
import 'rxjs';

/*
  Generated class for the Data provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Data {

    items: any;
    peoples: Array<{ firstName: string, name: string, mail: string, bureau: string, }>;
    constructor(public http: Http, public getData: getDataT) {

        //this.items = [
        //    { title: 'one' },
        //    { title: 'two' },
        //    { title: 'three' },
        //    { title: 'four' },
        //    { title: 'five' },
        //    { title: 'six' }
        //];

        this.getData.getData().subscribe((data) => {
            console.log("what is in the data ", data);
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
}
