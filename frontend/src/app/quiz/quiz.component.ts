import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { QuestionModel } from 'src/models/questionModel';
import { QuizModel } from 'src/models/quizModel';
import { AnswerModel, ResultModel } from 'src/models/resultModel';
import { InputUserModel } from 'src/models/userModel';
import { QuizService } from '../utils/quiz.service';
import { ResultService } from '../utils/result.service';

const ERROR_MESSAGE = 'Válaszolj az összes kérdésre!';
const POINTS_PER_CORRECT_ANSWER = 100;

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {
  questions: QuestionModel[] = [];
  quiz: QuizModel | null = null;
  error = false;
  errorMessage = ERROR_MESSAGE;
  result: number = 0;
  correctAnswers: string[] = [];
  incorrectAnswers: string[] = [];
  formSubmitted = false;
  user: InputUserModel | null = null;

  constructor(private router: Router, private route: ActivatedRoute, private quizService: QuizService, private resultService: ResultService) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if(!user) { this.router.navigate(['/login']);}
    const parsedUser: InputUserModel = JSON.parse(user as string);
    this.user = parsedUser;

    this.route.paramMap.subscribe(params => {
      let quizId = params.get('quizId');
      if(!quizId) {throw new Error('quizId is missing!')}
      const userId = this.user?._id as string;

      this.quizService.getQuizWithQuestions(userId, quizId).subscribe((response: any) => {
        this.quiz = response[0];
        this.questions = response[0].questions;
      }, error => {
        console.log('quiz error', error);
      })
    }, error => {
      console.log('parammap error: ', error);
    })
  }

  checkQuiz(quiz: any) {
    if(quiz.invalid) {
      this.error = true;
    } else {
      this.error = false;
      this.formSubmitted = true;
      const answers = this.checkAnswers(quiz.value);
      const points = this.calculatePoints(answers);
      this.result = points;
      const result = this.createResult(answers, points);
      this.sendResult(result);
    }
  }

  goToQuiz(id: string) {
    this.router.navigate([`/quiz/${id}`]);
  }

  private checkAnswers(formValue: {[key: string]: string}): AnswerModel[] {
    const answers: AnswerModel[] = []
    for(let question of this.questions) {
      const questionId = question._id;
      const answerNumber = +formValue[questionId];
      const answer = question.answers.find(answer => answer.number == answerNumber);

      if(!answer) {
        this.error = true;
        throw new Error('Hiba!')
      }

      const correct = answer.correct;

      if(correct) {
        this.correctAnswers.push(answer._id);
      } else {
        this.incorrectAnswers.push(answer._id);
      }

      answers.push({
        questionId,
        answerNumber,
        correct
      });
    }

    return answers;
  }

  private calculatePoints(answers: AnswerModel[]) {
    let correctAnswers = 0;
    answers.forEach(answer => {
      if (answer.correct) {
        correctAnswers += 1;
      }
    });

    const points = correctAnswers * POINTS_PER_CORRECT_ANSWER;
    console.log('points: ', points);

    return points;
  }

  private createResult(answers: AnswerModel[], points: number): ResultModel {
    const userId = this.user?._id;
    const quizId = this.quiz?._id;

    if(!userId || !quizId) {
      throw new Error('User id or Quiz id is missing!');
    }

    const result: ResultModel = {
      result: points,
      answers,
      userId,
      quizId
    }

    return result;
  }

  private sendResult(result: ResultModel) {
    this.resultService.saveResult(result).subscribe((response: any) => {
      console.log(response, 'saved')
    }, error => {
      console.log('send result error', error);
      this.error = true;
      this.errorMessage = 'Hiba az eredmény mentésekor!';
    })
  }
}
