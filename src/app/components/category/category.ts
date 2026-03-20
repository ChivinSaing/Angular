import { Component, Input } from '@angular/core';

export type CategoryItem = {
  name: string;
  bg: string;
  color: string;
  border: string;
};

@Component({
  selector: 'app-category',
  standalone: true,
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category {
  @Input({ required: true }) cat!: CategoryItem;
}
