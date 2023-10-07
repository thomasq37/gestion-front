import {Component} from '@angular/core';
import { Contact} from "../../../../../models/gestion";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-appartement-contact-manage',
  templateUrl: './appartement-contact-manage.component.html',
  styleUrls: ['./appartement-contact-manage.component.scss']
})
export class AppartementContactManageComponent {

  appartementId!: number
  contactToUpdate: Contact | null = null;
  isUpdateMode: boolean = false;
  setContactToUpdate(contact: Contact) {
    this.contactToUpdate = contact;
    this.isUpdateMode = !!contact;
  }

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.appartementId = +params['id']
    })
  }
  handleCancelUpdate() {
    this.isUpdateMode = false;
  }
}
