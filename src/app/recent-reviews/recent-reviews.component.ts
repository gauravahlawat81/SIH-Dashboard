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
  serverData:DbModel[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private fetchData:FetchDataService) { }
  
  ngOnInit() {
    console.log("Creating Recent reviews");
    
    this.fetchData.watchServerData.subscribe(res=>{
      this.serverData=res;
      console.log("Data received in first table");
      console.log(this.serverData);
      
      if(this.serverData!=null && this.serverData.length!==0){
        var newTableData:TableData[]=  this.createTable();
        this.dataSource = new MatTableDataSource(newTableData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
    this.serverData.forEach(data => {
      var schoolName = data.school_name
      data.records.forEach( res => {
        var creationDate = new Date(res.creationDate)
        var review = res.overall_review 
        createdTableData.push({creation_date:creationDate,review:review,school_name:schoolName})
      })
    })
    return createdTableData;
  }

}

