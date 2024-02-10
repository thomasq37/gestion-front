import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FinancesService, Mouvement} from "../../../services/finances.service";
import {MistralAiService} from "../../../services/mistralai.service";

@Component({
  selector: 'app-mouvement-list',
  templateUrl: './mouvement-list.component.html',
  styleUrls: ['./mouvement-list.component.scss']
})
export class MouvementListComponent implements OnInit{
  @Input() mouvements: Mouvement[] = [];
  @Output() mouvementsChange = new EventEmitter<Mouvement[]>(); // Ajout de l'EventEmitter
  responseText: string = '';


  constructor(private financesService: FinancesService, private mistralAiService: MistralAiService) { }

  ngOnInit(): void {
  }

  onClickGetResponse(): void {
    const prompt = 'Pour calculer le revenu net imposable, suis ces étapes en arrondissant à chaque fois à l\'entier le plus proche avant de passer à l\'étape suivante :\n' +
      '\n' +
      '    Calcule 70% de 18 377 (revenus locatifs non meublés). Multiplie 18 377 par 0.7 et arrondis le résultat à l\'entier le plus proche.\n' +
      '    Calcule 50% de 7 976 (revenus locatifs meublés). Multiplie 7 976 par 0.5 et arrondis le résultat à l\'entier le plus proche.\n' +
      '    Additionne les montants obtenus aux étapes 1 et 2. Arrondis le total à l\'entier le plus proche avant d\'ajouter.\n' +
      '    Ajoute le salaire annuel net de 24 000 au total des étapes précédentes. N\'oublie pas d\'arrondir chaque montant avant de l\'ajouter.\n' +
      '    Soustrais les déductions spécifiques de 600 du total obtenu. Le résultat final doit être arrondi à l\'entier le plus proche pour obtenir le revenu net imposable.\n' +
      '\n' +
      'Important : À chaque étape, assure-toi d\'arrondir à l\'entier le plus proche immédiatement après chaque calcul, avant de passer à l\'étape suivante, pour ne pas tenir compte des décimales.'; // Définissez votre prompt ici
    this.mistralAiService.chatWithMistral(prompt).then(result => {
      this.responseText = result
    })
  }

  get revenus(): Mouvement[] {
    return this.mouvements.filter(mouvement => mouvement.type);
  }

  get depenses(): Mouvement[] {
    return this.mouvements.filter(mouvement => !mouvement.type);
  }

  onEdit(mouvement: Mouvement): void {
    // Logic to handle edit action
    console.log('Editing', mouvement);
  }

  onDelete(id: number): void {
    if(confirm('Êtes-vous sûr de vouloir supprimer ce mouvement ?')) {
      this.financesService.deleteMouvement(id).subscribe(() => {
        const updatedMouvements = this.mouvements.filter(mouvement => mouvement.id !== id);
        this.mouvements = updatedMouvements;
        this.mouvementsChange.emit(updatedMouvements); // Émettre la liste mise à jour
      });
    }
  }

  getFrequenceDescription(frequence: number): string {
    switch(frequence) {
      case 1:
        return 'Annuelle';
      case 2:
        return 'Semestrielle';
      case 4:
        return 'Trimestrielle';
      case 12:
        return 'Mensuelle';
      case 52:
        return 'Hebdomadaire';
      case 365:
      case 366: // Pour les années bissextiles
        return 'Quotidienne';
      default:
        return 'Autre';
    }
  }


}
