import { Component, inject } from '@angular/core';
import { PostsService } from '../services/posts';
import { PostsList } from '../components/posts-list/posts-list';
import { LoadingIndicator } from '../components/loading-indicator/loading-indicator';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.html',
  styleUrl: './posts.css',
  imports: [PostsList, LoadingIndicator],
})
export class Posts {
  postsService = inject(PostsService);

  constructor() {
    this.postsService.loadInitial();
  }
}
