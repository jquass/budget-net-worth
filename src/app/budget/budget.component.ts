import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Budget} from "../models/budget";
import {NgForOf, NgIf, TitleCasePipe} from "@angular/common";

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css'
})
export class BudgetComponent {
  public budgets: Budget[] = [];

  public titleCasePipe= new TitleCasePipe()
  public formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  months = [
    'JANUARY',
    'FEBRUARY',
    'MARCH',
    'APRIL',
    'MAY',
    'JUNE',
    'JULY',
    'AUGUST',
    'SEPTEMBER',
    'OCTOBER',
    'NOVEMBER',
    'DECEMBER'
  ];

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.http
      .get<Budget[]>("http://localhost:8080/api/budgets")
      .subscribe(response => {
        this.budgets = response;
      });
  }

  public createBudgetForm = new FormGroup({
    'budgetName': new FormControl(null, [Validators.required, Validators.minLength(4)]),
    'amount': new FormControl(null, [Validators.required, Validators.min(1)]),
    'monthPeriod': new FormControl(1, [Validators.required, Validators.min(1)]),
    'startMonth': new FormControl(this.months[new Date().getMonth()], Validators.required),
    'startYear': new FormControl(new Date().getFullYear(), [
      Validators.required,
      Validators.min(1900),
      Validators.max(2200)
    ]),
    'stopMonth': new FormControl(null),
    'stopYear': new FormControl(null, [Validators.min(1900), Validators.max(2200)]),
    'stopAmount': new FormControl(null, Validators.min(1)),
  });

  get budgetName() {
    return this.createBudgetForm.get('budgetName')!;
  }

  get amount() {
    return this.createBudgetForm.get('amount')!;
  }

  public createBudget() {
    this.http
      .post<Budget>("http://localhost:8080/api/budgets", this.createBudgetForm.value)
      .subscribe(response => {
        console.log(response);

        this.createBudgetForm.reset({
          'monthPeriod': 1,
          'startMonth': this.months[new Date().getMonth()],
          'startYear': new Date().getFullYear()
        });
      });
  }
}
