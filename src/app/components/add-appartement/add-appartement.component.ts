import { Component } from '@angular/core';
import {GestionService} from "../../services/gestion.service";
import {Router} from "@angular/router";
import {AppUser} from "../../models/gestion";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-appartement',
  templateUrl: './add-appartement.component.html',
  styleUrls: ['./add-appartement.component.scss']
})
export class AddAppartementComponent {
  appartementForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private gestionService: GestionService,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.appartementForm = this.formBuilder.group({
      numero: ['', Validators.required],
      adresse: ['', Validators.required],
      codePostal: ['', Validators.required],
      ville: ['', Validators.required],
      nombrePieces: ['', Validators.required],
      surface: ['', Validators.required],
      balcon: [''],
      prix: ['', Validators.required]
    });
  }

  ajouterAppartement() {
    if (this.appartementForm.valid) {
      const appartementData = this.appartementForm.value;
      appartementData.appUser = <AppUser>{
        id:  parseInt(<string>localStorage.getItem("userId"))
      }
      this.gestionService.ajouterAppartement(appartementData).subscribe(
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


}
