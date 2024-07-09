import {Component} from '@angular/core';
import {Transaction} from "../models/transaction";
import {NgForOf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {Account} from "../models/account";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Budget} from "../models/budget";
import {TransactionBudgetComponent} from "./transaction-budget/transaction-budget.component";

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    ReactiveFormsModule,
    TransactionBudgetComponent
  ],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {

  public transactions: Transaction[] = [];
  public accountsDictionary: Map<number, Account> = new Map<number, Account>();
  public budgets: Budget[] = [];

  public amountFormatter : Intl.NumberFormat = new Intl.NumberFormat('en-US',
    {style: 'currency', currency: 'USD'});

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.http
      .get<Account[]>("http://localhost:8080/api/accounts")
      .subscribe(response => {
        response.forEach(account => {
          this.accountsDictionary.set(account.id, account);
        })
      });
    this.http
      .get<Budget[]>("http://localhost:8080/api/budgets")
      .subscribe(budgets => {
        this.budgets = budgets;
      });
    this.http
      .get<Transaction[]>("http://localhost:8080/api/transactions")
      .subscribe(transactions => {
        this.transactions = transactions;
      });
  }



}
