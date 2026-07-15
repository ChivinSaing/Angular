import { Injectable, computed, signal } from '@angular/core';

import type { CardBoxItem } from '../components/card-box/card-box';

export interface CartLine {
  drinkId?: number;
  name: string;
  price: number;
  qty: number;
  /** Single size chosen for this line (price applies to this line). */
  chosenSize: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items = signal<CartLine[]>([]);

  readonly items = this._items.asReadonly();

  readonly totalPrice = computed(() =>
    this._items().reduce((sum, line) => sum + line.price * line.qty, 0),
  );

  /** Add one priced line (merge by drink + chosen size). */
  addFromCardItem(item: CardBoxItem, chosenSize: string): void {
    if (item.inventoryStatus === 'OUTOFSTOCK') return;

    const size = chosenSize.trim() || (item.size?.[0] ?? 'M');
    const drinkId = item.id;
    const sizePrice =
      item.prices?.[size] ??
      item.prices?.[size.toUpperCase()] ??
      item.price;
    const linePrice =
      typeof sizePrice === 'number' && Number.isFinite(sizePrice) ? sizePrice : item.price;

    this._items.update((lines) => {
      const idx =
        drinkId != null
          ? lines.findIndex(
              (l) => l.drinkId === drinkId && l.chosenSize === size,
            )
          : lines.findIndex(
              (l) =>
                l.name === item.name && l.chosenSize === size,
            );

      if (idx >= 0) {
        const next = lines.slice();
        const cur = next[idx]!;
        next[idx] = { ...cur, qty: cur.qty + 1 };
        return next;
      }

      return [
        ...lines,
        {
          drinkId,
          name: item.name,
          price: linePrice,
          qty: 1,
          chosenSize: size,
        },
      ];
    });
  }

  removeLine(index: number): void {
    this._items.update((lines) => lines.filter((_, i) => i !== index));
  }
}
