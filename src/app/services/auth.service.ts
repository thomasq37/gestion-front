import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {AppUserDTO} from "../models/gestion";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient, private router: Router) {}

  async connexion(utilisateur: LoginRequest): Promise<string> {
    const response = await fetch(`${this.apiUrl}/auth/connexion`, {
      method: 'POST', // Définir la méthode HTTP sur POST pour envoyer des données.
      headers: {
        'Content-Type': 'application/json', // Préciser le type de contenu envoyé
      },
      body: JSON.stringify(utilisateur), // Convertir l'objet utilisateur en chaîne JSON pour l'envoyer.
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }
    return await response.text(); // Vous pouvez adapter cette ligne si l'API renvoie une structure spécifique que vous souhaitez retourner.
  }

  async inscription(utilisateur: RegisterRequest): Promise<string> {
    const response = await fetch(`${this.apiUrl}/auth/inscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Préciser le type de contenu envoyé
      },
      body: JSON.stringify(utilisateur), // Convertir l'objet utilisateur en chaîne JSON pour l'envoyer.
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }
    return await response.text();
  }

  getUserDetails(): { email: string, roles: string[] } | null {
    const token = localStorage.getItem('auth_token');
    if (!token) return null;

    const parts = token.split('.');
    if (parts.length !== 3) return null;

    try {
      const payload = JSON.parse(window.atob(parts[1]));
      const email = payload.sub;
      const roles = payload.roles;
      return { email, roles };
    } catch (error) {
      console.error('Erreur lors de la décodage du JWT:', error);
      return null;
    }
  }

  isUserAdmin(): boolean {
    const userDetails = this.getUserDetails();
    return userDetails ? userDetails.roles.includes('ROLE_ADMIN') : false;
  }

  isUserOwner(email: string): boolean {
    const userDetails = this.getUserDetails();
    return userDetails ? userDetails.email === email : false;
  }
  isLoggedIn(): boolean {
    if (typeof localStorage === 'undefined') {
      return false; // localStorage n'est pas disponible
    }

    const token = localStorage.getItem('auth_token');
    if (token) {
      const parts = token.split('.');
      if (parts.length === 3) {
        try {
          const payload = JSON.parse(window.atob(parts[1]));
          // Vérification de l'expiration du token
          const now = Date.now().valueOf() / 1000;
          if (typeof payload.exp !== "undefined" && payload.exp < now) {
            console.log('Le token est expiré.');
            return false; // Le token est expiré
          }
          return true; // Le token est présent, au format JWT et pas expiré
        } catch (error) {
          console.error('Erreur de décodage du JWT :', error);
          return false; // Erreur de décodage, pas un JWT valide
        }
      }
    }

    return false; // Pas de token ou pas au format JWT
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
  createGestionnaire(userId: number, appartementId: number, username: any, password: any, token: any) {
    const url = `${this.apiUrl}/auth/utilisateurs/${userId}/appartements/${appartementId}/gestionnaire/ajouter`;
    const userRequest = {
      user: { username, password },
      token
    };
    return this.http.post<AppUserDTO>(url, userRequest,{ responseType: 'json' });
  }
/*  private urlAuth = this.apiUrl + "/auth/"
  private urlLogin = this.urlAuth + 'connexion'
  private urlCreateUser = this.urlAuth + 'inscription'
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
    return this.http.post<AppUserDTO>(url, userRequest,{ responseType: 'json' });
  }*/
}
export interface User {
  username: string;
  password: string; // In a real-world app, you would not store passwords in frontend
  // Add other user fields if needed
}
export interface LoginRequest{
  email: string;
  mdp: string;
}
export interface RegisterRequest{
  pseudo: string;
  email: string;
  mdp: string;
}
