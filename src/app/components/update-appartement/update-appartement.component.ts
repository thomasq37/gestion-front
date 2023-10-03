import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GestionService} from "../../services/gestion.service";
import {Appartement} from "../../models/gestion";

@Component({
  selector: 'app-update-appartement',
  templateUrl: './update-appartement.component.html',
  styleUrls: ['./update-appartement.component.scss'],
})
export class UpdateAppartementComponent implements OnInit{

  appartement: Appartement = <Appartement>{} ;
  imageUrls: string[] = [''];
  section: string = '';
  constructor(
    private gestionService: GestionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.section = params['section']
    })
    this.route.params.subscribe(params => {
      const appartementId = +params['id'];
      this.gestionService.obtenirUnAppartementParId(appartementId).subscribe(
        (appartement: Appartement) => {
          this.appartement = appartement;
          this.imageUrls = this.appartement.images
        },
        error => {
          console.error('Erreur lors de la récupération de l\'appartement :', error);
        }
      );
    });
  }

  modifierAppartement(){
    this.appartement.images = this.imageUrls;
    this.gestionService.modifierAppartement(this.appartement).subscribe(
      (response) => {
        console.log('Gestion modifié :', response);
        this.router.navigate(['/appartement', this.appartement.id]);
      },
      (error) => {
        alert("Une erreur est survenue lors de la modification de l'appartement.");
        console.error('Erreur lors de la modification de l\'appartement :', error);
      }
    );
  }

  addImage() {
    this.imageUrls.push('');
  }

  removeImage(index: number) {
    this.imageUrls.splice(index, 1);
  }
}
