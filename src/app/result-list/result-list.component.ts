import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InfoModalComponent } from '../info-modal/info-modal.component';
import { WebService } from '../services/web.service';
import { DataService } from '../services/dataService';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements AfterViewInit {

  displayedColumns: string[] = ['url', 'name', 'country', 'calculatedScore', 'executedDate'];
  dataSource = new MatTableDataSource<any[]>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _router: Router, public dialog: MatDialog  , private webService: WebService,private data: DataService) { }

  ngOnInit(): void {
    this.data.changeLogedInStatus(true);
    this.data.currentData.subscribe(data =>{ 
      if(data && data.length){
        this.dataSource =  new MatTableDataSource(data);
      }else{
        this.dataSource = new MatTableDataSource();
      }
    })
  }

  openDialog() {
    this.dialog.open(InfoModalComponent, {});
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: any) {
    filterValue = filterValue.value.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  goToHomePage() {
    this._router.navigate(['/dashboard']);
  }

}

export interface PeriodicElement {
  URL: string;
  Name: string;
  Country: string;
  IsLatest: boolean;
  IsLessThanZero: boolean;
  Score: number;
  Date: string;
}