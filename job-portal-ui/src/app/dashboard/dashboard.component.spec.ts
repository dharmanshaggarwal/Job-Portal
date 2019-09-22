import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BrowserModule } from '@angular/platform-browser';
import { InterviewsComponent } from '../job-posts/short-lists/interviews/interviews.component';
import { JobPostsComponent } from '../job-posts/job-posts.component';
import { ShortListsComponent } from '../job-posts/short-lists/short-lists.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppRoutingModule } from '../app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../login/login.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        AppRoutingModule,
        MatCheckboxModule,
        BrowserAnimationsModule, HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [DashboardComponent,
        JobPostsComponent,
        ShortListsComponent,
        InterviewsComponent,
        LoginComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
