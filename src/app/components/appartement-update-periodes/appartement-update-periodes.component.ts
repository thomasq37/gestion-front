import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Frais, PeriodLocation, TypeFrais} from "../../models/gestion";
import {GestionService} from "../../services/gestion.service";

@Component({
  selector: 'app-appartement-update-periodes',
  templateUrl: './appartement-update-periodes.component.html',
  styleUrls: ['./appartement-update-periodes.component.scss']
})
export class AppartementUpdatePeriodesComponent {
  periodLocationList: PeriodLocation[] = [];
  appartementId: number = 0;
  currentPeriodeId: number = 0;
  modifiePeriode: PeriodLocation = <PeriodLocation>{};
  newPeriode: PeriodLocation = <PeriodLocation>{};
  inModification: boolean = false;
  inCreation:boolean = true
  fraisParPeriodeIsVisible: boolean = false;
  fraisParPeriode: Frais[] = [];
  nouveauFrais: Frais = <Frais>{}
  nouveauFraisSelectedTypeFrais!: any;
  typesFrais: TypeFrais[] = [];

  constructor(
    private gestionService: GestionService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.periodLocationList = Object.values(history.state).filter(item => typeof item !== 'number') as PeriodLocation[];;
    this.route.params.subscribe(params => {
      this.appartementId = +params['id'];
    })
    this.gestionService.obtenirTousLesTypesDeFrais().subscribe(
      (typesFrais: TypeFrais[]) => {
        this.typesFrais = typesFrais;
      },
      error => {
        console.error('Erreur lors de la récupération des types de frais :', error);
      }
    );
  }

  afficherFormModificationPeriode(id : number) {
    const foundPeriode = this.periodLocationList.find(periode => id == periode.id);
    if (!foundPeriode) {
      throw new Error("Periode non trouvé avec l'ID: " + id);
    }
    this.modifiePeriode = foundPeriode;
    console.log(this.modifiePeriode)
    this.inModification = true;
  }

  supprimerUnePeriodePourAppartement(appartementId :number, periodeId: number) {
    this.inModification = false
    if (confirm("Êtes-vous sûr de vouloir supprimer ce frais ?")) {
      this.gestionService.supprimerUnePeriodePourAppartement(appartementId, periodeId).subscribe(
        () => {
          // Supprimer la periode de la liste periodLocationList
          this.periodLocationList = this.periodLocationList.filter(periode => periode.id !== periodeId);
          history.replaceState(this.periodLocationList, '', location.href);

          console.log('Période supprimé avec succès.');
        },
        error => {
          console.error('Erreur lors de la suppression de la période :', error);
        }
      );
    }
  }

  mettreAJourUnePeriodePourAppartement() {
    this.gestionService.mettreAJourUnePeriodePourAppartement(this.modifiePeriode.appartementId, this.modifiePeriode)
      .subscribe((response) => {
        console.log('Frais modifié :', response);
        const index = this.periodLocationList.findIndex(periode => periode.id === response.id);
        if (index !== -1) {
          this.periodLocationList[index] = response;
          history.replaceState(this.periodLocationList, '', location.href);
          this.inModification = false;
        }
        else{
          alert("Une erreur est survenue lors de la modification de l'appartement.");
        }

        },
      (error) => {
        alert("Une erreur est survenue lors de la modification de l'appartement.");
        console.error('Erreur lors de la modification de l\'appartement :', error);
    })
  }

  ajouterUnePeriodePourAppartement() {
    this.gestionService.ajouterUnePeriodePourAppartement(this.appartementId, this.newPeriode).subscribe(
      (response) => {
        console.log('Nouvelle période ajoutée :', response);
        this.periodLocationList.push(response)
        history.replaceState(this.periodLocationList, '', location.href);
        this.newPeriode = <PeriodLocation>{};
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la période :', error);
      }
    );
  }

  afficherFraisParPeriode(periodeId: number, fraisFixe: Frais[]) {

    this.fraisParPeriode = fraisFixe

    this.fraisParPeriodeIsVisible = true
    this.inCreation = false
    this.currentPeriodeId = periodeId
  }

  ajouterUnFraisPourPeriode() {
    this.nouveauFraisSelectedTypeFrais = this.typesFrais.find(typeFrais => this.nouveauFraisSelectedTypeFrais == typeFrais.id)
    this.nouveauFrais.typeFrais = this.nouveauFraisSelectedTypeFrais;
    this.gestionService.ajouterUnFraisPourPeriode(this.appartementId, this.currentPeriodeId, this.nouveauFrais).subscribe(
      (response) => {
        console.log('Nouveau frais ajouté :', response);
        this.fraisParPeriode.push(response)
        this.nouveauFrais = <Frais>{};
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du frais :', error);
      }
    );
  }

  cancelCreation() {
    this.fraisParPeriodeIsVisible = false
    this.inCreation = true
  }
}
