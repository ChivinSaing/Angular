import { Component, OnInit, inject, signal } from '@angular/core';
import { CardBox, type CardBoxItem } from '../../components/card-box/card-box';
import { MenuService, type MenuApiDrink } from '../../core/menu.service';

type CardBoxItemWithId = CardBoxItem & { id: number };

@Component({
  selector: 'app-drinks',
  standalone: true,
  imports: [CardBox],
  templateUrl: './drinks.component.html',
})
export class DrinksComponent implements OnInit {
  private readonly menuService = inject(MenuService);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly items = signal<CardBoxItemWithId[]>([]);

  ngOnInit(): void {
    this.menuService.getMenu().subscribe({
      next: (data) => {
        const list = (data.drinks ?? []).map((d) => this.toCardItem(d));
        this.items.set(list);
        this.error.set(null);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not load menu from the server.');
        this.loading.set(false);
      },
    });
  }

  private toCardItem(d: MenuApiDrink): CardBoxItemWithId {
    return {
      id: d.id,
      name: d.name,
      price: typeof d.price === 'number' ? d.price : Number(d.price),
      prices: d.prices,
      inventoryStatus:
        d.stock_qty <= 0 ? 'OUTOFSTOCK' : d.stock_qty <= 5 ? 'LOWSTOCK' : 'INSTOCK',
      size: (d.size ?? '')
        .split(/[,/]/)
        .map((s) => s.trim())
        .filter(Boolean),
      imageUrl:
        d.image_url ||
        'https://images.unsplash.com/photo-1527169402691-a3fb6a6b8d6c?auto=format&fit=crop&w=600&q=60',
    };
  }
}
