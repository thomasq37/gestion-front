import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { tap } from 'rxjs/operators';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;
  private urlAuth = this.apiUrl + "/auth/"
  private urlLogin = this.urlAuth + 'login'
  private urlCreateUser = this.urlAuth + 'create'
  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.urlLogin, { username, password }, { responseType: 'json' }).pipe(
      tap(credentials => {
        if (credentials) {

          localStorage.setItem('auth_token', (credentials as any).token);
          localStorage.setItem('userToken', (credentials as any).userToken);
          localStorage.setItem('userId', (credentials as any).userId);
          localStorage.setItem('userRole', (credentials as any).userRole);

          this.router.navigate(['/dashboard']); // Redirect to dashboard page

        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token'); // Remove the authentication token
    localStorage.removeItem('userToken'); // Remove the authentication token
    localStorage.removeItem('userId'); // Remove the authentication token
    localStorage.removeItem('userRole');

    this.router.navigate(['/login']); // Redirect to login page
  }
  loginRedirection() {
    this.router.navigate(['/login']); // Redirect to login page
  }
  createUser(username: string, password: string, token: string): Observable<any> {
    const userRequest = {
      user: { username, password },
      token
    };
    return this.http.post(this.urlCreateUser, userRequest,{ responseType: 'json' });
  }

  createGestionnaire(userId: number, appartementId: number, username: any, password: any, token: any) {
    const url = `${this.apiUrl}/auth/utilisateurs/${userId}/appartements/${appartementId}/gestionnaire/ajouter`;
    const userRequest = {
      user: { username, password },
      token
    };
    return this.http.post(url, userRequest,{ responseType: 'json' });
  }
}
export interface User {
  username: string;
  password: string; // In a real-world app, you would not store passwords in frontend
  // Add other user fields if needed
}
