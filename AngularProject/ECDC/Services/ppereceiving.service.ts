import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAPIResult } from 'SharedClasses/IAPIResult';
import { IPPEReceiving } from 'SharedClasses/IPPEReceiving';

@Injectable({
  providedIn: 'root'
})
export class PPEReceivingService {

  constructor(private http: HttpClient) { }

  AddPPEReceiving(PPEReceiving: any): Observable<any> {
    return this.http.post<any>(`http://localhost:5000/api/PPEReceiving`, PPEReceiving);
  }
  GetPPEReceivings(userId:string,userRole:string): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/PPEReceiving/GetData?UserID=${userId}&UserRole=${userRole}`);
  }
  EditPPEReceiving(PPEReceiving : any, id:number): Observable<any> {
    return this.http.put<any>(`http://localhost:5000/api/PPEReceiving/${id}`, PPEReceiving);
  }  

  GetPPEReceivingForExel(userId:string,userRole:string): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/PPEReceiving/GetDataForExcel?UserID=${userId}&UserRole=${userRole}`);
  }

  GetPPEReceivingByID(Id: number,userId:string,userRole:string): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/PPEReceiving/GetDataById/${Id}?UserId=${userId}&UserRole=${userRole}`)
  }
  DeletePPEReceiving(PPEReceiving:IPPEReceiving): Observable<IPPEReceiving> {
    return this.http.put<IPPEReceiving>(`http://localhost:5000/api/PPEReceiving/Delete/${PPEReceiving.id}`,PPEReceiving);
  }
  GetPPEReceivingByPage(pageNumber:number,userId:string,userRole:string):Observable<any>{
    return this.http.get<any>(`http://localhost:5000/api/PPEReceiving/ByPage/${pageNumber}?UserId=${userId}&UserRole=${userRole}`);
    
  }
  PrintPPEReceivingByID(Id: number,userId:string,userRole:string): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/PPEReceiving/PrintDataById/${Id}?UserId=${userId}&UserRole=${userRole}`)
  }

  GetPPEReceivingtByEmpCodeNew(empCode:number,userId:string,userRole:string,date:string):Observable<any>{
    return this.http.get<any>(`http://localhost:5000/api/PPEReceiving/GetDataByEmpCode/New/${empCode}?UserId=${userId}&UserRole=${userRole}&date=${date}`);
    
  }

  PPEReceivingtSearchByEmpCode(empCode:number,userId:string,userRole:string):Observable<any>{
    return this.http.get<any>(`http://localhost:5000/api/PPEReceiving/GetDataByEmpCode/${empCode}?UserId=${userId}&UserRole=${userRole}`);
    
  }

}
