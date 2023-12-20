import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../../services/auth.service";
import {GestionService} from "../../../../../services/gestion.service";

@Component({
  selector: 'app-appartement-gestionnaire-add',
  templateUrl: './appartement-gestionnaire-add.component.html',
  styleUrls: ['./appartement-gestionnaire-add.component.scss']
})
export class AppartementGestionnaireAddComponent {
  appGestionnaireForm!: FormGroup;
  message: '';
  @Input() appartementId: number;

  constructor(
    private authService: AuthService,
    private gestionService: GestionService
  ) {}


  ngOnInit(): void {
    this.appGestionnaireForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      token: new FormControl(null, Validators.required),
    });
  }

  ajouterGestionnaireAppartement() {
    if(this.appGestionnaireForm.valid){
      const { username, password, token } = this.appGestionnaireForm.value
      const userId = parseInt(<string>localStorage.getItem('userId'))
      this.authService.createGestionnaire(userId, this.appartementId, username, password, token).subscribe(
        (userDto) => {
          this.gestionService.gestionnaireAddedSubject.next(userDto);
          this.appGestionnaireForm.reset()
          this.message = ''
        },(response) =>
          this.message = response.error.message
      );
    }

  }
}
