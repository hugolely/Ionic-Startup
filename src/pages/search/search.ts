import { Component, ViewChild, Injectable, ElementRef, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ResultatPage } from '../resultat/resultat';
import { Content } from 'ionic-angular';
import { getData } from '../resultat/getData';
import { Data } from '../../providers/data';
import { Http } from '@angular/http';
import { Keyboard } from '@ionic-native/keyboard';
import 'rxjs/add/operator/map';

/**
 * Generated class for the Search page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
    @Injectable()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
    @ViewChild("ContentRef") contentHandle: Content;

    // set the parameters to hide the searchbar when scrolling
    start = 0;
    threshold = 75;
    slideHeaderPrevious = 0;
    ionScroll: any;
    showheader: boolean;
    hideheader: boolean;
    headercontent: any;

    searchTerm: string = '';

    items: any;

    Resultat = ResultatPage;

    peoples: Array<{ firstName: string, name: string, mail: string, bureau: string, }>;


    constructor(public navCtrl: NavController, public navParams: NavParams,
        public renderer: Renderer, public myElement: ElementRef,
        private getData: getData,
        private http: Http,
        public dataService: Data,
        private keyboard: Keyboard) {
        //this.initializeItems()

        this.showheader = false;
        this.hideheader = true;


        // get the data from JSON
        this.getData.getData().subscribe((data) => {
            console.log("what is in the data ", data);
            this.peoples = data;
        });
    }
    

  ionViewDidLoad() {
      console.log('ionViewDidLoad Search');
      this.setFilteredItems();
      this.keyboard.show();
  }

    // filter the searched items
  setFilteredItems() {
      this.peoples = this.dataService.filterItems(this.searchTerm);
  }

  openPage(page, data) {
      // navigate to the new page if it is not the current page
      this.navCtrl.push(page, { data });
  }

  ngOnInit() {
      // Ionic scroll element
      this.ionScroll = this.myElement.nativeElement.getElementsByClassName('scroll-content')[0];
      // On scroll function
      this.ionScroll.addEventListener("scroll", () => {
          if (this.ionScroll.scrollTop - this.start > this.threshold) {
              this.showheader = true;
              this.hideheader = false;
          } else {
              this.showheader = false;
              this.hideheader = true;
          }
          if (this.slideHeaderPrevious >= this.ionScroll.scrollTop - this.start) {
              this.showheader = false;
              this.hideheader = true;
          }
          this.slideHeaderPrevious = this.ionScroll.scrollTop - this.start;
      });
  }


}
