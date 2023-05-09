import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorComponent } from './error/error.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizzesComponent } from './quizzes/quizzes.component';
import { ResultsComponent } from './results/results.component';
import { ScoresComponent } from './scores/scores.component';
import { ControlComponent } from './control/control.component';
import { LoginComponent } from './login/login.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
  {path: '', redirectTo: 'quizzes', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'quizzes', component: QuizzesComponent, canActivate: [authGuard]},
  {path: 'quiz/:quizId', component: QuizComponent, canActivate: [authGuard]},
  {path: 'results', component: ResultsComponent, canActivate: [authGuard]},
  {path: 'scores', component: ScoresComponent},
  {path: 'control', component: ControlComponent, canActivate: [adminGuard]},
  {path: 'unauthorized', component: UnauthorizedComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
