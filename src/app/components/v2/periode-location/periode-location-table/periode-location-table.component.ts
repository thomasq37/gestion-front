import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PeriodeDeLocationDTO} from "../../../../models/v2/entites/PeriodeDeLocation/PeriodeDeLocationDTO.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-periode-location-table',
  templateUrl: './periode-location-table.component.html',
  styleUrls: ['./periode-location-table.component.scss']
})
export class PeriodeLocationTableComponent implements OnInit {
  @Input() periodesDeLocation!: PeriodeDeLocationDTO[];
  @Input() logementMasqueId!: string;
  @Output() periodeSelectionnee = new EventEmitter<PeriodeDeLocationDTO>();
  actionsIsVisible: boolean = false;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.periodesDeLocation.sort((a, b) => {
      const dateA = new Date(a.dateDeDebut).getTime();
      const dateB = new Date(b.dateDeDebut).getTime();
      return dateB - dateA;
    });
  }

  modifierPeriodeDeLocation(logementMasqueId: string, periodeDeLocationMasqueId: string) {
    this.router.navigate([`/logements/${logementMasqueId}/periode-de-location/${periodeDeLocationMasqueId}/modifier`]);
  }

  ajouterUnePeriodeDeLocation(logementMasqueId: any) {
    this.router.navigate([`/logements/${logementMasqueId}/periode-de-location/creer`]);
  }
  toggleActions() {
    this.actionsIsVisible = !this.actionsIsVisible;
  }

  afficherFraisPeriodeDeLocation(periodeDeLocation: PeriodeDeLocationDTO) {
    this.periodeSelectionnee.emit(periodeDeLocation);
  }
}
