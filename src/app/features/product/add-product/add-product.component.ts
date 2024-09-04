import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
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
    createDate: new FormControl('', [Validators.required]),
  });

  // Helper method to get form controls for easier access in the template
  get f() {
    return this.productForm.controls;
  }

  onSubmit() {
    console.log(this.productForm.value);
  }
}
