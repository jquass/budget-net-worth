import {Component, HostListener} from '@angular/core';
import {Account} from "../models/account";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {UploadContext} from "../models/upload-context";
import {MapCsvHeadersComponent} from "./map-csv-headers/map-csv-headers.component";

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    MapCsvHeadersComponent,
  ],
  templateUrl: './import.component.html',
  styleUrl: './import.component.css',
})
export class ImportComponent {
  public accounts: Account[] = [];

  public file: File | null = null;

  public uploadContext: UploadContext | null = null;

  public formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    if (event) {
      this.file = event.length > 0 ? event.item(0) : null;
    }
  }

  constructor(private http: HttpClient) {
  }

  public uploadCsvForm = new FormGroup({
    'csvFile' :  new FormControl(null),
    'accountId': new FormControl(null),
  });

  public finalizeUploadForm = new FormGroup({
  })

  ngOnInit(): void {
    this.http
      .get<Account[]>("http://localhost:8080/api/accounts")
      .subscribe(response => {
        this.accounts = response;
      });
    this.http
      .get<UploadContext>("http://localhost:8080/api/uploads/in-progress/context")
      .subscribe(response => {
        this.uploadContext = response;
        console.log(response);
      });
  }

  public uploadCsv() : void {
    if (this.file !== null) {
      const fd = new FormData();
      fd.append('file', this.file);
      this.http
        .post<UploadContext>(
          "http://localhost:8080/api/uploads/account/" + this.uploadCsvForm.value.accountId,
          fd,
          {}
        )
        .subscribe(uploadContext => {
          this.uploadContext = uploadContext;
          this.uploadCsvForm.reset();
        });
    }
  }

  handleUploadContextEvent(event: UploadContext) {
    this.uploadContext = event;
  }

  public finalizeUpload() : void {
    this.http
      .post<UploadContext>(
        "http://localhost:8080/api/uploads/" + this.uploadContext?.uploadId + "/finalize",
        {}
      )
      .subscribe(uploadContext => {
        console.log(uploadContext);
        this.uploadContext = null;
      });
  }

}
