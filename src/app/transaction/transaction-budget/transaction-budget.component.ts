import {Component, Input} from '@angular/core';
import {Transaction} from "../../models/transaction";
import {Budget} from "../../models/budget";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {NgForOf} from "@angular/common";
import {TransactionBudgetService} from "./transaction-budget.service";

@Component({
  selector: 'app-transaction-budget',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './transaction-budget.component.html',
  styleUrl: './transaction-budget.component.css'
})
export class TransactionBudgetComponent {

  @Input()
  public transaction: Transaction | null = null;

  @Input()
  public budgets: Budget[] = [];

  public transactionBudgetForm!: FormGroup;

  constructor(private http: HttpClient, private transactionBudgetService: TransactionBudgetService) {

  }

  ngOnInit(): void {
      this.transactionBudgetForm = this.transactionBudgetService.toFormGroup(this.transaction!, this.budgets);
  }

  updateBudget(budgetId: string, transactionId: number): void {
    console.log("updating budget " + budgetId + ", transactionId " + transactionId);
    this.http
      .put<Transaction>("http://localhost:8080/api/transactions/" + transactionId,
        {},
        {
          params: { budgetId: budgetId }
        })
      .subscribe(response => {
        console.log(response);
      });

  }
}
