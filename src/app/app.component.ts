import { Component } from '@angular/core';
import {HttpHelperService} from './http-helper.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UI';

  constructor(private httpService:HttpHelperService){}
  serverData:any=null;
  async getData(){
    this.serverData = await this.httpService.getData();

  }
}
