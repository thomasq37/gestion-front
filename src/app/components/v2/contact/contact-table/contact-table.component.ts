import {Component, Input} from '@angular/core';
import {ContactDTO} from "../../../../models/v2/entites/Contact/ContactDTO.model";

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.scss']
})
export class ContactTableComponent {
  @Input() contacts!: ContactDTO[];

  modifierContacts() {

  }
}
