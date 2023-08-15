import { Component } from '@angular/core';
import {GestionService} from "../../services/gestion.service";
import {Router} from "@angular/router";
import {Appartement, Frais} from "../../models/appartement";

@Component({
  selector: 'app-add-appartement',
  templateUrl: './add-appartement.component.html',
  styleUrls: ['./add-appartement.component.scss']
})
export class AddAppartementComponent {
  constructor(private gestionService: GestionService, private router: Router) {}
  appartement: Appartement = {
    id: 0,
    numero: 0,
    adresse: '',
    codePostal: '',
    ville: '',
    nombrePieces: 0,
    surface: 0,
    balcon: false,
    loue: false,
    loyerMensuel: 0,
    prix: 0,
    frais: [],
    mouvements: [],
    images: [],
  };
  addAppartement() {
    if (
      this.appartement.numero === 0 ||
      this.appartement.adresse === '' ||
      this.appartement.codePostal === '' ||
      this.appartement.ville === '' ||
      this.appartement.nombrePieces === 0 ||
      this.appartement.surface === 0 ||
      this.appartement.loyerMensuel === 0 ||
      this.appartement.prix === 0
    ) {
      alert("Veuillez remplir tous les champs obligatoires." + this.appartement.numero);
      return;
    }
    this.gestionService.addAppartement(this.appartement).subscribe(
      (response) => {
        console.log('Nouvel appartement ajouté :', response);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        alert("Une erreur est survenue lors de l'ajout de l'appartement.");
        console.error('Erreur lors de l\'ajout de l\'appartement :', error);
      }
    );
  }
}
