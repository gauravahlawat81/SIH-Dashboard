import { FetchDataService } from './../fetch-data.service';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { formatDate} from '@angular/common'
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';

export interface User {
  name: string;
}

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {
  datepicker: any;
  myControl = new FormControl();
  options: string[] = ['21223343','21223344','21223345'];
  filteredOptions: Observable<string[]>;

  constructor(private fetchData:FetchDataService) { }
  serverData:any=null;
  ngOnInit(): void {
    this.fetchData.watchServerData.subscribe(res=>{
      this.serverData = res;
    })
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      )
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  startDateSelected:string="";
  endDateSelected:string="";
  schoolIDSelected=""
  startDate(val){
    this.startDateSelected = val;    
  }
  endDate(val){
    this.endDateSelected = val;    
  }
  schoolID(val){
    console.log("school id is "+this.myControl.value)
    this.schoolIDSelected = this.myControl.value
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
  var schoolid = this.myControl.value.toString()
  console.log("Start Date" + start_Date);
  console.log("End Date" + end_Date);
  console.log("school id is "+schoolid)
  
  let newFilteredData = this.serverData.filter(f => new Date(f.creationDate) > start_Date && new Date(f.creationDate) < end_Date)
  let newFilteredData2 = this.serverData.filter(f =>  new String(f.school_id) == schoolid)
  let newFilteredData3 = this.serverData.filter(f => {
    if(start_Date!=null && end_Date!=null){new Date(f.creationDate) > start_Date && new Date(f.creationDate) < end_Date}
    if(schoolid!=null){new String(f.school_id) == schoolid}
  })
  this.serverData.forEach(res=>{
    console.log("Each Date is");
    console.log(new Date(res.creationDate));
    console.log(new String(res.school_id))
    
  })
  console.log("After Applying filter");
  this.fetchData.changeFilteredDate(newFilteredData2)
  
  }
}
