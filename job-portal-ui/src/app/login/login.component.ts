import { Component, OnInit } from '@angular/core';
import { JobPortalService } from '../service/job-portal.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  error: boolean;
  errorMsg: string;

  constructor(private jobPortalService: JobPortalService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(username, password) {
    let loginSuccess = this.jobPortalService.login(username, password);
    if (loginSuccess) {
      this.router.navigate(['/dashboard']);
      this.error = false;
    }
    else {
      this.error = true;
      this.errorMsg = "Login Unsuccessful!";
    }
  }
}
