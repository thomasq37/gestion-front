import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Contact} from "../../models/gestion";
import {Subscription} from "rxjs";
import {GestionService} from "../../services/gestion.service";

@Component({
  selector: 'app-appartement-contact-list',
  templateUrl: './appartement-contact-list.component.html',
  styleUrls: ['./appartement-contact-list.component.scss']
})
export class AppartementContactListComponent {
  @Input() appartementId: number | undefined;
  @Input() appartementContacts: Contact[] = [];
  @Input() isEditable: boolean = false
  @Output() contactToUpdate = new EventEmitter<Contact>();



  private subscription!: Subscription;

  constructor(private gestionService: GestionService) {}

  ngOnInit() {
    this.gestionService.contactUpdatedSubject.subscribe(
      (updatedContact: Contact) => {
        const index = this.appartementContacts.findIndex(c => c.id === updatedContact.id);
        if (index !== -1) {
          this.appartementContacts[index] = updatedContact;
        }
      }
    );
    this.subscription = this.gestionService.contactAdded$.subscribe(contact => {
      if (contact) {
        this.appartementContacts.push(contact);
      }
    });
    if(this.appartementId !== undefined){
      this.gestionService.obtenirContactsPourAppartement(this.appartementId).subscribe(
        contacts =>{
          this.appartementContacts = contacts
        },
        error => {
          console.log("Erreur survenue lors de la récupération des contacts.")
        })
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onUpdateContact(contact: Contact) {
    this.contactToUpdate.emit(contact);
  }
}
