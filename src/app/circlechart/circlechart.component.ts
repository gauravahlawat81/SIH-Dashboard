import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-circlechart',
  templateUrl: './circlechart.component.html',
  styleUrls: ['./circlechart.component.css']
})
export class CirclechartComponent implements OnInit {

  public canvasWidth = 300
public needleValue = 65
public centralLabel = ''
public name = 'Gauge chart'
public bottomLabel = '7.0'
public options = {
    arcColors: ['rgb(44, 151, 222)', 'lightgray'],
    arcDelimiters: [75],
    rangeLabel: ['0', '10'],
    needleStartValue: 50,
}
  constructor() { }

  ngOnInit(): void {
  }

}
