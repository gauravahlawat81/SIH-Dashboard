import { DbRecordModel } from './../shared/models/db-record.model';
import { FetchDataService } from './../fetch-data.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import { formatDate} from '@angular/common'
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DbModel } from './../shared/models/db.model';
import {cloneDeep} from 'lodash';

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
  schoolFilterForm = new FormControl();
  startDateFilterForm = new FormControl();
  endDateFilterForm = new FormControl();
  filteredOptions: Observable<string[]>;

  constructor(private fetchData:FetchDataService) { }
  serverData:DbModel[]=[];
  ngOnInit(): void {
    this.fetchData.watchServerData.subscribe(res=>{
      this.serverData = cloneDeep(res);
    })
    this.filteredOptions = this.schoolFilterForm.valueChanges
      .pipe(
        startWith(''),
      )
  }


  startDateSelected:string="";
  endDateSelected:string="";
  schoolIDSelected=""
  startDate(val){
    this.startDateSelected = this.startDateFilterForm.value;    
  }
  endDate(val){
    this.endDateSelected = this.endDateFilterForm.value;    
  }
  schoolID(val){
    console.log("school id is "+this.schoolFilterForm.value)
    this.schoolIDSelected = this.schoolFilterForm.value
  }

  applyFilter(){
  console.log("Before filter");
  console.log(this.serverData);
  var start_Date = new Date(this.startDateFilterForm.value);
  var end_Date = new Date(this.endDateFilterForm.value);
  var schoolid="";
  if(this.schoolFilterForm.value!==null){
    schoolid = this.schoolFilterForm.value.toString()
  }
  console.log("Start Date " + this.startDateFilterForm.value);
  console.log("End Date " +  this.endDateFilterForm.value);
  console.log("school id is "+schoolid)
  
  let newFilteredData:DbModel[] = cloneDeep(this.serverData);
  let dummyFilter:DbModel[] = this.serverData;
  let dateData 
  if(this.startDateFilterForm.value!==null && this.endDateFilterForm.value!==null){
    console.log("Applying date filter");
    newFilteredData.forEach(data=>{
      var previous_record = data.Records;
      var newRecord:DbRecordModel[]=[];
      // iss line se hii filter ho jaa rha, utna bada code likhne ka tension nahi
      data.Records = data.Records.filter(f=>  new Date(f.creationDate)>=start_Date && new Date(f.creationDate)<=end_Date);
      // data.Records.forEach( f=>{
      //   // console.log("Processing record");
      //   // console.log(data.Records);
        
      //   var testingDate:Date= new Date(f.CreationDate);
      //   // console.log("Currently processing date " + testingDate);
        
      //   if(testingDate>=start_Date && testingDate <= end_Date){
      //     newRecord.push(f);
      //   }

      // })
      // // yha par agar hum ye karde
      // // data.records = newRecord
      // // to chal jayega
      // data.Records = newRecord;
      
    })
    // console.log("Records that could pass the date filter");
    // console.log(newRecord)
    console.log("After filter data becomes");
    console.log(newFilteredData);
    
    // newFilteredData=dateData
  }
  if(schoolid!==""){
    var schoolidNum = Number(schoolid);
    newFilteredData = this.serverData.filter(f => f.SchoolID == schoolidNum )  
  }

  // this.serverData.forEach(res=>{
  //   console.log("Each Date is");
  // })
  console.log("After Applying filter");
  console.log(newFilteredData);
  
  this.fetchData.changeFilteredDate(newFilteredData)
  // console.log(newFilteredData)
  }
  clearFilter(){
    this.startDateFilterForm.setValue("")
    this.endDateFilterForm.setValue("")
    this.schoolFilterForm.setValue("")
    console.log("Before clearing")
    console.log(newFilteredData)
    console.log("After clearing new Filtered data is")
    console.log(newFilteredData)
    console.log("and server data is which is fetched from service ");

    console.log(this.fetchData.getServerData());
    console.log("Server data stored in local variable");
    console.log(this.serverData);
    
    if(this.fetchData.getServerData()== this.serverData){
      console.log("The two are exactly same");
      
    }
    
    var newFilteredData = this.serverData
    this.fetchData.changeFilteredDate(this.serverData);
    
  }
}
