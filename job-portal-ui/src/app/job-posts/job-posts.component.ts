import { Component, OnInit, Input, ViewChild, OnDestroy, OnChanges } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { JobPortalService } from '../service/job-portal.service';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-job-posts',
  templateUrl: './job-posts.component.html',
  styleUrls: ['./job-posts.component.less']
})
export class JobPostsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() searchJob: string;
  @Input() jobStatus: string;
  // @Input() allRecords: Array<any>;
  selectedJobID: number;
  allRecords: Array<any> = new Array();
  displayedColumns: string[] = ['company', 'title', 'postedOn', 'status'];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  jobSubscription$: Subscription;

  constructor(private jobService: JobPortalService) {
    // this.getAllVacancies();
  }

  ngOnInit() {
    this.getAllVacancies();
  }

  ngOnChanges() {
    // this.dataSource = new MatTableDataSource(this.allRecords);
    // this.selectedJobID = this.dataSource.data[0]['jobID'];
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    if (this.allRecords.length > 0) {
      if (this.searchJob == "") {
        if (this.jobStatus.toLowerCase() == "all") {
          this.dataSource = new MatTableDataSource(this.allRecords);
          // this.selectedJobID = this.dataSource.data[0]['jobID'];
        }
        else {
          this.dataSource.data = this.allRecords.filter(record => this.jobStatus.toLowerCase() == record['status'].toLowerCase());
          // this.selectedJobID = this.dataSource.data[0]['jobID'];
        }
      }
      else {
        if (this.jobStatus.toLowerCase() == "all") {
          this.dataSource.data = this.allRecords.filter(record => (this.searchJob.toLowerCase() == record['title'].toLowerCase()))
          // this.selectedJobID = this.dataSource.data[0]['jobID'];
        }
        else {
          this.dataSource.data = this.allRecords.filter(record => (this.jobStatus.toLowerCase() == record['status'].toLowerCase() && this.searchJob.toLowerCase() == record['title'].toLowerCase()));
          // this.selectedJobID = this.dataSource.data[0]['jobID'];
        }
      }
      if (this.dataSource.data.length > 0) {
        this.selectedJobID = this.dataSource.data[0]['jobID'];
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    }
  }

  ngOnDestroy() {
    this.jobSubscription$.unsubscribe();
  }

  getAllVacancies() {
    this.jobSubscription$ = this.jobService.getVacancies().subscribe(res => {
      this.allRecords = res['posting'];
      this.dataSource = new MatTableDataSource(this.allRecords);
      this.selectedJobID = this.dataSource.data[0]['jobID'];
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // console.log(this.allRecords);
    });

  }
  selectedJob(row: any) {
    this.selectedJobID = row.jobID;
  }

}
