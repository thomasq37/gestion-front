import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Appartement, FrequenceFrais} from "../../models/appartement";
import {GestionService} from "../../services/gestion.service";
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-appartement-item',
  templateUrl: './appartement-item.component.html',
  styleUrls: ['./appartement-item.component.scss']
})
export class AppartementItemComponent implements OnInit{
  images: string[] = []; // Tableau des chemins d'accès aux images
  appartement!: Appartement;
  currentIndex = 0;
  rentabiliteNette = 0;
  constructor(private gestionService: GestionService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const appartementId = Number(params.get('id'));

      this.gestionService.getAppartementById(appartementId)
        .subscribe(appartement => {
          this.appartement = appartement;
          this.images = appartement.images;
          this.gestionService.getRentabiliteByAppartementId(appartement)
            .subscribe(rentabiliteNette => {
              this.rentabiliteNette = +rentabiliteNette.toFixed(2);
            });
        });

      // Ici, vous devez implémenter la logique pour récupérer l'appartement avec l'ID spécifié
      // par exemple, en utilisant un service ou une requête HTTP
      // Pour les besoins de l'exemple, nous créons simplement un objet appartement factice

    });
  }
}
