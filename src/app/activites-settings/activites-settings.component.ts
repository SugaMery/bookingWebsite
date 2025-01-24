import { Component, Renderer2, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import UserService from '../../services/UserService';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-activites-settings',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './activites-settings.component.html',
  styleUrl: './activites-settings.component.css'
})
export class ActivitesSettingsComponent implements OnInit {
  categories: any[] = [];
  cities: any[] = [];
  imageUrl: string | ArrayBuffer | null = null;
  activity = {
    name: '',
    description: '',
    city_id: 0,
    category_id: 0,
    address: '',
    capacity: 0,
    logo: new File([], '')
  };

  constructor(private renderer: Renderer2, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadStyles();
    }
    this.fetchCategoriesAndCities();
    this.populateActivityFields();
  }

  private loadStyles() {
    const linkElement = this.renderer.createElement('link');
    this.renderer.setAttribute(linkElement, 'rel', 'stylesheet');
    this.renderer.setAttribute(linkElement, 'href', 'assets2/css/custom.css');
    this.renderer.appendChild(document.head, linkElement);
  }

  private async fetchCategoriesAndCities() {
    try {
      this.categories = await UserService.getCategories();
      this.cities = await UserService.getCities();
    } catch (error) {
      console.error('Error fetching categories and cities:', error);
    }
  }

  private async populateActivityFields() {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('userToken');
      if (userId && token) {
        const user = await UserService.getUserById(Number(userId), token);
        console.log("user", user);
        if (user.data.activities) {
          this.activity = user.data.activities;
          this.imageUrl = user.data.activities[0].logo;
          console.log("imageUrl imageUrl", this.imageUrl);
        }
      }
    } catch (error) {
      console.error('Error fetching user activity:', error);
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

  async onSubmit() {
    try {
      const token = localStorage.getItem('userToken');
      if (token) {
        await UserService.createActivity(this.activity, token);
        alert('Activity created successfully');
      } else {
        alert('User token not found');
      }
    } catch (error) {
      console.error('Error creating activity:', error);
      alert('Error creating activity');
    }
  }
}
