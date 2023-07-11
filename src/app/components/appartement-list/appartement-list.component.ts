import {Component, OnInit} from '@angular/core';
import {GestionService} from "../../services/gestion.service";
import {Appartement} from "../../models/appartement";

@Component({
  selector: 'app-appartement-list',
  templateUrl: './appartement-list.component.html',
  styleUrls: ['./appartement-list.component.scss']
})
export class AppartementListComponent implements OnInit {
  appartements: Appartement[];

  constructor(private gestionService: GestionService) {
    this.appartements = [];
  }

  ngOnInit() {
    this.gestionService.getAppartements()
      .subscribe(appartements => {
        this.appartements = appartements;
      });
  }
}
