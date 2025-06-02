import {Component, Input} from '@angular/core';
import {LocataireDTO} from "../../../../models/v2/entites/Locataire/LocataireDTO.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-locataire-table',
  templateUrl: './locataire-table.component.html',
  styleUrls: ['./locataire-table.component.scss']
})
export class LocataireTableComponent {
  @Input() locataires!: LocataireDTO[];
  @Input() logementMasqueId!: string;
  actionsIsVisible: boolean = false;
  @Input() locataireActuel: LocataireDTO | null = null;
  constructor(private router: Router) {
  }
  estLocataireActuel(locataire: LocataireDTO): boolean {
    return this.locataireActuel &&
      this.locataireActuel.nom === locataire.nom &&
      this.locataireActuel.prenom === locataire.prenom;
  }
  ajouterUnLocataire(logementMasqueId: string) {
    this.router.navigate([`/logements/${logementMasqueId}/locataire/creer`]);
  }

  modifierLocataire(logementMasqueId: string, locataireMasqueId: string) {
    this.router.navigate([`/logements/${logementMasqueId}/locataire/${locataireMasqueId}/modifier`]);
  }

  toggleActions() {
    this.actionsIsVisible = !this.actionsIsVisible;
  }
}
