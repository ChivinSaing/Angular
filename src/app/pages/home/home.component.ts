import { Component } from '@angular/core';
import { Carousel } from '../../components/carousel/carousel';
import { Category, type CategoryItem } from '../../components/category/category';
import { CardBox, type CardBoxItem } from '../../components/card-box/card-box';


type CartItem = {
  name: string;
  price: number;
  qty: number;
};

type CardBoxItemWithId = CardBoxItem & { id: number };

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Carousel, Category, CardBox],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  readonly categories: CategoryItem[] = [
    { name: 'Coffee', bg: '#e5e7eb', color: '#0f172a', border: '#d1d5db' },
    { name: 'Tea', bg: '#d1fae5', color: '#065f46', border: '#a7f3d0' },
    { name: 'Smoothies', bg: '#e5e7eb', color: '#0f172a', border: '#d1d5db' },
    { name: 'Bakery', bg: '#e5e7eb', color: '#0f172a', border: '#d1d5db' },
    { name: 'Other', bg: '#e5e7eb', color: '#0f172a', border: '#d1d5db' },
  ];

  readonly items: CardBoxItemWithId[] = [
    {
      id: 1,
      name: 'Lavender Latte',
      price: 5.75,
      inventoryStatus: 'INSTOCK',
      imageUrl: 'https://primefaces.org/cdn/primeng/images/demo/product/brown-purse.jpg',
    },
    {
      id: 2,
      name: 'Matcha Mint Tea',
      price: 5.75,
      inventoryStatus: 'LOWSTOCK',
      imageUrl: 'https://material.angular.dev/assets/img/examples/shiba2.jpg',
    },
    {
      id: 3,
      name: 'Smoothies',
      price: 5.75,
      inventoryStatus: 'INSTOCK',
      imageUrl: 'https://primefaces.org/cdn/primeng/images/demo/product/galaxy-earrings.jpg',
    },
    {
      id: 4,
      name: 'Black Watch',
      price: 72,
      inventoryStatus: 'OUTOFSTOCK',
      imageUrl: 'https://media.istockphoto.com/id/1325991061/photo/matcha-latte-green-milk-foam-cup-on-wood-table-at-cafe-trendy-powered-tea-trend-from-japan.jpg?s=612x612&w=0&k=20&c=a7cV9mdPwPj93BrxoFrJXEdA71RsOnXIOzVF90CYPsQ=',
    },
  ];

  readonly cartItems: CartItem[] = [
    { name: 'Lavender Latte', price: 5.75, qty: 2 },
    { name: 'Matcha Mint Tea', price: 5.75, qty: 1 },
    { name: 'Smoothies', price: 5.75, qty: 1 },
    { name: 'Smoothies', price: 5.75, qty: 1 },
  ];

  readonly bannerSubtitle = 'Drink of the Day';
  readonly bannerTitle = 'Cardamom Cold Brew';
  readonly bannerImageUrl =
    'https://images.unsplash.com/photo-1527169402691-a3fb6a6b8d6c?auto=format&fit=crop&w=1600&q=60';

  get totalPrice(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  }
}

