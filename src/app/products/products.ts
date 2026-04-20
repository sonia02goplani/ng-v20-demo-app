import { Component, inject } from '@angular/core';
import { Products as ProductsService } from '../services/products';
import { ProductsList } from '../components/products-list/products-list';
import { LoadingIndicator } from '../components/loading-indicator/loading-indicator';
import { PostsService } from '../services/posts';
import { PostsList } from '../components/posts-list/posts-list';

@Component({
  selector: 'app-products',
  templateUrl: './products.html',
  styleUrl: './products.css',
  imports: [ProductsList, LoadingIndicator, PostsList],
})
export class Products {
  productsService = inject(ProductsService);
  postsService = inject(PostsService);

  constructor() {
    this.postsService.loadInitial();
    
  }
}
