import {Component, Input} from '@angular/core';
import {PeriodeDeLocationDTO} from "../../../../models/v2/entites/PeriodeDeLocation/PeriodeDeLocationDTO.model";

@Component({
  selector: 'app-periode-location-table',
  templateUrl: './periode-location-table.component.html',
  styleUrls: ['./periode-location-table.component.scss']
})
export class PeriodeLocationTableComponent {
  @Input() periodesDeLocation!: PeriodeDeLocationDTO[];

  modifierPeriodesDeLocation() {

  }
}
