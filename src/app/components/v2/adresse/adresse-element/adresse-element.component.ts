import {Component, Input} from '@angular/core';
import {AdresseDTO} from "../../../../models/v2/entites/Adresse/AdresseDTO.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-adresse-element',
  templateUrl: './adresse-element.component.html',
  styleUrls: ['./adresse-element.component.scss']
})
export class AdresseElementComponent {
  @Input() adresse!: AdresseDTO;
  @Input() logementMasqueId!: string;
  constructor(private router: Router) {}
  modifierOuCreerAdresse(adresse: AdresseDTO, logementMasqueId: string) {
    if(adresse === null){
      this.router.navigate([`/logements/${logementMasqueId}/adresse/creer`]);
    }
    else{
      this.router.navigate([`/logements/${logementMasqueId}/adresse/modifier`]);
    }
  }
}
