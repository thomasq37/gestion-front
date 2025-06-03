import {Component, Input} from '@angular/core';
import {CreditDTO} from "../../../../models/v2/entites/Credit/CreditDTO.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-credit-element',
  templateUrl: './credit-element.component.html',
  styleUrls: ['./credit-element.component.scss']
})
export class CreditElementComponent {
  @Input() credit!: CreditDTO;
  @Input() logementMasqueId!: string;
  constructor(private router: Router) {}
  modifierOuCreerCredit(credit: CreditDTO, logementMasqueId: string) {
    if(credit === null || credit === undefined) {
      this.router.navigate([`/logements/${logementMasqueId}/credit/creer`]);
    }
    else{
      this.router.navigate([`/logements/${logementMasqueId}/credit/modifier`]);
    }
  }
}
