import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppUserDTO} from "../../../../../models/gestion";

@Component({
  selector: 'app-appartement-gestionnaire-manage',
  templateUrl: './appartement-gestionnaire-manage.component.html',
  styleUrls: ['./appartement-gestionnaire-manage.component.scss']
})
export class AppartementGestionnaireManageComponent implements OnInit{
  appartementId: number;
  isUpdateMode: boolean = false;
  gestionnaireToUpdate: AppUserDTO;

  constructor(
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.appartementId = +params['id']
    })
  }

  setGestionnaireToUpdate($event: AppUserDTO) {

  }

  handleCancelUpdate() {

  }
}
