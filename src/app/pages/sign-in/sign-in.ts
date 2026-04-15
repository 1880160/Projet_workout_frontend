import { Component, computed, inject, signal } from '@angular/core';
import { Logo } from '../../component/logo/logo';
import { FieldState, form, FormField, maxLength, minLength, pattern, required } from '@angular/forms/signals';
import { LoginData } from './login-data';
import { catchError, Observable } from 'rxjs';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-sign-in',
  imports: [Logo, FormField],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {
  private auth = inject(AuthService);

  errorMsg = signal('');


  loginModel = signal<LoginData>({
    username : '',
    password : '',
  });

  loginForm = form<LoginData>(this.loginModel, (schemaPath) => {
    required(schemaPath.username, {message: "A username is required"});
    minLength(schemaPath.username,3,{message: "Must be 3 characters or higher"});
    maxLength(schemaPath.username,30,{message: "Must be 30 characters or lower"});
    pattern(schemaPath.username,/[A-Za-z][A-Za-z0-9\-]*/ , {
      message : 'Needs to include only letters, numbers or dash'
    })

    required(schemaPath.password, {message: "A password is required"});
    minLength(schemaPath.password,3,{message: "Must be 8 characters or higher"});
    pattern(schemaPath.password,/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/ , {
      message : 'Needs to include at least one number, one lowercase letter, one uppercase letter'
    })
  });

  canConfirm = computed(() => {
    return !(this.loginForm.password().valid() &&
    this.loginForm.username().valid());
  })
  async signInConfirm() {
    (await this.auth.login(this.loginForm().value())).subscribe(
      {
        next : this.auth.setSession,
        error : (error) => this.errorMsg.set(error.error?.message)
      }
    )
  }
}