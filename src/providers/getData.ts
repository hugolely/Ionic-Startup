import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class getDataT {
    constructor(public http: Http) { }

    getData() {
        return this.http.get("data/people.json")
            .map((res: Response) => res.json().people); 
    }


}