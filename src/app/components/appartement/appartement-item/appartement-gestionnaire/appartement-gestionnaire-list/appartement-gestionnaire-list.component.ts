import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GestionService} from "../../../../../services/gestion.service";
import {AppUserDTO} from "../../../../../models/gestion";

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
  @Output() gestionnaireToUpdate = new EventEmitter<AppUserDTO>();

  ngOnInit(): void {
    const userId = parseInt(<string>localStorage.getItem('userId'))
    this.gestionService.obtenirGestionnairesPourAppartement(userId, this.appartementId).subscribe(
      gestionnaires =>{
        this.gestionnaires = gestionnaires
        console.log(this.gestionnaires)
      },
      error => {
        console.log("Erreur lors de la récupération des gestionnaire de l\'appartement : ", error)
      })
  }


  isProprietaire() {
    return false;
  }

  onDeleteGestionnaire(id) {

  }

  onUpdateGestionnaire(contact) {

  }
}
