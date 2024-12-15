import {Component, Input, OnInit} from '@angular/core';
import {PeriodeDeLocationDTO} from "../../../../models/v2/entites/PeriodeDeLocation/PeriodeDeLocationDTO.model";

@Component({
  selector: 'app-periode-location-table',
  templateUrl: './periode-location-table.component.html',
  styleUrls: ['./periode-location-table.component.scss']
})
export class PeriodeLocationTableComponent implements OnInit {
  @Input() periodesDeLocation!: PeriodeDeLocationDTO[];

  ngOnInit(): void {
    this.periodesDeLocation.sort((a, b) => {
      const dateA = new Date(a.dateDeDebut).getTime();
      const dateB = new Date(b.dateDeDebut).getTime();
      return dateB - dateA;
    });
  }

  modifierPeriodesDeLocation() {
  }
}
