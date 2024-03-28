import { TestBed } from '@angular/core/testing';

import { UploadAndDownloadFilesService } from './upload-and-download-files.service';

describe('UploadAndDownloadFilesService', () => {
  let service: UploadAndDownloadFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadAndDownloadFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
