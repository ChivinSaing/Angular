import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { CategoryMenuComponent } from './pages/category-menu/category-menu.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DrinksComponent } from './pages/drinks/drinks.component';
import { HomeComponent } from './pages/home/home.component';
import { CardDetail } from './components/card-detail/card-detail';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  {
    path: 'menu/category/:categoryId',
    component: CategoryMenuComponent,
    title: 'Category',
  },
  {
    path: 'menu/drink/:drinkId',
    component: CardDetail,
    title: 'Drink',
  },
  { path: 'about', component: AboutComponent, title: 'About' },
  { path: 'drinks', component: DrinksComponent, title: 'Drinks' },
  { path: 'contact', component: ContactComponent, title: 'Contact' },
  { path: '**', redirectTo: 'home' }
];
