import {Component, OnInit} from '@angular/core';
import {Appartement, Frais, TypeFrais} from "../../models/gestion";
import {GestionService} from "../../services/gestion.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-appartement-update-frais',
  templateUrl: './appartement-update-frais.component.html',
  styleUrls: ['./appartement-update-frais.component.scss']
})
export class AppartementUpdateFraisComponent implements OnInit{
  nouveauFrais: Frais = <Frais>{};
  modifieFrais:  Frais = <Frais>{};
  appartement: Appartement = <Appartement>{};
  typesFrais: TypeFrais[] = [];
  nouveauFraisSelectedTypeFrais!: any;
  actualFrais: Frais[] = [];
  modifieFraisSelectedTypeFrais!: any;
  inModification: boolean = false;


  constructor(
    private gestionService: GestionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gestionService.obtenirUnAppartementParId(+params['id']).subscribe(appartement => {
        this.appartement = appartement
        this.actualFrais = this.appartement.fraisFixe
      })
    });
    this.gestionService.obtenirTousLesTypesDeFrais().subscribe(
      (typesFrais: TypeFrais[]) => {
        this.typesFrais = typesFrais;
      },
      error => {
        console.error('Erreur lors de la récupération des types de frais :', error);
      }
    );

  }

  ajouterUnFraisPourAppartement() {
    this.nouveauFraisSelectedTypeFrais = this.typesFrais.find(typeFrais => this.nouveauFraisSelectedTypeFrais == typeFrais.id)
    this.nouveauFrais.typeFrais = this.nouveauFraisSelectedTypeFrais;
    this.gestionService.ajouterUnFraisPourAppartement(this.appartement.id, this.nouveauFrais).subscribe(
      (response) => {
        console.log('Nouveau frais ajouté :', response);
        this.actualFrais.push(response)
        this.nouveauFrais = <Frais>{};
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du frais :', error);
      }
    );
  }

  afficherFormModificationFrais(id: number) {
    const foundFrais = this.appartement.fraisFixe.find(frais => id == frais.id);
    if (!foundFrais) {
      throw new Error("Frais non trouvé avec l'ID: " + id);
    }
    this.modifieFrais = foundFrais;
    this.modifieFraisSelectedTypeFrais = this.modifieFrais.typeFrais.id
    this.inModification = true;
  }

  mettreAJourUnFraisPourAppartement() {
    this.modifieFraisSelectedTypeFrais = this.typesFrais.find(typeFrais => this.modifieFraisSelectedTypeFrais == typeFrais.id)
    this.modifieFrais.typeFrais = this.modifieFraisSelectedTypeFrais
    this.gestionService.mettreAJourUnFraisPourAppartement(this.appartement.id, this.modifieFrais).subscribe(
      (response) => {
        console.log('Frais modifié :', response);
        const index = this.actualFrais.findIndex(frais => frais.id === response.id);
        if (index !== -1) {
          this.actualFrais[index] = response;
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

  supprimerUnFraisPourAppartement(appartementId :number, fraisId: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce frais ?")) {
      this.gestionService.supprimerUnFraisPourAppartement(appartementId, fraisId).subscribe(
        () => {
          // Supprimer le frais de la liste actualFrais
          this.actualFrais = this.actualFrais.filter(frais => frais.id !== fraisId);
          console.log('Frais supprimé avec succès.');
        },
        error => {
          console.error('Erreur lors de la suppression du frais :', error);
        }
      );
    }
  }
}
