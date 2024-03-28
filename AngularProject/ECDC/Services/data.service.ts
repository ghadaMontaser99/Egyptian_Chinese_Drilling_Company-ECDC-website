import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAPIResult } from 'SharedClasses/IAPIResult';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  GetAccidents(userId:string,userRole:string): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/Accident/GetData?UserID=${userId}&UserRole=${userRole}`);
  }

  GetEmployeeCompetencyEvaluationts(userId:string,userRole:string): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/EmployeeCompetencyEvaluationt/GetData?UserID=${userId}&UserRole=${userRole}`);
  }

  GetDrills(userId:string,userRole:string): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/Drill/GetData?UserID=${userId}&UserRole=${userRole}`);
  }

  GetStopCards(userId:string,userRole:string): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/StopCardRegister/GetData?UserId=${userId}&UserRole=${userRole}`);
  }

  GetPendingJMP(pageNumber:number): Observable<any> {
    return this.http.get<any>(`http://localhost:5000/api/JMP/notifyStatus/${pageNumber}?pagesize=10`);
  }

  GetStopCardsByMonth(month:number,userId:string,userRole:string): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/StopCardRegister/GetDataByMonth/${month}?UserId=${userId}&UserRole=${userRole}`);
  }

  GetJMPs(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/JMP`);
  }

  GetAccidentCauses(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/AccidentCauses`);
  }

  GetSubjectList(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/SubjectList`);
  }

  GetDrillTypeList(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/DrillType`);
  }
   
  GetDrillByMonth(month1:number,month2:number,userRole:string,UserId:string): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/Drill/GetDrillAnalysisByDrillTypeAndMonth/?Month1=${month1}&Month2=${month2}&UserRole=${userRole}&UserId=${UserId}`);
  }

  GetDrillByYear(year:number ,userRole:string,UserId:string): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/Drill/GetDrillAnalysisByDrillTypeAndYear?Year=${year}&UserRole=${userRole}&UserId=${UserId}`);
  }
  GetDrillAnalysisWithCompareByYear(year:number,userRole:string): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/Drill/GetDrillAnalysisWithCompareByYear/?Year=${year}&UserRole=${userRole}`);
  }
  GetDrillAnalysisWithCompareByMonth(month1:number,month2:number,userRole:string): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/Drill/GetDrillAnalysisWithCompareByMonth/?Month1=${month1}&Month2=${month2}&UserRole=${userRole}`);
  }
  GetSubjectById(id:number): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/SubjectList/${id}`);
  }

 
  GetClassification(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/Classification`);
  }

  GetClassificationOfAccident(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/ClassificationOfAccident`);
  }

  GetPreventionCategory(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/PreventionCategory`);
  }

  GetQHSEPosition(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/QHSEPosition`);
  }

  GetQHSEPositionNameForExcel(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/QHSEPositionName/GetAllForExcel`);
  }

  GetQHSEPositionName(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/QHSEPositionName`);
  }

  GetReportedByNameByEmpCode(empCode: number): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/ReportedByName/Code/${empCode}`);
  }

  GetQHSEPositionNameByEmpCode(empCode: number): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/QHSEPositionName/Code/${empCode}`);
  }

  GetToolPusherPositionNameByEmpCode(empCode: number): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/ToolPusherPositionName/Code/${empCode}`);
  }

  GetReportedByName(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/ReportedByName`);
  }

  GetReportedByNameForExcel(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/ReportedByName/GetAllForExcel`);
  }

  GetReportedByPosition(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/ReportedByPosition`);
  }

  GetRig(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/Rig`);
  }

  GetToolPusherPosition(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/ToolPusherPosition`);
  }

  GetToolPusherPositionName(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/ToolPusherPositionName`);
  }

  GetToolPusherPositionNameForExcel(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/ToolPusherPositionName/GetAllForExcel`);
  }

  GetReportedByNameByID(nameID: number): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/ReportedByName/${nameID}`);
  }

  GetReportedByPositionByID(positionID: number): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/ReportedByPosition/${positionID}`);
  }

  GetToolPusherPositionNameByID(nameID: number): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/ToolPusherPositionName/${nameID}`);
  }

  GetToolPusherPositionByID(positionID: number): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/ToolPusherPosition/${positionID}`);
  }

  GetQHSEPositionNameByID(nameID: number): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/QHSEPositionName/${nameID}`);
  }

  GetQHSEPositionByID(positionID: number): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/QHSEPosition/${positionID}`);
  }

  GetTypeOfInjury(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/TypeOfInjury`);
  }

  GetTypeOfObservationCategory(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/TypeOfObservationCategory`);
  }

  GetViolationCategory(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/ViolationCategory`);
  }

  GetDriverName(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/Driver`);
  }

  GetVehicleName(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/Vehicle`);
  }

  GetRoutName(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/RouteName`);
  }

  GetCommuncationMethod(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/ComminucationMethod`);
  }

  GetPassengerName(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/Passenger`);
  }

  GetPassengerNameForExcel(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/Passenger/GetAllForExcel`);
  }

  GetDriverData(id: number): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/Driver/${id}`);
  }

  GetDriverDataForExcel(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/Driver/GetAllForExcel`);
  }

  GetVehicleData(id: number): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/Vehicle/${id}`);
  }

  GetSJPDataByPage(pageNumber: number): Observable<any> {
    return this.http.get<any>(`http://localhost:5000/api/JMP/SJPByPage/${pageNumber}?pagesize=10`);
  }

  GetArrivedSJPDataByPage(pageNumber: number): Observable<any> {
    return this.http.get<any>(`http://localhost:5000/api/JMP/ArrivedSJPByPage/${pageNumber}?pagesize=3`);
  }

  GetDataForCharts(filter:string,month:number,userId:string,userRole:string): Observable<any> {
    return this.http.get<any>(`http://localhost:5000/api/StopCardRegister/GetDataForCharts?query=${filter}&month=${month}&UserId=${userId}&UserRole=${userRole}`);
  }

  GetRigPerformanceData(UserID:string,userRole:string): Observable<any> {
    return this.http.get<any>(`http://localhost:5000/api/RigMovePerformance/GetAllWithResponseDTO?UserID=${UserID}&UserRole=${userRole}`);
  }

  GetRigPerformanceDataForCharts(RigNo:number,UserID:string,UserRole:string): Observable<any> {
    return this.http.get<any>(`http://localhost:5000/api/RigMovePerformance/GetAllForAnalysis/${RigNo}?UserID=${UserID}&UserRole=${UserRole}`);
  }

  GetRigPerformanceDataForCompareCharts(RigNo1:number,RigNo2:number,Year:number,UserID:string,userRole:string): Observable<any> {
    return this.http.get<any>(`http://localhost:5000/api/RigMovePerformance/GetAllForCompareAnalysis?RigID1=${RigNo1}&RigID2=${RigNo2}&Year=${Year}&UserID=${UserID}&UserRole=${userRole}`);
  }

  GetDataForChartsCompare(month1:number,month2:number,userId:string,userRole:string): Observable<any> {
    return this.http.get<any>(`http://localhost:5000/api/StopCardRegister/GetDataByMonthCompare?date1=${month1}&date2=${month2}&UserId=${userId}&UserRole=${userRole}`);
  }

  GetEmpCode(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/EmpCode`);
  }
  GetEmpCodeDataForExcel(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/EmpCode/GetAllForExcel`);
  }

  GetEmpCodeByID(EmpCodeID: number): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/EmpCode/${EmpCodeID}`);
  }

  GetEmpCodeByCode(EmpCode: number): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/EmpCode/Code/${EmpCode}`);
  }

  GetPositions(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/Positions`);
  }

  GetPositionByID(ID: number): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/Positions/${ID}`);
  }
  GetResponsibility(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/Responsibility`);
  }

  GetResponsibilityByID(ID: number): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/Responsibility/${ID}`);
  }
  GetClient(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/Client`);
  }
  GetClientByID(ID: number): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/Client/${ID}`);
  }
  GetLeadershipVisit(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/LeadershipVisit`);
  }
  GetLeadershipVisitsByID(ID: number): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/LeadershipVisit/${ID}`);
  }
  GetCrew(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/Crew`);
  }
  GetCrewByID(ID: number): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/Crew/${ID}`);
  }
  GetDaysSinceNoLTI(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/DaysSinceNoLTI`);
  }
  GetDaysSinceNoLTITOCheck(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/DaysSinceNoLTI/GetToCheck`);
  }
  GetDaysSinceNoLTIByID(ID: number): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/DaysSinceNoLTI/${ID}`);
  }
  GetDaysSinceNoFatality(): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/DaysSinceNoFatality`);
  }
  GetDaysSinceNoFatalityByID(ID: number): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/DaysSinceNoFatality/${ID}`);
  }
  GetDaysSinceNoFatalityByRigNumber(RigNumber:number): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/DaysSinceNoFatality/ByRigNumber/${RigNumber}`);
  }
  GetDaysSinceNoLTIByRigNumber(RigNumber:number): Observable<IAPIResult> {
    return this.http.get<IAPIResult>(`http://localhost:5000/api/DaysSinceNoLTI/ByRigNumber/${RigNumber}`);
  }


}
