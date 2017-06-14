import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';

@Component({
    templateUrl: 'profil.html',
})
export class ProfilPage {
    // We bind content to the shrinkage attribute in the HTML template
    @ViewChild(Content) content: Content;

    constructor() { }
}
