import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
export class DataService {
    firstName:string;
    loggedIn:boolean;
    private dataSource = new BehaviorSubject<any[]>([]);
    currentData= this.dataSource.asObservable();

    private loggedInS = new BehaviorSubject<boolean>(false);
    currentLogedIn= this.loggedInS.asObservable();
  
    constructor() { }
  
    changeData(data: any[]) {
      this.dataSource.next(data)
    }

    changeLogedInStatus(data: boolean) {
        this.loggedInS.next(data)
      }
}