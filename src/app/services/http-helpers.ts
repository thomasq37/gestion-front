export async function authFetch(url: RequestInfo, options: RequestInit = {}): Promise<Response> {
  if(localStorage !== undefined){

  }
  const token = localStorage.getItem('auth_token');

  // Ajoute ou modifie les headers dans les options de la requête
  options.headers = new Headers(options.headers || {});
  if (token) {
    (options.headers as Headers).set('Authorization', `Bearer ${token}`);
  }
  (options.headers as Headers).set('Content-Type', 'application/json');

  return await fetch(url, options);
}

import { CustomError } from '../models/v2/exception/CustomError';

export async function handleHttpError(response: Response): Promise<void> {
  if (!response.ok) {
    const error = await response.json();
    throw new CustomError(error.error || 'Une erreur est survenue.');
  }
}
export async function fetchWithHandling<T>(url: string, options: RequestInit, responseType: 'json' | 'text' = 'json'): Promise<T> {
  const response = await authFetch(url, options); // Effectue la requête
  await handleHttpError(response); // Vérifie et gère les erreurs

  // Retourne la réponse au format attendu
  if (responseType === 'json') {
    return response.json(); // Retourne JSON
  } else {
    return response.text() as unknown as T; // Retourne texte brut
  }
}

export function hasProprietaireRole(): boolean {

  const token = localStorage.getItem('auth_token');
  if(token){
    try {
      // Sépare le JWT en ses composantes
      const base64Url = token.split('.')[1]; // Le payload du JWT est toujours en deuxième position après le split
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64)); // Décode le base64 et parse le JSON
      return payload.roles && payload.roles.includes('ROLE_PROPRIETAIRE');
    } catch (error) {
      console.error('Erreur lors de la décodification du token JWT:', error);
      return false;
    }
  }
  else{
    return false;
  }

}
