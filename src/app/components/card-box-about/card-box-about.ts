import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';

export type AboutHighlightCard = {
  imageUrl: string;
  imageAlt: string;
  title: string;
  body: string;
};

@Component({
  selector: 'app-card-box-about',
  standalone: true,
  templateUrl: './card-box-about.html',
  styleUrl: './card-box-about.css',
  imports: [Card, ButtonModule, PrimeTemplate],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardBoxAbout {
  /** Three highlight cards — swap `imageUrl` / copy anytime. */
  readonly highlights: readonly AboutHighlightCard[] = [
    {
      imageUrl: '/images/americano.png',
      imageAlt: 'Espresso drinks on the menu',
      title: 'Wide Selection of Drinks',
      body:
        `
          Explore a variety of hot drinks, refreshing ice drinks, flavorful teas, and healthy smoothies. 
          We have something for everyone.
        `,
    },
    {
      imageUrl: '/images/images.png',
      imageAlt: 'Drinks Shop branding',
      title: 'Easy Ordering Experience',
      body:
        `
          Browse categories, view popular items, and quickly place your order. 
          We make ordering your favorite drinks simple and smooth.
        `,
    },
    {
      imageUrl:
        'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=70',
      imageAlt: 'Iced drinks and refreshers',
      title: 'Quality & Convenience',
      body:
        `
          We prioritize quality ingredients and a seamless user 
          experience to ensure every visit to Drinks Shop is a delight.
        `,
    },
  ];
}
