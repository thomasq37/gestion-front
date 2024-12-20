import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Contact} from "../../../../../models/gestion";
import {FormGroup, Validators} from "@angular/forms";
import {FormControl} from "@angular/forms";
import {GestionService} from "../../../../../services/gestion.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-appartement-contact-update',
  templateUrl: './appartement-contact-update.component.html',
  styleUrls: ['./appartement-contact-update.component.scss']
})
export class AppartementContactUpdateComponent implements OnInit, OnChanges {
  @Input() contact: Contact | null = null;
  @Output() cancelUpdateEvent: EventEmitter<void> = new EventEmitter<void>();
  contactForm!: FormGroup;
  appartementId!: number;
  @Output() contactIsLoad = new EventEmitter<boolean>();

  constructor(
    private gestionService: GestionService,
    private route: ActivatedRoute
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["contact"] && changes["contact"].currentValue) {
      this.initializeForm();
    }
  }

  ngOnInit(): void {
    this.initializeForm();
    this.route.params.subscribe(params => {
      this.appartementId = +params['id']
    });
  }

  private initializeForm(): void {
    this.contactForm = new FormGroup({
      pseudo: new FormControl(this.contact?.pseudo, Validators.required),
      email: new FormControl(this.contact?.email, [Validators.email]),
      phoneNumber: new FormControl(this.contact?.phoneNumber, [
        Validators.pattern('^\\+?[0-9 ]{7,15}$') // Accepts international format
      ])
    });
  }

  mettreAJourUnContactPourAppartement() {
    const contact: Contact = this.contactForm.value;
    if (this.contact) {
      contact.id = this.contact.id;
      this.gestionService.mettreAJourUnContactPourAppartement(this.appartementId, contact.id, contact).then(
        contact => {
          console.log('Contact mis à jour avec succès.');
          this.contactForm.reset();
          this.gestionService.contactUpdatedSubject.next(contact);
          this.cancelUpdateEvent.emit();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du contact :', error);
        }
      );
    } else {
      console.error('Erreur lors de la mise à jour du contact, contact introuvable.');
    }
  }

  cancelUpdate() {
    this.contactForm.reset();
    this.cancelUpdateEvent.emit();
  }
}
