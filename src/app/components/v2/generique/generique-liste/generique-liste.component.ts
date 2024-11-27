import { Component, Input, OnInit } from '@angular/core';
import { GeneriqueService } from '../../../../services/generique/generique.service';

@Component({
  selector: 'app-generique-liste',
  templateUrl: './generique-liste.component.html',
  styleUrls: ['./generique-liste.component.scss'],
})
export class GeneriqueListeComponent<T> implements OnInit {
  @Input() apiEntiteUrl!: string; // URL de l'API pour l'entité
  @Input() titre!: string; // Titre du composant
  @Input() colonnes!: { key: string; label: string; formatter?: (item: any) => string }[]; // Colonnes à afficher

  items: T[] = [];
  loading = false;
  errorMessage: string | null = null;

  constructor(private genericListService: GeneriqueService) {}

  async ngOnInit(): Promise<void> {
    await this.chargerListe();
  }

  async chargerListe(): Promise<void> {
    this.loading = true;
    this.errorMessage = null;

    try {
      this.items = await this.genericListService.listerElements<T>(this.apiEntiteUrl);
    } catch (error) {
      console.error(error);
      this.errorMessage = 'Erreur lors du chargement des données. Veuillez réessayer.';
    } finally {
      this.loading = false;
    }
  }

  /**
   * Récupère la valeur d'une colonne (avec transformation si disponible).
   * Si la valeur est `null`, retourne `null` pour la logique d'affichage.
   */
  getColumnValue(item: any, colonne: { key: string; formatter?: (item: any) => string }): string | null {
    if (colonne.formatter) {
      return colonne.formatter(item);
    }
    return colonne.key.split('.').reduce((acc, part) => acc && acc[part], item) || null;
  }

  /**
   * Vérifie si une cellule est vide (null).
   */
  isFieldEmpty(value: any): boolean {
    return value === null || value === undefined || value === '';
  }

  onRenseigner(item: any): void {
    console.log('Renseigner cet élément :', item);
    // Ajoutez ici votre logique pour ouvrir un formulaire ou naviguer
  }

  onVoirPlus(item: any): void {
    console.log('Voir plus pour cet élément :', item);
    // Ajoutez ici votre logique pour afficher les détails ou naviguer
  }

}
