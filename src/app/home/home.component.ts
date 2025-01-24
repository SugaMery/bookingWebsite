import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import ActivityOwnerService from '../../services/UserService';
import { FormsModule } from '@angular/forms';


interface Category {
  name: string;
  description: string;
  image_url?: string;
}
interface City {
  name: string;
  slug?: string;
  image_url?: string;
  left?: number;
  right?: number;
  active?: boolean;
  region?: string;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent,FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  errorMessage: string | null = null;
  categories: Category[] = [];
  cities: City[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadScripts();
      // this.loadStyles();
    }
    this.fetchCategories();
    this.fetchCitys();
  }

  private async fetchCategories() {
    try {
      this.categories = await ActivityOwnerService.getCategories();
      console.log('Categories:', this.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }


  private async fetchCitys() {
    try {
      this.cities = await ActivityOwnerService.getCities();
      console.log('cities:', this.cities);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  }


  destinations = [
    { title: "Marrakech", image: "assets/img/destination/marrakech.png", annonces: 15 },
    { title: "Casablanca", image: "assets/img/destination/casa.png", annonces: 22 },
    { title: "Rabat", image: "assets/img/destination/rabat.png", annonces: 25 },
    { title: "Tanger", image: "assets/img/destination/tanger.png", annonces: 28 },
    { title: "Agadir", image: "assets/img/destination/agadir.png", annonces: 30 },
    { title: "Tetouan", image: "assets/img/destination/tetouan.png", annonces: 15 },

    { title: "Marrakech", image: "assets/img/destination/marrakech.png", annonces: 15 },
    { title: "Casablanca", image: "assets/img/destination/casa.png", annonces: 22 },
    { title: "Rabat", image: "assets/img/destination/rabat.png", annonces: 25 },
    { title: "Tanger", image: "assets/img/destination/tanger.png", annonces: 28 },
    { title: "Agadir", image: "assets/img/destination/agadir.png", annonces: 30 },
    { title: "Tetouan", image: "assets/img/destination/tetouan.png", annonces: 15 },

  ];
  
  tours = [
    {
      title: 'Forfait tour en Grèce',
      image: 'assets/img/tour/tour_box_1.jpg',
      description: 'Découvrez la beauté de la Grèce.',
      price: '$980.00',
      rating: 4.8,
      duration: '7 Days',
      link: 'tour-details.html',
    },
    {
      title: 'Forfait tour en Italie',
      image: 'assets/img/tour/tour_box_2.jpg',
      description: 'Explorez les merveilles italiennes.',
      price: '$980.00',
      rating: 4.8,
      duration: '7 Days',
      link: 'tour-details.html',
    },
    {
      title: 'Forfait tour à Dubaï',
      image: 'assets/img/tour/tour_box_3.jpg',
      description: 'Profitez de l\'opulence de Dubaï.',
      price: '$980.00',
      rating: 4.8,
      duration: '7 Days',
      link: 'tour-details.html',
    },
    {
      title: 'Suisse',
      image: 'assets/img/tour/tour_box_4.jpg',
      description: 'Admirez les Alpes suisses.',
      price: '$980.00',
      rating: 4.8,
      duration: '7 Days',
      link: 'tour-details.html',
    },
  ];
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

  private loadStyles() {
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'assets/css/swiper-bundle.min.css';
    document.head.appendChild(linkElement);
  }

  togglePasswordVisibility(id: string): void {
    const input = document.getElementById(id) as HTMLInputElement;
    if (input) {
      const icon = input.nextElementSibling?.querySelector('i');
      if (input.type === 'password') {
        input.type = 'text';
        icon?.classList.remove('fa-eye');
        icon?.classList.add('fa-eye-slash');
      } else {
        input.type = 'password';
        icon?.classList.remove('fa-eye-slash');
        icon?.classList.add('fa-eye');
      }
    }
  }

  async onRegisterActivityOwner(event: Event) {
    console.log('Registering activity owner...');
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const activityOwner = {
      name: formData.get('business_name') as string,
      email: formData.get('business_email') as string,
      password: formData.get('business_password') as string,
      ice: formData.get('tax_id') as string,
      manager_name: formData.get('business_address') as string,
      phone_number: formData.get('business_phone') as string,
    };

    try {
      const response = await ActivityOwnerService.createActivityOwner(activityOwner);
      console.log('Activity owner created:', response);
      this.errorMessage = null;
      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error('Error creating activity owner:', error);
      if (error instanceof Error) {
        if (error.message === 'Email already exists') {
          this.errorMessage = 'L\'email existe déjà. Veuillez en utiliser un autre.';
        } else {
          this.errorMessage = error.message;
        }
      } else {
        this.errorMessage = 'An error occurred while creating the activity owner.';
      }
      // Handle error (e.g., show an error message)
      console.log('errorMessage', this.errorMessage);
    }
  }
}
