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
  fraisParPeriodeCreationIsVisible: boolean = false;
  fraisParPeriode: Frais[] = [];
  nouveauFrais: Frais = <Frais>{}
  nouveauFraisSelectedTypeFrais!: any;
  typesFrais: TypeFrais[] = [];
  fraisParPeriodeModifyIsVisible: any;
  modifieFrais:  Frais = <Frais>{};
  modifieFraisSelectedTypeFrais!: any;

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
    this.inCreation = false
    this.fraisParPeriodeCreationIsVisible = false
  }

  supprimerUnePeriodePourAppartement(appartementId :number, periodeId: number) {
    this.inModification = false
    this.inCreation = true
    if (confirm("Êtes-vous sûr de vouloir supprimer ce frais ? Tout les frais associés seront également supprimés.")) {
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
    this.fraisParPeriodeCreationIsVisible = true
    this.inCreation = false
    this.currentPeriodeId = periodeId
  }

  ajouterUnFraisPourPeriode() {
    this.nouveauFraisSelectedTypeFrais = this.typesFrais.find(typeFrais => this.nouveauFraisSelectedTypeFrais == typeFrais.id)
    this.nouveauFrais.typeFrais = this.nouveauFraisSelectedTypeFrais;
    this.gestionService.ajouterUnFraisPourPeriode(this.currentPeriodeId, this.nouveauFrais).subscribe(
      (response) => {
        console.log('Nouveau frais ajouté :', response);
        this.fraisParPeriode.push(response)
        const p = this.periodLocationList.find(period => period.id === this.currentPeriodeId)
        if(p !== undefined){
          p.frais = this.fraisParPeriode
          history.replaceState(this.periodLocationList, '', location.href);
        }
        this.nouveauFrais = <Frais>{};
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du frais :', error);
      }
    );
  }

  afficherFormModificationFraisPourPeriode(fraisId: number) {

    const foundFrais = this.fraisParPeriode.find(frais => fraisId == frais.id);
    if (!foundFrais) {
      throw new Error("Frais non trouvé avec l'ID: " + fraisId);
    }
    this.modifieFrais = foundFrais;
    this.modifieFraisSelectedTypeFrais = this.modifieFrais.typeFrais.id
    this.fraisParPeriodeModifyIsVisible = true
    this.fraisParPeriodeCreationIsVisible = false
    this.inCreation = false
  }

  mettreAJourUnFraisPourPeriode() {
    this.modifieFraisSelectedTypeFrais = this.typesFrais.find(typeFrais => this.modifieFraisSelectedTypeFrais == typeFrais.id)
    this.modifieFrais.typeFrais = this.modifieFraisSelectedTypeFrais
    this.gestionService.mettreAJourUnFraisPourPeriode(this.currentPeriodeId, this.modifieFrais).subscribe(
      (response) => {
        console.log('Frais modifié :', response);
        const index = this.fraisParPeriode.findIndex(frais => frais.id === response.id);
        if (index !== -1) {
          this.fraisParPeriode[index] = response;
          const p = this.periodLocationList.find(period => period.id === this.currentPeriodeId)
          if(p !== undefined){
            p.frais = this.fraisParPeriode
            history.replaceState(this.periodLocationList, '', location.href);
          }
          this.inModification = false;
        }
        else{
          alert("Une erreur est survenue lors de la modification de l'appartement.");
        }

      },
      (error) => {
        alert("Une erreur est survenue lors de la modification de l'appartement.");
        console.error('Erreur lors de la modification de l\'appartement :', error);
      }
    );
  }

  supprimerUnFraisPourPeriode(periodeId: number, fraisId :number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce frais ?")) {
      this.gestionService.supprimerUnFraisPourPeriode(periodeId, fraisId).subscribe(
        () => {
          // Supprimer le frais de la liste actualFrais*
          const p = this.periodLocationList.find(period => period.id === periodeId)
          this.fraisParPeriode = this.fraisParPeriode.filter(frais => frais.id !== fraisId);
          if(p !== undefined){
            p.frais = this.fraisParPeriode
            history.replaceState(this.periodLocationList, '', location.href);
          }
          console.log('Frais supprimé avec succès.');
        },
        error => {
          console.error('Erreur lors de la suppression du frais :', error);
        }
      );
    }
  }

  cancelCreation() {
    this.fraisParPeriodeCreationIsVisible = false
    this.inCreation = true
  }

  cancelModification() {
    this.inModification = false
    this.inCreation = true
  }
}
