import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;
  private urlAuth = this.apiUrl + "/api/auth/"
  private urlLogin = this.urlAuth + 'login'
  private urlCreateUser = this.urlAuth + 'create'
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.urlLogin, { username, password }, { responseType: 'text' });
  }

  createUser(username: string, password: string, token: string): Observable<any> {
    const userRequest = {
      user: { username, password },
      token
    };
    return this.http.post(this.urlCreateUser, userRequest,{ responseType: 'text' });
  }

}
export interface User {
  username: string;
  password: string; // In a real-world app, you would not store passwords in frontend
  // Add other user fields if needed
}
