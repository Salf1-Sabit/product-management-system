import { Routes } from '@angular/router';

import { AddProductComponent } from './features/product/add-product/add-product.component';
import { ProductListComponent } from './features/product/product-list/product-list.component';

export const routes: Routes = [
  { path: '', component: AddProductComponent },
  { path: 'product-list', component: ProductListComponent },
];
