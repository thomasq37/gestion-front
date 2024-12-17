import {Component, Input} from '@angular/core';
import {CaracteristiquesDTO} from "../../../../models/v2/entites/Caracteristiques/CaracteristiquesDTO.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-caracteristiques-element',
  templateUrl: './caracteristiques-element.component.html',
  styleUrls: ['./caracteristiques-element.component.scss']
})
export class CaracteristiquesElementComponent {
  @Input() caracteristiques!: CaracteristiquesDTO;
  @Input() logementMasqueId!: string;
  constructor(private router: Router) {}
  modifierOuCreerCaracteristiques(caracteristiques: CaracteristiquesDTO, logementMasqueId: string) {
    if(caracteristiques === null){
      this.router.navigate([`/logements/${logementMasqueId}/caracteristiques/creer`]);
    }
    else{
      this.router.navigate([`/logements/${logementMasqueId}/caracteristiques/modifier`]);
    }
  }
}
