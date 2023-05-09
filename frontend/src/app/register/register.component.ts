import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/models/userModel';
import { UserService } from '../utils/user.service';

const ERROR_MESSAGE = 'Töltsd ki az összes mezőt!';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  error = false;
  errorMessage = ERROR_MESSAGE;

  constructor(private userService: UserService, private router: Router) { }

  register(user: UserModel) {
    this.userService.register(user).subscribe((response: any) => {
      this.router.navigate(['/login']);
    }, error => {
      console.log('login error', error);
      this.error = true;
      this.errorMessage = error?.error?.message;
    })
  }

  checkRegister(register: any) {
    if(register.invalid) {
      this.error = true;
    } else {
      this.error = false;
      const {username, password, email, year} = register.value;
      if(username && password && email && year) {
        const newUser: UserModel = {
          email,
          username,
          password,
          year
        }

        this.register(newUser);
      } else {
        this.error = true;
      }
    }
  }
}
