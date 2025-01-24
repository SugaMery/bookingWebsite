import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import ActivityOwnerService from '../../services/UserService';
import { CommonModule } from '@angular/common';

interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-registre',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, DropdownModule, FormsModule,CommonModule],
  templateUrl: './registre.component.html',
  styleUrl: './registre.component.css'
})
export class RegistreComponent {
  telephonePrefixes = [
    { label: '+1', value: '+1' },
    { label: '+33', value: '+33' },
    { label: '+212', value: '+212' }
    // Add more options as needed
  ];
  cities: City[] | undefined;

  selectedCity: City | undefined;

  selectedPrefix: string = ''; // Add this property

  errorMessage: string | null = null;

  nom: string = '';
  prenom: string = '';
  telephone: string = '';
  email3: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

  private loadScripts() {
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

  isValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  async onSubmit() {
    this.errorMessage = null; // Reset error message

    if (!this.nom || !this.prenom || !this.telephone || !this.email3 || !this.password || !this.confirmPassword) {
      return;
    }

    if (this.password !== this.confirmPassword) {
      return;
    }

    if (!this.isValidPassword(this.password)) {
      return;
    }

    const clientData = {
      nom: this.nom,
      prenom: this.prenom,
      numero_telephone: this.selectedPrefix + this.telephone,
      email: this.email3,
      mot_de_passe: this.password,
    };

    try {
      console.log('Creating client:', clientData);
      await ActivityOwnerService.createClient(clientData);
      this.router.navigate(['/connexion']);
    } catch (error) {
      console.error('Error creating client:', error);

      if (error instanceof Error) {
        if (error.message === 'Email already exists') {
          this.errorMessage = 'L\'email existe déjà. Veuillez en utiliser un autre.';
        } else {
          this.errorMessage = error.message;
        }
      } else {
        this.errorMessage = 'An error occurred while creating the activity owner.';
      }
    }
  }

  ngOnInit() {
    this.loadScripts();
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
  ];
  }
}
