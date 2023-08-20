import {Component, OnInit} from '@angular/core';
import {Appartement, Frais, TypeFrais} from "../../models/appartement";
import {GestionService} from "../../services/gestion.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-appartement-update-frais',
  templateUrl: './appartement-update-frais.component.html',
  styleUrls: ['./appartement-update-frais.component.scss']
})
export class AppartementUpdateFraisComponent implements OnInit{
  nouveauFrais: Frais = {};
  modifieFrais: Frais = {};

  appartement!: Appartement;
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
      this.gestionService.getFraisByAppartementId(+params['id']).subscribe(response => {
        this.actualFrais = response
      })
      this.gestionService.getAppartementById(+params['id']).subscribe(response => {
        this.nouveauFrais.appartement = response
      })
    });
    this.gestionService.getTypesFrais().subscribe(
      (typesFrais: TypeFrais[]) => {
        this.typesFrais = typesFrais;
      },
      error => {
        console.error('Erreur lors de la récupération des types de frais :', error);
      }
    );
  }

  addFraisToAppartement() {
    this.nouveauFraisSelectedTypeFrais = this.typesFrais.find(typeFrais => this.nouveauFraisSelectedTypeFrais == typeFrais.id)
    this.nouveauFrais.typeFrais = this.nouveauFraisSelectedTypeFrais;
    this.gestionService.addFraisToAppartement(this.nouveauFrais).subscribe(
      (response) => {
        console.log('Nouveau frais ajouté :', response);
        this.actualFrais.push(response)
        this.nouveauFrais = {};
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du frais :', error);
      }
    );
  }

  displayModifyFraisForm(id: number) {
    this.gestionService.getFraisById(id).subscribe(response => {
      this.modifieFrais = response
      this.modifieFraisSelectedTypeFrais = this.modifieFrais.typeFrais?.id
      this.inModification = true;
    })
  }

  updateFrais() {
    this.modifieFraisSelectedTypeFrais = this.typesFrais.find(typeFrais => this.modifieFraisSelectedTypeFrais == typeFrais.id)
    this.modifieFrais.typeFrais = this.modifieFraisSelectedTypeFrais
    this.gestionService.updateFrais(this.modifieFrais).subscribe(
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
  supprimerUnFrais(id :number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce frais ?")) {
      this.gestionService.deleteOneFrais(id).subscribe(
        () => {
          // Supprimer le frais de la liste actualFrais
          this.actualFrais = this.actualFrais.filter(frais => frais.id !== id);
          console.log('Frais supprimé avec succès.');
        },
        error => {
          console.error('Erreur lors de la suppression du frais :', error);
        }
      );
    }
  }


  formIsValid(): boolean {
    return (
      this.nouveauFrais.montant !== undefined &&
      this.nouveauFraisSelectedTypeFrais !== undefined &&
      this.nouveauFrais.frequence !== undefined
    );
  }
}
