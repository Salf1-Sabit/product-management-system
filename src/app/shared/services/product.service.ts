import { Injectable } from '@angular/core';
import { Product } from '../models/Product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private localStorageKey = 'products';
  products: Product[] = [];

  constructor() {
    if (this.isLocalStorageAvailable()) {
      const savedProducts = localStorage.getItem(this.localStorageKey);
      this.products = savedProducts ? JSON.parse(savedProducts) : [];
    }
  }

  getProducts(): Product[] {
    return this.products;
  }

  addProduct(product: Product): void {
    this.products.push(product);
    this.updateLocalStorage();
  }

  editProduct(productId: string, updatedProduct: Product) {
    const index = this.products.findIndex(
      (product) => product.id === productId
    );

    if (index != -1) {
      this.products[index] = { ...updatedProduct, id: productId };
      this.updateLocalStorage();
    }
  }

  deleteProduct(productId: string): void {
    this.products = this.products.filter((product) => product.id !== productId);
    this.updateLocalStorage();
  }

  updateLocalStorage() {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.products));
    }
  }

  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
