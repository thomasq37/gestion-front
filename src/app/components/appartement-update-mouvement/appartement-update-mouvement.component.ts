import { Component } from '@angular/core';
import {Appartement, Frais, Mouvement, TypeFrais} from "../../models/appartement";
import {GestionService} from "../../services/gestion.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-appartement-update-mouvement',
  templateUrl: './appartement-update-mouvement.component.html',
  styleUrls: ['./appartement-update-mouvement.component.scss']
})
export class AppartementUpdateMouvementComponent {
  nouveauMouvement: Mouvement = {};
  modifieMouvement: Mouvement = {};

  appartement!: Appartement;
  actualMouvement: Mouvement[] = [];
  inModification: boolean = false;
  test: any;


  constructor(
    private gestionService: GestionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gestionService.getAppartementById(+params['id']).subscribe(appartement => {
        this.actualMouvement = appartement.mouvements
      })
    });
  }

  addMouvementToAppartement() {
    this.gestionService.addFraisToAppartement(this.nouveauMouvement).subscribe(
      (response) => {
        console.log('Nouveau frais ajouté :', response);
        this.actualMouvement.push(response)
        this.nouveauMouvement = {};
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du frais :', error);
      }
    );
  }

  displayModifyMouvementForm(id: number) {
    this.gestionService.getMouvementById(id).subscribe(response => {
      this.modifieMouvement = response
      console.log(this.modifieMouvement)
      this.inModification = true;
    })
  }

  convertNumberToBool(value?: number): void {
    this.modifieMouvement.estEntree = value === 1;
  }
  convertBoolToNumber(value?: boolean): number {
    return value ? 1 : 0;
  }

  updateMouvement() {
    this.gestionService.updateMouvement(this.modifieMouvement).subscribe(
      (response) => {
        console.log('Mouvement modifié :', response);
        const index = this.actualMouvement.findIndex(m => m.id === response.id);
        if (index !== -1) {
          this.actualMouvement[index] = response;
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

  supprimerUnMouvement(id :number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce mouvement ?")) {
      this.gestionService.deleteOneMouvement(id).subscribe(
        () => {
          // Supprimer le mouvement de la liste actualmouvement
          this.actualMouvement = this.actualMouvement.filter(m => m.id !== id);
          console.log('Mouvement supprimé avec succès.');
        },
        error => {
          console.error('Erreur lors de la suppression du mouvement :', error);
        }
      );
    }
  }


  formIsValid(): boolean {
    return (
      this.nouveauMouvement.estEntree !== undefined &&
      this.nouveauMouvement.date !== undefined
    );
  }
}
