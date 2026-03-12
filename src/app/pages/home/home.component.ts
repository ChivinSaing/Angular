import { Component } from '@angular/core';
import { CardBox } from '../../components/card-box/card-box';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardBox],
  templateUrl: './home.component.html'
})
export class HomeComponent {}

