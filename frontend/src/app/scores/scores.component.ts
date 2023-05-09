import { Component } from '@angular/core';
import { ResultService } from '../utils/result.service';
import { InputSummResultModel, SummResultModel } from 'src/models/resultModel';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent {
  scoreTableColumns: string[] = ['position', 'username', 'scores'];
  scoreTableInfos = [
    { columnDef: 'position', header: 'Helyezett', cell: (element: SummResultModel) => `${element.position}`},
    { columnDef: 'username', header: 'Felhasználónév', cell: (element: SummResultModel) => `${element.username}`},
    { columnDef: 'scores', header: 'Pontszám', cell: (element: SummResultModel) => `${element.scores}`}
  ];

  scores: SummResultModel[] = [];

  constructor(private resultService: ResultService) { }

  ngOnInit(): void {
    this.resultService.getUsersResults().subscribe((response: any) => {
      const extendedResponse = this.addPositionToResponse(response);
      this.scores = extendedResponse;
    }, error => {
      console.log('result error', error);
    })
  }

  private addPositionToResponse(response: InputSummResultModel[]): SummResultModel[] {
    const extendedResponse: SummResultModel[] = [];

    for(let index = 0; index < response.length; index++) {
      const responseValues = response[index];
      const result: SummResultModel = {
        position: `${index+1}.`,
        ...responseValues
      }
      extendedResponse.push(result);
    }

    return extendedResponse;
  }
}
