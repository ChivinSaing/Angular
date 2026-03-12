import { Component } from '@angular/core';
import { Form } from '../../components/form/form';

@Component({
  selector: 'app-drinks',
  standalone: true,
  imports: [Form],
  templateUrl: './drinks.component.html'
})
export class DrinksComponent {}

