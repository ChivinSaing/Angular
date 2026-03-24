import { Component, signal } from '@angular/core';
import { Carousel } from '../../components/carousel/carousel';
import { Category, type CategoryItem } from '../../components/category/category';
import { CardBox, type CardBoxItem } from '../../components/card-box/card-box';



type CartItem = {
  name: string;
  price: number;
  qty: number;
  size: string[];
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
      name: 'Espresso',
      price: 5.75,
      inventoryStatus: 'INSTOCK',
      size: ['S', 'M', 'L'],
      imageUrl: 'https://ungroundedcoffee.com/image/cache/data/Products/Beverage/IcedAmericano-600x600-500x500.jpg',
    },
    {
      id: 2,
      name: 'Milk Tea',
      price: 5.75,
      inventoryStatus: 'LOWSTOCK',
      size: ['M'],
      imageUrl: 'https://material.angular.dev/assets/img/examples/shiba2.jpg',
    },
    {
      id: 3,
      name: 'Smoothies',
      price: 5.75,
      inventoryStatus: 'INSTOCK',
      size: ['M', 'L'],
      imageUrl: 'https://primefaces.org/cdn/primeng/images/demo/product/galaxy-earrings.jpg',
    },
    {
      id: 4,
      name: 'Black Watch',
      price: 72,
      inventoryStatus: 'OUTOFSTOCK',
      size: ['S', 'L'],
      imageUrl: 'https://media.istockphoto.com/id/1325991061/photo/matcha-latte-green-milk-foam-cup-on-wood-table-at-cafe-trendy-powered-tea-trend-from-japan.jpg?s=612x612&w=0&k=20&c=a7cV9mdPwPj93BrxoFrJXEdA71RsOnXIOzVF90CYPsQ=',
    },
  ];
  readonly hotDrinks: CardBoxItemWithId[] = [
    {
      id: 1,
      name: 'Lavender Latte',
      price: 5.75,
      inventoryStatus: 'INSTOCK',
      size: ['M'],
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrjyHlkViXf1t9FlpAnmlozT9DZSvPbFi-Lg&s',
    },
    {
      id: 2,
      name: 'Americano',
      price: 5.75,
      inventoryStatus: 'LOWSTOCK',
      size: ['S', 'L'],
      imageUrl: '/images/americano.png',
    },
    {
      id: 3,
      name: 'Cappuccino',
      price: 5.75,
      inventoryStatus: 'INSTOCK',
      size: ['S','M', 'L'],
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAVt__A8bvTk9UbAp6N28awtRlQjJxssNuLA&s',
    },
    {
      id: 4,
      name: 'Caramel Macchiato',
      price: 72,
      inventoryStatus: 'OUTOFSTOCK',
      size: ['S', 'M'],
      imageUrl: 'https://thelittlestcrumb.com/wp-content/uploads/salted-caramel-macchiato-6.jpg',
    },
  ];
  readonly iceDrinks: CardBoxItemWithId[] = [
    {
      id: 1,
      name: 'Iced Americano',
      price: 5.75,
      inventoryStatus: 'INSTOCK',
      size: ['S', 'M', 'L'],
      imageUrl: 'https://ungroundedcoffee.com/image/cache/data/Products/Beverage/IcedAmericano-600x600-500x500.jpg',
    },
    {
      id: 2,
      name: 'Iced Latte',
      price: 5.75,
      inventoryStatus: 'LOWSTOCK',
      size: ['M', 'L'],
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSANcWK53dWB_kChQU9l_etT4616mOkJYD_2A&s',
    },
    {
      id: 3,
      name: 'Iced Cappuccino',
      price: 5.75,
      inventoryStatus: 'INSTOCK',
      size: ['S', 'M', 'L'],
      imageUrl: 'https://grindthosebeans.com/wp-content/uploads/2024/10/Iced-Cappuccino-photo.png',
    },
    {
      id: 4,
      name: 'Iced Caramel Macchiato',
      price: 72,
      inventoryStatus: 'OUTOFSTOCK',
      size: ['S', 'M'],
      imageUrl: 'https://thelittlestcrumb.com/wp-content/uploads/salted-caramel-macchiato-6.jpg',
    },
  ];
  readonly tea: CardBoxItemWithId[] = [
    {
      id: 1,
      name: 'Iced Green Tea',
      price: 5.75,
      inventoryStatus: 'INSTOCK',
      size: ['S', 'M', 'L'],
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKqzwxZXcDbHRjacc2QPG1FneKvGvdl9P0Fw&s',
    },
    {
      id: 2,
      name: 'Iced Lemon Tea',
      price: 5.75,
      inventoryStatus: 'LOWSTOCK',
      size: ['S', 'M'],
      imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/026/282/306/small/iced-lemon-tea-on-plastic-take-away-glass-isolated-on-white-background-with-copy-space-ai-generated-photo.jpg',
    },
    {
      id: 3,
      name: 'Iced Matcha Latte',
      price: 5.75,
      inventoryStatus: 'INSTOCK',
      size: ['S', 'M', 'L'],
      imageUrl: 'https://131462261.cdn6.editmysite.com/uploads/1/3/1/4/131462261/WSWIE42L25DRZK4UFOL7IMF6.jpeg',
    },
    {
      id: 4,
      name: 'Milk Tea',
      price: 72,
      inventoryStatus: 'OUTOFSTOCK',
      size: ['S', 'M'],
      imageUrl: 'https://ricelifefoodie.com/wp-content/uploads/2024/10/ice-cold-Hokkaido-Milk-Tea-with-boba-.jpg',
    },
  ];

  readonly cartItems: CartItem[] = [
    { name: 'Lavender Latte', price: 5.75, qty: 2 , size: ['S', 'L']},
    { name: 'Matcha Mint Tea', price: 5.75, qty: 1 , size: ['S', 'M']},
    { name: 'Smoothies', price: 5.75, qty: 1 , size: ['S', 'M', 'L']},
    { name: 'Smoothies', price: 5.75, qty: 1 , size: ['S', 'M']},
    { name: 'Smoothies', price: 5.75, qty: 1 , size: ['S', 'M']},
  ];

  readonly bannerSubtitle = 'Drink of the Day';
  readonly bannerTitle = 'Cardamom Cold Brew';
  readonly bannerImageUrl =
    'https://images.unsplash.com/photo-1527169402691-a3fb6a6b8d6c?auto=format&fit=crop&w=1600&q=60';

    
  get totalPrice(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  }
}


