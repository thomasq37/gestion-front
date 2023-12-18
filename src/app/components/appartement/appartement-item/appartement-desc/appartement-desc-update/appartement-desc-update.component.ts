import { Component } from '@angular/core';
import {Appartement, Pays} from "../../../../../models/gestion";
import {NavigationService} from "../../../../../services/navigation.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GestionService} from "../../../../../services/gestion.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-appartement-desc-update',
  templateUrl: './appartement-desc-update.component.html',
  styleUrls: ['./appartement-desc-update.component.scss']
})
export class AppartementDescUpdateComponent {
  appartement: Appartement = <Appartement>{};
  appartementForm: FormGroup;
  paysList: Pays[] = [];


  constructor(
    private navigationService: NavigationService,
    private formBuilder: FormBuilder,
    private gestionService: GestionService,
    private router: Router
  ) {
    this.appartement = this.navigationService.getData();
  }

  ngOnInit(): void {
    this.gestionService.obtenirListePays().subscribe(data => {
      this.paysList = data;

    });
    this.initAppartementForm();

  }

  initAppartementForm() {
    this.appartementForm = this.formBuilder.group({
      numero: [this.appartement.numero, Validators.required],
      adresse: [this.appartement.adresse, Validators.required],
      codePostal: [this.appartement.codePostal, Validators.required],
      ville: [this.appartement.ville, Validators.required],
      pays: [this.appartement.pays.name, Validators.required],
      nombrePieces: [this.appartement.nombrePieces, Validators.required],
      surface: [this.appartement.surface, Validators.required],
      prix: [this.appartement.prix, Validators.required],
      balcon: [this.appartement.balcon],
    });
  }

  mettreAJourUnAppartementPourUtilisateur() {
    const userId = parseInt(<string>localStorage.getItem('userId'));
    const updatedAppartementData = this.appartementForm.value;

    // Ensure that 'pays' is an object, not just a string
    const selectedPays = this.paysList.find(p => p.name === updatedAppartementData.pays);
    updatedAppartementData.pays = selectedPays;

    this.appartement = { ...this.appartement, ...updatedAppartementData };

    this.gestionService.mettreAJourUnAppartementPourUtilisateur(userId, this.appartement.id, this.appartement).subscribe(appartement => {
        console.log('Appartement mis à jour avec succès.');
        this.router.navigate(['/appartement/' + this.appartement.id]);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de l\'appartement :', error);
      });
  }

}
