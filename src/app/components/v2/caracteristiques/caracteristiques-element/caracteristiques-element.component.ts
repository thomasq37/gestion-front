import {Component, Input} from '@angular/core';
import {CaracteristiquesDTO} from "../../../../models/v2/entites/Caracteristiques/CaracteristiquesDTO.model";

@Component({
  selector: 'app-caracteristiques-element',
  templateUrl: './caracteristiques-element.component.html',
  styleUrls: ['./caracteristiques-element.component.scss']
})
export class CaracteristiquesElementComponent {
  @Input() caracteristiques!: CaracteristiquesDTO;
  modifierCaracteristiques() {
  }
}
