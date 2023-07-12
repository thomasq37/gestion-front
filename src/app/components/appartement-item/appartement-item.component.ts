import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Appartement, FrequenceFrais} from "../../models/appartement";
import {GestionService} from "../../services/gestion.service";
@Component({
  selector: 'app-appartement-item',
  templateUrl: './appartement-item.component.html',
  styleUrls: ['./appartement-item.component.scss']
})
export class AppartementItemComponent implements OnInit{
  images: string[] = [];
  appartement!: Appartement;
  loadingCount = 4;
  rentabiliteNette = 0;
  moyenneBenefices = 0;
  tauxVacanceLocatives = 0;
  constructor(private gestionService: GestionService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const appartementId = Number(params.get('id'));
      this.gestionService.getTauxVacancesLocativesByAppartementId(appartementId)
        .subscribe(tauxVacanceLocatives => {
          this.tauxVacanceLocatives = tauxVacanceLocatives
          this.loadingCount--;
        });
      this.gestionService.getMoyenneBeneficesByAppartementId(appartementId)
        .subscribe(moyenneBenefices => {
          this.moyenneBenefices = moyenneBenefices;
          this.loadingCount--;
        });
      this.gestionService.getRentabiliteNetteByAppartementId(appartementId)
        .subscribe(rentabiliteNette => {
          this.rentabiliteNette = +rentabiliteNette.toFixed(2);
          this.loadingCount--;
        });
      this.gestionService.getAppartementById(appartementId)
        .subscribe(appartement => {
          this.appartement = appartement;
          this.images = appartement.images;
          this.loadingCount--;
        });
    });
  }

  showInfo(event: any){
    event.target.parentElement.lastChild.firstElementChild.classList.toggle('visible');
  }
}
