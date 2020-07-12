import { FetchDataService } from './../fetch-data.service';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { formatDate} from '@angular/common'
@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {
  datepicker: any;

  constructor(private fetchData:FetchDataService) { }
  serverData:any=null;
  ngOnInit(): void {
    this.fetchData.watchServerData.subscribe(res=>{
      this.serverData = res;
    })
  }
  startDateSelected:string="";
  endDateSelected:string="";

  startDate(val){
    this.startDateSelected = val;    
  }
  endDate(val){
    this.endDateSelected = val;    
  }
  applyFilter(){
  //   this.serverData.forEach(res=>{
  //     var startDateFilter = new Date(this.startDateSelected);
  //     var endDateFilter = new Date(this.endDateSelected);
  //     var currentDataFilter = new Date(res.creationDate)
  //     if(currentDataFilter >= startDateFilter && currentDataFilter<= endDateFilter)
  //     {
  //       console.log("Filter passed");
        
  //       console.log(res);
        
  //     }
  //     console.log("Didn't pass");
  //     console.log(res);
      
      
      
  //   })
  // 
  console.log("Before filter");
  console.log(this.serverData);
  
  var start_Date = new Date(this.startDateSelected);
  var end_Date = new Date(this.endDateSelected);
  console.log("Start Date" + start_Date);
  console.log("End Date" + end_Date);
  
  
  let newFilteredData = this.serverData.filter(f => new Date(f.creationDate) > start_Date && new Date(f.creationDate) < end_Date);
  this.serverData.forEach(res=>{
    console.log("Each Date is");
    console.log(new Date(res.creationDate));
    
    
  })
  console.log("After Applying filter");
  this.fetchData.changeFilteredDate(newFilteredData);
  
  }
}
