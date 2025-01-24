import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {

  ngAfterViewInit() {
    if (typeof document !== 'undefined') {
      const dropdownToggle = document.getElementById('login-dropdown-toggle');
      const dropdown = document.getElementById('login-dropdown');

      if (dropdownToggle && dropdown) {
        dropdownToggle.addEventListener('click', function(event) {
          event.preventDefault();
          if (dropdown.style.display === 'block') {
            dropdown.style.display = 'none';
            dropdown.style.opacity = '0';
            dropdown.style.visibility = 'hidden';
          } else {
            dropdown.style.display = 'block';
            dropdown.style.opacity = '1';
            dropdown.style.visibility = 'visible';
          }
        });

        dropdown.addEventListener('mouseleave', function() {
          setTimeout(() => {
            dropdown.style.display = 'none';
            dropdown.style.opacity = '0';
            dropdown.style.visibility = 'hidden';
          }, 300); // Delay to allow moving the mouse to the dropdown
        });
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
}
