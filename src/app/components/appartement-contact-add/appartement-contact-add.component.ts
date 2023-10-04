import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, Validators} from "@angular/forms";
import {FormControl} from "@angular/forms";
import {GestionService} from "../../services/gestion.service";
import {Contact} from "../../models/gestion";

@Component({
  selector: 'app-appartement-contact-add',
  templateUrl: './appartement-contact-add.component.html',
  styleUrls: ['./appartement-contact-add.component.scss']
})
export class AppartementContactAddComponent implements OnInit{
  @Input() appartementId!: number
  contactForm!: FormGroup;

  constructor(
    private gestionService: GestionService,
  ) {}

  ngOnInit() {
    this.contactForm = new FormGroup({
      pseudo: new FormControl(null, Validators.required),
      email: new FormControl(null,  [Validators.required, Validators.email]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{10}$')])
    });
  }
  onSubmit() {
    const contact: Contact = this.contactForm.value;
    this.gestionService.ajouterUnContactPourAppartement(this.appartementId, contact).subscribe(contact => {
        console.log('Contact ajouté:', contact);
        this.gestionService.contactAddedSubject.next(contact);
        this.contactForm.reset()
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du contact :', error);
      })
  }
}
