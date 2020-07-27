import { Component , OnInit,ViewChild, ElementRef } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { DbModel } from '../shared/models/db.model';
import { MatTableDataSource } from '@angular/material/table';
import { TableData } from '../bar-chart/bar-chart.component';
import { FetchDataService } from '../fetch-data.service';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-score-line-chart',
  templateUrl: './score-line-chart.component.html',
  styleUrls: ['./score-line-chart.component.css']
})
export class ScoreLineChartComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Scores' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(0,0,0,0)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  dataReceived:DbModel[]
  dataSource: MatTableDataSource<TableData>
  SchoolName = "Dummy School"
  SchoolID = -1
  SchoolAddress = "address of school"
  OverallReview = "overall review"
  constructor(private fetchData:FetchDataService) { }

  ngOnInit(): void {
    this.fetchData.watchServerData.subscribe(res=>{
      this.dataReceived=cloneDeep(res);
      console.log("Data received in review table through server data");
      console.log(this.dataReceived);
      
      if(this.dataReceived!=null && this.dataReceived.length!==0){
        this.SchoolName = this.dataReceived[0].SchoolName
        this.SchoolID = this.dataReceived[0].SchoolID
        this.SchoolAddress = this.dataReceived[0].SchoolAddress
        this.OverallReview = this.dataReceived[0].Records[this.dataReceived[0].Records.length-1].OverallReview
      }
    })

    this.fetchData.watchFilertedData.subscribe(res=>{
      this.dataReceived=cloneDeep(res);
      console.log("Data received in review  table through filter");
      console.log(this.dataReceived);
      
      if(this.dataReceived!=null && this.dataReceived.length!==0){
        this.SchoolName = this.dataReceived[0].SchoolName
        this.SchoolID = this.dataReceived[0].SchoolID
        this.SchoolAddress = this.dataReceived[0].SchoolAddress
        this.OverallReview = this.dataReceived[0].Records[this.dataReceived[0].Records.length-1].OverallReview
      }
    })
  }

}
