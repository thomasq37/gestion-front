import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PeriodLocation} from "../../../../../models/gestion";
import {GestionService} from "../../../../../services/gestion.service";
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
  totalPages: number;
  currentPage: number = 1;
  protected periodeAddedSubject!: Subscription
  protected periodeUpdatedSubject!: Subscription
  userId = parseInt(<string>localStorage.getItem('userId'))

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
        if (!this.appartPeriodLocation) {
          this.appartPeriodLocation = [];
        }


        // Trouver l'index où la période doit être insérée
        const insertIndex = this.appartPeriodLocation.findIndex(p => p.estEntree < periode.estEntree);

        if (insertIndex === -1) {
          // Si aucune période n'est plus ancienne, ajouter à la fin
          this.appartPeriodLocation.push(periode);
        } else {
          // Insérer la période au bon endroit
          this.appartPeriodLocation.splice(insertIndex, 0, periode);
        }
        if (this.appartPeriodLocation.length > 5) {
          this.appartPeriodLocation.pop();
          this.totalPages = 2
        }
        else if(this.totalPages === 0){
          this.totalPages = 1;
        }
      }

    });
    if(this.appartementId !== null){
      this.gestionService.obtenirPeriodeLocationPourAppartement(this.appartementId, this.currentPage -1).then(
        periodes => {
          if (periodes && periodes.content) {
            this.appartPeriodLocation = periodes.content
            this.totalPages = periodes.totalPages
          } else {
            // Gérer le cas où content est vide ou non défini
            this.appartPeriodLocation = [];
            this.totalPages = 0;
          }

        },
        error => {
          console.log("passe ici")
          console.log("Erreur lors de la récupération des périodes de locations : ", error)
        })
    }
  }


  onUpdatePeriode(periode: PeriodLocation) {
    this.periodeToUpdate.emit(periode);
  }

  onDeletePeriode(periodeId : number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette période ? Cela entrainera la suppression de tous les frais associés.")) {
      this.gestionService.supprimerUnePeriodePourAppartement(this.appartementId, periodeId).then(response => {
        if(this.appartPeriodLocation.length === 1){
          this.currentPage = 1
          this.gestionService.obtenirPeriodeLocationPourAppartement(this.appartementId, this.currentPage -1).then(
            periodes =>{
              if (periodes && periodes.content) {
                this.appartPeriodLocation = periodes.content
                this.totalPages = periodes.totalPages
              } else {
                // Gérer le cas où content est vide ou non défini
                this.appartPeriodLocation = [];
                this.totalPages = 0;
              }

            },
            error => {
              console.log("Erreur lors de la récupération des périodes de locations : ", error)
            })
        }
        this.appartPeriodLocation = this.appartPeriodLocation.filter(f => f.id !== periodeId);
        this.periodeToUpdate.emit(undefined);
      })
    }
  }

  onPageChange($event: any) {
    this.currentPage = $event
    this.gestionService.obtenirPeriodeLocationPourAppartement(this.appartementId, this.currentPage -1).then(
      periodes =>{
        this.appartPeriodLocation = periodes.content
        this.totalPages = periodes.totalPages
      },
      error => {
        console.log("Erreur lors de la récupération des périodes de locations : ", error)
      })
  }
}
