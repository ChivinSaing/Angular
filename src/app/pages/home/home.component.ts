import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Carousel, type CarouselProduct } from '../../components/carousel/carousel';
import { Category, type CategoryItem } from '../../components/category/category';
import { CardBox, type CardBoxItem } from '../../components/card-box/card-box';
import { OrderCartPanel } from '../../components/order-cart-panel/order-cart-panel';
import { MenuService, type MenuApiDrink, type MenuApiResponse } from '../../core/menu.service';

type CardBoxItemWithId = CardBoxItem & { id: number };

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Carousel, Category, CardBox, RouterLink, OrderCartPanel],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  private readonly menuService = inject(MenuService);

  readonly menuLoading = signal(true);
  readonly menuError = signal<string | null>(null);
  private readonly menuData = signal<MenuApiResponse | null>(null);

  readonly categories = computed((): CategoryItem[] => {
    const data = this.menuData();
    if (!data?.categories?.length) return [];
    const palette: Array<{ bg: string; color: string; border: string }> = [
      { bg: '#e5e7eb', color: '#0f172a', border: '#d1d5db' },
      { bg: '#d1fae5', color: '#065f46', border: '#a7f3d0' },
      { bg: '#ede9fe', color: '#5b21b6', border: '#ddd6fe' },
      { bg: '#ffedd5', color: '#9a3412', border: '#fed7aa' },
    ];
    return data.categories.map((c, i) => ({
      id: c.id,
      name: c.name,
      ...palette[i % palette.length],
    }));
  });

  private static readonly PLACEHOLDER_IMG =
    'https://images.unsplash.com/photo-1527169402691-a3fb6a6b8d6c?auto=format&fit=crop&w=600&q=60';

  /** Top drinks by detail-page views (only drinks with at least one view). */
  private static readonly POPULAR_CAROUSEL_MAX = 8;

  readonly popularCarouselProducts = computed((): CarouselProduct[] => {
    const data = this.menuData();
    if (!data?.drinks?.length) return [];
    const sorted = [...data.drinks]
      .filter((d) => (d.view_count ?? 0) > 0)
      .sort(
        (a, b) =>
          (b.view_count ?? 0) - (a.view_count ?? 0) ||
          a.name.localeCompare(b.name),
      );
    return sorted.slice(0, HomeComponent.POPULAR_CAROUSEL_MAX).map((d) => ({
      name: d.name,
      imageUrl: d.image_url || HomeComponent.PLACEHOLDER_IMG,
      price: typeof d.price === 'number' ? d.price : Number(d.price),
      inventoryStatus:
        d.stock_qty <= 0 ? 'OUTOFSTOCK' : d.stock_qty <= 5 ? 'LOWSTOCK' : 'INSTOCK',
    }));
  });

  readonly drinkSections = computed(() => {
    const data = this.menuData();
    if (!data?.drinks?.length) {
      return [] as { categoryId: number; title: string; items: CardBoxItemWithId[] }[];
    }
    const map = new Map<number, { categoryId: number; title: string; items: CardBoxItemWithId[] }>();
    for (const d of data.drinks) {
      const cid = d.category.id;
      if (!map.has(cid)) map.set(cid, { categoryId: cid, title: d.category.name, items: [] });
      map.get(cid)!.items.push(this.toCardItem(d));
    }
    return Array.from(map.values());
  });

  readonly bannerSubtitle = 'Drink of the Day';
  readonly bannerTitle = 'Cardamom Cold Brew';
  readonly bannerImageUrl =
    'https://images.unsplash.com/photo-1527169402691-a3fb6a6b8d6c?auto=format&fit=crop&w=1600&q=60';

    
  ngOnInit(): void {
    this.menuService.getMenu().subscribe({
      next: (data) => {
        this.menuData.set(data);
        this.menuError.set(null);
        this.menuLoading.set(false);
      },
      error: () => {
        this.menuError.set('Could not load menu from the server.');
        this.menuLoading.set(false);
      },
    });
  }

  private toCardItem(d: MenuApiDrink): CardBoxItemWithId {
    return {
      id: d.id,
      name: d.name,
      price: typeof d.price === 'number' ? d.price : Number(d.price),
      prices: d.prices,
      inventoryStatus: d.stock_qty <= 0 ? 'OUTOFSTOCK' : d.stock_qty <= 5 ? 'LOWSTOCK' : 'INSTOCK',
      size: (d.size ?? '').split(/[,/]/).map((s) => s.trim()).filter(Boolean),
      imageUrl: d.image_url || 'https://images.unsplash.com/photo-1527169402691-a3fb6a6b8d6c?auto=format&fit=crop&w=600&q=60',
    };
  }
}


