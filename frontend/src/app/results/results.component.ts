import { Component } from '@angular/core';

import * as mockResults from 'src/mocks/results.json';
import * as mockQuizzes from 'src/mocks/quizzes.json';
import { ResultModel } from 'src/models/resultModel';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  results: ResultModel[] = [];

  ngOnInit(): void {
    const stringResults = JSON.stringify(mockResults);
    const parsedResults = JSON.parse(stringResults)

    const stringQuizzes = JSON.stringify(mockQuizzes);
    const parsedQuizzes = JSON.parse(stringQuizzes);

    const mergedResults = [];
    for(let result of parsedResults.default) {
      const quiz = parsedQuizzes.default.find((quiz: { _id: any; }) => quiz._id === result.quizId);
      mergedResults.push({
        quizName: quiz.name,
        ...result
      })
    }

    this.results = mergedResults;
  }

  totalScores() {
    let scores = 0;

    for(let result of this.results) {
      scores += result.result;
    }

    return  scores;
 }
}
