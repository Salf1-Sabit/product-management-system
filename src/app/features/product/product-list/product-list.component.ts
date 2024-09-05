import { NgFor, NgIf, CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';

import { NgxPaginationModule } from 'ngx-pagination';
import { Product } from '../../../shared/models/Product';
import { ProductService } from '../../../shared/services/product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, NgxPaginationModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: [CurrencyPipe, DatePipe],
})
export class ProductListComponent {
  products: Product[] = [];
  searchQuery: string = '';
  totalPrice: number = 0;

  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(
    private productService: ProductService,
    private currencyPipe: CurrencyPipe,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.products = this.productService.getProducts();
    this.totalPrice = this.productService.getTotalPrice();
  }

  onSearch(): void {
    if (this.searchQuery.trim() === '') {
      this.loadProducts();
    } else {
      this.products = this.productService.searchProducts(this.searchQuery);
      this.totalPrice = this.products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
    }
  }

  formatCurrency(value: number): string {
    return this.currencyPipe.transform(value, 'USD') || '';
  }

  formatDate(value: string): string {
    const date = new Date(value);
    return this.datePipe.transform(date) || '';
  }
}
