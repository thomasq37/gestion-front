import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Frais, PeriodLocation, TypeFrais} from "../../../../../models/gestion";
import {GestionService} from "../../../../../services/gestion.service";

@Component({
  selector: 'app-appartement-periode-manage',
  templateUrl: './appartement-periode-manage.component.html',
  styleUrls: ['./appartement-periode-manage.component.scss']
})
export class AppartementPeriodeManageComponent implements OnInit{
  appartementId!: number;
  isUpdateMode: boolean = false;
  isFraisAddingMode: boolean = false;
  periodeToUpdate: PeriodLocation | null = null;
  fraisToUpdate: Frais | null = null;
  typesFrais: TypeFrais[] = []
  isLoad: boolean = false


  constructor(
    private route: ActivatedRoute,
    private gestionService: GestionService
  ) {}

  ngOnInit(): void {
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

  handleCancelPeriodeUpdate() {
    this.isUpdateMode = false;
    this.periodeToUpdate = null;
  }

  handleCancelFraisUpdate() {
    this.isFraisAddingMode = true;
    this.fraisToUpdate = null;
  }

  setPeriodeToUpdate(periode: PeriodLocation) {
    this.periodeToUpdate = periode;
    this.isFraisAddingMode = true;  // Activez le mode d'ajout de frais par défaut lorsque vous mettez à jour une période
    this.fraisToUpdate = null; // Réinitialisez le frais
    this.isUpdateMode = !!periode;
  }

  setFraisToUpdate(frais: Frais) {
    this.fraisToUpdate = frais;
    this.isFraisAddingMode = false; // Désactivez le mode d'ajout de frais
    this.isUpdateMode = !!frais;
  }

  handlePeriodeIsLoad(isLoad: boolean) {
    this.isLoad  = isLoad
  }
}
