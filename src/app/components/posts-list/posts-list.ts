import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  ViewChild,
  computed,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostCard } from '../post/post';
import { PostsService } from '../../services/posts';
import { LoadingIndicator } from '../loading-indicator/loading-indicator';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.html',
  styleUrl: './posts-list.css',
  imports: [PostCard, LoadingIndicator, RouterLink],
  standalone: true,
})
export class PostsList implements AfterViewInit {
  private destroyRef = inject(DestroyRef);
  postsService = inject(PostsService);

  /** When set, only this many posts are shown and infinite scroll is disabled. */
  readonly previewMax = input<number | undefined>(undefined);

  protected isPreview = computed(() => typeof this.previewMax() === 'number');

  protected visiblePosts = computed(() => {
    const max = this.previewMax();
    const all = this.postsService.posts();
    if (typeof max !== 'number') {
      return all;
    }
    return all.slice(0, max);
  });

  protected showLoadMoreNav = computed(() => {
    const max = this.previewMax();
    if (typeof max !== 'number') {
      return false;
    }
    return (
      this.postsService.hasMore() &&
      this.postsService.posts().length >= max
    );
  });

  @ViewChild('sentinel', { static: false })
  sentinel?: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    if (this.isPreview()) {
      return;
    }

    if (!this.sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          this.postsService.loadMore(false);
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(this.sentinel.nativeElement);
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
