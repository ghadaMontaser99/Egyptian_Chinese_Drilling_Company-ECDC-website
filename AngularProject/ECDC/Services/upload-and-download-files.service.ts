import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadAndDownloadFilesService {

  constructor(private http: HttpClient) {}

  UploadFiles(formData: FormData,FolderName:string): Observable<any> {
   
    const apiUrl = `http://localhost:5000/api/UploadFiles/upload?FolderName=${FolderName}`;
    
    return this.http.post(apiUrl, formData);
    
  }

  GetAllUploadFiles(FolderName:string): Observable<any> {
    const apiUrl =
      `http://localhost:5000/api/UploadFiles/GetAllUploadFiles?FolderName=${FolderName}`; // Adjust the API URL accordingly

    return this.http.get<string[]>(apiUrl);
  }

  DeleteUploadFiles(fileName: string,FolderName:string): Observable<any> {
    const apiUrl = `http://localhost:5000/api/UploadFiles/${fileName}?FolderName=${FolderName}`;
   
    return this.http.delete(apiUrl);
  }

  GetPaginatedUploadFiles(FolderName:string,pageNumber: number): Observable<any> {
    const apiUrl = `http://localhost:5000/api/UploadFiles?FolderName=${FolderName}`;
    const url = `${apiUrl}&pageNumber=${pageNumber}`;
    return this.http.get(url);
  }


  

}
