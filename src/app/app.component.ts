import { DbModel } from './shared/models/db.model';
import { FetchDataService } from './fetch-data.service';
import { Component , OnInit} from '@angular/core';
import {HttpHelperService} from './http-helper.service'
import { AngularFireDatabase } from '@angular/fire/database'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UI'
  items:any;
  // school_address = 'School Address';
  wholeSchool: any
  constructor(private httpService:HttpHelperService,private fetchData:FetchDataService,private db: AngularFireDatabase){
    db.list('/Schools').valueChanges().subscribe(res => {
      this.items=res;
      console.log(this.items);
      var school_address = 'School Address'
      console.log(this.items[0].SchoolAddress);
      
      this.fetchData.changeServerData(this.items);
  })
  }
  // serverData:any=null
  // async ngOnInit(){
  //   var dataR = await this.getData()
  //   console.log("Data received ")
  //   console.log(dataR)
  //   this.fetchData.changeServerData(dataR)
    
    
  // }
  // async getData(){
  //   this.serverData = await this.db.list('/School').valueChanges().toPromise();
  //   return this.serverData;
  //   // this.fetchData.changeServerData(this.serverData);
  

  // }
}
