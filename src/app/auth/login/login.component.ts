import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form = new FormGroup({
    email : new FormControl('',{
      validators: [Validators.email, Validators.required]
    }),
    password: new FormControl('',{
      validators: [Validators.required,Validators.minLength(6)]
    }),
  });

  get emailIsInvalid(){
    return this.form.controls.email.untouched && this.form.controls.email.dirty && this.form.controls.email.invalid;
  }
  get git (){
    return this.form.controls.password.untouched && this.form.controls.password.dirty && this.form.controls.password.invalid;
  }

  onSubmit(){
    console.log(this.form);
  }
}