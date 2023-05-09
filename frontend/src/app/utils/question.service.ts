import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private http: HttpClient) { }

  getQuestions() {
    return this.http.get(environment.serverUrl + `questions/categories`, {withCredentials: true});
  }
}
