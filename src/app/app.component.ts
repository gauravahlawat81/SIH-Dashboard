import { FetchDataService } from './fetch-data.service';
import { Component , OnInit} from '@angular/core';
import {HttpHelperService} from './http-helper.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'UI';

  constructor(private httpService:HttpHelperService,private fetchData:FetchDataService){}
  serverData:any=null;
  async ngOnInit(){
    var dataR = await this.getData();
    console.log("Data received ");
    console.log(dataR);
    this.fetchData.changeServerData(dataR);
    
    
  }
  async getData(){
    this.serverData = await this.httpService.getData();
    return this.serverData;
    // this.fetchData.changeServerData(this.serverData);
    

  }
}
