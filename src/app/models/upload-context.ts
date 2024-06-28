import {Upload} from "./upload";
import {UploadHeader} from "./upload-header";
import {MappedUploadRow} from "./mapped-upload-row";

export interface UploadContext {
  uploadId: number;
  upload: Upload;
  uploadHeaders: UploadHeader[];
  mappedUploadRows: MappedUploadRow[];
}
