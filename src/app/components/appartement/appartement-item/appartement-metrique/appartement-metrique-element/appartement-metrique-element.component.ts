import {Component, Input} from '@angular/core';
import {Appartement} from "../../../../../models/gestion";
import {DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-appartement-metrique-element',
  templateUrl: './appartement-metrique-element.component.html',
  styleUrls: ['./appartement-metrique-element.component.scss'],
  providers: [DecimalPipe]
})
export class AppartementMetriqueElementComponent {
  @Input() appartement: Appartement | null = null;
}
