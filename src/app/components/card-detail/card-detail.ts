import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardBox, type CardBoxItem } from '../card-box/card-box';
import { OrderCartPanel } from '../order-cart-panel/order-cart-panel';
import { MenuService, type MenuApiDrink } from '../../core/menu.service';

@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [RouterLink, CardBox, OrderCartPanel],
  templateUrl: './card-detail.html',
  styleUrl: './card-detail.css',
})
export class CardDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly menuService = inject(MenuService);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly drink = signal<MenuApiDrink | null>(null);

  readonly fallbackImage =
    'https://images.unsplash.com/photo-1527169402691-a3fb6a6b8d6c?auto=format&fit=crop&w=1200&q=60';

  cardItemFor(d: MenuApiDrink): CardBoxItem & { id: number } {
    return {
      id: d.id,
      name: d.name,
      price: typeof d.price === 'number' ? d.price : Number(d.price),
      prices: d.prices,
      inventoryStatus:
        d.stock_qty <= 0 ? 'OUTOFSTOCK' : d.stock_qty <= 5 ? 'LOWSTOCK' : 'INSTOCK',
      size: (d.size ?? '').split(/[,/]/).map((s) => s.trim()).filter(Boolean),
      imageUrl: d.image_url || this.fallbackImage,
    };
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const raw = params.get('drinkId');
      const id = raw != null ? Number(raw) : NaN;
      if (!Number.isFinite(id)) {
        this.error.set('Invalid drink.');
        this.loading.set(false);
        return;
      }
      this.loading.set(true);
      this.error.set(null);
      this.drink.set(null);
      this.menuService.getMenu().subscribe({
        next: (data) => {
          const found = data.drinks.find((d) => d.id === id) ?? null;
          if (!found) {
            this.error.set('Drink not found.');
          } else {
            this.drink.set(found);
            this.menuService.recordDrinkView(id).subscribe({ error: () => {} });
          }
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Could not load menu from the server.');
          this.loading.set(false);
        },
      });
    });
  }
}
