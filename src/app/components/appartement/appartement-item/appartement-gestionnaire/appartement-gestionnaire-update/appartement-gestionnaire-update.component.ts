import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AppUserDTO} from "../../../../../models/gestion";

@Component({
  selector: 'app-appartement-gestionnaire-update',
  templateUrl: './appartement-gestionnaire-update.component.html',
  styleUrls: ['./appartement-gestionnaire-update.component.scss']
})
export class AppartementGestionnaireUpdateComponent {
  @Input() gestionnaire: AppUserDTO;
  @Output() cancelUpdateEvent: EventEmitter<void> = new EventEmitter<void>();
}
