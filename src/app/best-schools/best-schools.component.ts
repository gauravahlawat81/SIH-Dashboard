import { DbModel } from './../shared/models/db.model';
import { FetchDataService } from './../fetch-data.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface TableData{
  school_name:string
  school_score:Number
  creation_date:Date
}

@Component({
  selector: 'app-best-schools',
  templateUrl: './best-schools.component.html',
  styleUrls: ['./best-schools.component.css']
})
export class BestSchoolsComponent implements OnInit {
  displayedColumns: string[] = ['school_name', 'school_score','creation_date'];
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
      var school_score = 0
      var creationDate
      data.records.forEach( res => {
        school_score =school_score + (res.oanswer1+res.oanswer2+res.sanalysis1+res.sanalysis2 )/ 4
        creationDate= new Date(res.creationDate)
      })
      school_score=school_score/(data.records.length)
      createdTableData.push({creation_date:creationDate,school_name:schoolName,school_score:school_score})
    })
    return createdTableData;
  }
}
