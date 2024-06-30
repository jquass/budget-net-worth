import { Routes } from '@angular/router';
import {AccountComponent} from "./account/account.component";
import {ImportComponent} from "./import/import.component";
import {TransactionComponent} from "./transaction/transaction.component";

export const routes: Routes = [
  {path: 'accounts', component: AccountComponent},
  {path: 'import', component: ImportComponent},
  {path: 'transactions', component: TransactionComponent},
  {path: '',   redirectTo: '/accounts', pathMatch: 'full'},
];
