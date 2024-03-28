import { Component } from '@angular/core';
import { LoginService } from 'Services/login.service';
import { UploadAndDownloadFilesService } from 'Services/upload-and-download-files.service';

import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-qsheforms',
  templateUrl: './qsheforms.component.html',
  styleUrls: ['./qsheforms.component.scss']
})
export class QSHEFormsComponent {
  private files = new BehaviorSubject<any[]>([]);
  readonly qsheList = this.files.asObservable();
  qshe!:any[];
  selectedFile!: File;
  selectedFilee: File | null = null;
  fileToUpload: File|null=null;
  // files: string[] = [];

  currentPage: number = 1;

  page:number=1;
  count:number=0;
  productSize:number=5;
  indexofPages: number=1;
  countOfPage:number=0;
  TempArray:any[]=[];
  IsUser:boolean=false;
  IsRadio:boolean=false;
  IsAdmin:boolean=false;

  json_data: any[] = [];

  User:any;
  constructor(private UploadFilesService: UploadAndDownloadFilesService,private loginService:LoginService)
  {
//     this.qshe=['ECDC-QHSE-FM-99- TBT.pdf','ECDC-QHSE-FM-98-Third Part Inspection Checklist.docx',
//   'ECDC-QHSE-FM-97-Man Riding Winch Checklist.doc','ECDC-QHSE-FM-96-Shift Handover.doc',
// 'ECDC-QHSE-FM-82-Accident-Incident Report.docx','ECDC-QHSE-FM-77-Corrective_Action_Register Version V.3.1.xlsx',
// 'ECDC-QHSE-FM-76-Leadership Site Visit Register Version A.xls','ECDC-QHSE-FM-71-Safety Alert Report.pptx',
// 'ECDC-QHSE-FM-70-Visitor Induction Confirmation.doc','ECDC-QHSE-FM-64- Daily BOP Report.xlsx',
// 'ECDC-QHSE-FM-60-PTSM.docx','ECDC-QHSE-FM-54 -Daily Report - ECDC Rig ##.xlsx',
// 'ECDC-QHSE-FM-45-HSE Emergency Drill.docx','ECDC-QHSE-FM-42-Fortlift Weekly Check Version A.xls',
// 'ECDC-QHSE-FM-21-Crane Weekly Check Version A.xls',
// 'ECDC-QHSE-FM-17-Lifting Operation Plan.xlsx','ECDC-QHSE-FM-12-Rig ### STOP Card Register.xlsx',
// 'ECDC-QHSE-FM-09-Risk Assessment FORM.docx','ECDC-QHSE-FM-08-PTW_Register Version A.xlsx',
// 'ECDC-QHSE-FM-07-Confined Space Entry Certificate Version A.doc',
// 'ECDC-QHSE-FM-06-Isolation Certificate.doc','ECDC-QHSE-FM-04-First Aid Report.docx',
// '40.ECDC-QHSE-FM-113-Sign IN.docx'] 
  }

   isWordFile(fileName: string): boolean {
    const extension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
    console.log(extension==='docx'||extension === 'doc')
    return extension === 'doc' || extension === 'docx';
  }
  
  isPDFFile(fileName: string): boolean {
    const extension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
    console.log(extension==='pdf'||extension === 'pdf')
    return extension === 'pdf' || extension === 'pdf';
  }

  isPPTXFile(fileName: string): boolean {
    const extension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
    console.log(extension==='pptx')
    return extension === 'pptx' ;
  }
   isExcelFile(fileName: string): boolean {
    const extension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
    return extension === 'xls' || extension === 'xlsx';
  }
   isExcelFileByMimeType(mimeType: string): boolean {
    return mimeType === 'application/vnd.ms-excel' || mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  }
  downloadFile(fileName: string,FolderName:string): void {
    const apiUrl = `http://localhost:5000/api/UploadFiles/DownloadFile?fileName=${fileName}&FolderName=${FolderName}`;

    // Use window.open to initiate the file download
    window.open(apiUrl, '_blank');
  }


onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input?.files && input.files.length > 0) {
    this.selectedFile = input.files[0];
  }
}





onFileSelectedd(event: any): void {
  this.selectedFilee = event.target.files[0];
}




onUpload(): void {
if (this.selectedFile) {
   const formData = new FormData();
   formData.append('file', this.selectedFile);

   // Adjust the API URL accordingly
   this.UploadFilesService.UploadFiles(formData,"QHSEFormUploadFiles").subscribe(
      (response) => {
         console.log('File uploaded successfully');
         console.log( response);
         this.GetPaginatedUploadFiles(this.currentPage)

      },
      (error) => {
         console.error('Error uploading file', error);
         this.GetPaginatedUploadFiles(this.currentPage)
      }
   );
}
}

ngOnInit(): void {
this.User=this.loginService.currentUser.getValue();
this.GetPaginatedUploadFiles(this.currentPage);

this.loginService.isAdmin.subscribe({
  next: data => {
    this.IsAdmin=data
  }
 })

}

deleteFile(fileName: string): void {
if (confirm("Are you sure you want to delete this file?"))
{
this.UploadFilesService.DeleteUploadFiles(fileName,"QHSEFormUploadFiles")
.subscribe(
  () => {
    console.log('File deleted successfully.');
    this.GetPaginatedUploadFiles(this.currentPage)
    // Update UI or perform other actions after successful deletion
  },
  error => {
    console.error('Error deleting file:', error);
    // Handle error and display appropriate message
    this.GetPaginatedUploadFiles(this.currentPage)
  }
);
}
}


GetPaginatedUploadFiles(pageNumber: number): void {
this.UploadFilesService.GetPaginatedUploadFiles("QHSEFormUploadFiles",pageNumber)
  .subscribe(
  {
    next: (response) => {
       console.log("pagggggggggggg")
       console.log(response.files)
      this.countOfPage=response.totalPages;
      this.TempArray= new Array(this.countOfPage);
      this.files .next( response.files);
      this.currentPage = response.currentPage;
    },
    error:err => {
      console.error('Error fetching paginated files:', err);

    }
  }
   
  );
}



gotleft()
{
(this.indexofPages>1)?this.indexofPages-=1:this.indexofPages=1;
this.GetPaginatedUploadFiles(this.indexofPages);
console.log("gotleft"+this.indexofPages);
}
gotoright()
{

(this.indexofPages<this.countOfPage)?this.indexofPages+=1:this.indexofPages=this.countOfPage;
this.GetPaginatedUploadFiles(this.indexofPages);
console.log("gotoright"+this.indexofPages);
}
}

