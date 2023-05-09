import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OutputQuizModel } from 'src/models/quizModel';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  getQuizzes() {
    return this.http.get(environment.serverUrl + `quizzes`, {withCredentials: true});
  }

  addQuiz(newQuiz: OutputQuizModel) {
    return this.http.post(environment.serverUrl + `quizzes`, newQuiz, {withCredentials: true});
  }

  editQuiz(quizId: string, quizName: string) {
    return this.http.put(environment.serverUrl + `quiz/${quizId}`, {name: quizName}, {withCredentials: true});
  }

  deleteQuiz(quizId: string) {
    return this.http.delete(environment.serverUrl + `quiz/${quizId}`, {withCredentials: true});
  }

  restoreQuiz(quizId: string) {
    return this.http.put(environment.serverUrl + `quiz/${quizId}`, {isDeleted: false}, {withCredentials: true});
  }

  getUnfilledQuizzes(userId: string) {
    return this.http.get(environment.serverUrl + `quizzes/unfilled/${userId}`, {withCredentials: true});
  }

  getQuizWithQuestions(userId: string, quizId: string) {
    return this.http.get(environment.serverUrl + `quiz/questions/${userId}/${quizId}`, {withCredentials: true});
  }
}
