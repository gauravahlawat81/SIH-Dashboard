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
  dataRecieved:any=null;
  ngOnInit(): void {
    console.log("initialized bar chart");
    this.fetchData.watchServerData.subscribe(res=>{
      this.dataRecieved = res;
      console.log("new value received");
      console.log(this.dataRecieved);
      if(this.dataRecieved!==null){
        this.createGraph()
      }
      
    })
    this.fetchData.watchFilertedData.subscribe(res =>{
      this.dataRecieved = res;

      if(this.dataRecieved!==null){
        this.createGraph()
      }
    })
    
    // barChartData:ChartDataSets[]=[
  //   {data:[this.dataRecieved.avergae_score,
  //   this.dataRecieved.hygiene_score,
  //   this.dataRecieved.teaching_score,
  //   this.dataRecieved.school_score,
  //   this.dataRecieved.student_score,
  //   this.dataRecieved.happiness_score
  //   ],label:'Scores'}
  // ]
    
   
  }
  x:number = 17;
  

  //   barChartData:ChartDataSets[]=[
  //   {data:[this.dataRecieved.avergae_score,
  //   this.dataRecieved.hygiene_score,
  //   this.dataRecieved.teaching_score,
  //   this.dataRecieved.school_score,
  //   this.dataRecieved.student_score,
  //   this.dataRecieved.happiness_score
  //   ],label:'Scores'}
  // ]
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
  createGraph(){
  
    // this.barChartData=[{ data: [10, 8, 6, 7, 8, 8,], label: 'Company A' }]
    // this.barChartData = barChartData1;
    var len = this.dataRecieved.length;
    console.log("Length is " + len);
    

    var average_score = this.dataRecieved.reduce(function(prev, cur) {
      return prev + cur.average_score;
    }, 0);
    average_score = average_score/len;

    var average_hygiene_score = this.dataRecieved.reduce(function(prev, cur) {
      return prev + cur.hygiene_score;
    }, 0);

    average_hygiene_score = average_hygiene_score/len;
    console.log("Average hygiene score  " + average_hygiene_score);
    

    var average_teaching_score = this.dataRecieved.reduce(function(prev, cur) {
      return prev + cur.teaching_score;
    }, 0);

    average_teaching_score = average_teaching_score/len;

    var average_school_score = this.dataRecieved.reduce(function(prev, cur) {
      return prev + cur.school_score;
    }, 0);

    average_school_score = average_school_score/len;

    var average_student_score = this.dataRecieved.reduce(function(prev, cur) {
      return prev + cur.student_score;
    }, 0);

    average_student_score = average_student_score/len;

    var average_happiness_score = this.dataRecieved.reduce(function(prev, cur) {
      return prev + cur.happiness_score;
    }, 0);

    average_happiness_score = average_happiness_score/len;


    this.barChartData=[
    {data:[
    average_score,
    average_hygiene_score,
    average_teaching_score,
    average_school_score,
    average_student_score,
    average_happiness_score
    ],label:'Scores'}
  ]

  }
  


}
