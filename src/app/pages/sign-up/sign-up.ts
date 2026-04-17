import { Component, computed, inject, signal } from '@angular/core';
import { Logo } from '../../component/logo/logo';
import { form, required, minLength, maxLength, pattern, FormField, email } from '@angular/forms/signals';
import { LoginData } from '../sign-in/login-data';
import { SignInData } from './sign-in-data';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-sign-up',
  imports: [Logo, FormField, RouterModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {

  errorMsg = signal('');

  
  private router = inject(Router)
  auth = inject(AuthService);

  signUpModel = signal<SignInData>({
    username: '',
    password: '',
    email: '',
  });

  signUpForm = form<SignInData>(this.signUpModel, (schemaPath) => {
    required(schemaPath.username, { message: "A username is required" });
    minLength(schemaPath.username, 3, { message: "Must be 3 characters or higher" });
    maxLength(schemaPath.username, 30, { message: "Must be 30 characters or lower" });
    pattern(schemaPath.username, /[A-Za-z][A-Za-z0-9\-]*/, {
      message: 'Needs to include only letters, numbers or dash'
    })

    required(schemaPath.password, { message: "A password is required" });
    minLength(schemaPath.password, 3, { message: "Must be 8 characters or higher" });
    pattern(schemaPath.password, /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, {
      message: 'Needs to include at least one number, one lowercase letter, one uppercase letter'
    });

    required(schemaPath.email, { message: "A email is required (even though it's useless)" });
    email(schemaPath.email, { message : "The email is invalid"});
  });

  canConfirm = computed(() => {
    return !(this.signUpForm.password().valid() &&
      this.signUpForm.username().valid()
    && this.signUpForm.email().valid());
  })

  async signUpConfirm() {
    (await this.auth.signUp(this.signUpForm().value())).subscribe(
      {
        next : () => this.router.navigate(['/sign-in']),
        error : (error) => this.errorMsg.set(error.error?.message)
      }
    )
  }

}
