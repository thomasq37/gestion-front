import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Contact, Frais} from "../../../models/gestion";
import {GestionService} from "../../../services/gestion.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-appartement-frais-list',
  templateUrl: './appartement-frais-list.component.html',
  styleUrls: ['./appartement-frais-list.component.scss']
})
export class AppartementFraisListComponent implements OnInit{
  @Input() appartementId: number | null = null;
  @Input() appartementFrais: Frais[] = [];
  @Output() fraisToUpdate = new EventEmitter<Frais>();
  @Input() isEditable: boolean = false

  private addedFraisSubscription!: Subscription;
  private updateFraisSubscription!: Subscription;

  constructor(
    private gestionService: GestionService
  ) {
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
        this.appartementFrais.push(frais);
      }
    });
    if(this.isEditable && this.appartementId !== null){
      const userId = parseInt(<string>localStorage.getItem('userId'))
      this.gestionService.obtenirFraisFixePourAppartement(userId, this.appartementId).subscribe(
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
        this.fraisToUpdate.emit(undefined);
      })
    }

  }
}
