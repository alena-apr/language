import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrammarItemComponent } from './grammar-item.component';

describe('GrammarItemComponent', () => {
  let component: GrammarItemComponent;
  let fixture: ComponentFixture<GrammarItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrammarItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrammarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
