export interface RegisterUserRequestDTO {
  email: string;
  mdp: string;
  telephone?: string;
  nom?: string;
  prenom?: string;
}
