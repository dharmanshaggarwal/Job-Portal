import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostsComponent } from './job-posts.component';
import { MatTableModule } from '@angular/material/table';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BrowserModule } from '@angular/platform-browser';
import { InterviewsComponent } from './short-lists/interviews/interviews.component';
import { ShortListsComponent } from './short-lists/short-lists.component';
import { JobPortalService } from '../service/job-portal.service';

describe('JobPostsComponent', () => {
  let component: JobPostsComponent;
  let fixture: ComponentFixture<JobPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule,
        HttpClientModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        BrowserAnimationsModule],
      declarations: [JobPostsComponent, ShortListsComponent,
        InterviewsComponent],
      providers: [JobPortalService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('retrieve all jobs', () => {
    let fixture = TestBed.createComponent(JobPostsComponent);
    // let dashboard = fixture.debugElement.componentInstance;
    let jobService = fixture.debugElement.injector.get(JobPortalService);
    fixture.detectChanges();
    jobService.getVacancies().subscribe(result => expect(result['posting'].length).toBeGreaterThan(0))
  });
});
