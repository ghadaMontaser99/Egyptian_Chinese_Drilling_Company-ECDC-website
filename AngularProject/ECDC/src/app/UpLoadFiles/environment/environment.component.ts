import { LoginService } from 'Services/login.service';
import { Component } from '@angular/core';
import { UploadAndDownloadFilesService } from 'Services/upload-and-download-files.service';

import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.scss']
})
export class EnvironmentComponent {
  private files = new BehaviorSubject<any[]>([]);
  readonly  EnvironmentList = this.files.asObservable();
  Environmet!:any[];
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
  //   this.Environmet=['ECDC-QHSE-PR-44-Waste Management Plan Version A','ECDC-QHSE-PR-45-Handling And Storing Hazardous Material Procedure Version A',
  // 'ECDC-QHSE-PR-46-Oil Spill Control Procedure Version A','ECDC-QHSE-PR-47-Housekeeping and Personal Hygiene  work instruction Version A'] 
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
   this.UploadFilesService.UploadFiles(formData,"EnvironmentUploadFiles").subscribe(
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
this.UploadFilesService.DeleteUploadFiles(fileName,"EnvironmentUploadFiles")
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
this.UploadFilesService.GetPaginatedUploadFiles("EnvironmentUploadFiles",pageNumber)
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
