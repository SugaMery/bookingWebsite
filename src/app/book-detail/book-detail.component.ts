import { CommonModule, isPlatformBrowser, registerLocaleData } from '@angular/common';
import { Component, Inject, PLATFORM_ID, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core'; // Import OnChanges and SimpleChanges
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import ActivityOwnerService from '../../services/UserService';
import { ActivatedRoute, Router } from '@angular/router';
import localeFr from '@angular/common/locales/fr';
import UserService from '../../services/UserService'; // Ensure you have this import
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // Import DomSanitizer
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';

registerLocaleData(localeFr);

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
interface Activity {
  name: string;
  description: string;
  image_url?: string;
  price?: number;
}

declare global {
  interface Window {
    updateTimeRange: (selectedDate: Date) => void;
  }
}

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, HeaderComponent, InputNumberModule, FooterComponent, FormsModule, CalendarModule], // Ensure FormsModule is added here
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnChanges {
  errorMessage: string | null = null;
  categories: Category[] = [];
  cities: City[] = [];
  activities: any[] = [];
  typeMenus: any[] = [];
  typeSoins: any[] = [];
  serviceSalons: any[] = [];
  servicePiscines: any[] = [];
  serviceVillas: any[] = [];
  serviceSalonBeautes: any[] = [];
  mapUrl: SafeResourceUrl | null = null; // Add mapUrl property
  popularTags: string[] = [];
  startTime: Date = new Date(); // Set default value to the current time
  selectedDate: Date | null = null; // Add this property for the selected date
  timeRange: { min: Date | null, max: Date | null } = { min: new Date(new Date().setHours(8, 0, 0, 0)), max: new Date(new Date().setHours(20, 0, 0, 0)) }; // Update this property for the time range
  numberOfPeople: number = 1; // Add property to store the number of people



  value3: number = 25;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer, // Inject DomSanitizer
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}
  id!: string;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadScripts();
      // this.loadStyles();
    }
    this.fetchCategories();
    this.fetchCitys();
    this.fetchActivities();
    this.initializeCalendar(); // Initialize the calendar
    //get id from url and use
    this.route.queryParams.subscribe((params: { [x: string]: any; }) => {
      this.id = params['id'];
      this.getActivityById(this.id);
    });
    window.updateTimeRange = this.updateTimeRange.bind(this); // Bind the function to the component context
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['timeRange']) {
      this.cdr.detectChanges(); // Trigger change detection when timeRange changes
    }
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

  private async fetchActivities() {
    try {
      this.activities = await ActivityOwnerService.getActivities();
      console.log('Activitiesyyyyyyy:', this.activities);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  }
  date: Date[] | undefined;
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

  getAverageRating(reviews: any[]): number {
    if (!reviews.length) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return parseFloat((total / reviews.length).toFixed(1));
  }

  getRatingPercentage(reviews: any[]): string {
    const averageRating = this.getAverageRating(reviews);
    return `${(averageRating / 5) * 100}%`;
  }

  navigateToDetail(activityId: string, cityName: string, activityName: string) {
    this.router.navigate(['/detail'], { queryParams: { id: activityId, ville: cityName, titre: activityName } });
  }
  activity: any | null = null;
  hours: any[] = []; // Add this property to store activity hours

  async getActivityById(activityId: string) {
    try {
      this.activity = await ActivityOwnerService.getActivityById(Number(activityId));
      console.log('Activity:', this.activity);
      this.hours = this.activity.hours; // Store the activity hours
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.google.com/maps/embed/v1/place?key=AIzaSyAgd5AQZWYpCZYv9S0WEnQLGGu1dardz_s&q=${this.activity.city_name}`);
      this.extractPopularTags(this.activity.description);
      if (this.activity.category_id === 3) {
        this.typeMenus = await UserService.getTypeMenus();
        console.log('Type Menus:', this.typeMenus);
      } else if (this.activity.category_id === 4) {
        this.typeSoins = await UserService.getTypeSoins();
        console.log('Type Soins:', this.typeSoins);
      } else if (this.activity.category_id === 5) {
        this.serviceSalons = await UserService.getServiceSalons();
        console.log('Service Salons:', this.serviceSalons);
      } else if (this.activity.category_id === 6) {
        this.servicePiscines = await UserService.getServicePiscines();
        console.log('Service Piscines:', this.servicePiscines);
      } else if (this.activity.category_id === 7) {
        this.serviceVillas = await UserService.getServiceVillas();
        console.log('Service Villas:', this.serviceVillas);
      } else if (this.activity.category_id === 8) {
        this.serviceSalonBeautes = await UserService.getServiceSalonBeaute();
        console.log('Service Salon Beautes:', this.serviceSalonBeautes);
      }
      this.initializeCalendar(); // Reinitialize the calendar with the new hours
      // Handle the fetched activity (e.g., display it on the page)
    } catch (error) {
      console.error('Error fetching activity by ID:', error);
    }
  }

  extractPopularTags(description: string) {
    const words = description.split(/\W+/).filter(word => word.length > 3);
    const wordCount: { [key: string]: number } = {};

    words.forEach(word => {
      word = word.toLowerCase();
      wordCount[word] = (wordCount[word] || 0) + 1;
    });

    this.popularTags = Object.keys(wordCount).sort((a, b) => wordCount[b] - wordCount[a]).slice(0, 10);
  }

  isActivityOpen(hours: any[]): boolean {
    const now = new Date();
    const currentDay = now.toLocaleString('en-US', { weekday: 'long' });
    const currentTime = now.toTimeString().split(' ')[0];

    const todayHours = hours.find(hour => hour.day_of_week === currentDay);
    if (!todayHours) return false;

    return currentTime >= todayHours.opening_time && currentTime <= todayHours.closing_time;
  }

  translateDayOfWeek(day: string): string {
    const days: { [key: string]: string } = {
      'Monday': 'Lundi',
      'Tuesday': 'Mardi',
      'Wednesday': 'Mercredi',
      'Thursday': 'Jeudi',
      'Friday': 'Vendredi',
      'Saturday': 'Samedi',
      'Sunday': 'Dimanche'
    };
    return days[day] || day;
  }

private initializeCalendar() {
  const script = document.createElement('script');
  script.innerHTML = `
    (function() {
      let currentMonth = document.querySelector(".current-month");
      let calendarDays = document.querySelector(".calendar-days");
      let today = new Date();
      let date = new Date();
      let selectedDate = null;

      currentMonth.textContent = date.toLocaleDateString("en-US", {month:'long', year:'numeric'});
      today.setHours(0,0,0,0);
      renderCalendar();

      function renderCalendar(){
        console.log('Rendering calendar...');
        const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        const totalMonthDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        const startWeekDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

        calendarDays.innerHTML = "";

        let totalCalendarDay = 6 * 7;
        for (let i = 0; i < totalCalendarDay; i++) {
          let day = i - startWeekDay + 1;

          if (i < startWeekDay) {
            calendarDays.innerHTML += \`<div class='padding-day'>\${prevLastDay - startWeekDay + i + 1}</div>\`;
          } else if (day <= totalMonthDay) {
            let currentDate = new Date(date.getFullYear(), date.getMonth(), day);
            currentDate.setHours(0, 0, 0, 0);

            let dayClass = currentDate.getTime() === today.getTime() && !selectedDate ? 'current-day' : 'month-day';
            if (selectedDate && currentDate.getTime() === selectedDate.getTime()) {
              dayClass = 'current-day';
            }

            // Disable non-working days
            const dayOfWeek = currentDate.toLocaleString('en-US', { weekday: 'long' });
            const isClosed = ${JSON.stringify(this.hours)}.some(hour => hour.day_of_week === dayOfWeek && hour.is_closed === 1);
            if (isClosed) {
              dayClass += ' disabled-day';
            }

            calendarDays.innerHTML += \`<div class='\${dayClass}' data-date='\${currentDate.toISOString()}'>\${day}</div>\`;
          } else {
            calendarDays.innerHTML += \`<div class='padding-day'>\${day - totalMonthDay}</div>\`;
          }
        }

        console.log('Calendar days:', calendarDays.innerHTML);

        document.querySelectorAll('.month-day, .current-day').forEach(dayElement => {
          dayElement.addEventListener('click', function() {
            if (dayElement.classList.contains('disabled-day')) return; // Prevent selection of disabled days
            document.querySelectorAll('.current-day').forEach(el => {
              el.classList.remove('current-day');
              el.classList.add('month-day');
            });
            dayElement.classList.remove('month-day');
            dayElement.classList.add('current-day');
            const selectedDate = new Date(dayElement.getAttribute('data-date'));
            window.updateTimeRange(selectedDate); // Call the global function
          });
        });
      }

      document.querySelectorAll(".month-btn").forEach(function (element) {
        element.addEventListener("click", function () {
          date = new Date(currentMonth.textContent);
          date.setMonth(date.getMonth() + (element.classList.contains("prev") ? -1 : 1));
          currentMonth.textContent = date.toLocaleDateString("en-US", {month:'long', year:'numeric'});
          renderCalendar();
        });
      });

      document.querySelectorAll(".btn").forEach(function (element) {
        element.addEventListener("click", function () {
          let btnClass = element.classList;
          date = new Date(currentMonth.textContent);
          if (btnClass.contains("today"))
            date = new Date();
          else if (btnClass.contains("prev-year"))
            date = new Date(date.getFullYear() - 1, 0, 1);
          else
            date = new Date(date.getFullYear() + 1, 0, 1);

          currentMonth.textContent = date.toLocaleDateString("en-US", {month:'long', year:'numeric'});
          renderCalendar();
        });
      });
    })();
  `;
  document.body.appendChild(script);
}

private updateTimeRange(selectedDate: Date) {
  const dayOfWeek = selectedDate.toLocaleString('en-US', { weekday: 'long' });
  const hours = this.hours.find(hour => hour.day_of_week === dayOfWeek);
  if (hours && hours.is_closed === 0) {
    const minTime = new Date(selectedDate);
    const maxTime = new Date(selectedDate);
    const [minHour, minMinute] = hours.opening_time.split(':');
    const [maxHour, maxMinute] = hours.closing_time.split(':');
    minTime.setHours(minHour, minMinute);
    maxTime.setHours(maxHour, maxMinute);
    this.timeRange = { min: minTime, max: maxTime }; // Update the time range based on the selected date
    this.startTime = minTime; // Update the start time to the opening time
  } else {
    this.timeRange = { min: null, max: null };
    this.startTime = new Date(); // Reset the start time to the current time
  }
  console.log('Updated time range:', this.timeRange);
  this.cdr.detectChanges(); // Trigger change detection
}

incrementPeople() {
  this.numberOfPeople++;
}

decrementPeople() {
  if (this.numberOfPeople > 1) {
    this.numberOfPeople--;
  }
}

goToFinalisationCommande() {
  const queryParams = {
    heure: this.startTime.toTimeString().split(' ')[0], // Extraire l'heure sans la date
    idActivite: this.id,
    date: this.startTime.toISOString().split('T')[0], // Extraire la date sans l'heure
    nombreDePersonnes: this.numberOfPeople,
   startTime : this.startTime
  };
  //console.log('Query params:', queryParams);
  this.router.navigate(['/finalisation-reservation'], { queryParams });
}
}
