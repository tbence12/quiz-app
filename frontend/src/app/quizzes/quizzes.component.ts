import { Component } from '@angular/core';
import { Router } from '@angular/router';

import * as mockQuizzes from 'src/mocks/quizzes.json';
import { QuizModel } from 'src/models/quizModel';
import { QuizService } from '../utils/quiz.service';
import { InputUserModel } from 'src/models/userModel';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss']
})
export class QuizzesComponent {
  quizzes: QuizModel[] = [];

  constructor(private router: Router, private quizService: QuizService) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if(!user) { this.router.navigate(['/login']);}
    const parsedUser: InputUserModel = JSON.parse(user as string);

    this.quizService.getUnfilledQuizzes(parsedUser._id).subscribe((response: any) => {
      this.quizzes = response;
    }, error => {
      console.log('quiz error', error);
    })
  }

  goToQuiz(id: string) {
    this.router.navigate([`/quiz/${id}`]);
  }
}
