import { Routes } from '@angular/router';

import { AddProductComponent } from './features/product/add-product/add-product.component';
import { ProductListComponent } from './features/product/product-list/product-list.component';

export const routes: Routes = [
  { path: '', title: 'Add Product', component: AddProductComponent },
  {
    path: 'product-list',
    title: 'Product List',
    component: ProductListComponent,
  },
];
