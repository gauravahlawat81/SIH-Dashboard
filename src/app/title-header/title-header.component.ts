import { DbModel } from './../shared/models/db.model';
import { FetchDataService } from './../fetch-data.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

export interface TableData{
  creation_date:Date
  review:string
  school_name:string
}

@Component({
  selector: 'app-title-header',
  templateUrl: './title-header.component.html',
  styleUrls: ['./title-header.component.css']
})
export class TitleHeaderComponent implements OnInit {
  dataReceived:DbModel[]
  dataSource: MatTableDataSource<TableData>
  SchoolName = "Dummy School"
  SchoolID = -1
  SchoolAddress = "address of school"
  constructor(private fetchData:FetchDataService) { }

  ngOnInit(): void {
    this.fetchData.watchServerData.subscribe(res=>{
      this.dataReceived=res;
      console.log("Data received in first table");
      console.log(this.dataReceived);
      
      if(this.dataReceived!=null && this.dataReceived.length!==0){
        this.SchoolName = this.dataReceived[0].school_name
        this.SchoolID = this.dataReceived[0].school_id
        this.SchoolAddress = this.dataReceived[0].school_address
      }
    })
    this.fetchData.watchFilertedData.subscribe(res=>{
      this.dataReceived=res;
      console.log("Data received in first table");
      console.log(this.dataReceived);
      
      if(this.dataReceived!=null && this.dataReceived.length!==0){
       
      }

    })
  }

}
