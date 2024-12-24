import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {AlerteDTO} from "../../../../models/v2/entites/Alerte/AlerteDTO.model";

@Component({
  selector: 'app-alerte-table',
  templateUrl: './alerte-table.component.html',
  styleUrls: ['./alerte-table.component.scss']
})
export class AlerteTableComponent {
  @Input() alertes!: AlerteDTO[];
  @Input() logementMasqueId!: string;
  actionsIsVisible: boolean = false;

  constructor(private router: Router) {
  }
  modifierAlerte(logementMasqueId: string, alerteMasqueId: string) {
    this.router.navigate([`/logements/${logementMasqueId}/alerte/${alerteMasqueId}/modifier`]);
  }

  ajouterUneAlerte(logementMasqueId: any) {
    this.router.navigate([`/logements/${logementMasqueId}/alerte/creer`]);
  }
  toggleActions() {
    this.actionsIsVisible = !this.actionsIsVisible;
  }
}
