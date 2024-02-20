import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FinancesService} from "../../../services/finances.service";
import {GptService} from "../../../services/gpt.service";
import {MistralAiService} from "../../../services/mistralai.service";
import {Mouvement} from "../../../models/mouvement.model";

@Component({
  selector: 'app-mouvement-list',
  templateUrl: './mouvement-list.component.html',
  styleUrls: ['./mouvement-list.component.scss']
})
export class MouvementListComponent implements OnInit{
  @Input() mouvements: Mouvement[] = [];
  @Output() mouvementsChange = new EventEmitter<Mouvement[]>(); // Ajout de l'EventEmitter
  responseText: string = '';


  ngOnInit(): void {
  }

  constructor(
    private financesService: FinancesService,
    private gptService: GptService,
    private mistralAiService: MistralAiService) { }




  onClickGetResponse(): void {
    const prompt = 'donne moi le bareme d\'impot sur le revenus en france pour les revenus 2023'; // Définissez votre prompt ici
    this.gptService.getGptResponse(prompt).subscribe(result => {
      this.responseText = result
    })
    this.mistralAiService.chatWithMistral(prompt).then(result => {
      console.log(result)
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

// Exemple d'utilisation
