import { Component, inject } from '@angular/core';

import { CartService } from '../../core/cart.service';

@Component({
  selector: 'app-order-cart-panel',
  standalone: true,
  templateUrl: './order-cart-panel.html',
})
export class OrderCartPanel {
  private readonly cart = inject(CartService);

  readonly items = this.cart.items;
  readonly totalPrice = this.cart.totalPrice;

  removeLine(index: number): void {
    this.cart.removeLine(index);
  }

  trackLine(_index: number, line: { drinkId?: number; name: string; chosenSize: string }): string {
    return `${line.drinkId ?? line.name}-${line.chosenSize}`;
  }
}
