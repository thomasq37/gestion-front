import {Component, Input, OnInit} from '@angular/core';
import {DecimalPipe} from "@angular/common";
import {AppartementCCDTO} from "../../../../../models/gestion";
import {GestionService} from "../../../../../services/gestion.service";

@Component({
  selector: 'app-appartement-metrique-element',
  templateUrl: './appartement-metrique-element.component.html',
  styleUrls: ['./appartement-metrique-element.component.scss'],
  providers: [DecimalPipe]
})
export class AppartementMetriqueElementComponent implements OnInit{
  @Input() appartementId!: number;
  appartementMetrics : AppartementCCDTO

  constructor(private gestionService: GestionService) {
  }

  ngOnInit() {
    this.gestionService.obtenirCCAppartementParId(this.appartementId)
      .then(appartementMetrics => {
        this.appartementMetrics= appartementMetrics
      });
  }
}
