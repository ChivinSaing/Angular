import { Component, input } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Carousel as PrimeCarousel } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';

export type CarouselProduct = {
  name: string;
  image: string;
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

  readonly products: CarouselProduct[] = [
    { name: 'Lavender Latte', image: 'brown-purse.jpg', price: 5.75, inventoryStatus: 'INSTOCK' },
    { name: 'Matcha Mint Tea', image: 'chakra-bracelet.jpg', price: 5.75, inventoryStatus: 'LOWSTOCK' },
    { name: 'Smoothies', image: 'galaxy-earrings.jpg', price: 5.75, inventoryStatus: 'INSTOCK' },
    { name: 'Black Watch', image: 'black-watch.jpg', price: 72, inventoryStatus: 'OUTOFSTOCK' },
    { name: 'Galaxy Earrings', image: 'galaxy-earrings.jpg', price: 34, inventoryStatus: 'INSTOCK' },
    { name: 'Game Controller', image: 'game-controller.jpg', price: 99, inventoryStatus: 'LOWSTOCK' },
    { name: 'Bamboo Watch', image: 'bamboo-watch.jpg', price: 65, inventoryStatus: 'INSTOCK' },
    { name: 'Blue Band', image: 'blue-band.jpg', price: 79, inventoryStatus: 'LOWSTOCK' },
    { name: 'Blue T-Shirt', image: 'blue-t-shirt.jpg', price: 29, inventoryStatus: 'INSTOCK' },
    
  ];

  private readonly productBaseUrl = 'https://primefaces.org/cdn/primeng/images/demo/product';
  // https://primefaces.org/cdn/primeng/images/demo/product/blue-t-shirt.jpg

  productImage(product: CarouselProduct): string {
    return `${this.productBaseUrl}/${product.image}`;
  }

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
