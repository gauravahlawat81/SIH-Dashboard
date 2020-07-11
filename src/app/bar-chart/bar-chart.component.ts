import { FetchDataService } from './../fetch-data.service';
import { HttpHelperService } from './../http-helper.service';
import { Component, OnInit } from '@angular/core'; 
import {ChartDataSets,ChartType,ChartOptions} from 'chart.js'
import {Label} from 'ng2-charts'
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor(private httpservice:HttpHelperService,private fetchData:FetchDataService) { }
  serverData:any=null;
  ngOnInit(): void {
    console.log("initialized bar chart");
    this.fetchData.watchServerData.subscribe(res=>{
      this.serverData = res;
      console.log(this.serverData);

      
    })
    
    // barChartData:ChartDataSets[]=[
  //   {data:[this.serverData.avergae_score,
  //   this.serverData.hygiene_score,
  //   this.serverData.teaching_score,
  //   this.serverData.school_score,
  //   this.serverData.student_score,
  //   this.serverData.happiness_score
  //   ],label:'Scores'}
  // ]
    
   
  }
  barChartOptions:ChartOptions ={
    responsive:true,
    scales:{xAxes:[{}],yAxes:[{
      ticks:{
        max:10,
        min:0
      }
    }] },

  };
  barChartsLabel:Label[] = ['Avergae Score','Hygeine Score','Teaching Score','School Score','Student Score','Happiness Score']
  barChartType:ChartType ='bar';
  barChartLegend=true;
  barChartPlugins=[];

  barChartData:ChartDataSets[]=[{ data: [5, 4, 6, 7, 8, 8,], label: 'Company A' }]

  //   barChartData:ChartDataSets[]=[
  //   {data:[this.serverData.avergae_score,
  //   this.serverData.hygiene_score,
  //   this.serverData.teaching_score,
  //   this.serverData.school_score,
  //   this.serverData.student_score,
  //   this.serverData.happiness_score
  //   ],label:'Scores'}
  // ]

  


}
