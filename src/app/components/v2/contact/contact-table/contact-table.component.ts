import {Component, Input} from '@angular/core';
import {ContactDTO} from "../../../../models/v2/entites/Contact/ContactDTO.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.scss']
})
export class ContactTableComponent {
  @Input() contacts!: ContactDTO[];
  @Input() logementMasqueId!: string;
  constructor(private router: Router) {
  }
  modifierContacts() {

  }

  ajouterUnContact(logementMasqueId: any) {
    this.router.navigate([`/logements/${logementMasqueId}/contact/creer`]);
  }
}
