import {Component, Input} from '@angular/core';
import {AdresseDTO} from "../../../../models/v2/entites/Adresse/AdresseDTO.model";

@Component({
  selector: 'app-adresse-element',
  templateUrl: './adresse-element.component.html',
  styleUrls: ['./adresse-element.component.scss']
})
export class AdresseElementComponent{
  @Input() adresse!: AdresseDTO;
  modifierAdresse() {

  }
}
