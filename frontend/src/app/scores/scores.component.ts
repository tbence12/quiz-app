import { Component } from '@angular/core';

type DisplayedScores = {
  position: string,
  username: string,
  scores: number
}

const MOCK_SCORES: DisplayedScores[] = [
  {position: '1.', username: 'UserA', scores: 7700 },
  {position: '2.', username: 'UserB', scores: 6900 },
  {position: '3.', username: 'UserC', scores: 5500 },
  {position: '4.', username: 'UserD', scores: 4100 },
  {position: '5.', username: 'UserE', scores: 3600 },
  {position: '6.', username: 'UserF', scores: 2400 },
  {position: '7.', username: 'UserG', scores: 1700 },
  {position: '8.', username: 'UserH', scores: 400 }
];

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent {
  scores = MOCK_SCORES;
  scoreTableColumns: string[] = ['position', 'username', 'scores'];
  scoreTableInfos = [
    { columnDef: 'position', header: 'Helyezett', cell: (element: DisplayedScores) => `${element.position}`},
    { columnDef: 'username', header: 'Felhasználónév', cell: (element: DisplayedScores) => `${element.username}`},
    { columnDef: 'scores', header: 'Pontszám', cell: (element: DisplayedScores) => `${element.scores}`}
  ];
}
