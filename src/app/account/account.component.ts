import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {Account} from "../models/account";
import {Result} from "../models/result";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  public accounts: Account[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<Account[]>("http://localhost:8080/api/accounts")
      .subscribe(response => {
      this.accounts = response;
    });
  }

  public createAccountForm = new FormGroup({
    'accountName' :  new FormControl(null),
  });

  createAccount() : void {
    console.log(this.createAccountForm.value);
    this.http
      .post<Account>("http://localhost:8080/api/accounts", this.createAccountForm.value)
      .subscribe(account => {
        this.createAccountForm.reset();
        this.accounts.push(account);
      });
  }

  deleteAccount(account: Account) : void {
    this.http
      .delete<Result>("http://localhost:8080/api/accounts/" + account.id)
      .subscribe(result => {
        if (result.ok) {
          this.accounts = this.accounts.filter(({id}) => id !== account.id);
        }
      });
  }


}
