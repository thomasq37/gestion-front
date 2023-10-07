import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Frais, PeriodLocation} from "../../../../models/gestion";
import {GestionService} from "../../../../services/gestion.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-appartement-frais-list',
  templateUrl: './appartement-frais-list.component.html',
  styleUrls: ['./appartement-frais-list.component.scss']
})
export class AppartementFraisListComponent implements OnInit, OnChanges{
  @Input() appartementId: number | null = null;
  @Input() appartementFrais: Frais[] = [];
  @Output() fraisToUpdate = new EventEmitter<Frais>();
  @Input() isEditable: boolean = false
  @Input() isPeriode: boolean = false
  @Input() periode: PeriodLocation | null = null;

  protected addedFraisSubscription!: Subscription;
  protected updateFraisSubscription!: Subscription;

  constructor(
    private gestionService: GestionService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['periode'] && changes['periode'].currentValue) {
      const userId = parseInt(<string>localStorage.getItem('userId'))
      this.gestionService.obtenirFraisFixePourPeriode(userId, this.appartementId, this.periode.id).subscribe(
        frais =>{
          this.appartementFrais = frais
        },
        error => {
          console.log("Erreur survenue lors de la récupération des frais : " + error)
        })
    }
  }

  ngOnInit(): void {
    this.updateFraisSubscription = this.gestionService.fraisUpdatedSubject.subscribe(
      (updatedFrais: Frais) => {
        const index = this.appartementFrais.findIndex(c => c.id === updatedFrais.id);
        if (index !== -1) {
          this.appartementFrais[index] = updatedFrais;
        }
      }
    );
    this.addedFraisSubscription = this.gestionService.fraisAddedSubject.subscribe(frais => {
      if (frais) {
        if(!this.appartementFrais) {
          this.appartementFrais = [];
        }
        this.appartementFrais.push(frais);
      }
    });

    if(!this.isPeriode && this.isEditable && this.appartementId !== null){
      const userId = parseInt(<string>localStorage.getItem('userId'))
      this.gestionService.obtenirFraisFixePourAppartement(userId, this.appartementId).subscribe(
        frais =>{
          this.appartementFrais = frais
        },
        error => {
          console.log("Erreur survenue lors de la récupération des contacts : " + error)
        })
    }
    if(this.isPeriode && this.isEditable && this.appartementId !== null && this.periode){
      const userId = parseInt(<string>localStorage.getItem('userId'))
      this.gestionService.obtenirFraisFixePourPeriode(userId, this.appartementId, this.periode.id).subscribe(
        frais =>{
          this.appartementFrais = frais
        },
        error => {
          console.log("Erreur survenue lors de la récupération des contacts : " + error)
        })
    }
  }

  onUpdateFrais(frais: Frais) {
    this.fraisToUpdate.emit(frais);
  }

  onDeleteFrais(fraisId: number | undefined) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce frais ?")) {
      const userId = parseInt(<string>localStorage.getItem('userId'));
      this.gestionService.supprimerUnFraisPourAppartement(userId, this.appartementId, fraisId).subscribe(response => {
        this.appartementFrais = this.appartementFrais.filter(f => f.id !== fraisId);
        if(this.isPeriode){
          return
        }
        this.fraisToUpdate.emit(undefined);
      })
    }

  }
}
