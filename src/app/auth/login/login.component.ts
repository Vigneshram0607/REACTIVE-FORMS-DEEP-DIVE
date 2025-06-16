import { Component, DestroyRef, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl){
  if(control.value.includes('?')){
    return null;
  }
  return { doesNotContainQuestionMark: true};
}

function emailIsUnique(control: AbstractControl){
  // Return Observable for 'asyncValidators'
  if(control.value !== 'test@example.com'){
    return of(null);
  }
  return of({notUnique: true});
}
let initialEmailValue:string = '';
const savedForm = window.localStorage.getItem('saved-login-info');
    if(savedForm){
      const loadedForm = JSON.parse(savedForm);
      initialEmailValue = loadedForm.email;
    }

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private destroy = inject(DestroyRef)
  form = new FormGroup({
    email : new FormControl(initialEmailValue,{
      validators: [Validators.email, Validators.required],
      asyncValidators:[emailIsUnique]
    }),
    password: new FormControl('',{
      validators: [Validators.required,Validators.minLength(6), mustContainQuestionMark]
    }),
  });

  get emailIsInvalid(){
    return this.form.controls.email.untouched && this.form.controls.email.dirty && this.form.controls.email.invalid;
  }
  get passwordIsInvalid(){
    return this.form.controls.password.untouched && this.form.controls.password.dirty && this.form.controls.password.invalid;
  }

  ngOnInit(){
    
    const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: value=>{
        window.localStorage.setItem('saved-login-info',JSON.stringify({email: value.email}))
      }
    });

    this.destroy.onDestroy(()=>subscription.unsubscribe());

  }

  onSubmit(){
    console.log(this.form);
  }
}