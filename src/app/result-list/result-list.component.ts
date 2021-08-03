import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements AfterViewInit {

  displayedColumns: string[] = ['url', 'name', 'country', 'language', 'originalHunch', 'qualityOfSite', 'sourceType', 'approvedAuthority'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: any) {
    filterValue = filterValue.value.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}

export interface PeriodicElement {
  url: string;
  name: string;
  country: string;
  language: string;
  originalHunch: number;
  qualityOfSite: number;
  isHTTPS: boolean;
  isGovSource: boolean;
  sourceType: string;
  approvedAuthority: string;
  isLoginRequired: boolean;
  isreCAPTCHA: boolean;
  isCAPTCHA: boolean;
  numberOfScriptTags: number
}

// ];
const ELEMENT_DATA: PeriodicElement[] = [
  {
    "url": "https://www.fsc.gov.tw/ch/index.jsp#",
    "name": "Financial Supervisory Commission R.O.C",
    "country": "Taiwan",
    "language": "Cantoneese",
    "originalHunch": 2,
    "qualityOfSite": 2,
    "isHTTPS": true,
    "isGovSource": true,
    "sourceType": "Regulator",
    "approvedAuthority": "Gov of Taiwan",
    "isLoginRequired": false,
    "isreCAPTCHA": false,
    "isCAPTCHA": false,
    "numberOfScriptTags": 20
  },
  {
    "url": "https://www.bts.com",
    "name": "BTS",
    "country": "Israel",
    "language": "English",
    "originalHunch": 2,
    "qualityOfSite": 2,
    "isHTTPS": true,
    "isGovSource": true,
    "sourceType": "Regulator",
    "approvedAuthority": "Gov of Israel",
    "isLoginRequired": false,
    "isreCAPTCHA": false,
    "isCAPTCHA": false,
    "numberOfScriptTags": 15
  },
  {
    "url": "https://www.abc.com",
    "name": "ABC",
    "country": "Sri Lanka",
    "language": "Sinhala",
    "originalHunch": 2,
    "qualityOfSite": 2,
    "isHTTPS": true,
    "isGovSource": true,
    "sourceType": "Regulator",
    "approvedAuthority": "Gov of SL",
    "isLoginRequired": false,
    "isreCAPTCHA": false,
    "isCAPTCHA": false,
    "numberOfScriptTags": 10
  },
  {
    "url": "https://www.def.com",
    "name": "DEF",
    "country": "India",
    "language": "Hindi",
    "originalHunch": 2,
    "qualityOfSite": 2,
    "isHTTPS": true,
    "isGovSource": true,
    "sourceType": "Regulator",
    "approvedAuthority": "Gov of India",
    "isLoginRequired": false,
    "isreCAPTCHA": false,
    "isCAPTCHA": false,
    "numberOfScriptTags": 10
  },
  {
    "url": "https://www.fsc.gov.tw/ch/index.jsp#",
    "name": "Financial Supervisory Commission R.O.C",
    "country": "Taiwan",
    "language": "Cantoneese",
    "originalHunch": 2,
    "qualityOfSite": 2,
    "isHTTPS": true,
    "isGovSource": true,
    "sourceType": "Regulator",
    "approvedAuthority": "Gov of Taiwan",
    "isLoginRequired": false,
    "isreCAPTCHA": false,
    "isCAPTCHA": false,
    "numberOfScriptTags": 20
  },
  {
    "url": "https://www.bts.com",
    "name": "BTS",
    "country": "Israel",
    "language": "English",
    "originalHunch": 2,
    "qualityOfSite": 2,
    "isHTTPS": true,
    "isGovSource": true,
    "sourceType": "Regulator",
    "approvedAuthority": "Gov of Israel",
    "isLoginRequired": false,
    "isreCAPTCHA": false,
    "isCAPTCHA": false,
    "numberOfScriptTags": 15
  },
  {
    "url": "https://www.abc.com",
    "name": "ABC",
    "country": "Sri Lanka",
    "language": "Sinhala",
    "originalHunch": 2,
    "qualityOfSite": 2,
    "isHTTPS": true,
    "isGovSource": true,
    "sourceType": "Regulator",
    "approvedAuthority": "Gov of SL",
    "isLoginRequired": false,
    "isreCAPTCHA": false,
    "isCAPTCHA": false,
    "numberOfScriptTags": 10
  },
  {
    "url": "https://www.def.com",
    "name": "DEF",
    "country": "India",
    "language": "Hindi",
    "originalHunch": 2,
    "qualityOfSite": 2,
    "isHTTPS": true,
    "isGovSource": true,
    "sourceType": "Regulator",
    "approvedAuthority": "Gov of India",
    "isLoginRequired": false,
    "isreCAPTCHA": false,
    "isCAPTCHA": false,
    "numberOfScriptTags": 10
  },
  {
    "url": "https://www.bts.com",
    "name": "BTS",
    "country": "Israel",
    "language": "English",
    "originalHunch": 2,
    "qualityOfSite": 2,
    "isHTTPS": true,
    "isGovSource": true,
    "sourceType": "Regulator",
    "approvedAuthority": "Gov of Israel",
    "isLoginRequired": false,
    "isreCAPTCHA": false,
    "isCAPTCHA": false,
    "numberOfScriptTags": 15
  },
  {
    "url": "https://www.abc.com",
    "name": "ABC",
    "country": "Sri Lanka",
    "language": "Sinhala",
    "originalHunch": 2,
    "qualityOfSite": 2,
    "isHTTPS": true,
    "isGovSource": true,
    "sourceType": "Regulator",
    "approvedAuthority": "Gov of SL",
    "isLoginRequired": false,
    "isreCAPTCHA": false,
    "isCAPTCHA": false,
    "numberOfScriptTags": 10
  },
  {
    "url": "https://www.def.com",
    "name": "DEF",
    "country": "India",
    "language": "Hindi",
    "originalHunch": 2,
    "qualityOfSite": 2,
    "isHTTPS": true,
    "isGovSource": true,
    "sourceType": "Regulator",
    "approvedAuthority": "Gov of India",
    "isLoginRequired": false,
    "isreCAPTCHA": false,
    "isCAPTCHA": false,
    "numberOfScriptTags": 10
  },
  {
    "url": "https://www.fsc.gov.tw/ch/index.jsp#",
    "name": "Financial Supervisory Commission R.O.C",
    "country": "Taiwan",
    "language": "Cantoneese",
    "originalHunch": 2,
    "qualityOfSite": 2,
    "isHTTPS": true,
    "isGovSource": true,
    "sourceType": "Regulator",
    "approvedAuthority": "Gov of Taiwan",
    "isLoginRequired": false,
    "isreCAPTCHA": false,
    "isCAPTCHA": false,
    "numberOfScriptTags": 20
  },
  {
    "url": "https://www.bts.com",
    "name": "BTS",
    "country": "Israel",
    "language": "English",
    "originalHunch": 2,
    "qualityOfSite": 2,
    "isHTTPS": true,
    "isGovSource": true,
    "sourceType": "Regulator",
    "approvedAuthority": "Gov of Israel",
    "isLoginRequired": false,
    "isreCAPTCHA": false,
    "isCAPTCHA": false,
    "numberOfScriptTags": 15
  },
  {
    "url": "https://www.abc.com",
    "name": "ABC",
    "country": "Sri Lanka",
    "language": "Sinhala",
    "originalHunch": 2,
    "qualityOfSite": 2,
    "isHTTPS": true,
    "isGovSource": true,
    "sourceType": "Regulator",
    "approvedAuthority": "Gov of SL",
    "isLoginRequired": false,
    "isreCAPTCHA": false,
    "isCAPTCHA": false,
    "numberOfScriptTags": 10
  },
  {
    "url": "https://www.def.com",
    "name": "DEF",
    "country": "India",
    "language": "Hindi",
    "originalHunch": 2,
    "qualityOfSite": 2,
    "isHTTPS": true,
    "isGovSource": true,
    "sourceType": "Regulator",
    "approvedAuthority": "Gov of India",
    "isLoginRequired": false,
    "isreCAPTCHA": false,
    "isCAPTCHA": false,
    "numberOfScriptTags": 10
  }
]