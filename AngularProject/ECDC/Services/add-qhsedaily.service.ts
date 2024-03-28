import { Injectable } from '@angular/core';
import { HttpClient, withRequestsMadeViaParent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAPIResult } from 'SharedClasses/IAPIResult';
import { IQHSEDaily } from 'SharedClasses/IQHSEDaily';

@Injectable({
  providedIn: 'root'
})
export class AddQHSEDailyService {

  constructor(private http: HttpClient) { }

  AddQHSEDaily(QHSEDaily: any): Observable<any> {

    return this.http.post<any>(`http://localhost:5000/api/QHSEDailyReport`, QHSEDaily);
  }
  GetQHSEDailys(userId:string,userRole:string): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/QHSEDailyReport/GetData?UserID=${userId}&UserRole=${userRole}`);
  }
  EditQHSEDaily(QHSEDaily : FormData, id:number): Observable<any> {
    return this.http.put<FormData>(`http://localhost:5000/api/QHSEDailyReport/${id}`, QHSEDaily);
  }  

  GetQHSEDailyForExel(userId:string,userRole:string): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/QHSEDailyReport/GetDataForExcel?UserID=${userId}&UserRole=${userRole}`);
  }

  GetQHSEDailyByID(Id: number,userId:string,userRole:string): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/QHSEDailyReport/GetDataById/${Id}?UserId=${userId}&UserRole=${userRole}`)
  }
  DeleteQHSEDaily(QHSEDaily:IQHSEDaily): Observable<IQHSEDaily> {
    return this.http.put<IQHSEDaily>(`http://localhost:5000/api/QHSEDailyReport/Delete/${QHSEDaily.id}`,QHSEDaily);
  }
  GetQHSEDailyByPage(pageNumber:number,userId:string,userRole:string):Observable<any>{
    return this.http.get<any>(`http://localhost:5000/api/QHSEDailyReport/ByPage/${pageNumber}?UserId=${userId}&UserRole=${userRole}`);
    
  }

  GetQHSEDailyByDate(date:Date,userId:string,userRole:string):Observable<any>{
    return this.http.get<any>(`http://localhost:5000/api/QHSEDailyReport/GetDataByDate?date=${date}&UserId=${userId}&UserRole=${userRole}`);
  }
  GetQHSEDailyPrintByID(formId:number,userId:string,userRole:string):Observable<any>{
    return this.http.get<any>(`http://localhost:5000/api/QHSEDailyReport/GetPrintDataById?formId=${formId}&UserId=${userId}&UserRole=${userRole}`);
  }
  GetQHSEDailyRecordsOfToday(RigId:number,date:string):Observable<any>{
    return this.http.get<any>(`http://localhost:5000/api/QHSEDailyReport/GetAllRecordsOFToday?RigId=${RigId}&dateAsString=${date}`);
  }
  GetForAnalysisByMonth(userId:string,Year: number,month1:number,month2:number): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/QHSEDailyReport/GetForAnalysisByMonth?UserID=${userId}&Year=${Year}&Month1=${month1}&Month2=${month2}`)
  }
  GetForAnalysisByYear(userId:string,Year: number): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/QHSEDailyReport/GetForAnalysisByYear?UserID=${userId}&Year=${Year}`)
  }
  GetForAnalysisByYeaAllRigs(Year: number): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/QHSEDailyReport/GetForAnalysisByYearAllRigs?Year=${Year}`)
  }
  GetForAnalysisByMonthAllRigs(Year: number,Month1:number,Month2:number): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/QHSEDailyReport/GetForAnalysisByMonthAllRigs?Year=${Year}&Month1=${Month1}&Month2=${Month2}`)
  }
  GetLTIDaysByRigNumberAndDate(RigId:number,date:Date):Observable<any>{
    return this.http.get<any>(`http://localhost:5000/api/DaysSinceNoLTI/ByRigNumber/${RigId}?date=${date}`);
  }
  GetLTIDaysByLTIIDAndDateBackEnd(LTIID:number,date:Date):Observable<any>{
    return this.http.get<any>(`http://localhost:5000/api/QHSEDailyReport/GetLastLTIOnBackend?date=${date}&LTIID=${LTIID}`);
  }
 

}
