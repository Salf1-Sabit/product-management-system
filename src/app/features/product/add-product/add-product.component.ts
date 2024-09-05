import { Component, Input, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { Router } from '@angular/router';

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
  @Input() productToEdit?: Product;
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

  constructor(private productService: ProductService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { product: Product };
    if (state?.product) {
      this.productToEdit = state.product;
    }
  }

  ngOnInit() {
    if (this.productToEdit) {
      this.productForm.patchValue({
        name: this.productToEdit.name,
        description: this.productToEdit.description,
        category: this.productToEdit.category,
        quantity: this.productToEdit.quantity.toString(),
        price: this.productToEdit.price.toString(),
        createDate: this.productToEdit.createDate,
      });
    }
  }

  get f() {
    return this.productForm.controls;
  }

  onSubmit() {
    if (this.productForm.valid) {
      if (this.productToEdit) {
        const updatedProduct: Product = {
          ...this.productToEdit,
          name: this.f.name.value ?? this.productToEdit.name,
          description:
            this.f.description.value ?? this.productToEdit.description,
          category: this.f.category.value ?? this.productToEdit.category,
          quantity: parseInt(this.f.quantity.value as string, 10),
          price: parseFloat(this.f.price.value as string),
          createDate: this.f.createDate.value ?? this.productToEdit.createDate,
        };

        this.productService.editProduct(this.productToEdit.id, updatedProduct);
        this.toast.showToast('Product updated successfully!', 'success');

        this.productForm.reset();
        this.productToEdit = undefined;

        return;
      }

      const selectedCategory = this.f.category.value ?? '';
      const count =
        this.productService.countProductsByCategory(selectedCategory);
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
    this.productToEdit = undefined;
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
