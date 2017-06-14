import { Component, ViewChild, Injectable, ElementRef, Renderer, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ResultatPage } from '../resultat/resultat';
import { ProfilPage } from '../profil/profil';

import { Content } from 'ionic-angular';
import { getData } from '../resultat/getData';
import { Data } from '../../providers/data';

import { Http } from '@angular/http';
import { Keyboard } from '@ionic-native/keyboard';
import 'rxjs/add/operator/map';

import { AlertController } from 'ionic-angular';


@IonicPage()
@Injectable()
@Component({
    selector: 'page-search',
    templateUrl: 'search.html',

    animations: [
        trigger('fade', [
            state('visible', style({
                opacity: 1
            })),
            state('invisible', style({
                opacity: 0.1
            })),
        transition('visible <=> invisible', animate('200ms linear'))]
        )]
    })

export class SearchPage implements OnInit {
    @ViewChild(Content) contentHandle: Content;

    // set the parameters to hide the searchbar when scrolling, del
    //start = 0;
    //threshold = 75;
    //slideHeaderPrevious = 0;
    //ionScroll: any;
    showfooter: boolean;
    hidefooter: boolean;
    //headercontent: any;

    searchTerm: string = '';

    items: any;

    Resultat = ResultatPage;
    Profil = ProfilPage;

    peoples: Array<{ firstName: string, name: string, mail: string, bureau: string, }>;

    private showButton = false;
    private ionScroll; 
    fadeState: String = 'invisible';

    private boolun = false;
    private booldeux;
    private booltrois;

    private keyclosed = false;


    constructor(public navCtrl: NavController, public navParams: NavParams,
        public renderer: Renderer, public myElement: ElementRef,
        private getData: getData,
        private http: Http,
        public dataService: Data,
        private keyboard: Keyboard,
        private alertCtrl: AlertController) {

        this.showfooter = false;
        this.hidefooter = true;


        // get the data from JSON
        this.getData.getData().subscribe((data) => {
            this.peoples = data;
        });
    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad Search');
        this.setFilteredItems();
    }

    // filter the searched items
    setFilteredItems() {
        this.peoples = this.dataService.filterItems(this.searchTerm);
    }

    openPageWithData(page, data) {
        // navigate to the new page if it is not the current page
            this.navCtrl.push(page, { data });
    }
    openPage(page) {
        // navigate to the new page if it is not the current page
        this.navCtrl.push(page);
    }

    ngOnInit() {

        //this.ionScroll = this.myElement.nativeElement.children[1].firstChild;
        this.ionScroll = this.myElement.nativeElement.getElementsByClassName('scroll-content')[0];

        this.ionScroll.addEventListener("scroll", () => {
            console.log(this.keyboard.onKeyboardShow());
            if (this.keyboard.onKeyboardShow()) {
                this.keyboard.close();
            }

            if (this.ionScroll.scrollTop > window.innerHeight / 3) {
                this.fadeState = 'visible';
                this.showfooter = true;
                this.hidefooter = false;
            } else {
                this.fadeState = 'invisible';
                this.showfooter = false;
                this.hidefooter = true;
            }
        });
    }

    scrollToTop(scrollDuration) {
        this.contentHandle.scrollToTop(scrollDuration);
    }

    showRadio() {
        let alert = this.alertCtrl.create();
        alert.setTitle('Choix BDD');

        alert.addInput({
            type: 'radio',
            label: 'BDD 1',
            value: '1 ?',
            checked: this.boolun
        });
        alert.addInput({
            type: 'radio',
            label: 'BDD 2',
            value: '2 ?',
            checked: this.booldeux
        });
        alert.addInput({
            type: 'radio',
            label: 'BDD 3',
            value: '3',
            checked: this.booltrois
        });

        

        alert.addButton('Cancel');
        alert.addButton({
            text: 'OK',
            handler: data => {
                
            }
        })

        alert.present();
    }

}


