import {Component, Input} from '@angular/core';
import {LocataireDTO} from "../../../../models/v2/entites/Locataire/LocataireDTO.model";

@Component({
  selector: 'app-locataire-table',
  templateUrl: './locataire-table.component.html',
  styleUrls: ['./locataire-table.component.scss']
})
export class LocataireTableComponent {
  @Input() locataires!: LocataireDTO[];

  modifierLocataires() {

  }
}
