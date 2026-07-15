import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBoxAbout } from './card-box-about';

describe('CardBoxAbout', () => {
  let component: CardBoxAbout;
  let fixture: ComponentFixture<CardBoxAbout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardBoxAbout],
    }).compileComponents();

    fixture = TestBed.createComponent(CardBoxAbout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
