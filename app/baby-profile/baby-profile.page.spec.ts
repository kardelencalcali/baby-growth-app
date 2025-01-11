import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BabyProfilePage } from './baby-profile.page';

describe('BabyProfilePage', () => {
  let component: BabyProfilePage;
  let fixture: ComponentFixture<BabyProfilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BabyProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
