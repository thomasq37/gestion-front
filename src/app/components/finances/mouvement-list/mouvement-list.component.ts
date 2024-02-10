import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FinancesService, Mouvement} from "../../../services/finances.service";

@Component({
  selector: 'app-mouvement-list',
  templateUrl: './mouvement-list.component.html',
  styleUrls: ['./mouvement-list.component.scss']
})
export class MouvementListComponent implements OnInit{
  @Input() mouvements: Mouvement[] = [];
  @Output() mouvementsChange = new EventEmitter<Mouvement[]>(); // Ajout de l'EventEmitter

  constructor(private financesService: FinancesService) { }

  ngOnInit(): void {
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
