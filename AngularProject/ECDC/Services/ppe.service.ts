import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAPIResult } from 'SharedClasses/IAPIResult';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PPEService {

  constructor(private http: HttpClient) { }

  AddPPE(PPE: FormData): Observable<any> {
    return this.http.post<FormData>(`http://localhost:5000/api/PPE`, PPE);
  }
  GetPPEs(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/PPE`);
  }
  // EditPPE(PPE : any, id:number): Observable<any> {
  //   return this.http.put<any>(`http://localhost:5000/api/PPE/${id}`, PPE);
  // }  
  EditPPE(id: number, newPPE: any): Observable<any> {
    const url = `http://localhost:5000/api/PPE/${id}`;
  
    const headers = {
      'Content-Type': 'application/json'
    };
  
   return this.http.put(url, JSON.stringify(newPPE), { headers })}


  GetPPEByID(Id: number): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/PPE/${Id}`)
  }
  DeletePPE(PPE:any): Observable<any> {
    return this.http.put<any>(`http://localhost:5000/api/PPE/Delete/${PPE.id}`,PPE);
  }
  GetPPEByPage(pageNumber:number):Observable<any>{
    return this.http.get<any>(`http://localhost:5000/api/PPE/ByPage/${pageNumber}`);
    
  }


}
