import { Component } from '@angular/core';
import { CardBox, CardBoxItem } from '../../components/card-box/card-box';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardBox],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  readonly items: CardBoxItem[] = [
    {
      title: 'Soft Drinks',
      description: 'Refreshing sodas and sparkling favorites.',
    },
    {
      title: 'Juices',
      description: 'Fruit juices for a healthy boost.',
    },
    {
      title: 'Coffee',
      description: 'Hot or iced coffee picks for any time.',
    },
    {
      title: 'Tea',
      description: 'Classic teas and modern blends.',
    },
  ];
}

