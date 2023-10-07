import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-utilisateur-add',
  templateUrl: './utilisateur-add.component.html',
  styleUrls: ['./utilisateur-add.component.scss']
})
export class UtilisateurAddComponent {
  constructor(private fb: FormBuilder, private authService: AuthService) {}


  userForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    token: ['', [Validators.required]],
  });
  ngOnInit(): void {
  }
  onSubmit() {
    if (this.userForm.valid) {
      const { username, password, token } = this.userForm.value;
      if(username && password && token) {
        this.authService.createUser(username, password, token).subscribe(
          () => console.log('Utilisateur ajouté avec succès.'),
          (error) => console.error('Erreur lors de la création de l\'uitlisateur : ', error)
        );
      }
    }
  }
}
