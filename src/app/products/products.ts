import { Component, inject } from '@angular/core';
import { Products as ProductsService } from '../services/products';
import { ProductsList } from '../components/products-list/products-list';
import { LoadingIndicator } from '../components/loading-indicator/loading-indicator';
import { ClaimDiscountBanner } from '../components/claim-discount-banner/claim-discount-banner';

@Component({
  selector: 'app-products',
  templateUrl: './products.html',
  styleUrl: './products.css',
  imports: [ProductsList, LoadingIndicator, ClaimDiscountBanner],
})
export class Products {
  productsService = inject(ProductsService);
}
