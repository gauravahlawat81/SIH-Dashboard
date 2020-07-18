import { cloneDeep } from 'lodash';
import { DbModel } from './../shared/models/db.model';
import { FetchDataService } from './../fetch-data.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface TableData{
  creation_date:Date
  review:string
  school_name:string
}
@Component({
  selector: 'app-recent-reviews',
  templateUrl: './recent-reviews.component.html',
  styleUrls: ['./recent-reviews.component.css']
})
export class RecentReviewsComponent implements OnInit {
  displayedColumns: string[] = ['creation_date', 'review','school_name'];
  dataSource: MatTableDataSource<TableData>;
  dataReceived:DbModel[];
  @ViewChild(MatPaginator,{static:false}) set content1(paginator:MatPaginator){
    this.dataSource.paginator=paginator;
  }
  @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  constructor(private fetchData:FetchDataService) { }
  
  ngOnInit() {
    console.log("Creating Recent reviews");
    
    this.fetchData.watchServerData.subscribe(res=>{
      this.dataReceived=cloneDeep(res);
      console.log("Data received in review table through server data");
      console.log(this.dataReceived);
      
      if(this.dataReceived!=null && this.dataReceived.length!==0){
        var newTableData:TableData[]=  this.createTable();
        this.dataSource = new MatTableDataSource(newTableData);
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
      }
    })
    this.fetchData.watchFilertedData.subscribe(res=>{
      this.dataReceived=cloneDeep(res);
      console.log("Data received in review  table through filter");
      console.log(this.dataReceived);
      
      if(this.dataReceived!=null && this.dataReceived.length!==0){
        var newTableData:TableData[]=  this.createTable();
        this.dataSource = new MatTableDataSource(newTableData);
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
      }

    })
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createTable(){
    var createdTableData:TableData[]=[];
    console.log("Data received in create Table function");
    console.log(this.dataReceived);
    
    this.dataReceived.forEach(data => {
      var schoolName = data.SchoolName;
      // console.log("School name is ");
      // console.log(schoolName);
      data.Records.forEach( res => {
        var creationDate = new Date(res.CreationDate)
        var review = res.OverallReview
        createdTableData.push({creation_date:creationDate,review:review,school_name:schoolName})
      })
    })
    return createdTableData;
  }


}
