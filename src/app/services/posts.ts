import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Post } from '../interfaces';

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';
const DEFAULT_PAGE_SIZE = 5;

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private httpClient = inject(HttpClient);
  private postsSignal = signal<Post[]>([]);
  private isLoadingSignal = signal(false);
  private errorSignal = signal<string | null>(null);
  private hasMoreSignal = signal(true);
  private currentPage = signal(0);
  private pageSize = signal(DEFAULT_PAGE_SIZE);

  posts = this.postsSignal.asReadonly();
  isLoading = this.isLoadingSignal.asReadonly();
  error = this.errorSignal.asReadonly();
  hasMore = this.hasMoreSignal.asReadonly();

  loadInitial(): void {
    this.loadMore(true);
  }

  loadMore(reset = false): void {
    if (this.isLoadingSignal() || (!this.hasMoreSignal() && !reset)) {
      return;
    }

    if (reset) {
      this.currentPage.set(0);
      this.pageSize.set(DEFAULT_PAGE_SIZE);
      this.postsSignal.set([]);
      this.hasMoreSignal.set(true);
    }

    this.isLoadingSignal.set(true);
    this.errorSignal.set(null);
    const nextPage = this.currentPage() + 1;
    const pageSize = this.pageSize();
    const params = new HttpParams()
      .set('_page', nextPage)
      .set('_limit', pageSize);

    this.httpClient.get<Post[]>(BASE_URL, { params }).subscribe({
      next: (posts) => {
        if (posts.length === 0 && nextPage === 1) {
          this.postsSignal.set([]);
          this.hasMoreSignal.set(false);
          return;
        }

        this.postsSignal.update((current) => [...current, ...posts]);
        this.currentPage.set(nextPage);
        this.hasMoreSignal.set(posts.length === pageSize);
      },
      error: (error) => {
        this.errorSignal.set(this.toErrorMessage(error));
        this.isLoadingSignal.set(false);
      },
      complete: () => {
        this.isLoadingSignal.set(false);
      },
    });
  }

  private toErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return 'Failed to load posts.';
  }
}
