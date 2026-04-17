import { Component, input } from '@angular/core';
import { Post } from '../../interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.html',
  styleUrl: './post.css',
  imports: [],
  standalone: true,
})
export class PostCard {
  post = input.required<Post>();
}
