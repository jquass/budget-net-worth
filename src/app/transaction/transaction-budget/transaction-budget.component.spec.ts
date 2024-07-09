import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionBudgetComponent } from './transaction-budget.component';

describe('TransactionBudgetComponent', () => {
  let component: TransactionBudgetComponent;
  let fixture: ComponentFixture<TransactionBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionBudgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
