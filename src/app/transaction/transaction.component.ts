import {Component, Input} from '@angular/core';
import {Transaction} from "../models/transaction";
import {NgForOf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {Account} from "../models/account";

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {
  public accounts: Account[] = [];
  public transactions: Transaction[] = [];
  public accountsDictionary: Map<number, Account> = new Map<number, Account>();

  public amountFormatter : Intl.NumberFormat = new Intl.NumberFormat('en-US',
    {style: 'currency', currency: 'USD'});

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<Account[]>("http://localhost:8080/api/accounts")
      .subscribe(response => {
        this.accounts = response;
        this.accounts.forEach(account => {
          this.accountsDictionary.set(account.id, account);
        })
      });
    this.http
      .get<Transaction[]>("http://localhost:8080/api/transactions")
      .subscribe(transactions => {
        this.transactions = transactions;
      });
  }
}
