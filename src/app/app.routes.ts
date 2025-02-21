import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistreComponent } from './registre/registre.component';
import { RegistreProprietaireComponent } from './registre-proprietaire/registre-proprietaire.component';
import { ActivitesSettingsComponent } from './activites-settings/activites-settings.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SuccesReservationComponent } from './succes-reservation/succes-reservation.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'monactivite', component: ActivitesSettingsComponent },
    { path: 'connexion', component: LoginComponent },
    { path: 'inscrire', component: RegistreComponent },
    { path: 'inscrire_proprietaire', component: RegistreProprietaireComponent },
    {path: 'detail', component: BookDetailComponent},
    {path: 'finalisation-reservation', component: CheckoutComponent},
    {path: 'reservation-reussite', component: SuccesReservationComponent}

];
