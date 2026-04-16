import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimDiscountBanner } from './claim-discount-banner';

describe('ClaimDiscountBanner', () => {
  let component: ClaimDiscountBanner;
  let fixture: ComponentFixture<ClaimDiscountBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClaimDiscountBanner],
    }).compileComponents();

    fixture = TestBed.createComponent(ClaimDiscountBanner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
