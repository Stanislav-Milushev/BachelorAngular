import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

export interface PeriodicElement {
  name: string;
  position: number;
  germankl: string;
  age: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Schueler1', germankl: 'c2', age: '19' },
  { position: 2, name: 'Schueler2', germankl: 'b2', age: '16' },
  { position: 3, name: 'Schueler2', germankl: 'b1', age: '15' },
  { position: 4, name: 'Peter', germankl: 'a1', age: '20' },
  { position: 5, name: 'Günter', germankl: 'a2' , age: '24' },
  { position: 6, name: 'klaus', germankl: 'a1', age: '13' },
  { position: 7, name: 'Angi', germankl: 'a2', age: '26' },
  { position: 8, name: 'Schueler13', germankl: 'b1', age: '14' },
  { position: 9, name: 'Schueler12', germankl: 'b2', age: '15' },
  { position: 10, name: 'Schueler11', germankl: 'b1', age: '15' },
  { position: 11, name: 'Schueler10', germankl: 'a1', age: '11' },
  { position: 12, name: 'Schueler2', germankl: 'a2', age: '18' },
  { position: 13, name: 'Schueler3', germankl: 'a2', age: '17' },
  { position: 14, name: 'Schueler4', germankl: 'a2', age: '16' },
  { position: 15, name: 'Schueler5', germankl: 'a1', age: '20' },
  { position: 16, name: 'Schueler6', germankl: 'a1', age: '21' },
  { position: 17, name: 'Schueler7', germankl: 'a1', age: '22' },
  { position: 18, name: 'Schueler8', germankl: 'c1', age: '31' },
  { position: 19, name: 'Schueler9', germankl: 'b1', age: '11' },
  { position: 20, name: 'Schueler20', germankl: 'b1', age: '13' },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  bigChart = [];
  cards = [];
  pieChart = [];

  displayedColumns: string[] = ['position', 'name', 'germankl', 'age'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.bigChart = this.dashboardService.bigChart();
    this.cards = this.dashboardService.cards();
    this.pieChart = this.dashboardService.pieChart();

    this.dataSource.paginator = this.paginator;
  }

}
