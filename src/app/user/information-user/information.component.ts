import { Component, OnInit } from '@angular/core';
import {ChartOptions, ChartDataSets, Point, ChartTitleOptions} from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-information-user',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationUserComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [
    { data: [67, 73, 58, 50, 47, 42, 39], label: 'Idea Efforts', lineTension: 0},
    { data: [67, 63.5 , 60, 56.5, 53, 49.5, 46, 42.5, 39, 35.5, 32, 27, 20, 14, 7, 0], label: 'Idea Efforts Remaining', lineTension: 0},
  ];
  public lineChartLabels: Label[] = ['13/03', '14/03', '15/03', '18/03', '19/03', '20/03', '21/03', '22/03', 'Sprint 2'];
  public lineChartColors: Color[] = [
    {
      borderColor: 'blue',
      backgroundColor: 'transparent'
    },
    {
      borderColor: 'red',
      backgroundColor: 'transparent'
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  constructor() { }

  ngOnInit() {
  }

}
