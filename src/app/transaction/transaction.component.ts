import { Component } from '@angular/core';
import {Transaction} from "../models/transaction";
import {NgForOf} from "@angular/common";
import {HttpClient} from "@angular/common/http";

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
  public transactions: Transaction[] = [];

  public amountFormatter : Intl.NumberFormat = new Intl.NumberFormat('en-US',
    {style: 'currency', currency: 'USD'});

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<Transaction[]>("http://localhost:8080/api/transactions")
      .subscribe(transactions => {
        this.transactions = transactions;
      });
  }
}
