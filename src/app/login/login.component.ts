import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { Router } from '@angular/router';
import UserService from '../../services/UserService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  private loadScripts() {
    if (typeof document !== 'undefined') {
      const scripts = [
        'assets/js/vendor/jquery-3.6.0.min.js',
        'assets/js/swiper-bundle.min.js',
        'assets/js/bootstrap.min.js',
        'assets/js/jquery.magnific-popup.min.js',
        'assets/js/jquery.counterup.min.js',
        'assets/js/jquery-ui.min.js',
        'assets/js/imagesloaded.pkgd.min.js',
        'assets/js/isotope.pkgd.min.js',
        'assets/js/gsap.min.js',
        'assets/js/circle-progress.js',
        'assets/js/matter.min.js',
        'assets/js/matterjs-custom.js',
        'assets/js/nice-select.min.js',
        'assets/js/main.js',
        'assets/js/bootstrap.min.js'
      ];

      for (const script of scripts) {
        const scriptElement = document.createElement('script');
        scriptElement.src = script;
        scriptElement.async = false;
        document.body.appendChild(scriptElement);
      }
    }
  }

  getUserFullName(): string {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('userFullname') || 'Se Connecter / S\'inscrire';
    }
    return 'Se Connecter / S\'inscrire';
  }

  getUserRole(): number {
    if (typeof window !== 'undefined' && window.localStorage) {
      return parseInt(localStorage.getItem('userRole') || '0', 10);
    }
    return 0;
  }

  togglePasswordVisibility(id: string) {
    const input = document.getElementById(id) as HTMLInputElement;
    const icon = document.getElementById(id + '-icon') as HTMLElement;
    if (input.type === "password") {
      input.type = "text";
      icon.classList.remove('pi-eye');
      icon.classList.add('pi-eye-slash');
    } else {
      input.type = "password";
      icon.classList.remove('pi-eye-slash');
      icon.classList.add('pi-eye');
    }
  }

  async onSubmit() {
    console.log('Logging in with email:', this.email);
    try {
      const response = await UserService.loginUser(this.email, this.password);
      // Handle successful login, e.g., store token, navigate to dashboard
      console.log('Login successful:', response);

      // Save user information in local storage
      const { token, id, first_name, last_name,role_id } = response.data;
      localStorage.setItem('userId', id);
      localStorage.setItem('userToken', token);
      localStorage.setItem('userRole', role_id);
      localStorage.setItem('userFullname', `${first_name} ${last_name}`);

      this.router.navigate(['/']);
    } catch (error: any) {
      // Handle login error
      console.error('Login failed:', error);

      this.errorMessage = error.message;

      // Log detailed error information
      console.error('Detailed error information:', {
        message: error.message,
        stack: error.stack,
        response: error.response,
      });
    }
  }

  ngOnInit() {
    this.loadScripts();
  }
}
