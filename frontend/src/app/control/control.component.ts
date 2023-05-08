import { Component, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import * as mockQuizzes from 'src/mocks/quizzes.json';
import * as mockQuestions from 'src/mocks/questions.json';
import * as mockCategories from 'src/mocks/categories.json';
import { QuizModel } from 'src/models/quizModel';
import { QuestionModel } from 'src/models/questionModel';
import { CategoryModel } from 'src/models/categoryModel';

const ERROR_MESSAGE = 'Töltsd ki az összes mezőt!';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ControlComponent {
  quizzes: QuizModel[] = [];
  questions: QuestionModel[] = [];
  categories: CategoryModel[] = [];
  questionSortByCategory: {[key: string]: QuestionModel[]} = {};

  quizzesTableColumns: string[] = ['name', 'actions'];
  quizzesTableInfos = [
    { columnDef: 'name', header: 'Név', cell: (element: QuizModel) => `${element.name}`},
  ];
  questionsTableColumns: string[] = ['text', 'category_name'];
  questionsTableInfos = [
    { columnDef: 'text', header: 'Szöveg', cell: (element: QuestionModel) => `${element.text}`},
    { columnDef: 'category_name', header: 'Kategória', cell: (element: QuestionModel) => `${element.categoryName}`},
  ];
  categoriesTableColumns: string[] = ['name'];
  categoriesTableInfos = [
    { columnDef: 'name', header: 'Témakör', cell: (element: CategoryModel) => `${element.name}`},
  ];

  compileQuiz = false;
  quizSaved = false;
  quizError = false;
  quizErrorMessage = ERROR_MESSAGE;

  ngOnInit() {
    const stringQuizzes = JSON.stringify(mockQuizzes);
    const parsedQuizzes = JSON.parse(stringQuizzes);
    this.quizzes = parsedQuizzes.default;

    const stringQuestions = JSON.stringify(mockQuestions);
    const parsedQuestions = JSON.parse(stringQuestions);
    const stringCategories = JSON.stringify(mockCategories);
    const parsedCategories = JSON.parse(stringCategories);
    this.categories = parsedCategories.default;

    for(let question of parsedQuestions.default){
      const categoryId = question.categoryIds[0];
      const category = parsedCategories.default.find((cat:CategoryModel) => cat._id === categoryId)
      if(!category) { console.log('Nincs ilyen azonosítójú kategória: ', categoryId) }
      if(!this.questionSortByCategory[category.name]) { this.questionSortByCategory[category.name] = []}
      this.questionSortByCategory[category.name].push(question);
      this.questions.push({
        categoryName: category.name,
        ...question
      });
    }
  }

  editQuiz(quiz: QuizModel) {
    console.log('Edited quiz id:', quiz._id);
    let newQuizName = prompt("Írd be a módosított kvíz nevet: ", quiz.name);
    if (!newQuizName) {
      console.log('Módosítás visszavonva', newQuizName);
    } else {
      console.log('Módosított név:', newQuizName);
    }
  }

  deleteQuiz(quiz: QuizModel) {
    const conf = confirm(`Biztos, hogy törölni szeretnéd a(z) ${quiz.name} nevű kvízt?`);
    console.log('Deleted confirm:', conf);
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
      console.log('form valid');
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
      console.log('newQuiz', newQuiz);
    }
  }
}
