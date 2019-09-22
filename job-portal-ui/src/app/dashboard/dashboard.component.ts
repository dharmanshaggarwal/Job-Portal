import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  status: any = "all";
  jobTitle: string = "";
  open: any = false;
  closed: any = false;
  displayResult: boolean = false;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.router.navigate(['/login']);
  }

  searchJob(title: string) {
    this.displayResult = true;
    this.jobTitle = title;
    // console.log(this.jobTitle);
  }

  statusCheck() {
    if (this.open && this.closed) {
      this.status = "all";
      return;
    }
    else if (this.open) {
      this.status = "open"
    }
    else if (this.closed) {
      this.status = "closed";
    }
    else {
      this.status = "all";
    }
  }
}
