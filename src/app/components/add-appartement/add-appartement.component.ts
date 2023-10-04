import { Component } from '@angular/core';
import {GestionService} from "../../services/gestion.service";
import {Router} from "@angular/router";
import {Appartement, AppUser, Frais} from "../../models/gestion";
import number = CSS.number;

@Component({
  selector: 'app-add-appartement',
  templateUrl: './add-appartement.component.html',
  styleUrls: ['./add-appartement.component.scss']
})
export class AddAppartementComponent {
  constructor(private gestionService: GestionService, private router: Router) {}
  imageUrls: string = ''; // Chaîne contenant les URLs séparées par des virgules
  appartement: Appartement = <Appartement>{}
  ajouterAppartement() {
    this.appartement.appUser = <AppUser>{
      id:  parseInt(<string>localStorage.getItem("userId"))
    }
    console.log(this.appartement)
    this.gestionService.ajouterAppartement(this.appartement).subscribe(
      (response) => {
        console.log('Nouvel appartement ajouté :', response);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        alert("Une erreur est survenue lors de l'ajout de l'appartement.");
        console.error('Erreur lors de l\'ajout de l\'appartement :', error);
      }
    )
  }
}
