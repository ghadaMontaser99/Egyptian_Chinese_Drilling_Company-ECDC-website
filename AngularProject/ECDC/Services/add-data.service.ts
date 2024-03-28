import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAccidentCauses } from 'SharedClasses/IAccidentCauses';
import { IClassification } from 'SharedClasses/IClassification';
import { IClassificationOfAccident } from 'SharedClasses/IClassificationOfAccident';
import { IClient } from 'SharedClasses/IClient';
import { IComminucationMethod } from 'SharedClasses/IComminucationMethod';
import { ICrew } from 'SharedClasses/ICrew';
import { IDaysSinceNoFatality } from 'SharedClasses/IDaysSinceNoFatality';
import { IDaysSinceNoLTI } from 'SharedClasses/IDaysSinceNoLTI';
import { IDrillType } from 'SharedClasses/IDrillType';
import { IDriver } from 'SharedClasses/IDriver';
import { IEmpCode } from 'SharedClasses/IEmpCode';
import { ILeadershipVisits } from 'SharedClasses/ILeadershipVisits';
import { IPassenger } from 'SharedClasses/IPassenger';
import { IPosition } from 'SharedClasses/IPosition';
import { IPreventionCategory } from 'SharedClasses/IPreventionCategory';
import { IQHSEPosition } from 'SharedClasses/IQHSEPosition';
import { IQHSEPositionName } from 'SharedClasses/IQHSEPositionName';
import { IReportedByName } from 'SharedClasses/IReportedByName';
import { IReportedByPosition } from 'SharedClasses/IReportedByPosition';
import { IResponsibility } from 'SharedClasses/IResponsibility';
import { IRig } from 'SharedClasses/IRig';
import { IRouteName } from 'SharedClasses/IRouteName';
import { ISubjectList } from 'SharedClasses/ISubjectList';
import { IToolPusherPosition } from 'SharedClasses/IToolPusherPosition';
import { IToolPusherPositionName } from 'SharedClasses/IToolPusherPositionName';
import { ITypeOfInjury } from 'SharedClasses/ITypeOfInjury';
import { ITypeOfObservationCategory } from 'SharedClasses/ITypeOfObservationCategory';
import { IVehicle } from 'SharedClasses/IVehicle';
import { IViolationCategory } from 'SharedClasses/IViolationCategory';

@Injectable({
  providedIn: 'root'
})
export class AddDataService {

  constructor(private http: HttpClient) { }

  AddAccidentCauses(AccidentCauses:IAccidentCauses): Observable<IAccidentCauses> {
    return this.http.post<IAccidentCauses>(`http://localhost:5000/api/AccidentCauses`,AccidentCauses);
  }

  AddDrillTypes(DrillTypes:IDrillType): Observable<IDrillType> {
    return this.http.post<IDrillType>(`http://localhost:5000/api/DrillType`,DrillTypes);
  }

  AddSubjectList(SubjectList:ISubjectList): Observable<ISubjectList> {
    return this.http.post<IAccidentCauses>(`http://localhost:5000/api/SubjectList`,SubjectList);
  }

  AddClassification(Classification:IClassification): Observable<IClassification> {
    return this.http.post<IClassification>(`http://localhost:5000/api/Classification`,Classification);
  }

  AddClassificationOfAccident(ClassificationOfAccident:IClassificationOfAccident): Observable<IClassificationOfAccident> {
    return this.http.post<IClassificationOfAccident>(`http://localhost:5000/api/ClassificationOfAccident`,ClassificationOfAccident);
  }

  AddPreventionCategory(PreventionCategory:IPreventionCategory): Observable<IPreventionCategory> {
    return this.http.post<IPreventionCategory>(`http://localhost:5000/api/PreventionCategory`,PreventionCategory);
  }

  AddQHSEPosition(QHSEPosition:IQHSEPosition): Observable<IQHSEPosition> {
    return this.http.post<IQHSEPosition>(`http://localhost:5000/api/QHSEPosition`,QHSEPosition);
  }

  AddQHSEPositionName(QHSEPositionName:IQHSEPositionName): Observable<IQHSEPositionName> {
    return this.http.post<IQHSEPositionName>(`http://localhost:5000/api/QHSEPositionName`,QHSEPositionName);
  }

  AddReportedByName(ReportedByName:IReportedByName): Observable<IReportedByName> {
    return this.http.post<IReportedByName>(`http://localhost:5000/api/ReportedByName`,ReportedByName);
  }

  AddReportedByPosition(ReportedByPosition:IReportedByPosition): Observable<IReportedByPosition> {
    return this.http.post<IReportedByPosition>(`http://localhost:5000/api/ReportedByPosition`,ReportedByPosition);
  }

  AddRig(Rig:IRig): Observable<IRig> {
    return this.http.post<IRig>(`http://localhost:5000/api/Rig`,Rig);
  }

  AddToolPusherPosition(ToolPusherPosition:IToolPusherPosition): Observable<IToolPusherPosition> {
    return this.http.post<IToolPusherPosition>(`http://localhost:5000/api/ToolPusherPosition`,ToolPusherPosition);
  }

  AddToolPusherPositionName(ToolPusherPositionName:IToolPusherPositionName): Observable<IToolPusherPositionName> {
    return this.http.post<IToolPusherPositionName>(`http://localhost:5000/api/ToolPusherPositionName`,ToolPusherPositionName);
  }

  AddTypeOfInjury(TypeOfInjury:ITypeOfInjury): Observable<ITypeOfInjury> {
    return this.http.post<ITypeOfInjury>(`http://localhost:5000/api/TypeOfInjury`,TypeOfInjury);
  }

  AddTypeOfObservationCategory(TypeOfObservationCategory:ITypeOfObservationCategory): Observable<ITypeOfObservationCategory> {
    return this.http.post<ITypeOfObservationCategory>(`http://localhost:5000/api/TypeOfObservationCategory`,TypeOfObservationCategory);
  }

  AddViolationCategory(ViolationCategory:IViolationCategory): Observable<IViolationCategory> {
    return this.http.post<IViolationCategory>(`http://localhost:5000/api/ViolationCategory`,ViolationCategory);
  }

  AddDriver(Driver:IDriver): Observable<IDriver> {
    return this.http.post<IDriver>(`http://localhost:5000/api/Driver`,Driver);
  }
  AddVehicle(Vehicle:IVehicle): Observable<IVehicle> {
    return this.http.post<IVehicle>(`http://localhost:5000/api/Vehicle`,Vehicle);
  }
  AddRouteName(RouteName:IRouteName):Observable<IRouteName> {
    return this.http.post<IRouteName>(`http://localhost:5000/api/RouteName`,RouteName);
  }
  AddCommuncationMethod(CommuncationMethod:IComminucationMethod):Observable<IComminucationMethod> {
    return this.http.post<IComminucationMethod>(`http://localhost:5000/api/ComminucationMethod`,CommuncationMethod);
  }
  AddPassenger(Passenger:IPassenger):Observable<IPassenger> {
    return this.http.post<IPassenger>(`http://localhost:5000/api/Passenger`,Passenger);
  }

  AddEmpCode(EmpCode:IEmpCode):Observable<IEmpCode> {
    return this.http.post<IEmpCode>(`http://localhost:5000/api/EmpCode`,EmpCode);
  }
  AddPosition(postion:IPosition):Observable<IPosition> {
    return this.http.post<IPosition>(`http://localhost:5000/api/Positions`,postion);
  }
  AddResponsibility(Responsibility:IResponsibility):Observable<IResponsibility> {
    return this.http.post<IResponsibility>(`http://localhost:5000/api/Responsibility`,Responsibility);
  }
  AddClient(Client:IClient):Observable<IClient> {
    return this.http.post<IClient>(`http://localhost:5000/api/Client`,Client);
  }
  AddLeadershipVisits(LeadershipVisits:ILeadershipVisits):Observable<ILeadershipVisits> {
    return this.http.post<ILeadershipVisits>(`http://localhost:5000/api/LeadershipVisit`,LeadershipVisits);
  }
  AddCrew(Crew:ICrew):Observable<ICrew> {
    return this.http.post<ICrew>(`http://localhost:5000/api/Crew`,Crew);
  }
  AddDaysSinceNoLTI(DaysSinceNoLTI:IDaysSinceNoLTI):Observable<IDaysSinceNoLTI> {
    return this.http.post<IDaysSinceNoLTI>(`http://localhost:5000/api/DaysSinceNoLTI`,DaysSinceNoLTI);
  }
  AddDaysSinceNoFatality(DaysSinceNoFatality:IDaysSinceNoFatality):Observable<IDaysSinceNoFatality> {
    return this.http.post<IDaysSinceNoFatality>(`http://localhost:5000/api/DaysSinceNoFatality`,DaysSinceNoFatality);
  }
 

}
