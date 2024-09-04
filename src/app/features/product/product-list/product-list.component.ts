import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

import { Product } from '../../../shared/models/Product';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  products: Product[] = [];

  constructor(private productService: ProductService) {
    this.products = productService.getProducts();
  }
}
