import { Component, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/models/Product';

import { ToastComponent } from '../../../shared/components/toast/toast.component';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule, ToastComponent],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  @ViewChild('toast') toast!: ToastComponent;
  categories: string[] = [
    'Electronics',
    'Home Decor',
    'Fashion',
    'Beauty Products',
    'Books',
    'Sports',
    'Toys',
    'Automotive',
    'Health',
  ];

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required, Validators.min(1)]),
    price: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$'),
    ]),
    createDate: new FormControl(this.formatDate(new Date()), [
      Validators.required,
    ]),
  });

  constructor(private productService: ProductService) {}

  get f() {
    return this.productForm.controls;
  }

  onSubmit() {
    if (this.productForm.valid) {
      const selectedCategory = this.f.category.value ?? '';
      const count =
        this.productService.countProductsByCategory(selectedCategory);

      console.log(
        '🚀 ~ AddProductComponent ~ onSubmit ~ selectedCategory:',
        selectedCategory
      );
      console.log('🚀 ~ AddProductComponent ~ onSubmit ~ count:', count);

      if (count >= 10) {
        this.toast.showToast(
          'Cannot add more than 10 products in the same category.',
          'error'
        );
        return;
      }

      const newProduct: Product = {
        id: this.generateUniqueId(),
        name: this.f.name.value ?? '',
        description: this.f.description.value ?? '',
        category: this.f.category.value ?? '',
        quantity: parseInt(this.f.quantity.value as string, 10),
        price: parseFloat(this.f.price.value as string),
        createDate: this.f.createDate.value ?? this.formatDate(new Date()),
      };

      this.productService.addProduct(newProduct);
      this.productForm.reset();

      this.toast.showToast('Product added successfully!', 'success');
    }
  }

  onClear() {
    this.productForm.reset();
  }

  handleNewCategoryAdded(newCategory: string) {
    console.log('New category added:', newCategory);
  }

  generateUniqueId(): string {
    return Date.now().toString();
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
