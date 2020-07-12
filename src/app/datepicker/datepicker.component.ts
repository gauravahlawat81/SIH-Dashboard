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
  schoolFilterForm = new FormControl();
  startDateFilterForm = new FormControl();
  endDateFilterForm = new FormControl();
  options: string[] = ['21223343','21223344','21223345'];
  filteredOptions: Observable<string[]>;

  constructor(private fetchData:FetchDataService) { }
  serverData:any=null;
  ngOnInit(): void {
    this.fetchData.watchServerData.subscribe(res=>{
      this.serverData = res;
    })
    this.filteredOptions = this.schoolFilterForm.valueChanges
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
  
  let newFilteredData = this.serverData;
  if(this.startDateFilterForm.value!=="" && this.endDateFilterForm.value!==""){
    newFilteredData = this.serverData.filter(f => new Date(f.creationDate) > start_Date && new Date(f.creationDate) < end_Date)
  }
  if(schoolid!==""){
    newFilteredData = newFilteredData.filter(f=> new String(f.school_id)== schoolid);
  }

  this.serverData.forEach(res=>{
    console.log("Each Date is");
    console.log(new Date(res.creationDate));
    console.log(new String(res.school_id))
  })
  console.log("After Applying filter");
  this.fetchData.changeFilteredDate(newFilteredData)
  
  }
  clearFilter(){
    this.startDateFilterForm.setValue("")
    this.endDateFilterForm.setValue("")
    this.schoolFilterForm.setValue("")

    var newFilteredData = this.serverData;
    this.fetchData.changeFilteredDate(newFilteredData)



  }
}
