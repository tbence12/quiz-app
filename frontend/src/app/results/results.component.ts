import { Component } from '@angular/core';

import { DisplayedResultModel } from 'src/models/resultModel';
import { Router } from '@angular/router';
import { ResultService } from '../utils/result.service';
import { InputUserModel } from 'src/models/userModel';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  results: DisplayedResultModel[] = [];

  constructor(private router: Router, private resultService: ResultService) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if(!user) { this.router.navigate(['/login']);}
    const parsedUser: InputUserModel = JSON.parse(user as string);

    this.resultService.getUserResults(parsedUser._id).subscribe((response: any) => {
      this.results = response;
    }, error => {
      console.log('result error', error);
    })
  }

  totalScores() {
    let scores = 0;

    for(let result of this.results) {
      scores += result.result;
    }

    return  scores;
 }
}
