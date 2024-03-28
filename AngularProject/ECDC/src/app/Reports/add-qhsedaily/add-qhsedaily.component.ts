import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IClient } from 'SharedClasses/IClient';
import { IDaysSinceNoLTI } from 'SharedClasses/IDaysSinceNoLTI';
import { ILeadershipVisits } from 'SharedClasses/ILeadershipVisits';
import { ICrew} from 'SharedClasses/ICrew';

import { IRig } from 'SharedClasses/IRig';
import { LoginService } from 'Services/login.service';
import { DataService } from 'Services/data.service';
import { Router } from '@angular/router';
import { AddQHSEDailyService } from 'Services/add-qhsedaily.service';
import { Workbook } from 'exceljs';
import * as saveAs from 'file-saver';
import { LeaderShip } from 'SharedClasses/LeaderShip';
import { QuizCrew } from 'SharedClasses/QuizCrew';
import { IQHSEDaily } from 'SharedClasses/IQHSEDaily';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-qhsedaily',
  templateUrl: './add-qhsedaily.component.html',
  styleUrls: ['./add-qhsedaily.component.scss']
})
export class AddQHSEDailyComponent {
  QHSEDailyForm!: FormGroup;
  ErrorMessage = '';
  json_data: any[] = [];
  time = new Date();
  rigList: IRig[] = [];
  ClientList: IClient[] = []
  LeaderShipVisitsList:LeaderShip[]=[];// ILeadershipVisits[] = []
  DaysSinceLastNoLTIList:IDaysSinceNoLTI[] = []
  CrewList:QuizCrew[]=[] //ICrew[] = []
  UserJsonString: any;
  DaysWithNoLTI:number=0;
  DaysWithNoFatelty:number=0;
  Record:any={};
  DaysSinceLastLTI:number=0;
  DaysSinceLastFatelty:number=0;
  DaysLTIId:number=0;
  DaysFateltyId:number=0;
  UserJsonObj: any
  User:any;
  NumberOfSafty:number=0;
  NumberOfQuiz:number=0;
  TotalPWTT:number=0;
  OrgQHSEObject!:IQHSEDaily;
  SelectedRig:number=0;
  textVisible1: boolean = false;
  textVisible2: boolean = false;
  testUser:any;
  constructor(private datePipe: DatePipe,private loginService: LoginService, private dataService: DataService, private AddQHSEDailyAccident: AddQHSEDailyService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.dataService.GetRig().subscribe({
      next: data => {
        this.rigList = data.data;
        console.log('rrrrrrrrrrrriiiiiiiiiiiiiiiiiiggggggggggg')
        console.log(this.rigList)
      },
      error: err => this.ErrorMessage = err
    });
    this.User=JSON.stringify(this.loginService.currentUser.getValue())//this.loginService.currentUser.getValue();
    console.log("uuuuuuussssssseeeeerrrrbbbbbvvvcc")
    
    this.testUser=this.loginService.currentUser.getValue();

  
    this.AddQHSEDailyAccident.GetQHSEDailyForExel(this.testUser.ID,this.testUser.Role).subscribe({
      next: data => this.json_data = data.data,
      error: err => this.ErrorMessage = err
    });
   
    this.UserJsonString = JSON.stringify(this.loginService.currentUser.getValue())
    this.UserJsonObj = JSON.parse(this.UserJsonString);
    this.AddQHSEDailyAccident.GetQHSEDailyRecordsOfToday(-1,'1999-1-5').subscribe({
      next: data => this.Record = data.data,
      error: err => this.ErrorMessage = err
    }),
    this.dataService.GetClient().subscribe({
      next: data => this.ClientList = data.data,
      error: err => this.ErrorMessage = err
    });
    this.dataService.GetLeadershipVisit().subscribe({
      next: data => this.LeaderShipVisitsList = data.data,
      
      error: err => this.ErrorMessage = err
    });
    this.dataService.GetCrew().subscribe({
      next: data => this.CrewList = data.data,
      error: err => this.ErrorMessage = err
    });
 


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
            null,
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
      );
      this.crewQuizDTO?.valueChanges.subscribe((selectedValues) => {
        this.NumberOfQuiz=selectedValues.length;
        const selectedCount = selectedValues.length;
        console.log('Number of Selected Values:', selectedCount);
        // Do whatever you want with the count of selected values
      });
      this.crewSaftyAlertDTO?.valueChanges.subscribe((selectedValues) => {
        this.NumberOfSafty=selectedValues.length;
        const selectedCount = selectedValues.length;
        console.log('Number of Selected Values:', selectedCount);
        // Do whatever you want with the count of selected values
      });
      this.ptwHot?.valueChanges.subscribe(() => {
        this.updateSumResult();
      });
  
      this.ptwCold?.valueChanges.subscribe(() => {
        this.updateSumResult();
      });
      
  }

  
  updateSumResult() {
    this.totalPTW?.setValue(this.ptwHot?.value+this.ptwCold?.value);
  }



  toggleTextVisibility1(event: Event) {
    this.textVisible1 = (event.target as HTMLInputElement).checked;
  }
  toggleTextVisibility2(event: Event) {
    this.textVisible2 = (event.target as HTMLInputElement).checked;
  }
 
  // GetLTIDays(event:any)
  // {
  //   console.log("selecteddddd daaattteeeee")
  //   console.log(event.target.value)
  //   this.AddQHSEDailyAccident.GetLTIDaysByRigNumberAndDate(this.SelectedRig,event.target.value).subscribe({
  //     next: data => {
  //         console.log("GetLTIDaysssssssssssss")
  //           console.log(data.data)
  //       if(data.data!=null)
  //         {
          
  //           this.DaysLTIId=data.data.daysSinceNoLTIId
  //           this.DaysWithNoLTI = data.data.days
  //           this.DaysSinceLastLTI=data.data.daysAfterIncreasing;
  //         }
  //         else
  //         {
  //           this.DaysWithNoLTI=0;
  //           this.DaysSinceLastLTI=0;
  //         }
        
  //     },
  //     error: err => this.ErrorMessage = err
  //   })
  // }

SelectedDate(event: any)
{
  if(this.rigId?.value!=null)
    {
      this.AddQHSEDailyAccident.GetQHSEDailyRecordsOfToday(this.rigId?.value,event.target.value).subscribe({
        next: data => {
          this.Record = data.data
        },
        error: err => this.ErrorMessage = err
      })
    }
}
readOnlyDate:boolean=true;
  selectedRigNumber(event: any) {
    console.log("event.target.value")
    console.log(event.target.value)
    this.SelectedRig=event.target.value;
   
    if(this.date?.value!=null)
    {
      this.AddQHSEDailyAccident.GetQHSEDailyRecordsOfToday(event.target.value,this.date?.value).subscribe({
        next: data => {
          this.Record = data.data
        },
        error: err => this.ErrorMessage = err
      })
    }
     
      this.dataService.GetDaysSinceNoLTIByRigNumber(event.target.value).subscribe({
        next: data => {
          if(data.data!=null)
          {
            this.DaysLTIId=data.data.id
            this.DaysWithNoLTI = data.data.days
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

  selectedDate!: Date;
  previousDate: string[] =[];
  numberOfDays: number = 0;
  AllDates:any;
  condition:any;
//   updateDays(event:any) {

//     this.AddQHSEDailyAccident.GetQHSEDailys(this.testUser.ID,this.testUser.Role).subscribe({
//       next: data => {
//         console.log(data.data)
//         console.log("my entered data")
//         console.log("date")
//         console.log(event.target.value)
//         console.log("Rig Numberrrrrrrr")
//         console.log(this.SelectedRig)
// data.data.array.forEach((ele:any) => {
//   if(ele.date === event.target.value && ele.rigNumber ===this.SelectedRig)
//   {
//     this.AllDates.push(ele.data);
//   }
// });    
// console.log("this.AllDates")
// console.log(this.AllDates)
//         if(this.AllDates.length==0)
//         {
//           this.dataService.GetDaysSinceNoLTIByRigNumber(this.SelectedRig).subscribe({
//             next: data =>  {
//              this.DaysSinceLastLTI= data.data.days+1
//              this.DaysWithNoLTI=data.data.days;
//             },
//             error: err => this.ErrorMessage = err
//           })
//         }
//         else
//       {
//         this.DaysSinceLastLTI= data.data.days
//         this.DaysWithNoLTI=data.data.days-1;
//       }
//       },
//       error: err => this.ErrorMessage = err
//     })

//     if (  this.previousDate.includes(this.selectedDate)) {
//       this.previousDate = this.previousDate.filter(item => item !== this.selectedDate);
//       this.numberOfDays--;
//     } else {
//       this.previousDate.push(this.selectedDate)
//       this.numberOfDays++;
//     }

//     //this.previousDate = this.selectedDate;
//   }

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
    return this.QHSEDailyForm.get('leaderShipVisitsDTO');
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
    return this.QHSEDailyForm.get('quizCrewNumber');
  }
  
  get ptwCold() {
    return this.QHSEDailyForm.get('ptwCold');
  }
  get ptwHot() {
    return this.QHSEDailyForm.get('ptwHot');
  }
  get crewSaftyAlertDTO() {
    return this.QHSEDailyForm.get('crewSaftyAlertDTO');
  }
  get crewQuizDTO() {
    return this.QHSEDailyForm.get('crewQuizDTO');
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

  submitData() {
    if (this.QHSEDailyForm.valid) {

      this.OrgQHSEObject=this.QHSEDailyForm.value;
      console.log("foooooooooooooooooorrrrm")
      console.log(this.QHSEDailyForm.value)
      console.log("this.OrgQHSEObject")
      console.log(this.OrgQHSEObject)
      console.log("userJsonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
      console.log(this.UserJsonObj.ID)
      console.log('before formData')
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
      console.log('after formData')
   
      console.log(Formdata.get('userId'));
        this.AddQHSEDailyAccident.GetLTIDaysByLTIIDAndDateBackEnd(this.DaysLTIId,this.selectedDate).subscribe({
        next: data => {
          console.log('from service')
          console.log(data)
          this.DaysWithNoLTI = data.data.days
          this.DaysSinceLastLTI=data.data.daysAfterIncreasing;
          this.QHSEDailyForm.get('daysSinceLastLTI')?.setValue(this.DaysSinceLastLTI);
          this.AddQHSEDailyAccident.AddQHSEDaily(this.QHSEDailyForm.value).subscribe({
            next: data => {
              console.log('from service')
              console.log(data)
              //location.reload();
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

  mytemp:any[]=[];
  Download() {
    let workbook = new Workbook();

    let worksheet = workbook.addWorksheet("QHSE Daily Data");
//pip date to excel sheet
this.mytemp=[]
this.json_data.forEach((item) => {
  item.date=this.datePipe.transform(item.date, 'dd/MM/yyyy')
  this.mytemp.push(item)
});
console.log("frommm excel")
console.log(this.mytemp);
    let header = Object.keys(this.mytemp[0]);

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



    for (let x1 of this.mytemp) {
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
