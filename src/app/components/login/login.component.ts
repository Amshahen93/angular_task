import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.checkRimember();
    this.generateLoginForm();
  }

  generateLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false]
    });
  }

  checkRimember(): void {
    if (this.authService.token) {
      this.router.navigate(['user']);
    }
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const form = this.loginForm.value;
      if (form.remember) {
        this.authService.setToken('some token');
      } else {
        this.authService.setToken('');
        this.authService.token = 'some token';
      }
      this.authService.setUserData({
        email: form.email,
        user_id: 'test_id',
        user_lastname: 'Doe',
        user_name: 'Jhone'
      });
      this.router.navigate(['user']);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
