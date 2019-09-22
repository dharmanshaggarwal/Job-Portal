import { Component, OnInit, Input, AfterContentInit, AfterViewInit, ViewChild, OnChanges, OnDestroy, ChangeDetectorRef, } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';
import { JobPortalService } from 'src/app/service/job-portal.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-short-lists',
  templateUrl: './short-lists.component.html',
  styleUrls: ['./short-lists.component.less']
})
export class ShortListsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() selectedJobID: number;

  displayedColumns: string[] = ['name', 'worksAt', 'experience', 'ctc'];

  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  candidatesSubscription$: Subscription;
  allRecords: any[] = [];
  candidateID: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private jobService: JobPortalService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.getShortlistedCandidates();
  }

  ngOnChanges() {
    if (this.selectedJobID) {
      this.dataSource.data = this.allRecords.filter(record => record['jobID'].includes(this.selectedJobID));
      if (this.dataSource.data.length > 0) {
        this.candidateID = this.dataSource.data[0]['candidateID'];
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    }
  }

  ngOnDestroy() {
    this.candidatesSubscription$.unsubscribe();
  }

  public selectedCandidate(row: any) {
    this.candidateID = row['candidateID'];
  }

  private getShortlistedCandidates() {
    this.candidatesSubscription$ = this.jobService.getShortlistedCandidates().subscribe(res => {
      this.allRecords = res['shortListed'];
      // debugger;
      this.dataSource.data = this.allRecords.filter(record => record['jobID'].includes(this.selectedJobID));
      this.candidateID = this.dataSource.data[0]['candidateID'];
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

}
