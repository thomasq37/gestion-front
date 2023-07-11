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
  appartement!: Appartement;

  constructor(private gestionService: GestionService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const appartementId = Number(params.get('id'));
      this.gestionService.getAppartementById(appartementId)
        .subscribe(appartement => {
          this.appartement = appartement;
        });
      // Ici, vous devez implémenter la logique pour récupérer l'appartement avec l'ID spécifié
      // par exemple, en utilisant un service ou une requête HTTP
      // Pour les besoins de l'exemple, nous créons simplement un objet appartement factice

    });
  }
}
