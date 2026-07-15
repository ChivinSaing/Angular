import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CartService } from '../../core/cart.service';

export type CardBoxItem = {
  /** When set, clicking the card (not the button) opens drink detail. */
  id?: number;
  name: string;
  imageUrl: string;
  price: number;
  prices?: Record<string, number>;
  size: string[];
  inventoryStatus: 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK';
};

@Component({
  selector: 'app-card-box',
  standalone: true,
  imports: [ButtonModule, TagModule],
  templateUrl: './card-box.html',
  styleUrl: './card-box.css',
})
export class CardBox implements OnChanges {
  private readonly router = inject(Router);
  private readonly cart = inject(CartService);

  @Input({ required: true }) item!: CardBoxItem;

  /** User-selected size; Add to Order uses this (or first available size). */
  readonly selectedSize = signal<string | null>(null);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item']) {
      this.selectedSize.set(null);
    }
  }

  protected get openDetail(): boolean {
    return this.item.id != null && Number.isFinite(this.item.id);
  }

  onCardAreaClick(): void {
    if (!this.openDetail) return;
    void this.router.navigate(['/menu/drink', this.item.id!]);
  }

  onAddClick(event: MouseEvent): void {
    event.stopPropagation();
    const size =
      this.selectedSize() ??
      this.item.size?.[0] ??
      'M';
    this.cart.addFromCardItem(this.item, size);
  }

  onSizeClick(event: MouseEvent, size: string): void {
    event.stopPropagation();
    this.selectedSize.set(size);
  }

  isSizeSelected(size: string): boolean {
    const picked = this.selectedSize();
    return picked != null && picked === size;
  }

  get displayPrice(): number {
    const size = this.selectedSize() ?? this.item.size?.[0] ?? null;
    if (!size) return this.item.price;
    const bySize = this.item.prices?.[size] ?? this.item.prices?.[size.toUpperCase()];
    return typeof bySize === 'number' && Number.isFinite(bySize) ? bySize : this.item.price;
  }

  getSeverity(status: CardBoxItem['inventoryStatus']): 'success' | 'warn' | 'danger' | 'secondary' {
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
