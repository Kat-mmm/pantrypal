import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  signUpForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthServiceService) {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    }),{
      validators: this.passwordMatchValidation
    };
  }

  passwordMatchValidation(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  get PasswordMismatch() {
    return this.signUpForm.get('confirmPassword')?.errors?.['passwordMismatch'];
  }

  ngOnInit(){
    this.signUpForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
  }

  onSignUp() {
    this.submitted = true;
    console.log("called")
    // console.log(this.regForm.value)

    if (this.signUpForm.valid) {
      const registrationData = {
        name: this.signUpForm.value.name,
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password,
        role: "USER"
      };

      this.authService.register(registrationData).subscribe(res => {
        if (res.token !== null) {

          setTimeout(() => {
            window.location.href = '/login';
          }, 2000)
        } else {
          // Handle registration error
        }
      });
      console.log('Data to be sent', registrationData);
    }
  }
}
