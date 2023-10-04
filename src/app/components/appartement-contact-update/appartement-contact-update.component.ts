import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Contact} from "../../models/gestion";
import {FormGroup, Validators} from "@angular/forms";
import {FormControl} from "@angular/forms";
import {GestionService} from "../../services/gestion.service";
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
    })
  }

  private initializeForm(): void {
    this.contactForm = new FormGroup({
      pseudo: new FormControl(this.contact?.pseudo, Validators.required),
      email: new FormControl(this.contact?.email, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(this.contact?.phoneNumber, [Validators.required, Validators.pattern('^[0-9]{10}$')])
    });
  }

  onSubmit() {
    const contact: Contact = this.contactForm.value;
    if (this.contact) {
      contact.id = this.contact.id


      this.gestionService.mettreAJourUnContactPourAppartement(this.appartementId, contact).subscribe(contact => {
          console.log('Contact mis à jour:', contact);
          this.contactForm.reset()
          this.gestionService.contactUpdatedSubject.next(contact);
          this.cancelUpdateEvent.emit();

        },
        (error) => {
          console.error('Erreur lors de l\'ajout du contact :', error);
        })
    }
    else{
      console.error('Erreur lors de l\'ajout du contact, contact introuvable.');
    }
  }
  cancelUpdate() {
    this.contactForm.reset();
    this.cancelUpdateEvent.emit();
  }

}
