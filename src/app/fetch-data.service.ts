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

  private filteredDate:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  watchFilertedData = this.filteredDate.asObservable();

  changeServerData(val:any){
    console.log("ServerData has been changed and new value is ");
    console.log(val);
    
    
    this.serverData.next(val)
  }

  changeFilteredDate(val:any){
    this.filteredDate.next(val);
  }

  getServerData(){
    return this.serverData.value;
  }
}
