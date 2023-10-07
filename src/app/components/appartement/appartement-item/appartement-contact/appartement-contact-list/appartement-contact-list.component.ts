import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Contact} from "../../../../../models/gestion";
import {Subscription} from "rxjs";
import {GestionService} from "../../../../../services/gestion.service";

@Component({
  selector: 'app-appartement-contact-list',
  templateUrl: './appartement-contact-list.component.html',
  styleUrls: ['./appartement-contact-list.component.scss']
})
export class AppartementContactListComponent {
  @Input() appartementId: number | null = null;
  @Input() appartementContacts: Contact[] = [];
  @Input() isEditable: boolean = false
  @Output() contactToUpdate = new EventEmitter<Contact>();



  private subscription!: Subscription;
  private updateSubscription!: Subscription;

  constructor(private gestionService: GestionService) {}

  ngOnInit() {
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
        this.appartementContacts.push(contact);
      }
    });
    if(this.isEditable && this.appartementId !== null){
      this.gestionService.obtenirContactsPourAppartement(parseInt(<string>localStorage.getItem('userId')), this.appartementId).subscribe(
        contacts =>{
          this.appartementContacts = contacts
        },
        error => {
          console.log("Erreur lors de la récupération des contacts.")
        })
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.updateSubscription.unsubscribe()
  }

  onUpdateContact(contact: Contact) {
    this.contactToUpdate.emit(contact);
  }
  onDeleteContact(contactId: number | undefined) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce contact ?")) {
      const userId = parseInt(<string>localStorage.getItem('userId'));
      this.gestionService.supprimerUnContactPourAppartement(userId, this.appartementId, contactId).subscribe(response => {
        this.appartementContacts = this.appartementContacts.filter(f => f.id !== contactId);
        this.contactToUpdate.emit(undefined);
      })
    }

  }
}
