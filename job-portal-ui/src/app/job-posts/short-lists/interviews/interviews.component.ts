import { Component, OnInit, Input, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';
import { JobPortalService } from 'src/app/service/job-portal.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.less']
})
export class InterviewsComponent implements OnInit, OnChanges, OnDestroy {
  displayedColumns: string[] = ['interview', 'interviewer', 'date', 'result'];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  interviewDetailsSubscription$: Subscription;
  @Input() selectedCandidateID: number;
  @Input() selectedJobID: number
  candidateInterviewDetails: any;
  interviewDetails: any
  allInterviewRecords: any;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private jobService: JobPortalService) { }

  ngOnInit() {
    this.getInterviewDetails();
  }

  ngOnChanges() {
    if (this.selectedJobID && this.selectedCandidateID && this.allInterviewRecords) {
      this.fetchInterviewDetails(this.allInterviewRecords);
    }
  }

  ngOnDestroy() {
    this.interviewDetailsSubscription$.unsubscribe();
  }

  private getInterviewDetails() {
    this.interviewDetailsSubscription$ = this.jobService.getInterviewDetails().subscribe(res => {
      this.allInterviewRecords = res['interview'];
      this.fetchInterviewDetails(this.allInterviewRecords);
    })
  }

  private fetchInterviewDetails(allInterviewRecords) {
    this.candidateInterviewDetails = this.allInterviewRecords.filter(record =>
      this.selectedCandidateID == record['candidateID']
    );
    if (this.candidateInterviewDetails.length > 0) {
      this.interviewDetails = this.candidateInterviewDetails[0].interviewDetails.filter(interview => this.selectedJobID == interview['jobID']
      );
      // console.log(this.interviewDetails);
      if (this.interviewDetails.length > 0) {
        this.dataSource.data = this.interviewDetails[0].details;
        this.dataSource.sort = this.sort;
      }

    }
    else {
      this.dataSource.data = [];
    }

  }
}
