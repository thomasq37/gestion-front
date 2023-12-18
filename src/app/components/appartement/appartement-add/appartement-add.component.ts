import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GestionService} from "../../../services/gestion.service";
import {Router} from "@angular/router";
import {AppUser} from "../../../models/gestion";

@Component({
  selector: 'app-appartement-add',
  templateUrl: './appartement-add.component.html',
  styleUrls: ['./appartement-add.component.scss']
})
export class AppartementAddComponent {
  appartementForm: FormGroup;
  paysList: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private gestionService: GestionService,
    private router: Router
  ) {
    this.gestionService.obtenirListePays().subscribe(data => {
      this.paysList = data;
    });
    this.createForm();

  }

  createForm() {
    this.appartementForm = this.formBuilder.group({
      numero: ['', Validators.required],
      adresse: ['', Validators.required],
      codePostal: ['', Validators.required],
      ville: ['', Validators.required],
      pays: ['', Validators.required],
      nombrePieces: ['', Validators.required],
      surface: ['', Validators.required],
      balcon: [''],
      prix: ['', Validators.required],
    });
  }

  ajouterAppartement() {
    if (this.appartementForm.valid) {
      const appartementData = this.appartementForm.value;
      appartementData.appUser = <AppUser>{
        id:  parseInt(<string>localStorage.getItem("userId"))
      }
      this.gestionService.ajouterAppartement(appartementData).subscribe(
        () => {
          console.log('Appartement ajouté avec succès.');
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
