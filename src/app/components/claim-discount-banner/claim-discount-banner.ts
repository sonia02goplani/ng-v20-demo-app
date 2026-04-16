import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { Subscription, interval, takeWhile } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const TOTAL_SECONDS = 300;

@Component({
  selector: 'app-claim-discount-banner',
  templateUrl: './claim-discount-banner.html',
  styleUrl: './claim-discount-banner.css',
  standalone: true,
})
export class ClaimDiscountBanner implements OnInit {
  private readonly destroyRef: DestroyRef;
  private countdownSubscription: Subscription | null = null;

  readonly remainingSeconds = signal<number | null>(null);
  readonly formattedTime = computed(() => {
    const seconds = this.remainingSeconds();

    if (seconds === null) {
      return null;
    }

    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainder
      .toString()
      .padStart(2, '0')}`;
  });

  constructor() {
    this.destroyRef = inject(DestroyRef);
  }

  ngOnInit() {
    this.startCountdown();
  }

  startCountdown() {
    if (this.countdownSubscription) {
      return;
    }

    if (this.remainingSeconds() === null) {
      this.remainingSeconds.set(TOTAL_SECONDS);
    }

    this.countdownSubscription = interval(1000)
      .pipe(
        takeWhile(() => (this.remainingSeconds() ?? 0) > 0),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        const current = this.remainingSeconds();

        if (current === null || current <= 0) {
          this.stopCountdown();
          return;
        }

        this.remainingSeconds.set(current - 1);
      });
  }

  stopCountdown() {
    this.countdownSubscription?.unsubscribe();
    this.countdownSubscription = null;
  }
}
