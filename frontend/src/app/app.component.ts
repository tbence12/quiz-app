import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private router: Router) { }

  navs = [
    { name: 'Kvízek', ariaLabel: 'Quizzes', route: '/quizzes', admin: false },
    { name: 'Eredményeim', ariaLabel: 'Results', route: '/results', admin: false },
    { name: 'Pontlista', ariaLabel: 'Scores', route: '/scores', admin: false },
    { name: 'Kezelő', ariaLabel: 'Control', route: '/control', admin: true }
  ]

  goTo(page: string) {
    this.router.navigate([page]);
  }
}
