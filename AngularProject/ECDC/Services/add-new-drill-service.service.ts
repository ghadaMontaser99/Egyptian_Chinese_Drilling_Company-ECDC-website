import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAPIResult } from 'SharedClasses/IAPIResult';
import { IDrill } from 'SharedClasses/IDrill';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddNewDrillServiceService {

  constructor(private http: HttpClient) {

  }

 AddDrill(Formdata: FormData): Observable<any> {
   return this.http.post<FormData>(`http://localhost:5000/api/Drill`, Formdata);
 }

 EditDrill(Drill : FormData, id:number): Observable<any> {
   return this.http.put<FormData>(`http://localhost:5000/api/Drill/${id}`, Drill);
 }  
 GetDrillByDrillType(DrillType:string,userId:string,userRole:string,date:string,rigNum:number): Observable<IAPIResult> {
   return this.http.get<IAPIResult>(`http://localhost:5000/api/Drill/GetDataByDrillType/${DrillType}?UserID=${userId}&UserRole=${userRole}&date=${date}&RigNumber=${rigNum}`);
 }


 GetDrillByID(Id: number,userId:string,userRole:string): Observable<IAPIResult> {
   return this.http.get<IAPIResult>(`http://localhost:5000/api/Drill/GetDataById/${Id}?UserId=${userId}&UserRole=${userRole}`)
 }


}
