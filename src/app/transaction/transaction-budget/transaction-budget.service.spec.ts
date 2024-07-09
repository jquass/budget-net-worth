import { TestBed } from '@angular/core/testing';

import { TransactionBudgetService } from './transaction-budget.service';

describe('TransactionBudgetService', () => {
  let service: TransactionBudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionBudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
