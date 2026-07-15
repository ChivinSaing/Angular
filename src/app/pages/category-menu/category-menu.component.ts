import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardBox, type CardBoxItem } from '../../components/card-box/card-box';
import { MenuService, type MenuApiDrink, type MenuApiResponse } from '../../core/menu.service';
import { OrderCartPanel } from '../../components/order-cart-panel/order-cart-panel';

type CardBoxItemWithId = CardBoxItem & { id: number };

@Component({
  selector: 'app-category-menu',
  standalone: true,
  imports: [CardBox, RouterLink, OrderCartPanel],
  templateUrl: './category-menu.component.html',
})
export class CategoryMenuComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly menuService = inject(MenuService);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  private readonly menuData = signal<MenuApiResponse | null>(null);
  readonly categoryId = signal<number | null>(null);

  readonly categoryTitle = computed(() => {
    const id = this.categoryId();
    const data = this.menuData();
    if (id == null || !data) return '';
    return data.categories.find((c) => c.id === id)?.name ?? '';
  });

  readonly items = computed((): CardBoxItemWithId[] => {
    const id = this.categoryId();
    const data = this.menuData();
    if (id == null || !data?.drinks?.length) return [];
    return data.drinks.filter((d) => d.category.id === id).map((d) => this.toCardItem(d));
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const raw = params.get('categoryId');
      const numId = raw != null ? Number(raw) : NaN;
      if (!Number.isFinite(numId)) {
        this.categoryId.set(null);
        this.error.set('Invalid category.');
        this.loading.set(false);
        return;
      }
      this.categoryId.set(numId);
      this.error.set(null);
      this.loading.set(true);
      this.menuData.set(null);
      this.menuService.getMenu().subscribe({
        next: (data) => {
          this.menuData.set(data);
          this.loading.set(false);
          const exists = data.categories.some((c) => c.id === numId);
          if (!exists) {
            this.error.set('Category not found.');
          }
        },
        error: () => {
          this.error.set('Could not load menu from the server.');
          this.loading.set(false);
        },
      });
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
