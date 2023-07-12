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
  images: string[] = [];
  appartement!: Appartement;
  currentIndex = 0;
  rentabiliteNette = 0;
  constructor(private gestionService: GestionService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const appartementId = Number(params.get('id'));
      this.gestionService.getRentabiliteByAppartementId(appartementId)
        .subscribe(rentabiliteNette => {
          this.rentabiliteNette = +rentabiliteNette.toFixed(2);
        });
      this.gestionService.getAppartementById(appartementId)
        .subscribe(appartement => {
          this.appartement = appartement;
          this.images = appartement.images;

        });
    });
  }
}
