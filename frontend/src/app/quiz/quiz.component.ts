import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as mockQuizzes from 'src/mocks/quizzes.json';
import * as mockQuestions from 'src/mocks/questions.json';
import { QuestionModel } from 'src/models/questionModel';
import { QuizModel } from 'src/models/quizModel';
import { AnswerModel } from 'src/models/resultModel';

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

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const stringQuizzes = JSON.stringify(mockQuizzes);
    const parsedQuizzes = JSON.parse(stringQuizzes);
    const quizzes = parsedQuizzes.default;

    const stringQuestions = JSON.stringify(mockQuestions);
    const parsedQuestions = JSON.parse(stringQuestions);
    const questions = parsedQuestions.default;

    this.route.paramMap.subscribe(params => {
      console.log('keys: ', params.keys);
      let quizId = params.get('quizId');
      console.log('QuizId: ', quizId);

      const quiz = quizzes.find((quiz: QuizModel) => quiz._id === quizId);
      this.quiz = quiz;
      const questionIds = quiz.questionIds;
      console.log('questionIds', questionIds);

      for(let question of questions) {
        if(questionIds.includes(question._id)) {
          this.questions.push(question);
        }
      }

      console.log('questions: ', this.questions);
    }, error => {
      console.log('parammap error: ', error);
    })
  }

  checkQuiz(quiz: any) {
    console.log(quiz);
    if(quiz.invalid) {
      this.error = true;
    } else {
      this.error = false;
      this.formSubmitted = true;
      const answers = this.checkAnswers(quiz.value);
      const points = this.calculatePoints(answers);
      this.result = points;
      this.createResult(answers, points);
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

      console.log(`Question: ${question.text}\n Answer: ${answer?.text}\n Correct: ${answer?.correct}\n`);

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

  private createResult(answers: AnswerModel[], points: number) {
    const result = {
      result: points,
      answers,
      userId: '',
      quizId: this.quiz?._id
    }


    console.log('result: ', result);
  }
}
