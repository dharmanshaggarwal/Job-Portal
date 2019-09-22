import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortListsComponent } from './short-lists.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InterviewsComponent } from './interviews/interviews.component';
import { JobPortalService } from 'src/app/service/job-portal.service';

describe('ShortListsComponent', () => {
  let component: ShortListsComponent;
  let fixture: ComponentFixture<ShortListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule,
        HttpClientModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        BrowserAnimationsModule],
      declarations: [ShortListsComponent, InterviewsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('retrieve all shortlisted candidates', () => {
    let fixture = TestBed.createComponent(ShortListsComponent);
    let jobService = fixture.debugElement.injector.get(JobPortalService);
    jobService.getShortlistedCandidates().subscribe(result => expect(result['shortListed'].length).toBeGreaterThan(0))
  });
});
