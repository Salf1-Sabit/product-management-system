import { NgFor, NgIf, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ProductService } from '../../../shared/services/product.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastComponent } from '../../../shared/components/toast/toast.component';
import { Product } from '../../../shared/models/Product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, NgxPaginationModule, ToastComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: [CurrencyPipe, DatePipe],
})
export class ProductListComponent {
  @ViewChild('toast') toast!: ToastComponent;

  products: Product[] = [];
  searchQuery: string = '';
  totalPrice: number = 0;

  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(
    private productService: ProductService,
    private currencyPipe: CurrencyPipe,
    private datePipe: DatePipe,
    private router: Router
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

  onDelete(productId: string): void {
    this.productService.deleteProduct(productId);
    this.loadProducts();
    this.toast.showToast('Product removed successfully!', 'success');
  }

  onEdit(product: Product): void {
    this.router.navigate(['/'], { state: { product } });
  }

  formatCurrency(value: number): string {
    return this.currencyPipe.transform(value, 'USD') || '';
  }

  formatDate(value: string): string {
    const date = new Date(value);
    return this.datePipe.transform(date) || '';
  }
}
