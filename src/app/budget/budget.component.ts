import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Budget} from "../models/budget";
import {NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {BudgetMonth} from "../models/budget-month";
import {MonthYear} from "../models/month-year";

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
  ],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css',
})
export class BudgetComponent {
  public budgets: Budget[] = [];
  public budgetsDictionary: Map<number, Budget> = new Map<number, Budget>();
  public budgetMonths: BudgetMonth[] = [];
  public monthYears: MonthYear[] = [];

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
        this.budgets.forEach(budget => {
          this.budgetsDictionary.set(budget.id, budget);
        })
      });

    this.http
      .get<MonthYear[]>("http://localhost:8080/api/budgets/month-years")
      .subscribe(response => {
        this.monthYears = response;
        if (this.monthYears.length > 0) {
          this.http
            .get<BudgetMonth[]>("http://localhost:8080/api/budgets/months/" + this.monthYears[0].date)
            .subscribe(response => {
              this.budgetMonths = response;
            });
        }
      });
  }

  public createBudgetForm = new FormGroup({
    'budgetName': new FormControl(null, [Validators.required, Validators.minLength(4)]),
    'monthlyAmount': new FormControl(null, [Validators.min(1)]),
  });

  get budgetName() {
    return this.createBudgetForm.get('budgetName')!;
  }

  get monthlyAmount() {
    return this.createBudgetForm.get('monthlyAmount')!;
  }

  public createBudget() {
    this.http
      .post<Budget>("http://localhost:8080/api/budgets", this.createBudgetForm.value)
      .subscribe(response => {
        console.log(response);
        this.budgets.push(response);
        this.budgetsDictionary.set(response.id, response);
        this.createBudgetForm.reset();
      });
  }

  public onSelectBudgetMonth(budgetMonth: string) {
    this.http
      .get<BudgetMonth[]>("http://localhost:8080/api/budgets/months/" + budgetMonth)
      .subscribe(response => {
        this.budgetMonths = response;
      });
  }

  protected readonly Math = Math;
}
