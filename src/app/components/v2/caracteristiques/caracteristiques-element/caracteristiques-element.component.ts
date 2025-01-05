import {Component, Input} from '@angular/core';
import {CaracteristiquesDTO} from "../../../../models/v2/entites/Caracteristiques/CaracteristiquesDTO.model";
import {Router} from "@angular/router";
import {CaracteristiquesFormUtil} from "../util/caracteristiques-form-util";
import {AdresseDTO} from "../../../../models/v2/entites/Adresse/AdresseDTO.model";

@Component({
  selector: 'app-caracteristiques-element',
  templateUrl: './caracteristiques-element.component.html',
  styleUrls: ['./caracteristiques-element.component.scss']
})
export class CaracteristiquesElementComponent {
  @Input() caracteristiques!: CaracteristiquesDTO;
  @Input() logementMasqueId!: string;
  @Input() adresse!: AdresseDTO;
  constructor(private router: Router) {}
  modifierOuCreerCaracteristiques(caracteristiques: CaracteristiquesDTO, logementMasqueId: string) {
    if(caracteristiques === null){
      this.router.navigate([`/logements/${logementMasqueId}/caracteristiques/creer`]);
    }
    else{
      this.router.navigate([`/logements/${logementMasqueId}/caracteristiques/modifier`]);
    }
  }

  telechargerDPE(base64Document: any) {
    const nomFichier = this.adresse.numero +  " " + this.adresse.voie;
    CaracteristiquesFormUtil.telechargerFichier(base64Document, nomFichier);
  }
}
