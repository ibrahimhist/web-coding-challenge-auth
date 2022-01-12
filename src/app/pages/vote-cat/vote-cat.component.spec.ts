import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteCatComponent } from './vote-cat.component';

describe('VoteCatComponent', () => {
  let component: VoteCatComponent;
  let fixture: ComponentFixture<VoteCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteCatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
