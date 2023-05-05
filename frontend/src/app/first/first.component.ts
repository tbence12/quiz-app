import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionService } from '../utils/connection.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent {
  constructor(private connectionService: ConnectionService, private router: Router) {
    console.log(environment);
  }

  title = 'Quiz-app frontend';
  example = [1, 2, 3];

  goToSecond() {
    this.router.navigate(['/second', '02', {message: this.title}]);
  }

  hello() {
    console.log('hello app component');
    this.connectionService.greet().subscribe(data => {
      console.log('Data from backend: ', data);
    }, error => {
      console.log('Error: ', error);
    });
  }
}
