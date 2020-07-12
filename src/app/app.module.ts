import { BarChartComponent } from './bar-chart/bar-chart.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
<<<<<<< HEAD
    RecentReviewsComponent
=======
    FirstTableComponent
>>>>>>> d9d98ded7e738f5b8d267220efa09a3cf8f28a2b
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppMaterialModule,
    RouterModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
