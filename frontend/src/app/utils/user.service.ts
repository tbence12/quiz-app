import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserModel } from 'src/models/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: UserModel) {
    return this.http.post(environment.serverUrl + 'users', user, {withCredentials: true});
  }
}
