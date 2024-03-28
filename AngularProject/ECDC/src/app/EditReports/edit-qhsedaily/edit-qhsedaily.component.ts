import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Workbook } from 'exceljs';
import * as saveAs from 'file-saver';
import { AddQHSEDailyService } from 'Services/add-qhsedaily.service';
import { DataService } from 'Services/data.service';
import { LoginService } from 'Services/login.service';
import { IClient } from 'SharedClasses/IClient';
import { ICrew } from 'SharedClasses/ICrew';
import { IDaysSinceNoFatality } from 'SharedClasses/IDaysSinceNoFatality';
import { IDaysSinceNoLTI } from 'SharedClasses/IDaysSinceNoLTI';
import { ILeadershipVisits } from 'SharedClasses/ILeadershipVisits';
import { IQHSEDaily } from 'SharedClasses/IQHSEDaily';
import { IRig } from 'SharedClasses/IRig';

@Component({
  selector: 'app-edit-qhsedaily',
  templateUrl: './edit-qhsedaily.component.html',
  styleUrls: ['./edit-qhsedaily.component.scss']
})
export class EditQHSEDailyComponent {
  QHSEDailyForm!: FormGroup;
  ErrorMessage = '';
  json_data: any[] = [];
  time = new Date();
  rigList: IRig[] = []
  ClientList: IClient[] = []
  LeaderShipVisitsList: ILeadershipVisits[] = []
  DaysSinceLastNoLTIList: IDaysSinceNoLTI[] = []
  DaysSinceNoFatalityList: IDaysSinceNoFatality[] = []
  CrewList: ICrew[] = []
  UserJsonString: any
  DaysWithNoLTI:number=0;
  DaysWithNoFatelty:number=0;
  Record:any;
  DaysSinceLastLTI:number=0;
  DaysSinceLastFatelty:number=0;
  QHSEDailyId:any;
  QHSEDaily!:any
  UserJsonObj: any
  User:any;
  ClientId:any;
  DaysFateltyId:number=0;
  DaysLTIId:number=0;
  NumberOfSafty:number=0;
  NumberOfQuiz:number=0;
  TotalPWTT:number=0;
  textVisible1: boolean = false;
  textVisible2: boolean = false;
  WellName:string='';
  DrillRecords:number=0;
  PTSMRecords:number=0;
  RecAccident:number=0;
  NONRecAccident:number=0;
  ManNumber:number=0;
  TotalManHousr:number=0;
  SaftyNumber:number=0;
  QuizNumber:number=0;
  CrewSafty:any[]=[];
  CrewQuiz:any[]=[];
  Monthly!:any;
  Weekly!:any;
  selectedQuizCrew: number[] = [];
  selectedCrew: number[] = [];  
  selectedLeaderCrew: number[] = [];
  SelectedRig:any;
  StopCardRecordss:any;
  constructor(private loginService: LoginService,private activatedRoute: ActivatedRoute, private dataService: DataService, private AddQHSEDailyAccident: AddQHSEDailyService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.User=this.loginService.currentUser.getValue();
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.QHSEDailyId = params.get("id");
      console.log(this.QHSEDailyId)
    }),
      this.AddQHSEDailyAccident.GetQHSEDailyByID(this.QHSEDailyId,this.User.ID,this.User.Role).subscribe({
        next: data => {
          console.log('*************************************************************')
          console.log(data.data.clientId)
          this.QHSEDaily = data.data
          this.ClientId=data.data.clientId
          this.DaysFateltyId=this.QHSEDaily.daysSinceNoFatalityId
          this.DaysLTIId=this.QHSEDaily.daysSinceNoLTIId;
          this.WellName=this.QHSEDaily.wallName;
          this.DrillRecords=this.QHSEDaily.drillsRecords;
          this.PTSMRecords=this.QHSEDaily.ptsmRecords
          this.RecAccident=this.QHSEDaily.recordableAccident
          this.NONRecAccident=this.QHSEDaily.nonRecordableAccident
          this.ManNumber=this.QHSEDaily.manPowerNumber
          this.TotalManHousr=this.QHSEDaily.totalManPowerHours
          this.StopCardRecordss=this.QHSEDaily.stopCardsRecords
          //this.SaftyNumber=this.QHSEDaily.safetyAlertCrewNumber
          //this.QuizNumber=this.QHSEDaily.quizCrewNumber
          this.DaysWithNoLTI = this.QHSEDaily.daysSinceLastLTI-1
          this.DaysSinceLastLTI=this.DaysWithNoLTI+1
          this.QHSEDaily.crewQuizAndQHSEDaily.forEach((element:any) => {
          this.selectedQuizCrew.push(element.crewId)
        });
        this.QuizNumber=this.selectedQuizCrew.length;

        this.QHSEDaily.crewSaftyAlertAndQHSEDaily.forEach((element:any) => {
          this.selectedCrew.push(element.crewId)
        });
        this.SaftyNumber=this.selectedCrew.length;

        this.QHSEDaily.leaderShipVisitsAndQHSEDaily.forEach((element:any) => {
          this.selectedLeaderCrew.push(element.leadershipVisitId)
        });
          if(this.QHSEDaily.monthlyInspection!=null)
          {
            const text1=document.getElementById('myCheck') as HTMLInputElement;
            text1.checked=true;
            this.textVisible1 = true;
            this.Monthly=this.QHSEDaily.monthlyInspection;
          }
          else
          {
            const text1=document.getElementById('myCheck') as HTMLInputElement;
            text1.checked=false;
            this.textVisible1 = false;
            this.Monthly=null;
          }

          if(this.QHSEDaily.weeklyInspection!=null)
          {
            const text1=document.getElementById('myCheck2') as HTMLInputElement;
            text1.checked=true;
            this.textVisible2 = true;
            this.Weekly=this.QHSEDaily.weeklyInspection;
          }
          else
          {
            const text1=document.getElementById('myCheck2') as HTMLInputElement;
            text1.checked=false;
            this.textVisible2 = false;
            this.Weekly=null;
           // this.Weekly=this.QHSEDaily.weeklyInspection;
          }
       
          console.log(data.data)
          // this.dataService.GetDaysSinceNoLTIByID(this.QHSEDaily.daysSinceNoLTIId).subscribe({
          //   next: data => {
              
          //     this.DaysWithNoLTI = data.data.days-1
          //     this.DaysSinceLastLTI=this.DaysWithNoLTI+1;},
          //   error: err => this.ErrorMessage = err
          // })
      
          

        }}),
        

    
    this.AddQHSEDailyAccident.GetQHSEDailys(this.User.ID,this.User.Role).subscribe({
      next: data => this.json_data = data.data,
      error: err => this.ErrorMessage = err
    }),
    this.dataService.GetRig().subscribe({
      next: data => this.rigList = data.data,
      error: err => this.ErrorMessage = err
    }),
    //we need to fix this or comment it
    // this.AddQHSEDailyAccident.GetQHSEDailyRecordsOfToday(5,'1999-1-5').subscribe({
    //   next: data => this.Record = data.data,
    //   error: err => this.ErrorMessage = err
    // }),
    this.dataService.GetClient().subscribe({
      next: data => this.ClientList = data.data,
      error: err => this.ErrorMessage = err
    }),
    this.dataService.GetLeadershipVisit().subscribe({
      next: data => this.LeaderShipVisitsList = data.data,
      error: err => this.ErrorMessage = err
    }),
    this.dataService.GetCrew().subscribe({
      next: data => this.CrewList = data.data,
      error: err => this.ErrorMessage = err
    }),
 
    this.UserJsonString = JSON.stringify(this.loginService.currentUser.getValue())
  this.UserJsonObj = JSON.parse(this.UserJsonString);

    
  this.QHSEDailyForm = this.fb.group(
    {
      id: this.fb.control(
        0,
        [
          Validators.required
        ]
      ),
      rigId: this.fb.control(
        '',
        [
          Validators.required
        ]
      ),
      date: this.fb.control(
        '',
        [
          Validators.required
        ]
      ),
      clientId: this.fb.control(
        '',
        [
          Validators.required
        ]
      ),
      leaderShipVisitsDTO: this.fb.control(
        [],
        // [
        //   Validators.required
        // ]
      ),
      stopCardsRecords: this.fb.control(
        '',
        [
          Validators.required
        ]
      ),
      ptsmRecords: this.fb.control(
        '',
        [
          Validators.required
        ]
      ),
      drillsRecords: this.fb.control(
        '',
        [
          Validators.required
        ]
      ),
      manPowerNumber: this.fb.control(
        '',
        [
          Validators.required
        ]
      ),
      ptwCold: this.fb.control(
        '',
        [
          Validators.required
        ]
      ),
      totalManPowerHours: this.fb.control(
        '',
        [
          Validators.required
        ]
      ),
      weeklyInspection: this.fb.control(
        '',
        [
          
        ]
      ),
      monthlyInspection: this.fb.control(
        '',
        [
         
        ]
      ),
      wallName: this.fb.control(
        '',
        [
          Validators.required
        ]
      ),
      totalPTW: this.fb.control(
        '',
        [
          Validators.required
        ]
      ),
      safetyAlertCrewNumber: this.fb.control(
        '',
        [
          Validators.required
        ]
      ),
      quizCrewNumber: this.fb.control(
        '',
        [
          Validators.required
        ]
      ),
      ptwHot: this.fb.control(
        '',
        [
          Validators.required
        ]
      ),
      crewSaftyAlertDTO: this.fb.control(
        [],
        // [
        //   Validators.required
        // ]
      ),
      crewQuizDTO: this.fb.control(
        [],
        // [
        //   Validators.required
        // ]
      ),
      recordableAccident: this.fb.control(
        '',
        [
          Validators.required
        ]
      ),
      nonRecordableAccident: this.fb.control(
        '',
        [
          Validators.required
        ]
      ),
      rigVehiclesKilometers: this.fb.control(
        '',
        [
          Validators.required
        ]
      ),
      safetyInduction: this.fb.control(
        '',
        [
          Validators.required
        ]
      ),
      rigTrackingClosedPoints: this.fb.control(
        '',
        [
          Validators.required
        ]
      ),
      rigTrackingOpenPoints: this.fb.control(
        '',
        [
          Validators.required
        ]
      ),
      daysSinceLastLTI: this.fb.control(
        '',
        [
        ]
      ),
      daysSinceNoLTIId: this.fb.control(
       '',
        [
          Validators.required
        ]
      ),
     

      userID: this.fb.control(
        this.UserJsonObj.ID,
        [
          Validators.required
        ]
      )
    }
  ),
  this.ptwHot?.valueChanges.subscribe(() => {
    this.updateSumResult();
  });

  this.ptwCold?.valueChanges.subscribe(() => {
    this.updateSumResult();
  });
  this.CrewSafty=  [2,3];
  
  }
  

 // Array to store selected crew IDs


//   isCrewSaftySelected(crewId: number): boolean {
// //  this.crewSaftyAlertDTO?.valueChanges.subscribe((selectedValues) => {
// //     this.SaftyNumber=selectedValues.length;
// //     const selectedCount = selectedValues.length;
// //     console.log('Number of Selected Values CrewSafty:', selectedCount);
// //     // Do whatever you want with the count of selected values
// //   });
//   this.selectedCrew=[];
//     this.QHSEDaily.crewSaftyAlertAndQHSEDaily.forEach((element:any) => {
//       this.selectedCrew.push(element.crewId)
//     });

//     return this.selectedCrew.includes(crewId);
//   }

  getQuiznumebr()
  {
    this.QuizNumber =this.QHSEDailyForm.get('crewQuizDTO')?.value.length
  //  this.QuizNumber=this.crewQuizDTO?.value.length;//this.selectedQuizCrew.length
    
  }
  getSaftynumebr()
  {
    this.SaftyNumber =this.QHSEDailyForm.get('crewSaftyAlertDTO')?.value.length    
  }
 
   // Array to store selected crew IDs
  // isQuizSelected(crewId: number): boolean {
  //   // this.crewQuizDTO?.valueChanges.subscribe((selectedValues) => {
  //   //   this.QuizNumber=selectedValues.length;
  //   //   const selectedCount = selectedValues.length;
  //   //   console.log('Number of Selected Values Quiz: ', selectedCount);
  //   //   // Do whatever you want with the count of selected values
  //   // });
  //   //this.selectedQuizCrew=[]
  //   this.QHSEDaily.crewQuizAndQHSEDaily.forEach((element:any) => {
  //     this.selectedQuizCrew.push(element.crewId)
  //     //this.QuizNumber=this.crewQuizDTO?.value.length;//this.selectedQuizCrew.length
  //   });
   
  //   console.log("this.this.QHSEDaily.crewQuizAndQHSEDaily length")
  //   console.log(this.QHSEDaily.crewQuizAndQHSEDaily.length)
  //   return this.selectedQuizCrew.includes(crewId);
  // }
  
  // Array to store selected crew IDs


  // isLeaderSelected(leadershipVisitId: number): boolean {
  //   this.selectedLeaderCrew=[]
   
  //   return this.selectedLeaderCrew.includes(leadershipVisitId);
  // }

  // isPPESelected(itemId: number): boolean {
  //   return this.QHSEDaily.crewSaftyAlertAndQHSEDaily.some((p: any) => p.crewId == itemId);
  // }
  

  updateSumResult() {
    this.totalPTW?.setValue(this.ptwHot?.value+this.ptwCold?.value);
  }
  toggleTextVisibility1(event: Event) {
    this.textVisible1 = (event.target as HTMLInputElement).checked;
  }
  toggleTextVisibility2(event: Event) {
    this.textVisible2 = (event.target as HTMLInputElement).checked;
  }
 

  SelectedDate(event: any)
{
  if(this.rigId?.value!=null)
    {
      this.AddQHSEDailyAccident.GetQHSEDailyRecordsOfToday(this.rigId?.value,event.target.value).subscribe({
        next: data => {//this.Record = data.data
          //this.QHSEDaily = data.data
          //this.DaysLTIId=data.data.daysSinceNoLTIId;
          this.StopCardRecordss=data.data.stopCardsRecords
          this.DrillRecords=data.data.drillsRecords;
          this.PTSMRecords=data.data.ptsmRecords
          this.RecAccident=data.data.recordableAccident
          this.NONRecAccident=data.data.nonRecordableAccident
          this.ManNumber=data.data.manPowerNumber
          this.TotalManHousr=data.data.totalManPowerHours
        },
        error: err => this.ErrorMessage = err
      });
    }
}
  selectedRigNumber(event: any) {
    console.log("event.target.value")
    console.log(event.target.value)
    this.SelectedRig=event.target.value;
    if(this.date?.value!=null)
    {
      this.AddQHSEDailyAccident.GetQHSEDailyRecordsOfToday(event.target.value,this.date?.value).subscribe({
        next: data => {//this.Record = data.data
          //this.QHSEDaily = data.data
         // this.DaysLTIId=data.data.daysSinceNoLTIId;
         this.StopCardRecordss=data.data.stopCardsRecords
          this.DrillRecords=data.data.drillsRecords;
          this.PTSMRecords=data.data.ptsmRecords
          this.RecAccident=data.data.recordableAccident
          this.NONRecAccident=data.data.nonRecordableAccident
          this.ManNumber=data.data.manPowerNumber
          this.TotalManHousr=data.data.totalManPowerHours
        },
        error: err => this.ErrorMessage = err
      });
    }

   
      this.dataService.GetDaysSinceNoLTIByRigNumber(event.target.value).subscribe({
        next: data => {
          if(data.data!=null)
          {
            this.DaysLTIId=data.data.id
            this.DaysWithNoLTI = data.data.days-1
            this.DaysSinceLastLTI=this.DaysWithNoLTI+1;
          }
          else
          {
            this.DaysWithNoLTI=0;
            this.DaysSinceLastLTI=0;
          }
          console.log("this.DaysWithNoLTI")
          console.log(data.data)
        },
        error: err => this.ErrorMessage = err
      })
    
    
  }

  get id() {
    return this.QHSEDailyForm.get('id');
  }
  get rigId() {
    return this.QHSEDailyForm.get('rigId');
  }
  get clientId() {
    return this.QHSEDailyForm.get('clientId');
  }
  get date() {
    return this.QHSEDailyForm.get('date');
  }
  get leaderShipVisitsDTO() {
    return this.QHSEDailyForm.get('leaderShipVisitsDTO'); //as FormArray;
  }
  
  get stopCardsRecords() {
    return this.QHSEDailyForm.get('stopCardsRecords');
  }
  get ptsmRecords() {
    return this.QHSEDailyForm.get('ptsmRecords');
  }
  get drillsRecords() {
    return this.QHSEDailyForm.get('drillsRecords');
  }
  get manPowerNumber() {
    return this.QHSEDailyForm.get('manPowerNumber');
  }
  get totalManPowerHours() {
    return this.QHSEDailyForm.get('totalManPowerHours');
  }
  get weeklyInspection() {
    return this.QHSEDailyForm.get('weeklyInspection');
  }
  get monthlyInspection() {
    return this.QHSEDailyForm.get('monthlyInspection');
  }
  get wallName() {
    return this.QHSEDailyForm.get('wallName');
  }
  get totalPTW() {
    return this.QHSEDailyForm.get('totalPTW');
  }
  get safetyAlertCrewNumber() {
    return this.QHSEDailyForm.get('safetyAlertCrewNumber');
  }
  get quizCrewNumber() {
    return this.QHSEDailyForm.get('quizCrewNumber') ;
  }
  
  get ptwCold() {
    return this.QHSEDailyForm.get('ptwCold');
  }
  get ptwHot() {
    return this.QHSEDailyForm.get('ptwHot');
  }
  get crewSaftyAlertDTO() {
    return this.QHSEDailyForm.get('crewSaftyAlertDTO');// as FormArray;
  }
  get crewQuizDTO() {
    return this.QHSEDailyForm.get('crewQuizDTO'); //as FormArray;
  }
  get recordableAccident() {
    return this.QHSEDailyForm.get('recordableAccident');
  }
  get nonRecordableAccident() {
    return this.QHSEDailyForm.get('nonRecordableAccident');
  }
  get rigVehiclesKilometers() {
    return this.QHSEDailyForm.get('rigVehiclesKilometers');
  }
  get safetyInduction() {
    return this.QHSEDailyForm.get('safetyInduction');
  }
  get rigTrackingClosedPoints() {
    return this.QHSEDailyForm.get('rigTrackingClosedPoints');
  }
  get rigTrackingOpenPoints() {
    return this.QHSEDailyForm.get('rigTrackingOpenPoints');
  }
  get daysSinceLastLTI() {
    return this.QHSEDailyForm.get('daysSinceLastLTI');
  }
  get daysSinceNoLTIId() {
    return this.QHSEDailyForm.get('daysSinceNoLTIId');
  }
  

  
  getQuizNumber(): number {
    return this.QHSEDailyForm.get('crewQuizDTO')?.value.length;
  }
  submitData() {
    if (this.QHSEDailyForm.valid) {

      console.log('before formData')
      console.log(this.QHSEDailyForm.value)
      const Formdata = new FormData();
      Formdata.append('id', this.id?.value);
      Formdata.append('rigId', this.rigId?.value);
      Formdata.append('date', this.date?.value);
      Formdata.append('clientId', this.clientId?.value);
      Formdata.append('leaderShipVisitsDTO',JSON.stringify(this.leaderShipVisitsDTO?.value) );
      Formdata.append('stopCardsRecords', this.stopCardsRecords?.value);
      Formdata.append('ptsmRecords', this.ptsmRecords?.value);
      Formdata.append('drillsRecords', this.drillsRecords?.value);
      Formdata.append('manPowerNumber', this.manPowerNumber?.value);
      Formdata.append('totalManPowerHours', this.totalManPowerHours?.value);
      Formdata.append('weeklyInspection', this.weeklyInspection?.value);
      Formdata.append('monthlyInspection', this.monthlyInspection?.value);
      Formdata.append('wallName', this.wallName?.value);
      Formdata.append('totalPTW', this.totalPTW?.value);
      Formdata.append('quizCrewNumber', this.quizCrewNumber?.value);
      Formdata.append('safetyAlertCrewNumber', this.safetyAlertCrewNumber?.value);

      Formdata.append('ptwCold', this.ptwCold?.value);

      Formdata.append('ptwHot', this.ptwHot?.value);
      Formdata.append('crewSaftyAlertDTO',JSON.stringify(this.crewSaftyAlertDTO?.value) );
      Formdata.append('crewQuizDTO', JSON.stringify(this.crewQuizDTO?.value));
      Formdata.append('recordableAccident', this.recordableAccident?.value);
      Formdata.append('nonRecordableAccident', this.nonRecordableAccident?.value);
      Formdata.append('rigVehiclesKilometers', this.rigVehiclesKilometers?.value);
      Formdata.append('safetyInduction', this.safetyInduction?.value);
      Formdata.append('rigTrackingClosedPoints', this.rigTrackingClosedPoints?.value);
      Formdata.append('rigTrackingOpenPoints', this.rigTrackingOpenPoints?.value);
      Formdata.append('daysSinceLastLTI', this.daysSinceLastLTI?.value);
      Formdata.append('daysSinceNoLTIId', this.daysSinceNoLTIId?.value);
      Formdata.append('userID',this.UserJsonObj.ID);
      
      console.log(Formdata);

      console.log('after formData')
      const text1=document.getElementById('myCheck') as HTMLInputElement;

      if(text1.checked==false)
      {
       
        this.QHSEDailyForm.value.monthlyInspection=null;
      }
      else
      {
        text1.checked=true;
        this.textVisible1 = true;
        this.Monthly=this.QHSEDailyForm.value.monthlyInspection;
      }

      const text2=document.getElementById('myCheck2') as HTMLInputElement;

      if(text2.checked==false)
      {
        this.QHSEDailyForm.value.weeklyInspection=null;

      
      }
      else
      {
        text2.checked=true;
        this.textVisible2 = true;
        this.Weekly=this.QHSEDailyForm.value.weeklyInspection;
      }
  
      this.AddQHSEDailyAccident.GetLTIDaysByLTIIDAndDateBackEnd(this.DaysLTIId,this.QHSEDailyForm.value.date).subscribe({
        next: data => {
          console.log('from service')
          console.log(data)
          this.DaysWithNoLTI = data.data.days
          this.DaysSinceLastLTI=data.data.daysAfterIncreasing;
          this.QHSEDailyForm.get('daysSinceLastLTI')?.setValue(this.DaysSinceLastLTI);
          this.AddQHSEDailyAccident.EditQHSEDaily(this.QHSEDailyForm.value,this.QHSEDailyId).subscribe({
            next: data => {
              console.log('from service')
              console.log(data)
              this.router.navigate(['/QHSEDaily']);
    
            },
            error: error => {
              console.log("from Error")
              console.log(error)
            }
          });
        },
        error: error => {
          console.log("from Error")
          console.log(error)
        }
      });

     
      console.log(Formdata);
   }
 else {
      console.log("E+++++====error in : ");
      console.log(this.QHSEDailyForm);
  }
  }


  Download() {
    let workbook = new Workbook();

    let worksheet = workbook.addWorksheet("QHSE Daily Data");


    let header = Object.keys(this.json_data[0]);

    let headerRow = worksheet.addRow(header);

    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: {
        argb: 'ff0e0a27'
      }
    }

    headerRow.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
      color: {
        argb: 'ffffffff'
      }
    }

    headerRow.alignment = {
      horizontal: 'center',
      vertical: 'middle',
      wrapText: true
    }

    headerRow.eachCell((cell, colNumber) => {
      worksheet.getColumn(colNumber).width = Math.max((header[colNumber - 1].length) + 10, 15);
      worksheet.getRow(1).height = 35;
    });



    for (let x1 of this.json_data) {
      let x2 = Object.keys(x1);
      let temp: any[] = []
      for (let y of x2) {
        temp.push(x1[y])
      }
      worksheet.addRow(temp)
    }

    let fname = "QHSE Daily Report"

    //add data and file name and download
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs.saveAs(blob, fname + '-' + new Date().toUTCString() + '.xlsx');
    });
  }

}
