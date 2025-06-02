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
  @Input() periodeActuelle: PeriodeDeLocationDTO | null = null;
  @Output() periodeSelectionnee = new EventEmitter<PeriodeDeLocationDTO>();
  actionsIsVisible: boolean = false;
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.trierPeriodesDeLocation()
  }
  trierPeriodesDeLocation(): void {
    this.periodesDeLocation.sort((a, b) => {
      const dateA = new Date(a.dateDeDebut).getTime();
      const dateB = new Date(b.dateDeDebut).getTime();
      return dateB - dateA;
    });
    if (this.periodeActuelle) {
      this.actionsIsVisible = true;
    }
  }
  modifierPeriodeDeLocation(logementMasqueId: string, periodeDeLocationMasqueId: string) {
    this.router.navigate([`/logements/${logementMasqueId}/periode-de-location/${periodeDeLocationMasqueId}/modifier`]);
  }

  ajouterUnePeriodeDeLocation(logementMasqueId: any) {
    this.router.navigate([`/logements/${logementMasqueId}/periode-de-location/creer`]);
  }
  toggleActions() {
    this.actionsIsVisible = !this.actionsIsVisible;
    if(!this.actionsIsVisible){
      this.periodeSelectionnee.emit(null);
    }
  }

  afficherFraisPeriodeDeLocation(periodeDeLocation: PeriodeDeLocationDTO) {
    this.periodeSelectionnee.emit(periodeDeLocation);
  }
  isPeriodeEnCours(periode: PeriodeDeLocationDTO): boolean {
    const now = new Date();
    const dateDebut = new Date(periode.dateDeDebut);
    const dateFin = periode.dateDeFin ? new Date(periode.dateDeFin) : null;

    return dateDebut <= now && (!dateFin || now <= dateFin);
  }

}
