import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewsComponent } from './interviews.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JobPortalService } from 'src/app/service/job-portal.service';

describe('InterviewsComponent', () => {
  let component: InterviewsComponent;
  let fixture: ComponentFixture<InterviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule,
        HttpClientModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        BrowserAnimationsModule],
      declarations: [InterviewsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('retrieve all interviews', () => {
    let fixture = TestBed.createComponent(InterviewsComponent);
    let jobService = fixture.debugElement.injector.get(JobPortalService);
    jobService.getInterviewDetails().subscribe(result => expect(result['interview'].length).toBeGreaterThan(0))
  });
});
