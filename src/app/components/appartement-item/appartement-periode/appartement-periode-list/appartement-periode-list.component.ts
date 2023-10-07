import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PeriodLocation} from "../../../../models/gestion";
import {GestionService} from "../../../../services/gestion.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-appartement-periode-list',
  templateUrl: './appartement-periode-list.component.html',
  styleUrls: ['./appartement-periode-list.component.scss']
})
export class AppartementPeriodeListComponent implements OnInit{
  @Input() appartementId: number | null = null;
  @Input() appartPeriodLocation: PeriodLocation[] = [];
  @Input() isEditable: boolean = false
  @Output() periodeToUpdate = new EventEmitter<PeriodLocation>();

  protected periodeAddedSubject!: Subscription
  protected periodeUpdatedSubject!: Subscription

  constructor(private gestionService: GestionService) {}


  ngOnInit(): void {
    this.periodeUpdatedSubject = this.gestionService.periodeUpdatedSubject.subscribe(
      (updatedPeriod: PeriodLocation) => {
        const index = this.appartPeriodLocation.findIndex(c => c.id === updatedPeriod.id);
        if (index !== -1) {
          this.appartPeriodLocation[index] = updatedPeriod;
        }
      }
    );
    this.periodeAddedSubject = this.gestionService.periodeAddedSubject.subscribe(periode => {
      if (periode) {
        this.appartPeriodLocation.push(periode);
      }
    });
    if(this.isEditable && this.appartementId !== null){
      const userId = parseInt(<string>localStorage.getItem('userId'))
      this.gestionService.obtenirPeriodeLocationPourAppartement(userId, this.appartementId).subscribe(
        periodes =>{
          this.appartPeriodLocation = periodes
        },
        error => {
          console.log("Erreur survenue lors de la récupération des contacts.")
        })
    }
  }


  onUpdatePeriode(periode: PeriodLocation) {
    //console.log(periode.id)
    this.periodeToUpdate.emit(periode);
  }

  onDeletePeriode(periodeId : number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette période ? Cela entrainera la suppression de tous les frais associés.")) {
      const userId = parseInt(<string>localStorage.getItem('userId'));
      this.gestionService.supprimerUnePeriodePourAppartement(userId, this.appartementId, periodeId).subscribe(response => {
        this.appartPeriodLocation = this.appartPeriodLocation.filter(f => f.id !== periodeId);
        this.periodeToUpdate.emit(undefined);
      })
    }
  }
}
