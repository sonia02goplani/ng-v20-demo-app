import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products',
  },
  {
    path: 'products',
    loadComponent: () => import('./products/products').then((m) => m.Products),
  },
  {
    path: 'posts',
    loadComponent: () => import('./posts/posts').then((m) => m.Posts),
  },
];
