import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CardBoxAbout } from '../../components/card-box-about/card-box-about';
import { CardBox, type CardBoxItem } from '../../components/card-box/card-box';
import { MenuService, type MenuApiDrink, type MenuApiResponse } from '../../core/menu.service';

type CardBoxItemWithId = CardBoxItem & { id: number };

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  imports: [CardBoxAbout, CardBox],
})
export class AboutComponent implements OnInit {
  private readonly menuService = inject(MenuService);

  private readonly menuData = signal<MenuApiResponse | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  private static readonly POPULAR_MAX = 4;

  private static readonly PLACEHOLDER_IMG =
    'https://images.unsplash.com/photo-1527169402691-a3fb6a6b8d6c?auto=format&fit=crop&w=600&q=60';

  /** Top 4 drinks by `view_count` (popular). */
  readonly popularDrinks = computed((): CardBoxItemWithId[] => {
    const data = this.menuData();
    if (!data?.drinks?.length) return [];
    return [...data.drinks]
      .sort(
        (a, b) =>
          (b.view_count ?? 0) - (a.view_count ?? 0) ||
          a.name.localeCompare(b.name),
      )
      .slice(0, AboutComponent.POPULAR_MAX)
      .map((d) => this.toCardItem(d));
  });

  ngOnInit(): void {
    this.menuService.getMenu().subscribe({
      next: (data) => {
        this.menuData.set(data);
        this.error.set(null);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not load popular drinks.');
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
      imageUrl: d.image_url || AboutComponent.PLACEHOLDER_IMG,
    };
  }
}
