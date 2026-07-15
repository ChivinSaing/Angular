import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export type CategoryItem = {
  id: number;
  name: string;
  bg: string;
  color: string;
  border: string;
};

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category {
  @Input({ required: true }) cat!: CategoryItem;
}
