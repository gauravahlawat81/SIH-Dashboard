import { HttpHelperService } from './http-helper.service';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  constructor(private httpService:HttpHelperService) { }
  private serverData:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  watchServerData = this.serverData.asObservable();

  changeServerData(val:any){
    this.serverData.next(val)
  }
}
