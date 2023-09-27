// create-user.component.ts
import {Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit{
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
          (user) => console.log('User created!', user),
          (error) => console.error('Creation failed!', error)
        );
      }
    }
  }

}
