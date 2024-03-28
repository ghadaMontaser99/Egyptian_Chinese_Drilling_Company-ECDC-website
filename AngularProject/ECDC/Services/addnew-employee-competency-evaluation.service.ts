import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { IAPIResult } from 'SharedClasses/IAPIResult';
import { IEmployeeCompetencyEvaluation} from 'SharedClasses/IEmployeeCompetencyEvaluation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AddnewEmployeeCompetencyEvaluationService {
 
  constructor(private http: HttpClient) {

   }

  AddEmployeeCompetencyEvaluation(Formdata: FormData): Observable<any> {
    return this.http.post<FormData>(`http://localhost:5000/api/EmployeeCompetencyEvaluationt`, Formdata);
  }

  EditEmployeeCompetencyEvaluationt(employeeCompetencyEvaluation : FormData, id:number): Observable<any> {
    return this.http.put<FormData>(`http://localhost:5000/api/EmployeeCompetencyEvaluationt/${id}`, employeeCompetencyEvaluation);
  }  



  GetEmployeeCompetencyEvaluationts(userId:string,userRole:string): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/EmployeeCompetencyEvaluationt/GetDataForExcel?UserID=${userId}&UserRole=${userRole}`);
  }

  GetEmployeeCompetencyEvaluationtByEmpCodeNew(EmpCode:number,userId:string,userRole:string,date:string): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/EmployeeCompetencyEvaluationt/GetDataByEmpCode/New/${EmpCode}?UserID=${userId}&UserRole=${userRole}&date=${date}`);

  }

  GetEmployeeCompetencyEvaluationtByID(Id: number,userId:string,userRole:string): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/EmployeeCompetencyEvaluationt/${Id}?UserId=${userId}&UserRole=${userRole}`)
  }
  

  GetEmployeeCompetencyEvaluationtSearchByEmpCode(EmpCode:number,userId:string,userRole:string): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/EmployeeCompetencyEvaluationt/GetDataByEmpCode/${EmpCode}?UserID=${userId}&UserRole=${userRole}`);

  }

  PrintEmployeeCompetencyEvaluationtByID(Id: number,userId:string,userRole:string): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/EmployeeCompetencyEvaluationt/GetDataById/${Id}?UserId=${userId}&UserRole=${userRole}`)
  }
}
