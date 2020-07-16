import { BarChartComponent } from './bar-chart/bar-chart.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import {environment} from '../environments/environment';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsModule} from 'ng2-charts'
import { SearchComponent } from './search/search.component'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { TeachersearchComponent } from './teachersearch/teachersearch.component';
import { OfficersearchComponent } from './officersearch/officersearch.component';
import { RecentReviewsComponent } from './recent-reviews/recent-reviews.component';
import { FirstTableComponent } from './first-table/first-table.component';
import { BestSchoolsComponent } from './best-schools/best-schools.component';
import { TitleHeaderComponent } from './title-header/title-header.component';
import { from } from 'rxjs';



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    BarChartComponent,
    SearchComponent,
    DatepickerComponent,
    TeachersearchComponent,
    OfficersearchComponent,
    RecentReviewsComponent,
    FirstTableComponent,
    BestSchoolsComponent,
    TitleHeaderComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppMaterialModule,
    RouterModule,
    ChartsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
