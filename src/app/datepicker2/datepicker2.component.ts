import { Component, OnInit } from '@angular/core';
import { formatDate} from '@angular/common'

@Component({
  selector: 'app-datepicker2',
  templateUrl: './datepicker2.component.html',
  styleUrls: ['./datepicker2.component.css']
})
export class Datepicker2Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  dateSelected:string="";

  selectedValue(val){
    console.log("Selected value");
    console.log(val);
    this.dateSelected = formatDate(val,'yyyy-MM-dd','en-US')
    
    
  }
}
