export async function authFetch(url: RequestInfo, options: RequestInit = {}): Promise<Response> {
  if(localStorage !== undefined){

  }
  const token = localStorage.getItem('auth_token');

  // Ajoute ou modifie les headers dans les options de la requête
  options.headers = new Headers(options.headers || {});
  if (token) {
    (options.headers as Headers).set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    // Vous pourriez vouloir gérer certaines erreurs globalement ici
    throw new Error(await response.text());
  }

  return response;
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
