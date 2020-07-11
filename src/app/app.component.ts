import { FetchDataService } from './fetch-data.service';
import { Component } from '@angular/core';
import {HttpHelperService} from './http-helper.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UI';

  constructor(private httpService:HttpHelperService,private fetchData:FetchDataService){}
  serverData:any=null;
  async getData(){
    this.serverData = await this.httpService.getData();
    this.fetchData.changeServerData(this.serverData);
    

  }
}
