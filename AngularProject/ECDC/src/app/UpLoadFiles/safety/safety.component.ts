import { Data } from '@angular/router';
import { Component } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import * as saveAs from 'file-saver';
import { UploadAndDownloadFilesService } from 'Services/upload-and-download-files.service';
import { LoginService } from 'Services/login.service';

@Component({
  selector: 'app-safety',
  templateUrl: './safety.component.html',
  styleUrls: ['./safety.component.scss']
})
export class SafetyComponent {

  private files = new BehaviorSubject<any[]>([]);
  readonly  SafetyList = this.files.asObservable();

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
//     this.health=['ECDC Specific QHSE Plan.xls','ECDC-QHSE-PR-08-Permit To Work Procedure.docx','ECDC-QHSE-PR-09-Confined Space Entry Procedure.docx',
//   'ECDC-QHSE-PR-10-Lockout Tagout Procedure.docx','ECDC-QHSE-PR-11-Job Safety Analysis Procedure.docx','ECDC-QHSE-PR-12-Risk Notification Procedure.docx',
// 'ECDC-QHSE-PR-13-Land Transportation Procedure.docx','ECDC-QHSE-PR-14-Lifting Procedure.docx',
// 'ECDC-QHSE-PR-15-Working At Height Procedure.docx','ECDC-QHSE-PR-16-Working At Height Rescue Plan.docx',
// 'ECDC-QHSE-PR-17-Dropped Object Prevention Guidelines.docx','ECDC-QHSE-PR-18-Drops Standard.docx',
// 'ECDC-QHSE-PR-19-Fire Precautions work instruction.docx','ECDC-QHSE-PR-20-Control of Ignition Sources version A.docx',
// 'ECDC-QHSE-PR-21-Welding and Cutting Procedure Version A.docx','ECDC-QHSE-PR-22-H2S Safety Procedure Version A.docx',
// 'ECDC-QHSE-PR-23-H2S Contingency Plan Version A.docx','ECDC-QHSE-PR-24-SCBA Procedure Version A.docx',
// 'ECDC-QHSE-PR-25-Electrical Safety Procedure Version A.docx','ECDC-QHSE-PR-26-Blackout and Startup Procedure Version A.docx',
// 'ECDC-QHSE-PR-27-Mechanical Equipment Precautions  work instruction Version A.docx','ECDC-QHSE-PR-28-Safe use of Tools and Equipment Procedure Version A.docx',
// 'ECDC-QHSE-PR-29-Prohibited items Version A.docx','ECDC-QHSE-PR-30-Pipe Handling work instruction Version A.docx',
// 'ECDC-QHSE-PR-31-Manlift Safety  work instruction Version A(EN-CHN).docx','ECDC-QHSE-PR-32-Forklift Safety work instruction Version A(EN-CHN).docx',
// 'ECDC-QHSE-PR-33-Sandblasting and Grinders Version A.docx','ECDC-QHSE-PR-34-Abrasive Wheels and Grinders Version A.docx',
// 'ECDC-QHSE-PR-35-Pressure Testing Safety  work instruction Version A.docx','ECDC-QHSE-PR-36-Compressed Gas Cylinder Safety Procedure Version A.docx',
// 'ECDC-QHSE-PR-37-Nitrogen Filling Procedure Version A.docx','ECDC-QHSE-PR-38-Pressure Jetting  work instruction Version A.docx',
// 'ECDC-QHSE-PR-39-Safety Signages Procedure Version A.docx','ECDC-QHSE-PR-40-General Office Safety  work instruction Version A.docx',
// 'ECDC-QHSE-PR-41-Rig Emergency Response Procedure Version A.docx','ECDC-QHSE-PR-42-Emergency Response Plan Version A.docx',
// 'ECDC-QHSE-PR-43-Airconditioner Check Version A.xls'] 
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
   this.UploadFilesService.UploadFiles(formData,"ProcedureSafetyUploadFiles").subscribe(
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
this.UploadFilesService.DeleteUploadFiles(fileName,"ProcedureSafetyUploadFiles")
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
this.UploadFilesService.GetPaginatedUploadFiles("ProcedureSafetyUploadFiles",pageNumber)
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
