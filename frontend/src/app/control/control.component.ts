import { Component, ViewEncapsulation } from '@angular/core';

import { OutputQuizModel, QuizModel } from 'src/models/quizModel';
import { InputQuestionModel, QuestionModel } from 'src/models/questionModel';
import { CategoryModel } from 'src/models/categoryModel';
import { CategoryService } from '../utils/category.service';
import { QuestionService } from '../utils/question.service';
import { QuizService } from '../utils/quiz.service';

const ERROR_MESSAGE = 'Töltsd ki az összes mezőt!';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ControlComponent {
  constructor(private quizService: QuizService, private questionService: QuestionService, private categoryService: CategoryService) {}

  quizzes: QuizModel[] = [];
  questions: QuestionModel[] = [];
  categories: CategoryModel[] = [];
  questionSortByCategory: {[key: string]: QuestionModel[]} = {};

  quizzesTableColumns: string[] = ['name', 'actions'];
  quizzesTableInfos = [
    { columnDef: 'name', header: 'Név:', cell: (element: QuizModel) => `${element.name}`},
  ];
  questionsTableColumns: string[] = ['text', 'category_name'];
  questionsTableInfos = [
    { columnDef: 'text', header: 'Szöveg:', cell: (element: QuestionModel) => `${element.text}`},
    { columnDef: 'category_name', header: 'Kategória:', cell: (element: QuestionModel) => `${element.categoryName}`},
  ];
  categoriesTableColumns: string[] = ['name'];
  categoriesTableInfos = [
    { columnDef: 'name', header: 'Témakörök:', cell: (element: CategoryModel) => `${element.name}`},
  ];

  compileQuiz = false;
  quizSaved = false;
  quizError = false;
  quizErrorMessage = ERROR_MESSAGE;

  ngOnInit() {
    this.loadQuizzes();

    this.questionService.getQuestions().subscribe((response: any) => {
      const responseQuestions: InputQuestionModel[] = response;
      this.fillQuestions(responseQuestions);
    }, (error: any) => {
      console.log('question error', error);
    })

    this.categoryService.getCategories().subscribe((response: any) => {
      this.categories = response;
    }, error => {
      console.log('category error', error);
    })
  }

  loadQuizzes() {
    this.quizService.getQuizzes().subscribe((response: any) => {
      this.quizzes = response;
    }, (error: any) => {
      console.log('category error', error);
    })
  }

  fillQuestions(responseQuestions: InputQuestionModel[]) {
    for(let question of responseQuestions){
      const category = question.categories[0];
      if(!this.questionSortByCategory[category.name]) {
        this.questionSortByCategory[category.name] = [];
      }
      this.questionSortByCategory[category.name].push(question);
      this.questions.push({
        categoryName: category.name,
        ...question
      });
    }
  }

  editQuiz(quiz: QuizModel) {
    let newQuizName = prompt("Írd be a módosított kvíz nevet: ", quiz.name);
    if (newQuizName) {
      this.quizService.editQuiz(quiz._id, newQuizName).subscribe((response: any) => {
        this.loadQuizzes();
      }, (error: any) => {
        console.log('edit quiz error', error);
      })
    }
  }

  deleteQuiz(quiz: QuizModel) {
    const conf = confirm(`Biztos, hogy törölni szeretnéd a(z) ${quiz.name} nevű kvízt?`);
    if(conf) {
      this.quizService.deleteQuiz(quiz._id).subscribe((response: any) => {
        this.loadQuizzes();
      }, (error: any) => {
        console.log('delete quiz error', error);
      })
    }
  }

  restoreQuiz(quiz: QuizModel) {
    const conf = confirm(`Biztos, hogy vissza szeretnéd állítani a(z) ${quiz.name} nevű kvízt?`);
    if(conf) {
      this.quizService.restoreQuiz(quiz._id).subscribe((response: any) => {
        this.loadQuizzes();
      }, (error: any) => {
        console.log('restore quiz error', error);
      })
    }
  }

  clickCompileButton() {
    this.compileQuiz = !this.compileQuiz;
    if(this.compileQuiz) {
      this.quizSaved = false;
    }
  }

  checkQuiz(quiz: any) {
    if(quiz.invalid) {
      this.quizError = true;
    } else {
      const { quiz_name: name, quiz_questionids: questionIds } = quiz.value;
      if(!name || questionIds.length === 0) {
        this.quizError = true;
      }
      this.quizError = false;
      this.quizSaved = true;
      this.compileQuiz = false;
      const newQuiz = {
        name,
        questionIds
      }
      this.addNewQuiz(newQuiz);
    }
  }

  addNewQuiz(newQuiz: OutputQuizModel) {
    this.quizService.addQuiz(newQuiz).subscribe((response: any) => {
      this.loadQuizzes();
    }, (error: any) => {
      console.log('add quiz error', error);
    })
  }
}
