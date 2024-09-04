import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

import { Product } from '../../../shared/models/Product';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl(''),
    quantity: new FormControl('', [Validators.required, Validators.min(1)]),
    price: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$'),
    ]),
    createDate: new FormControl(this.formatDate(new Date()), [
      Validators.required,
    ]),
  });

  get f() {
    return this.productForm.controls;
  }

  onSubmit() {
    if (this.productForm.valid) {
      const newProduct: Product = {
        id: this.generateUniqueId(),
        name: this.f.name.value ?? '',
        description: this.f.description.value ?? '',
        category: this.f.category.value ?? '',
        quantity: parseInt(this.f.quantity.value as string, 10),
        price: parseFloat(this.f.price.value as string),
        createDate: this.f.createDate.value ?? this.formatDate(new Date()),
      };

      console.log('Product added:', newProduct);
    }
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