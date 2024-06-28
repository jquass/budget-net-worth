import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {UploadHeaderMapping} from "../../models/upload-header-mapping";
import {HttpClient} from "@angular/common/http";
import {UploadContext} from "../../models/upload-context";

@Component({
  selector: 'app-map-csv-headers',
  standalone: true,
    imports: [
        NgForOf,
        ReactiveFormsModule
    ],
  templateUrl: './map-csv-headers.component.html',
  styleUrl: './map-csv-headers.component.css'
})
export class MapCsvHeadersComponent {
  @Input()
  public uploadContext: UploadContext | null = null;

  @Output('uploadContextEvent')
  uploadContextEventEmitter = new EventEmitter<UploadContext>();

  constructor(private http: HttpClient) {}

  public mapHeadersCsvForm = new FormGroup({
    'transactionDateHeader' : new FormControl<Number | null>(null),
    'memoHeader' : new FormControl<Number | null>(null),
    'debitHeader' : new FormControl<Number | null>(null),
    'creditHeader' : new FormControl<Number | null>(null),
  });

  public mapHeaders(uploadId: number | undefined) : void {

    if (typeof this.mapHeadersCsvForm.value.transactionDateHeader != "undefined"
      && this.mapHeadersCsvForm.value.transactionDateHeader
      && typeof this.mapHeadersCsvForm.value.memoHeader != "undefined"
      && this.mapHeadersCsvForm.value.memoHeader
      && typeof this.mapHeadersCsvForm.value.debitHeader != "undefined"
      && this.mapHeadersCsvForm.value.debitHeader
    ) {
      let uploadHeaderMapping: UploadHeaderMapping;
      let transactionDateHeader: number = this.mapHeadersCsvForm.value.transactionDateHeader.valueOf();
      let memoHeader: number = this.mapHeadersCsvForm.value.memoHeader.valueOf();
      let debitHeader: number = this.mapHeadersCsvForm.value.debitHeader.valueOf();
      if (typeof this.mapHeadersCsvForm.value.creditHeader != "undefined" && this.mapHeadersCsvForm.value.creditHeader) {
      let creditHeader: number = this.mapHeadersCsvForm.value.creditHeader.valueOf();
        uploadHeaderMapping = {
          transactionDateHeaderId: transactionDateHeader,
          memoHeaderId: memoHeader,
          debitHeaderId: debitHeader,
          creditHeaderId: creditHeader,
        };
      } else {
        uploadHeaderMapping = {
          transactionDateHeaderId: transactionDateHeader,
          memoHeaderId: memoHeader,
          debitHeaderId: debitHeader,
        }
      }
      this.http.post<UploadContext>("http://localhost:8080/api/uploads/"+uploadId+"/map-headers", uploadHeaderMapping)
        .subscribe(uploadContext => {
          this.uploadContextEventEmitter.emit(uploadContext);
      })
    }
  }
}
