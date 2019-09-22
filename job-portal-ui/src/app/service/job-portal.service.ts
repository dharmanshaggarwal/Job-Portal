import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobPortalService {

  url: string = "http://localhost:3001/";

  httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  constructor(private _http: HttpClient) { }

  public getVacancies() {
    return this._http.get(this.url + "jobs");
  }

  public getShortlistedCandidates() {
    return this._http.get(this.url + "candidates");
  }

  public getInterviewDetails() {
    return this._http.get(this.url + "interviews");
  }

  public login(username: string, password: string) {
    if (username.toLowerCase() === 'admin' && password === 'admin') {
      return true;
    }
    else {
      return false;
    }
  }
}
