import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface MenuApiCategory {
  id: number;
  name: string;
}

export interface MenuApiDrink {
  id: number;
  name: string;
  size: string;
  price: number;
  /** Optional per-size prices, e.g. { "S": 2.5, "M": 3.0, "L": 3.5 } */
  prices?: Record<string, number>;
  sugar: string;
  stock_qty: number;
  /** Detail-page opens; homepage carousel shows drinks with the highest counts. */
  view_count?: number;
  image_url: string;
  category: MenuApiCategory;
}

export interface MenuApiResponse {
  categories: MenuApiCategory[];
  drinks: MenuApiDrink[];
}

@Injectable({ providedIn: 'root' })
export class MenuService {
  private readonly http = inject(HttpClient);
  private readonly apiBase = 'http://127.0.0.1:8000';

  getMenu(): Observable<MenuApiResponse> {
    return this.http.get<MenuApiResponse>(`${this.apiBase}/api/menu/`);
  }

  /** Call when a user opens a drink detail page (increments popularity). */
  recordDrinkView(drinkId: number): Observable<{ ok: boolean }> {
    return this.http.post<{ ok: boolean }>(`${this.apiBase}/api/drinks/${drinkId}/view/`, {});
  }
}

