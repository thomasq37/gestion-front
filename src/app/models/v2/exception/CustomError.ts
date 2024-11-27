export class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Erreur"; // Remplace "Error" par un nom spécifique
  }
}
