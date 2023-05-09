import { Component } from '@angular/core';
import { LoginService } from '../utils/login.service';
import { Router } from '@angular/router';

const ERROR_MESSAGE = 'Töltsd ki az összes mezőt!';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string;
  password: string;
  error = false;
  errorMessage = ERROR_MESSAGE;

  constructor(private loginService: LoginService, private router: Router) {
    this.username = '';
    this.password = '';
  }

  ngOnInit() {
    if(localStorage.getItem('user')) {
      localStorage.removeItem('user');
      this.loginService.logout().subscribe((response: any) => {
        console.log(response.message);
      }, error => {
        console.log('logout error', error);
      })
    }
  }

  login() {
    if(this.username && this.password) {
      this.loginService.login(this.username, this.password).subscribe((response: any) => {
        console.log(response.message);
        this.getUserInfos();
      }, error => {
        console.log('login error', error);
        this.error = true;
        this.errorMessage = error?.error?.message;
      })
    }
  }

  getUserInfos() {
    this.loginService.status().subscribe((response: any) =>  {
      const user = JSON.stringify(response.user);
      localStorage.setItem('user', user);
      this.router.navigate(['/quizzes']);
    }, error => {
      console.log('status error', error);
    })
  }

  checkLogin(login: any) {
    if(login.invalid) {
      this.error = true;
    } else {
      this.error = false;
      const {username, password} = login.value;
      if(username && password) {
        this.username = username;
        this.password = password;
        this.login();
      } else {
        this.error = true;
      }
    }
  }
}
