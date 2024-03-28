import { Component } from '@angular/core';
import { AddBOPService } from 'Services/add-bop.service';
import { DataService } from 'Services/data.service';
import { LoginService } from 'Services/login.service';
import { PotentialHazardService } from 'Services/potential-hazard.service';
import { PTSMService } from 'Services/ptsm.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  accidentsList: any;
  accidentcount: number = 0;
  stopCardList: any;
  stopCardcount: number = 0;
  JMPList: any;
  JMPcount: number = 0;
  accidentCausesList: any;
  accidentCausescount: number = 0;
  classificationList: any;
  classificationcount: number = 0;
  classificationOfAccidentList: any;
  classificationOfAccidentcount: number = 0;
  comminucationMethodList: any;
  comminucationMethodcount: number = 0;
  driverList: any;
  drivercount: number = 0;
  passengerList: any;
  passengercount: number = 0;
  preventionCategoryList: any;
  preventionCategorycount: number = 0;
  QHSEPositionList: any;
  QHSEPositioncount: number = 0;
  QHSEPositionNameList: any;
  QHSEPositionNamecount: number = 0;
  reportedByNameList: any;
  reportedByNamecount: number = 0;
  reportedByPositionList: any;
  reportedByPositioncount: number = 0;
  rigList: any;
  rigcount: number = 0;
  routeNameList: any;
  routeNamecount: number = 0;
  toolPusherPositionList: any;
  toolPusherPositioncount: number = 0;
  toolPusherPositionNameList: any;
  toolPusherPositionNamecount: number = 0;
  typeOfInjuryList: any;
  typeOfInjurycount: number = 0;
  typeOfObserviationList: any;
  typeOfObserviationcount: number = 0;
  vehicleList: any;
  vehiclecount: number = 0;
  violationCategoryList: any;
  violationCategorycount: number = 0;
  rigMovePerformanceList: any;
  rigMovePerformancecount: number = 0;
  PTSMList: any;
  PTSMcount: number = 0;
  BOPList: any;
  BOPcount: number = 0;
  drillsList: any[]=[];
  drillsCount: number = 0;
  PotentialHazardList: any;
  PotentialHazardCount: number = 0;
  User: any;
  TotalManHours: any;
  DaysSinceNoLTIList:any[]=[];
  constructor(private ptsmService: PTSMService, private loginService: LoginService,
    private dataService: DataService, private BopService: AddBOPService,
     private PotentialHazardService: PotentialHazardService) { }

  ngOnInit(): void {
    this.User = this.loginService.currentUser.getValue();
    console.log("/////////////************************")
    console.log(this.User)
    this.dataService.GetAccidents(this.User.ID, this.User.Role).subscribe({
      next: data => {
        console.log("data.data.length")
        console.log(data.data.length)
        this.accidentsList = data.data,
          this.accidentcount = this.accidentsList.length
      }
    })
    this.dataService.GetDaysSinceNoLTI().subscribe({
      next:data=>{
        this.DaysSinceNoLTIList=data.data
        console.log("dataaaa of llltttiiiii")
        console.log( this.DaysSinceNoLTIList)
        //this.DaysSinceNoLTICount=this.DaysSinceNoLTIList.length
      }
    })
    this.dataService.GetAccidents(this.User.ID, this.User.Role).subscribe({
      next: data => {
        console.log("data.data.length")
        console.log(data.data.length)
        this.accidentsList = data.data,
          this.accidentcount = this.accidentsList.length
      }
    })
    this.ptsmService.GetPTSM(this.User.ID, this.User.Role).subscribe({
      next: data => {
        console.log("data.data.length")
        console.log(data.data.length)
        this.PTSMList = data.data,
          this.PTSMcount = this.PTSMList.length
      }
    })
    this.BopService.GetBOP(this.User.ID, this.User.Role).subscribe({
      next: data => {
        console.log("data.data.length")
        console.log(data.data.length)
        this.BOPList = data.data,
          this.BOPcount = this.BOPList.length
      }
    })

    this.BopService.GetTotalManHours(this.User.ID, this.User.Role).subscribe({
      next: data => {
        console.log("data.data.length")
        console.log(data.data.length)
        this.TotalManHours = data.data
      }
    })

    this.dataService.GetStopCards(this.User.ID, this.User.Role).subscribe({
      next: data => {
        this.stopCardList = data.data,
          this.stopCardcount = this.stopCardList.length
      }
    })
    this.dataService.GetJMPs().subscribe({
      next: data => {
        this.JMPList = data.data,
          this.JMPcount = this.JMPList.length
      }
    })
    this.dataService.GetRigPerformanceData(this.User.ID, this.User.Role).subscribe({
      next: data => {
        console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr" + data.data)
        this.rigMovePerformanceList = data.data,
          this.rigMovePerformancecount = this.rigMovePerformanceList.length
      }
    })
    this.dataService.GetDrills(this.User.ID, this.User.Role).subscribe({
      next: data => {
        console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr" + data.data)
        this.drillsList = data.data,
          this.drillsCount = this.drillsList.length
      }
    })

    this.PotentialHazardService.GetPotentialHazards(this.User.ID, this.User.Role).subscribe({
      next: data => {
        console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr" + data.data)
        this.PotentialHazardList = data.data,
          this.PotentialHazardCount = this.PotentialHazardList.length
      }
    })
  }
}
