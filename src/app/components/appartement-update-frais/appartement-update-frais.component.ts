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
  appartement!: Appartement;
  typesFrais: TypeFrais[] = [];
  selectedTypeFrais!: any;

  constructor(
    private gestionService: GestionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
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
    this.selectedTypeFrais = this.typesFrais.find(typeFrais => this.selectedTypeFrais == typeFrais.id)
    this.nouveauFrais.typeFrais = this.selectedTypeFrais;
    this.gestionService.addFraisToAppartement(this.nouveauFrais).subscribe(
      (response) => {
        console.log('Nouveau frais ajouté :', response);
        if (this.nouveauFrais.appartement !== undefined) {
          this.router.navigate(['/appartement', this.nouveauFrais.appartement.id]);
        }
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du frais :', error);
      }
    );
  }
}
