import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GestionService} from "../../../../../services/gestion.service";
import {AppUserDTO} from "../../../../../models/gestion";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-appartement-gestionnaire-list',
  templateUrl: './appartement-gestionnaire-list.component.html',
  styleUrls: ['./appartement-gestionnaire-list.component.scss']
})
export class AppartementGestionnaireListComponent implements OnInit{
  constructor(private gestionService: GestionService) {}
  @Input() appartementId: number;
  @Input() isEditable: boolean = false
  gestionnaires: AppUserDTO[] = [];
  private subscription!: Subscription;
  private updateSubscription!: Subscription;
  @Output() gestionnaireToUpdate = new EventEmitter<AppUserDTO>();

  ngOnInit(): void {
    const userId = parseInt(<string>localStorage.getItem('userId'))
    this.subscription = this.gestionService.gestionnaireAddedSubject.subscribe(userDto => {
      if (userDto) {
        if (!this.gestionnaires) {
          this.gestionnaires = [];
        }
        this.gestionnaires.push(userDto);
      }
    });
    this.updateSubscription = this.gestionService.gestionnaireUpdatedSubject.subscribe(
      (updatedContact: AppUserDTO) => {
        const index = this.gestionnaires.findIndex(c => c.id === updatedContact.id);
        if (index !== -1) {
          this.gestionnaires[index] = updatedContact;
        }
      }
    );
    this.gestionService.obtenirGestionnairesPourAppartement(userId, this.appartementId).subscribe(
      gestionnaires =>{
        this.gestionnaires = gestionnaires
      },
      error => {
        console.log("Erreur lors de la récupération des gestionnaire de l\'appartement : ", error)
      })
  }


  isProprietaire() {
    return false;
  }

  onDeleteGestionnaire(gestionnaireId) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce gestionnaire ?")) {
      const userId = parseInt(<string>localStorage.getItem('userId'));
      this.gestionService.supprimerUnGestionnairePourAppartement(userId, this.appartementId, gestionnaireId).subscribe(response => {
        this.gestionnaires = this.gestionnaires.filter(f => f.id !== gestionnaireId);
        this.gestionnaireToUpdate.emit(undefined);
      })
    }
  }

  onUpdateGestionnaire(contact) {
    this.gestionnaireToUpdate.emit(contact);

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.updateSubscription.unsubscribe()

  }
}
