import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAPIResult } from 'SharedClasses/IAPIResult';
import { IPotentialHazard } from 'SharedClasses/IPotentialHazard';

@Injectable({
  providedIn: 'root'
})
export class PotentialHazardService {

  constructor(private http: HttpClient) { }

  AddPotentialHazard(potentialHazard: FormData): Observable<any> {
    return this.http.post<FormData>(`http://localhost:5000/api/PotentialHazard`, potentialHazard);
  }
  GetPotentialHazards(userId:string,userRole:string): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/PotentialHazard/GetData?UserID=${userId}&UserRole=${userRole}`);
  }
  EditPotentialHazard(PotentialHazard : FormData, id:number): Observable<any> {
    return this.http.put<FormData>(`http://localhost:5000/api/PotentialHazard/${id}`, PotentialHazard);
  }  

  GetPotentialHazardForExel(userId:string,userRole:string): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/PotentialHazard/GetDataForExcel?UserID=${userId}&UserRole=${userRole}`);
  }

  GetPotentialHazardByID(Id: number,userId:string,userRole:string): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/PotentialHazard/GetDataById/${Id}?UserId=${userId}&UserRole=${userRole}`)
  }
  DeletePotentialHazard(PotentialHazard:IPotentialHazard): Observable<IPotentialHazard> {
    return this.http.put<IPotentialHazard>(`http://localhost:5000/api/PotentialHazard/Delete/${PotentialHazard.id}`,PotentialHazard);
  }
  GetPotentialHazardByPage(pageNumber:number,userId:string,userRole:string):Observable<any>{
    return this.http.get<any>(`http://localhost:5000/api/PotentialHazard/ByPage/${pageNumber}?UserId=${userId}&UserRole=${userRole}`);
    
  }

  GetPotentialHazardByRigNumber(RigId: number,userId:string,userRole:string,title:string): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/PotentialHazard/GetDataByRigNumber/${RigId}?UserId=${userId}&UserRole=${userRole}&title=${title}`)
  }
  GetForAnalysis(Year: number,userId:string,userRole:string): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/PotentialHazard/GetAllForAnalysis/${Year}?UserId=${userId}&UserRole=${userRole}`)
  }

  PrintPotentialHazardByID(Id: number,userId:string,userRole:string): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/PotentialHazard/PrintDataById?ID=${Id}&UserId=${userId}&UserRole=${userRole}`)
  }




}
