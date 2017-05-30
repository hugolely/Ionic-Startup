import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class getData {
    constructor(public http: Http) { }

    getData() {
        return this.http.get("data/people.json")
            .map((res: Response) => res.json().people); //records in this case
    }


}