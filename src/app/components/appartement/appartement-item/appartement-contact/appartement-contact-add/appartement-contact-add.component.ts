import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, Validators} from "@angular/forms";
import {FormControl} from "@angular/forms";
import {GestionService} from "../../../../../services/gestion.service";
import {Contact} from "../../../../../models/gestion";

@Component({
  selector: 'app-appartement-contact-add',
  templateUrl: './appartement-contact-add.component.html',
  styleUrls: ['./appartement-contact-add.component.scss']
})
export class AppartementContactAddComponent implements OnInit {
  @Input() appartementId: number | null = null;
  contactForm!: FormGroup;

  constructor(
    private gestionService: GestionService,
  ) {}

  ngOnInit() {
    this.contactForm = new FormGroup({
      pseudo: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.email]),
      phoneNumber: new FormControl(null, [
        Validators.pattern('^\\+?[0-9 ]{7,15}$') // Adapté pour les numéros internationaux
      ])
    });
  }

  ajouterUnContactPourAppartement() {
    const userId = parseInt(<string>localStorage.getItem('userId'));
    const contact: Contact = this.contactForm.value;
    this.gestionService.ajouterUnContactPourAppartement(userId, this.appartementId, contact).subscribe(
      contact => {
        this.gestionService.contactAddedSubject.next(contact);
        this.contactForm.reset();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du contact :', error);
      }
    );
  }
}
