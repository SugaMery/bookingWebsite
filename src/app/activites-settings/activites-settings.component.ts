import { Component, Renderer2, OnInit, Inject, PLATFORM_ID, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// Change jQuery import to default import
import $ from 'jquery';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import UserService from '../../services/UserService';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { MessageService } from 'primeng/api';
import { Toast, ToastModule } from 'primeng/toast';
import { HeaderComponent } from "../header/header.component";
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

declare var google: any;

@Component({
  selector: 'app-activites-settings',
  standalone: true,
  imports: [FormsModule, CommonModule, CalendarModule, ToastModule, HeaderComponent, FileUploadModule, HttpClientModule], // Add HttpClientModule here
  templateUrl: './activites-settings.component.html',
  styleUrl: './activites-settings.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService]
})
export class ActivitesSettingsComponent implements OnInit, AfterViewInit {
  categories: any[] = [];
  cities: any[] = [];
  imageUrl: string | ArrayBuffer | null = null;
  imagePlatUrl: string | ArrayBuffer | null = null; // Add this line
  activity = {
    name: '',
    description: '',
    city_id: 0,
    category_id: 0,
    address: '',
    capacity: 0,
    logo: new File([], ''),
    activity_id: 0,
    latitude: 0,
    longitude: 0,
    reservations_allowed: false, // Add this line
    active: false // Add this line
  };
  activityId: any;
  activeTab: string = 'details-de-base';
  slots: { [key: string]: { startTime: Date, endTime: Date, isNonWorkingDay: boolean } } = {
    monday: { startTime: new Date(new Date().setHours(8, 0, 0)), endTime: new Date(new Date().setHours(18, 0, 0)), isNonWorkingDay: false },
    tuesday: { startTime: new Date(new Date().setHours(8, 0, 0)), endTime: new Date(new Date().setHours(18, 0, 0)), isNonWorkingDay: false },
    wednesday: { startTime: new Date(new Date().setHours(8, 0, 0)), endTime: new Date(new Date().setHours(18, 0, 0)), isNonWorkingDay: false },
    thursday: { startTime: new Date(new Date().setHours(8, 0, 0)), endTime: new Date(new Date().setHours(18, 0, 0)), isNonWorkingDay: false },
    friday: { startTime: new Date(new Date().setHours(8, 0, 0)), endTime: new Date(new Date().setHours(18, 0, 0)), isNonWorkingDay: false },
    saturday: { startTime: new Date(new Date().setHours(8, 0, 0)), endTime: new Date(new Date().setHours(18, 0, 0)), isNonWorkingDay: false },
    sunday: { startTime: new Date(new Date().setHours(8, 0, 0)), endTime: new Date(new Date().setHours(18, 0, 0)), isNonWorkingDay: false }
  };
  startTime: Date;
  endTime: Date;
  appointmentInterval: number = 10;
  appointmentDuration: number = 30;
  appointmentSpace: number = 1;
  isModalVisible: boolean = false;
  currentDay: string = '';
  images: any[] = [];
  map: any;
  marker: any;
  selectedPosition: { lat: number, lng: number } | null = null;
  user: any = {};
  unsavedChanges: boolean = false;
  showUnsavedChangesModal: boolean = false;
  nextTab: string = '';
  isCritereModalVisible: boolean = false;
  selectedCritereType: string = 'restaurant';
  critere: any = {};
  typeMenus: any[] = []; // Add this line to store type menus
  typeSoins: any[] = []; // Add this line to store type soins
  serviceSalons: any[] = []; // Add this line to store service salons
  servicePiscines: any[] = []; // Add this line to store service piscines
  serviceVillas: any[] = []; // Add this line to store service villas
  uploadedFiles: any[] = []; // Add this line to store uploaded files

  constructor(private renderer: Renderer2, @Inject(PLATFORM_ID) private platformId: Object, private messageService: MessageService) {
    // Set default values for startTime and endTime
    this.startTime = new Date();
    this.startTime.setHours(8, 0, 0); // 08:00 AM
    this.endTime = new Date();
    this.endTime.setHours(18, 0, 0); // 06:00 PM
  }

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadStyles();
      this.loadScriptED();
    }
    this.fetchCategoriesAndCities();
    this.populateActivityFields();
    this.setActiveDay('monday'); // Set default selected day to 'monday'
    this.trackChanges();
    this.typeMenus = await UserService.getTypeMenus(); // Fetch type menus
    console.log('Type Menus:', this.typeMenus);
    this.typeSoins = await UserService.getTypeSoins(); // Fetch type soins
    this.serviceSalons = await UserService.getServiceSalons(); // Fetch service salons
    this.servicePiscines = await UserService.getServicePiscines(); // Fetch service piscines
    this.serviceVillas = await UserService.getServiceVillas(); // Fetch service villas
  }

  ngAfterViewInit() {
    //this.loadScripts();
   // this.loadGoogleMapsScript();
  }

  private loadStyles() {
    const linkElement = this.renderer.createElement('link');
    this.renderer.setAttribute(linkElement, 'rel', 'stylesheet');
    this.renderer.setAttribute(linkElement, 'href', 'assets2/css/custom.css');
    this.renderer.appendChild(document.head, linkElement);

    // Add yeti-alerts.css
    const yetiAlertsLink = this.renderer.createElement('link');
    this.renderer.setAttribute(yetiAlertsLink, 'rel', 'stylesheet');
    this.renderer.setAttribute(yetiAlertsLink, 'href', 'assets2/yeti-alerts.css');
    this.renderer.appendChild(document.head, yetiAlertsLink);
  }

  private async fetchCategoriesAndCities() {
    try {
      this.categories = await UserService.getCategories();
      //console.log('Categories:', this.categories);
      this.cities = await UserService.getCities();
     // console.log('Cities:', this.cities);
    } catch (error) {
      console.error('Error fetching categories and cities:', error);
    }
  }
  private loadScriptED() {
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

  private async populateActivityFields() {
    try {
      if (isPlatformBrowser(this.platformId)) {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('userToken');
        if (userId && token) {
          const user = await UserService.getUserById(Number(userId), token);
          if (user.data) {
            this.user = {
              name: user.data.user.first_name + ' ' + user.data.user.last_name,
              qualification: user.data.user.email,
              role: user.data.role_id === 4 ? 'Propriétaire' : user.data.role_id === 3 ? 'Client' : 'Utilisateur'
            };
            console.log('User:', this.user);
          }
          if (user.data.activities && user.data.activities.length > 0) {
            const activity = user.data.activities[0];
            console.log('Activity:', activity);
            this.activityId = activity.activity_id;
            this.activity.name = activity.name;
            this.activity.description = activity.description;
            this.activity.city_id = activity.city_id;
            this.activity.category_id = activity.category_id;
            this.activity.address = activity.address;
            this.activity.capacity = activity.capacity;
            this.imageUrl = activity.logo;
            this.activity.reservations_allowed = activity.reservations_allowed;
            this.activity.active = activity.active;
            // Handle images
            if (activity.images) {
              this.images = activity.images.map((img: any) => ({
                id: img.image_id,
                url: img.image_url,
                file: null
              }));
            }

            // Set activity hours
            const defaultStartTime = new Date();
            defaultStartTime.setHours(8, 0, 0);
            const defaultEndTime = new Date();
            defaultEndTime.setHours(18, 0, 0);

            if (activity.hours) {
              activity.hours.forEach((hour: any) => {
                const day = hour.day_of_week.toLowerCase();
                this.slots[day] = {
                  startTime: new Date(`1970-01-01T${hour.opening_time}Z`),
                  endTime: new Date(`1970-01-01T${hour.closing_time}Z`),
                  isNonWorkingDay: hour.is_closed === 1
                };
              });
            }

            // Set default hours for days not provided
            for (const day in this.slots) {
              if (!activity.hours || !activity.hours.some((hour: any) => hour.day_of_week.toLowerCase() === day)) {
                this.slots[day] = {
                  startTime: defaultStartTime,
                  endTime: defaultEndTime,
                  isNonWorkingDay: false
                };
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error fetching user activity:', error);
    }
  }

  private loadScripts() {
    if (isPlatformBrowser(this.platformId)) {
      const jqueryScript = this.renderer.createElement('script');
      jqueryScript.type = 'text/javascript';
      jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
      jqueryScript.onload = () => {
        const momentScript = this.renderer.createElement('script');
        momentScript.type = 'text/javascript';
        momentScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js';

        this.renderer.appendChild(document.body, momentScript);
      };
      this.renderer.appendChild(document.body, jqueryScript);
    }
  }

  private loadGoogleMapsScript() {
    if (isPlatformBrowser(this.platformId)) {
      const script = this.renderer.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD44RB3SeJ1-GqDYbVUc8qzCBO1SvrAKu4&libraries=places';
      script.async = true;
      script.defer = true;
      script.onload = () => this.initMap();
      this.renderer.appendChild(document.body, script);
    }
  }

  private initMap() {
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
      this.map = new google.maps.Map(mapContainer, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
      });

      this.map.addListener('click', (event: any) => {
        this.placeMarker(event.latLng);
      });
    } else {
      console.error('Map element not found');
    }
  }

  private placeMarker(location: any) {
    if (this.marker) {
      this.marker.setPosition(location);
    } else {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map
      });
    }
    this.selectedPosition = { lat: location.lat(), lng: location.lng() };
  }

  saveMapLocation() {
    if (this.selectedPosition) {
      console.log('Selected Position:', this.selectedPosition);
      // Save the selected position to the activity object or send it to the server
      this.activity.latitude = this.selectedPosition.lat;
      this.activity.longitude = this.selectedPosition.lng;
      this.showSuccess('Position enregistrée avec succès');
    } else {
      this.showInfo('Veuillez sélectionner une position sur la carte');
    }
  }

  onImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target?.result ?? null;
        if (input.files && input.files[0]) {
          this.activity.logo = input.files[0];
        }
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  onImagePlatUpload(event: Event) { // Add this method
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePlatUrl = e.target?.result ?? null;
        if (input.files && input.files[0]) {
          this.critere.imageplat = input.files[0];
        }
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  async onSubmit() {
    try {
      const token = localStorage.getItem('userToken');
      if (token) {
        await UserService.updateActivity(this.activityId, this.activity, token);
        if (this.images.some(image => image.file)) {
          await this.uploadImages();
        }
        this.showSuccess('Détails de l\'activité mis à jour avec succès'); // Remplacer l'alerte par un toast
        this.unsavedChanges = false;
      } else {
        alert('User token not found');
      }
    } catch (error) {
      console.error('Error updating activity:', error);
      alert('Error updating activity');
    }
  }

  setActiveTab(tab: string) {
    if (this.unsavedChanges) {
      this.nextTab = tab;
      this.showUnsavedChangesModal = true;
    } else {
      this.activeTab = tab;
    }
  }

  confirmTabChange() {
    this.onSubmit();
    this.activeTab = this.nextTab;
    this.showUnsavedChangesModal = false;
  }

  discardChanges() {
    this.showUnsavedChangesModal = false;
  }

  setActiveDay(day: string) {
    this.currentDay = day;
  }

  showModal(day: string) {
    this.currentDay = day;
    this.startTime = this.slots[day].startTime || new Date();
    this.endTime = this.slots[day].endTime || new Date();
    this.isModalVisible = true;
  }

  hideModal() {
    this.isModalVisible = false;
  }

  onAddSlot() {
    this.slots[this.currentDay] = {
      startTime: new Date(this.startTime),
      endTime: new Date(this.endTime),
      isNonWorkingDay: false
    };
    this.hideModal();
  }

  clearSlots(day: string) {
    this.slots[day] = { startTime: new Date(), endTime: new Date(), isNonWorkingDay: false };
  }

  setNonWorkingDay(day: string) {
    this.slots[day] = { startTime: new Date(0), endTime: new Date(0), isNonWorkingDay: true };
  }
  close(){
    this.showUnsavedChangesModal = false;
  }
  async saveActivityHours() {
    try {
      const token = localStorage.getItem('userToken');
      if (token) {
        for (const day in this.slots) {
          const slot = this.slots[day];
            const activityHour = {
              activity_id: this.activityId,
              day_of_week: day,
              opening_time: slot.startTime.toISOString().split('T')[1].split('.')[0],
              closing_time: slot.endTime.toISOString().split('T')[1].split('.')[0],
              is_closed: slot.isNonWorkingDay ? 1 : 0
            };
          console.log('Activity hour:', activityHour);
          await UserService.createActivityHour(activityHour, token);
        }
        this.showSuccess('Les heures d\'activité ont été mises à jour avec succès.');
      } else {
        alert('User token not found');
      }
    } catch (error) {
      console.error('Error updating activity hours:', error);
      alert('Error updating activity hours');
    }
  }

  async uploadImages() {
    try {
        const token = localStorage.getItem('userToken');
        if (token) {
            const formData = new FormData();
            formData.append('activity_id', this.activityId.toString());
            this.images.forEach(image => {
                if (image.file) {
                    formData.append('images', image.file);
                }
            });

            if (formData.has('images')) {
                const response = await UserService.uploadActivityImages(formData, token);
                this.showSuccess('Images uploaded successfully');

                // Update the images array with the newly uploaded images
                const uploadedImages = response.data.imageUrls.map((url: string, index: number) => ({
                    id: response.data.imageIds[index], // Set the id for each uploaded image
                    url,
                    file: null
                }));
                this.images = this.images.map(image => image.file ? uploadedImages.shift() : image);
            } else {
                this.showInfo('Aucune image à télécharger');
            }
        } else {
            alert('User token not found');
        }
    } catch (error) {
        console.error('Error uploading images:', error);
        alert('Error uploading images');
    }
}

showInfo(detail: string) {
  this.messageService.add({
    severity: 'info',
    detail,
    life: 60000,
    styleClass: 'custom-toast'
  });
}

  async deleteImage(image: any) {
    try {
        const token = localStorage.getItem('userToken');
        if (token && image.file === null) { // Only delete images that are already uploaded
            await UserService.deleteActivityImage(image.id, token);
            this.showSuccess('Image supprimée avec succès');
        }
        this.images = this.images.filter(img => img !== image);
    } catch (error) {
        console.error('Error deleting image:', error);
        alert('Error deleting image');
    }
}

  showSuccess(detail: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Succès',
      detail,
      life: 3000,
      styleClass: 'custom-toast'
    });
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(input.files);
    }
  }

  handleFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.images.push({ url: e.target.result, file });
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(image: any) {
    this.images = this.images.filter(img => img !== image);
  }

  resetImages() {
    this.images = [];
  }
  
  async onSubmitReservations() {
    // Logic to handle the form submission for reservations settings
    console.log('Reservations settings saved:', this.activity);
    try {
      const token = localStorage.getItem('userToken');
      if (token) {
        // Check if the logo image has changed
        let activite: {
          reservations_allowed: boolean;
          active: boolean;
          name: string;
          description: string;
          city_id: number;
          category_id: number;
          address: string;
          capacity: number;
          logo?: File;
          activity_id: number;
          latitude: number;
          longitude: number;
        };
        if (this.activity.logo.size == 0) {
          console.log('Logo image not changed');
          // If the logo image hasn't changed, remove it from the activity object
           activite = {
            reservations_allowed: this.activity.reservations_allowed,
            active: this.activity.active,
            name: this.activity.name,
            description: this.activity.description,
            city_id:  this.activity.city_id,
            category_id:  this.activity.category_id,
            address: this.activity.address,
            capacity: this.activity.capacity,
       
            activity_id: this.activityId,
            latitude: 0,
            longitude: 0,
  
          }
        } else {
          // If the logo image has changed, update it in the activity object
           activite = {
            reservations_allowed: this.activity.reservations_allowed,
            active: this.activity.active,
            name: this.activity.name,
            description: this.activity.description,
            city_id:  this.activity.city_id,
            category_id:  this.activity.category_id,
            address: this.activity.address,
            capacity: this.activity.capacity,
            logo : this.activity.logo,
            activity_id: this.activityId,
            latitude: 0,
            longitude: 0,
  
          }
        }
        await UserService.updateActivity(this.activityId, activite , token);
        this.showSuccess('Paramètres d\'activité mis à jour avec succès'); // Replace alert with toast
        this.unsavedChanges = false;
      } else {
        alert('User token not found');
      }
    } catch (error) {
      console.error('Error updating activity:', error);
      alert('Error updating activity');
    }
    
    // Add your save logic here
  }
  
  trackChanges() {
    this.renderer.listen(document, 'input', () => {
      this.unsavedChanges = true;
    });
  }

  onSubmitCriteres() {
    // Logic to handle form submission for Critères
    console.log('Critères form submitted', this.activity);
    // Add your form submission logic here
  }

  showCritereModal() {
    this.isCritereModalVisible = true;
  }

  hideCritereModal() {
    this.isCritereModalVisible = false;
  }

  async onAddCritere() {
    try {
        const token = localStorage.getItem('userToken');
        if (token) {
            if (this.activity.category_id === 3) {
                await UserService.createMenu(this.critere, token);
            } else if (this.activity.category_id === 4) {
                await UserService.createSpaSoin(this.critere, token);
            } else if (this.activity.category_id === 5) {
                await UserService.createSalonService(this.critere, token);
            } else if (this.activity.category_id === 6) {
                await UserService.createServicePiscine(this.critere, token);
            } else if (this.activity.category_id === 7) {
                await UserService.createVillaService(this.critere, token);
            } else if (this.activity.category_id === 8) {
                await UserService.createActivity(this.critere, token);
            }
            this.showSuccess('Critère ajouté avec succès');
            this.hideCritereModal();
        } else {
            alert('User token not found');
        }
    } catch (error) {
        console.error('Error adding critère:', error);
        alert('Error adding critère');
    }
  }

  onUpload(event: any) {
    for (let file of event.files) {
        this.uploadedFiles.push(file);
    }
    this.showSuccess('Fichier téléchargé avec succès');
  }
}
