import { HttpHelperService } from './../http-helper.service'
import {ChartDataSets,ChartType,ChartOptions} from 'chart.js'
import {Label} from 'ng2-charts'
import { DbModel } from './../shared/models/db.model'
import { FetchDataService } from './../fetch-data.service'
import { Component, OnInit,ViewChild } from '@angular/core'
import {MatTableDataSource} from '@angular/material/table'

export interface TableData{
  oanswer1:Date
  oanswer2:string
  sanalysis1:string
  sanalysis2:string
  avg_score:string
}

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})

export class BarChartComponent implements OnInit {

  dataReceived:DbModel[]
  dataSource: MatTableDataSource<TableData>
  hygiene_score = 0
  happiness_score = 0
  infrastructure_score = 0
  teacher_student_score = 0
  constructor(private fetchData:FetchDataService) { }

  ngOnInit(): void {
    this.fetchData.watchServerData.subscribe(res=>{
      this.dataReceived=res;
      console.log("Data received in first table");
      console.log(this.dataReceived);
      
      if(this.dataReceived!=null && this.dataReceived.length!==0){
        this.hygiene_score
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
