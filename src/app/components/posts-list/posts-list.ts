import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { PostCard } from '../post/post';
import { Posts } from '../../services/posts';
import { LoadingIndicator } from '../loading-indicator/loading-indicator';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.html',
  styleUrl: './posts-list.css',
  imports: [PostCard, LoadingIndicator],
  standalone: true,
})
export class PostsList implements AfterViewInit {
  private destroyRef = inject(DestroyRef);
  postsService = inject(Posts);

  @ViewChild('sentinel', { static: true })
  sentinel?: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    if (!this.sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          this.postsService.loadMore();
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(this.sentinel.nativeElement);
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
