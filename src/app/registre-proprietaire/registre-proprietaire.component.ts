import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registre-proprietaire',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, DropdownModule, FormsModule],
  templateUrl: './registre-proprietaire.component.html',
  styleUrl: './registre-proprietaire.component.css'
})
export class RegistreProprietaireComponent {
  telephonePrefixes = [
    { label: '+1', value: '+1' },
    { label: '+33', value: '+33' },
    { label: '+212', value: '+212' }
    // Add more options as needed
  ];


  selectedPrefix: string = ''; // Add this property

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

  ngOnInit() {
    this.loadScripts();
  }

}
