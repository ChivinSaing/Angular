import { Component, input } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Carousel as PrimeCarousel } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';

export type CarouselProduct = {
  name: string;
  /** Full image URL (menu drink photo or placeholder). */
  imageUrl: string;
  price: number;
  inventoryStatus: 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK';
};

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [PrimeCarousel, ButtonModule, TagModule, PrimeTemplate],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
})
export class Carousel {
  /** Drinks marked popular in the menu (empty hides meaningful content — parent may omit carousel). */
  readonly products = input<CarouselProduct[]>([]);

  readonly autoplayInterval = input<number>(3000);
  readonly circular = input<boolean>(true);
  readonly numVisible = input<number>(2);

  readonly responsiveOptions = [
    // Move by a "page" (same amount as visible cards) for smoother sliding.
    { breakpoint: '1400px', numVisible: 2, numScroll: 2 },
    { breakpoint: '1199px', numVisible: 2, numScroll: 2 },
    { breakpoint: '767px', numVisible: 2, numScroll: 2 },
    { breakpoint: '575px', numVisible: 1, numScroll: 1 },
  ];

  getSeverity(status: CarouselProduct['inventoryStatus']): 'success' | 'warn' | 'danger' | 'secondary' {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warn';
      case 'OUTOFSTOCK':
        return 'danger';
    }
    return 'secondary';
  }
}
