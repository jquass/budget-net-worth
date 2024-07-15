import { Injectable } from '@angular/core';
import {Budget} from "../../models/budget";
import {FormControl, FormGroup} from "@angular/forms";
import {Transaction} from "../../models/transaction";

@Injectable({
  providedIn: 'root'
})
export class TransactionBudgetService {
  toFormGroup(transaction: Transaction, budgets: Budget[]) {
    const group: any = {};
    budgets.forEach(budget => {
      group['transactionBudget' + transaction.id] = new FormControl(transaction.budgetId);
    })
    return new FormGroup(group);
  }
}
