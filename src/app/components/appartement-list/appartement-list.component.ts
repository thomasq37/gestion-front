import {Component, OnInit} from '@angular/core';
import {GestionService} from "../../services/gestion.service";
import {Appartement} from "../../models/appartement";
import {Router} from "@angular/router";

@Component({
  selector: 'app-appartement-list',
  templateUrl: './appartement-list.component.html',
  styleUrls: ['./appartement-list.component.scss']
})
export class AppartementListComponent implements OnInit {
  appartements: Appartement[];

  constructor(private gestionService: GestionService, private router: Router) {
    this.appartements = [];
  }

  ngOnInit() {
    this.gestionService.getAppartements()
      .subscribe(appartements => {
        this.appartements = appartements;
        console.log(this.appartements)

      });
  }
  viewAppartement(appartementId: number) {
    this.router.navigate(['/appartement', appartementId]);
  }
}
