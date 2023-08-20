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
  imageUrls: string = ''; // Chaîne contenant les URLs séparées par des virgules
  appartement: Appartement = {
    id: undefined,
    numero: undefined,
    adresse: '',
    codePostal: '',
    ville: '',
    nombrePieces: undefined,
    surface: undefined,
    balcon: false,
    loue: false,
    loyerMensuel: undefined,
    prix: undefined,
    frais: [],
    mouvements: [],
    images: [],
  };
  addAppartement() {
    if (
      this.appartement.numero === undefined ||
      this.appartement.adresse === '' ||
      this.appartement.codePostal === '' ||
      this.appartement.ville === '' ||
      this.appartement.nombrePieces === undefined ||
      this.appartement.surface === undefined ||
      this.appartement.loyerMensuel === undefined ||
      this.appartement.prix === undefined
    ) {
      alert("Veuillez remplir tous les champs obligatoires." + this.appartement.numero);
      return;
    }
    this.appartement.images = this.imageUrls.split(',').map(url => url.trim());
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
