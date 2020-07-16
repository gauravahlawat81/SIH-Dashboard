import { FetchDataService } from './fetch-data.service';
import { Component , OnInit} from '@angular/core';
import {HttpHelperService} from './http-helper.service'
import { AngularFireDatabase } from '@angular/fire/database'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {//implements OnInit{
  title = 'UI'
  items: any[]

  wholeSchool: any
  constructor(private httpService:HttpHelperService,private fetchData:FetchDataService,db: AngularFireDatabase){
    db.list('/School').valueChanges().subscribe(items => {
      this.items=items;
      console.log(this.items);
  })
  }
  /*serverData:any=null
  async ngOnInit(){
<<<<<<< HEAD
    var dataR = await this.getData()
    console.log("Data received ")
    console.log(dataR)
    this.fetchData.changeServerData(dataR)
=======
    var dataR = await this.getData();
    console.log("Data received ");
    console.log(dataR.data);
    this.fetchData.changeServerData(dataR.data);
>>>>>>> 8f2d670859f5a6b3b212de4b117ed083a222cbda
    
    
  }
  async getData(){
    this.serverData = await this.httpService.getData();
    return this.serverData;
    // this.fetchData.changeServerData(this.serverData);
    */

  }
//}
