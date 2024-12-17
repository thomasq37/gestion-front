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
  constructor(private router: Router) {
  }

  ajouterUnLocataire(logementMasqueId: string) {
    this.router.navigate([`/logements/${logementMasqueId}/locataire/creer`]);
  }
}
