import { Component } from '@angular/core';
import {Frais, TypeFrais} from "../../../../../models/gestion";
import {ActivatedRoute} from "@angular/router";
import {GestionService} from "../../../../../services/gestion.service";

@Component({
  selector: 'app-appartement-frais-manage',
  templateUrl: './appartement-frais-manage.component.html',
  styleUrls: ['./appartement-frais-manage.component.scss']
})
export class AppartementFraisManageComponent {
  appartementId: number | null = null;
  isUpdateMode: boolean = false;
  fraisToUpdate: Frais | null = null;
  fraisToDelete: Frais | null = null;
  typesFrais: TypeFrais[] = []


  constructor(
    private route: ActivatedRoute,
    private gestionService: GestionService
  ) {}

  ngOnInit() {
    this.gestionService.obtenirTousLesTypesDeFrais().then(
      (typesFrais: TypeFrais[]) => {
        this.typesFrais = typesFrais;
      },
      error => {
        console.error('Erreur lors de la récupération des types de frais :', error);
      }
    );
    this.route.params.subscribe(params => {
      this.appartementId = +params['id']
    })
  }
  handleCancelUpdate() {
    this.isUpdateMode = false;
  }

  setFraisToUpdate(frais: Frais) {
    this.fraisToUpdate = frais;
    this.isUpdateMode = !!frais;
  }
}
