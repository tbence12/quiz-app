import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizzesComponent } from './quizzes/quizzes.component';
import { ResultsComponent } from './results/results.component';
import { ScoresComponent } from './scores/scores.component';
import { ControlComponent } from './control/control.component';

const routes: Routes = [
  {path: '', redirectTo: 'quizzes', pathMatch: 'full'},
  {path: 'quizzes', component: QuizzesComponent},
  {path: 'quiz/:quizId', component: QuizComponent},
  {path: 'results', component: ResultsComponent},
  {path: 'scores', component: ScoresComponent},
  {path: 'control', component: ControlComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
