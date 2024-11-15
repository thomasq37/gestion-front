import {Component, Input} from '@angular/core';
import {DecimalPipe} from "@angular/common";
import {Appartement} from "../../../../../models/gestion";

@Component({
  selector: 'app-appartement-metrique-element',
  templateUrl: './appartement-metrique-element.component.html',
  styleUrls: ['./appartement-metrique-element.component.scss'],
  providers: [DecimalPipe]
})
export class AppartementMetriqueElementComponent {
  @Input() appartementId!: number;
  appartement!: Appartement;
}
