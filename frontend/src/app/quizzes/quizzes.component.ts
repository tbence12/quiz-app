import { Component } from '@angular/core';
import { Router } from '@angular/router';

import * as mockQuizzes from 'src/mocks/quizzes.json';
import { QuizModel } from 'src/models/quizModel';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss']
})
export class QuizzesComponent {
  quizzes: QuizModel[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    const stringQuizzes = JSON.stringify(mockQuizzes);
    const parsedQuizzes = JSON.parse(stringQuizzes)
    this.quizzes = parsedQuizzes.default;
  }

  goToQuiz(id: string) {
    this.router.navigate([`/quiz/${id}`]);
  }
}
