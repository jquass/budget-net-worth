import { Routes } from '@angular/router';
import {AccountComponent} from "./account/account.component";
import {UploadComponent} from "./upload/upload.component";
import {TransactionComponent} from "./transaction/transaction.component";

export const routes: Routes = [
  {path: 'accounts', component: AccountComponent},
  {path: 'upload', component: UploadComponent},
  {path: 'transactions', component: TransactionComponent}
];
