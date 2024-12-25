import {Component, Input} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AlerteDTO} from "../../../../models/v2/entites/Alerte/AlerteDTO.model";

@Component({
  selector: 'app-alerte-element',
  templateUrl: './alerte-element.component.html',
  styleUrls: ['./alerte-element.component.scss'],
  animations: [
    trigger('toggleAlertes', [
      state('void', style({ opacity: 0, transform: 'translateY(-20px)' })),
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', [animate('100ms ease-out')]),
      transition('* => void', [animate('100ms ease-in')])
    ])
  ]
})
export class AlerteElementComponent {
  @Input() alertes: AlerteDTO[] = [];
  @Input() ouvrable: boolean;
  alertesIsOpen = false;
  toggleAlertesIsOpen() {
    if(this.ouvrable){
      this.alertesIsOpen = !this.alertesIsOpen
    }
  }
}
