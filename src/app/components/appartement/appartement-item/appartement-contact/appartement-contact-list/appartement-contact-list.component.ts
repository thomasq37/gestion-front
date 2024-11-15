import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Contact} from "../../../../../models/gestion";
import {Subscription} from "rxjs";
import {GestionService} from "../../../../../services/gestion.service";
import {hasProprietaireRole} from "../../../../../services/http-helpers";

@Component({
  selector: 'app-appartement-contact-list',
  templateUrl: './appartement-contact-list.component.html',
  styleUrls: ['./appartement-contact-list.component.scss']
})
export class AppartementContactListComponent implements OnInit{
  @Input() appartementId: number | null = null;
  @Input() appartementContacts: Contact[] = [];
  @Input() isEditable: boolean = false
  @Output() contactToUpdate = new EventEmitter<Contact>();
  @Output() contactIsLoad = new EventEmitter<boolean>();
  isLoad: boolean = false;

  subscription!: Subscription;
  updateSubscription!: Subscription;

  constructor(private gestionService: GestionService) {}

  ngOnInit() {
    this.gestionService.obtenirContactsPourAppartement(this.appartementId).then(
      contacts =>{
        this.appartementContacts = contacts
        this.contactIsLoad.emit(true)
        this.isLoad = true
      },
      error => {
        console.log("Erreur lors de la récupération des contacts.")
      })
    this.updateSubscription = this.gestionService.contactUpdatedSubject.subscribe(
      (updatedContact: Contact) => {
        const index = this.appartementContacts.findIndex(c => c.id === updatedContact.id);
        if (index !== -1) {
          this.appartementContacts[index] = updatedContact;
        }
      }
    );
    this.subscription = this.gestionService.contactAddedSubject.subscribe(contact => {
      if (contact) {
        if (!this.appartementContacts) {
          this.appartementContacts = [];
        }
        this.appartementContacts.push(contact);
      }
    });
  }

  onUpdateContact(contact: Contact) {
    this.contactToUpdate.emit(contact);
  }
  onDeleteContact(contactId: number | undefined) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce contact ?")) {
      this.gestionService.supprimerUnContactPourAppartement(this.appartementId, contactId).then(response => {
        this.appartementContacts = this.appartementContacts.filter(f => f.id !== contactId);
        this.contactToUpdate.emit(undefined);
      })
    }

  }

  protected readonly hasProprietaireRole = hasProprietaireRole;
}
