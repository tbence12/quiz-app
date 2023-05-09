import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResultModel } from 'src/models/resultModel';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private http: HttpClient) { }

  getUserResults(userId: string) {
    return this.http.get(environment.serverUrl + `results/${userId}`, {withCredentials: true});
  }

  getUsersResults() {
    return this.http.get(environment.serverUrl + `users/results`, {withCredentials: true});
  }

  saveResult(result: ResultModel) {
    return this.http.post(environment.serverUrl + 'results', result, {withCredentials: true});
  }
}
