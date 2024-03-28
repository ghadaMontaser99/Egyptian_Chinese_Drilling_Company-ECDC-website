import { makeBindingParser } from '@angular/compiler';
import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddNewDrillServiceService } from 'Services/add-new-drill-service.service';
import { DataService } from 'Services/data.service';
import { LoginService } from 'Services/login.service';
import { IDrill } from 'SharedClasses/IDrill';
import { IDrillType } from 'SharedClasses/IDrillType';
// import { IEmergencyResponseTeamMemebers } from 'SharedClasses/IEmergencyResponseTeamMemebers';
import { IRig } from 'SharedClasses/IRig';
import { Workbook } from 'exceljs';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-drill',
  templateUrl: './drill.component.html',
  styleUrls: ['./drill.component.scss']
})
export class DrillComponent {

  drillForm!: FormGroup;
  ErrorMessage = '';
  json_data: any[] = [];
  time = new Date();
  base64: any;  rigList: IRig[] = []
  drillTypeList: IDrillType[] = []
  SelectFiles:File[]=[]

  drillObj!: any
TestDrill!: any



  emergencyResponseTeamMemebers: any[] = [];

  UserJsonString: any
  UserJsonObj: any

  QHSECodeList: any;
  QHSE_NameID:number=0;
  QHSE_Name:string='';
  QHSEPositionID: number = 0;
  QHSE_Position:string='';

  STPCodeList: any;
  STP_PositionID: number = 0;
  STP_Position:string='';
  STP_Name:string='';
  STP_NameId:number=0;

  TeamMemeberCodeList: any;
  TeamMemeber_PositionID: number = 0;
  TeamMemeber_Position:string='';
  TeamMemeber_Name:string='';
  TeamMemeber_NameId:number=0;

  TeamMemeber1_PositionID: number = 0;
  TeamMemeber1_Position:string='';
  TeamMemeber1_Name:string='';
  TeamMemeber1_NameId:number=0;

  TeamMemeber2_PositionID: number = 0;
  TeamMemeber2_Position:string='';
  TeamMemeber2_Name:string='';
  TeamMemeber2_NameId:number=0;

  TeamMemeber3_PositionID: number = 0;
  TeamMemeber3_Position:string='';
  TeamMemeber3_Name:string='';
  TeamMemeber3_NameId:number=0;

  TeamMemeber4_PositionID: number = 0;
  TeamMemeber4_Position:string='';
  TeamMemeber4_Name:string='';
  TeamMemeber4_NameId:number=0;

  TeamMemeber5_PositionID: number = 0;
  TeamMemeber5_Position:string='';
  TeamMemeber5_Name:string='';
  TeamMemeber5_NameId:number=0;

  TeamMemeber6_PositionID: number = 0;
  TeamMemeber6_Position:string='';
  TeamMemeber6_Name:string='';
  TeamMemeber6_NameId:number=0;

  TeamMemeber7_PositionID: number = 0;
  TeamMemeber7_Position:string='';
  TeamMemeber7_Name:string='';
  TeamMemeber7_NameId:number=0;

  // duration!:any
  DutartionEquip: string='';

  User:any;
  @Input() TimeInitiated:any
@Input() TimeCompleted:any

  constructor(private loginService: LoginService, private dataService: DataService, private AddNewDrill: AddNewDrillServiceService, private fb: FormBuilder, private router: Router) {
    // this.calculateDuration();


  }


  ngOnInit() {
    this.User=this.loginService.currentUser.getValue();
    this.UserJsonString = JSON.stringify(this.loginService.currentUser.getValue())
    this.UserJsonObj = JSON.parse(this.UserJsonString);
    console.log("useeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    console.log(this.UserJsonObj)
    
    this.dataService.GetEmpCode().subscribe({
      next: data => {
        this.QHSECodeList = data.data,
          console.log("this.QHSECodeList")
        console.log(this.QHSECodeList)
      },
      error: err => {
        this.ErrorMessage = err,
          console.log("this.ErrorMessage")
        console.log(this.ErrorMessage)
      }
    }),

    this.drillForm = this.fb.group(
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
          drillTypeId: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),
          qhseEmpCode: this.fb.control(
            '',
            [
               Validators.required
            ]
          ),
          qhsePositionName: this.fb.control(
            '',
            [
               Validators.required
            ]
          ),
          qhseEmpName: this.fb.control(
            '',
            [
               Validators.required
            ]
          ),
          stpCode: this.fb.control(
            '',
            [
               Validators.required
            ]
          ),
          stpPositionName: this.fb.control(
            '',
            [
               Validators.required
            ]
          ),
          stpName: this.fb.control(
            '',
            [
               Validators.required
            ]
          ),
          teamMemeberCode: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),
          teamMemeberPosition: this.fb.control(
            '',
            [
               Validators.required
            ]
          ),
          teamMemeberName: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),

          teamMemeberCode1: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),
          teamMemeberPosition1: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),
          teamMemeberName1: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),

          teamMemeberCode2: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),
          teamMemeberPosition2: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),
          teamMemeberName2: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),

          teamMemeberCode3: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),
          teamMemeberPosition3: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),
          teamMemeberName3: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),

          teamMemeberCode4: this.fb.control(
            '',
            [
            ]
          ),
          teamMemeberPosition4: this.fb.control(
            '',
            []
          ),
          teamMemeberName4: this.fb.control(
            '',
            []
          ),

          teamMemeberCode5: this.fb.control(
            '',
            [
            ]
          ),
          teamMemeberPosition5: this.fb.control(
            '',
            [
            ]
          ),
          teamMemeberName5: this.fb.control(
            '',
            [
            ]
          ),

          teamMemeberCode6: this.fb.control(
            '',
            [
            ]
          ),
          teamMemeberPosition6: this.fb.control(
            '',
            [
            ]
          ),
          teamMemeberName6: this.fb.control(
            '',
            [
            ]
          ),

          teamMemeberCode7: this.fb.control(
            '',
            [
              
            ]
          ),
          teamMemeberPosition7: this.fb.control(
            '',[]
            
          ),
          teamMemeberName7: this.fb.control(
            '',[]
            
          ),
          drillScenario: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),
          timeInitiated: this.fb.control(
            '',
            [
              Validators.required,
               Validators.pattern('^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$')
            ]
          ),
          timeCompleted: this.fb.control(
            '',
            [
              Validators.required,
              Validators.pattern('^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$')
            ]
          ),
          duration: this.fb.control(
            '',
             []           
          ),
          emergencyEquipmentUsed: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),
          effectivenessPoints: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),
          deficienciesPoints: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),
          recommendations: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),
          userID: this.fb.control(this.User.ID, [Validators.required]),

          images: this.fb.control(
            [], 
            [
            Validators.required
            ]),
        }
      ),
      this.dataService.GetDrills(this.User.ID,this.User.Role).subscribe({
        next: data => this.json_data = data.data,
        error: err => this.ErrorMessage = err
      }),
    
      this.dataService.GetRig().subscribe({
        next: data => this.rigList = data.data,
        error: err => this.ErrorMessage = err
      }),
      this.dataService.GetDrillTypeList().subscribe({
        next: data => this.drillTypeList = data.data,
        error: err => this.ErrorMessage = err
      })
    
  }

  selectedMenace(event: any) {
    console.log("event.target.value")
    console.log(event.target.value)
    this.dataService.GetEmpCodeByCode(event.target.value).subscribe({
      next:data=>{
        this.QHSE_NameID=data.data.id
        this.QHSE_Name=data.data.name,
        this.QHSEPositionID=data.data.positionId
        console.log(data.data)
        console.log("this.QHSE_Name")
        console.log(this.QHSE_Name)
        console.log("this kkkkkkkkk")
        console.log(data.data)
        console.log("this.QHSE_PositionID")
        console.log(this.QHSEPositionID)
        this.dataService.GetPositionByID(this.QHSEPositionID).subscribe({
          next:data=>{
            this.QHSE_Position=data.data.name,
            console.log("this.QHSE_Position")
            console.log(this.QHSE_Position)
          },
          error:err=>{
            this.ErrorMessage=err,
            console.log(this.ErrorMessage)
          }
        })
      },
      error:err=>{
        this.ErrorMessage=err,
        console.log(err)
      }
    })
  }

  selectedMenaceSTP(event: any) {
    console.log("event.target.value")
    console.log(event.target.value)
    this.dataService.GetEmpCodeByCode(event.target.value).subscribe({
      next:data=>{
        this.STP_NameId=data.data.id
        this.STP_Name=data.data.name,
        this.STP_PositionID=data.data.positionId
        console.log("this.employee_name")
        console.log(this.STP_Name)
        console.log("this.employeePositionID")
        console.log(this.STP_PositionID)
        this.dataService.GetPositionByID(this.STP_PositionID).subscribe({
          next:data=>{
            this.STP_Position=data.data.name,
            console.log("this.PusherPosition")
            console.log(this.STP_Position)
          },
          error:err=>{
            this.ErrorMessage=err,
            console.log(this.ErrorMessage)
          }
        })
      },
      error:err=>{
        this.ErrorMessage=err,
        console.log(err)
      }
    })
  }

  selectedMenaceTeamMemeber(event: any) {
    console.log("event.target.value")
    console.log(event.target.value)
    this.dataService.GetEmpCodeByCode(event.target.value).subscribe({
      next:data=>{
        this.TeamMemeber_NameId=data.data.id
        this.TeamMemeber_Name=data.data.name,
        this.TeamMemeber_PositionID=data.data.positionId
        console.log("this.employee_name")
        console.log(this.TeamMemeber_Name)
        console.log("this.employeePositionID")
        console.log(this.TeamMemeber_PositionID)
        this.dataService.GetPositionByID(this.TeamMemeber_PositionID).subscribe({
          next:data=>{
            this.TeamMemeber_Position=data.data.name,
            console.log("this.PusherPosition")
            console.log(this.TeamMemeber_Position)
          },
          error:err=>{
            this.ErrorMessage=err,
            console.log(this.ErrorMessage)
          }
        })
      },
      error:err=>{
        this.ErrorMessage=err,
        console.log(err)
      }
    })
  }

  selectedMenaceTeamMemeber1(event: any) {
    console.log("event.target.value")
    console.log(event.target.value)
    this.dataService.GetEmpCodeByCode(event.target.value).subscribe({
      next:data=>{
        this.TeamMemeber1_NameId=data.data.id
        this.TeamMemeber1_Name=data.data.name,
        this.TeamMemeber1_PositionID=data.data.positionId
        console.log("this.employee_name")
        console.log(this.TeamMemeber1_Name)
        console.log("this.employeePositionID")
        console.log(this.TeamMemeber1_PositionID)
        this.dataService.GetPositionByID(this.TeamMemeber1_PositionID).subscribe({
          next:data=>{
            this.TeamMemeber1_Position=data.data.name,
            console.log("this.PusherPosition")
            console.log(this.TeamMemeber1_Position)
          },
          error:err=>{
            this.ErrorMessage=err,
            console.log(this.ErrorMessage)
          }
        })
      },
      error:err=>{
        this.ErrorMessage=err,
        console.log(err)
      }
    })
  }
  selectedMenaceTeamMemeber2(event: any) {
    console.log("event.target.value")
    console.log(event.target.value)
    this.dataService.GetEmpCodeByCode(event.target.value).subscribe({
      next:data=>{
        this.TeamMemeber2_NameId=data.data.id
        this.TeamMemeber2_Name=data.data.name,
        this.TeamMemeber2_PositionID=data.data.positionId
        console.log("this.employee_name")
        console.log(this.TeamMemeber2_Name)
        console.log("this.employeePositionID")
        console.log(this.TeamMemeber2_PositionID)
        this.dataService.GetPositionByID(this.TeamMemeber2_PositionID).subscribe({
          next:data=>{
            this.TeamMemeber2_Position=data.data.name,
            console.log("this.PusherPosition")
            console.log(this.TeamMemeber2_Position)
          },
          error:err=>{
            this.ErrorMessage=err,
            console.log(this.ErrorMessage)
          }
        })
      },
      error:err=>{
        this.ErrorMessage=err,
        console.log(err)
      }
    })
  }
  selectedMenaceTeamMemeber3(event: any) {
    console.log("event.target.value")
    console.log(event.target.value)
    this.dataService.GetEmpCodeByCode(event.target.value).subscribe({
      next:data=>{
        this.TeamMemeber3_NameId=data.data.id
        this.TeamMemeber3_Name=data.data.name,
        this.TeamMemeber3_PositionID=data.data.positionId
        console.log("this.employee_name")
        console.log(this.TeamMemeber3_Name)
        console.log("this.employeePositionID")
        console.log(this.TeamMemeber3_PositionID)
        this.dataService.GetPositionByID(this.TeamMemeber3_PositionID).subscribe({
          next:data=>{
            this.TeamMemeber3_Position=data.data.name,
            console.log("this.PusherPosition")
            console.log(this.TeamMemeber3_Position)
          },
          error:err=>{
            this.ErrorMessage=err,
            console.log(this.ErrorMessage)
          }
        })
      },
      error:err=>{
        this.ErrorMessage=err,
        console.log(err)
      }
    })
  }
  selectedMenaceTeamMemeber4(event: any) {
    console.log("event.target.value")
    console.log(event.target.value)
    this.dataService.GetEmpCodeByCode(event.target.value).subscribe({
      next:data=>{
        this.TeamMemeber4_NameId=data.data.id
        this.TeamMemeber4_Name=data.data.name,
        this.TeamMemeber4_PositionID=data.data.positionId
        console.log("this.employee_name")
        console.log(this.TeamMemeber4_Name)
        console.log("this.employeePositionID")
        console.log(this.TeamMemeber4_PositionID)
        this.dataService.GetPositionByID(this.TeamMemeber4_PositionID).subscribe({
          next:data=>{
            this.TeamMemeber4_Position=data.data.name,
            console.log("this.PusherPosition")
            console.log(this.TeamMemeber4_Position)
          },
          error:err=>{
            this.ErrorMessage=err,
            console.log(this.ErrorMessage)
          }
        })
      },
      error:err=>{
        this.ErrorMessage=err,
        console.log(err)
      }
    })
  }
  selectedMenaceTeamMemeber5(event: any) {
    console.log("event.target.value")
    console.log(event.target.value)
    this.dataService.GetEmpCodeByCode(event.target.value).subscribe({
      next:data=>{
        this.TeamMemeber5_NameId=data.data.id
        this.TeamMemeber5_Name=data.data.name,
        this.TeamMemeber5_PositionID=data.data.positionId
        console.log("this.employee_name")
        console.log(this.TeamMemeber5_Name)
        console.log("this.employeePositionID")
        console.log(this.TeamMemeber5_PositionID)
        this.dataService.GetPositionByID(this.TeamMemeber5_PositionID).subscribe({
          next:data=>{
            this.TeamMemeber5_Position=data.data.name,
            console.log("this.PusherPosition")
            console.log(this.TeamMemeber5_Position)
          },
          error:err=>{
            this.ErrorMessage=err,
            console.log(this.ErrorMessage)
          }
        })
      },
      error:err=>{
        this.ErrorMessage=err,
        console.log(err)
      }
    })
  }
  selectedMenaceTeamMemeber6(event: any) {
    console.log("event.target.value")
    console.log(event.target.value)
    this.dataService.GetEmpCodeByCode(event.target.value).subscribe({
      next:data=>{
        this.TeamMemeber6_NameId=data.data.id
        this.TeamMemeber6_Name=data.data.name,
        this.TeamMemeber6_PositionID=data.data.positionId
        console.log("this.employee_name")
        console.log(this.TeamMemeber6_Name)
        console.log("this.employeePositionID")
        console.log(this.TeamMemeber6_PositionID)
        this.dataService.GetPositionByID(this.TeamMemeber6_PositionID).subscribe({
          next:data=>{
            this.TeamMemeber6_Position=data.data.name,
            console.log("this.PusherPosition")
            console.log(this.TeamMemeber6_Position)
          },
          error:err=>{
            this.ErrorMessage=err,
            console.log(this.ErrorMessage)
          }
        })
      },
      error:err=>{
        this.ErrorMessage=err,
        console.log(err)
      }
    })
  }
  selectedMenaceTeamMemeber7(event: any) {
    console.log("event.target.value")
    console.log(event.target.value)
    this.dataService.GetEmpCodeByCode(event.target.value).subscribe({
      next:data=>{
        this.TeamMemeber7_NameId=data.data.id
        this.TeamMemeber7_Name=data.data.name,
        this.TeamMemeber7_PositionID=data.data.positionId
        console.log("this.employee_name")
        console.log(this.TeamMemeber7_Name)
        console.log("this.employeePositionID")
        console.log(this.TeamMemeber7_PositionID)
        this.dataService.GetPositionByID(this.TeamMemeber7_PositionID).subscribe({
          next:data=>{
            this.TeamMemeber7_Position=data.data.name,
            console.log("this.PusherPosition")
            console.log(this.TeamMemeber7_Position)
          },
          error:err=>{
            this.ErrorMessage=err,
            console.log(this.ErrorMessage)
          }
        })
      },
      error:err=>{
        this.ErrorMessage=err,
        console.log(err)
      }
    })
  }

 

 

  getDiff(){
    const completedTime = this.TimeCompleted.split(':');
    const initiatedTime = this.TimeInitiated.split(':');
  
    if (completedTime.length === 3 && initiatedTime.length === 3) {
      const completedHours = parseInt(completedTime[0]);
      const completedMinutes = parseInt(completedTime[1]);
      const completedSeconds = parseInt(completedTime[2]);
  
      const initiatedHours = parseInt(initiatedTime[0]);
      const initiatedMinutes = parseInt(initiatedTime[1]);
      const initiatedSeconds = parseInt(initiatedTime[2]);
  
      const completedInMilliseconds = (completedHours * 3600000) + (completedMinutes * 60000) + (completedSeconds * 1000);
      const initiatedInMilliseconds = (initiatedHours * 3600000) + (initiatedMinutes * 60000) + (initiatedSeconds * 1000);
  
      const timeDifferenceMilliseconds =Math.abs(completedInMilliseconds - initiatedInMilliseconds);
    

        // Convert timeDifferenceMilliseconds to mm:ss format
        const minutes = Math.floor(timeDifferenceMilliseconds / 60000);
        const seconds = ((timeDifferenceMilliseconds % 60000) / 1000).toFixed(0);
    
        this.DutartionEquip = `${minutes}:${seconds}`;
  
        console.log(this.DutartionEquip);
      } else {
        console.log('Invalid time format in one or both time values.');
      }
}

  
get id() {
    return this.drillForm.get('id');
  }
  get rigId() {
    return this.drillForm.get('rigId');
  }
  get date() {
    return this.drillForm.get('date');
  }
  get drillTypeId() {
    return this.drillForm.get('drillTypeId');
  }
  
  get recommendations() {
    return this.drillForm.get('recommendations');
  }
  get qhseEmpCode() {
    return this.drillForm.get('qhseEmpCode');
  }
  get qhsePositionName() {
    return this.drillForm.get('qhsePositionName');
  }
  get qhseEmpName() {
    return this.drillForm.get('qhseEmpName');
  }
  get stpCode() {
    return this.drillForm.get('stpCode');
  }
  get stpPositionName() {
    return this.drillForm.get('stpPositionName');
  }
  get stpName() {
    return this.drillForm.get('stpName');
  }

  get teamMemeberCode() {
    return this.drillForm.get('teamMemeberCode');
  }
  get teamMemeberPosition() {
    return this.drillForm.get('teamMemeberPosition');
  }
  get teamMemeberName() {
    return this.drillForm.get('teamMemeberName');
  }

  get teamMemeberCode1() {
    return this.drillForm.get('teamMemeberCode1');
  }
  get teamMemeberPosition1() {
    return this.drillForm.get('teamMemeberPosition1');
  }
  get teamMemeberName1() {
    return this.drillForm.get('teamMemeberName1');
  }

  get teamMemeberCode2() {
    return this.drillForm.get('teamMemeberCode2');
  }
  get teamMemeberPosition2() {
    return this.drillForm.get('teamMemeberPosition2');
  }
  get teamMemeberName2() {
    return this.drillForm.get('teamMemeberName2');
  }

  get teamMemeberCode3() {
    return this.drillForm.get('teamMemeberCode3');
  }
  get teamMemeberPosition3() {
    return this.drillForm.get('teamMemeberPosition3');
  }
  get teamMemeberName3() {
    return this.drillForm.get('teamMemeberName3');
  }

  get teamMemeberCode4() {
    return this.drillForm.get('teamMemeberCode4');
  }
  get teamMemeberPosition4() {
    return this.drillForm.get('teamMemeberPosition4');
  }
  get teamMemeberName4() {
    return this.drillForm.get('teamMemeberName4');
  }

  get teamMemeberCode5() {
    return this.drillForm.get('teamMemeberCode5');
  }
  get teamMemeberPosition5() {
    return this.drillForm.get('teamMemeberPosition5');
  }
  get teamMemeberName5() {
    return this.drillForm.get('teamMemeberName5');
  }

  get teamMemeberCode6() {
    return this.drillForm.get('teamMemeberCode6');
  }
  get teamMemeberPosition6() {
    return this.drillForm.get('teamMemeberPosition6');
  }
  get teamMemeberName6() {
    return this.drillForm.get('teamMemeberName6');
  }

  get teamMemeberCode7() {
    return this.drillForm.get('teamMemeberCode7');
  }
  get teamMemeberPosition7() {
    return this.drillForm.get('teamMemeberPosition7');
  }
  get teamMemeberName7() {
    return this.drillForm.get('teamMemeberName7');
  }


  get deficienciesPoints() {
    return this.drillForm.get('deficienciesPoints');
  }
  get effectivenessPoints() {
    return this.drillForm.get('effectivenessPoints');
  }
  get emergencyEquipmentUsed() {
    return this.drillForm.get('emergencyEquipmentUsed');
  }
  get timeCompleted() {
    return this.drillForm.get('timeCompleted');
  }
  get timeInitiated() {
    return this.drillForm.get('timeInitiated');
  }

   get duration() {
    return this.drillForm.get('duration');
  }

  get drillScenario() {
    return this.drillForm.get('drillScenario');
  }
  get images() {
    return this.drillForm.get('images');
  }
  submitData() {

     if (this.drillForm.valid) {

      const Formdata=new FormData()
     console.log("fforrrrrrrmmmmmmmmm",Formdata)

      Formdata.append('rigId', this.rigId?.value);
      Formdata.append('date', this.date?.value);
      Formdata.append('drillTypeId', this.drillTypeId?.value);
      Formdata.append('recommendations', this.recommendations?.value);

      Formdata.append('qhseEmpCode', this.qhseEmpCode?.value);
      Formdata.append('qhsePositionName', this.qhsePositionName?.value);
      Formdata.append('qhseEmpName', this.qhseEmpName?.value);

      Formdata.append('stpCode', this.stpCode?.value);
      Formdata.append('stpPositionName', this.stpPositionName?.value);
      Formdata.append('stpName', this.stpName?.value);

      Formdata.append('teamMemeberCode', this.teamMemeberCode?.value);
      Formdata.append('teamMemeberName', this.teamMemeberName?.value);
      Formdata.append('teamMemeberPosition', this.teamMemeberPosition?.value);

      Formdata.append('teamMemeberCode1', this.teamMemeberCode1?.value);
      Formdata.append('teamMemeberName1', this.teamMemeberName1?.value);
      Formdata.append('teamMemeberPosition1', this.teamMemeberPosition1?.value);

      Formdata.append('teamMemeberCode2', this.teamMemeberCode2?.value);
      Formdata.append('teamMemeberName2', this.teamMemeberName2?.value);
      Formdata.append('teamMemeberPosition2', this.teamMemeberPosition2?.value);

      Formdata.append('teamMemeberCode3', this.teamMemeberCode3?.value);
      Formdata.append('teamMemeberName3', this.teamMemeberName3?.value);
      Formdata.append('teamMemeberPosition3', this.teamMemeberPosition3?.value);

      Formdata.append('teamMemeberCode4', this.teamMemeberCode4?.value);
      Formdata.append('teamMemeberName4', this.teamMemeberName4?.value);
      Formdata.append('teamMemeberPosition4', this.teamMemeberPosition4?.value);

      Formdata.append('teamMemeberCode5', this.teamMemeberCode5?.value);
      Formdata.append('teamMemeberName5', this.teamMemeberName5?.value);
      Formdata.append('teamMemeberPosition5', this.teamMemeberPosition5?.value);

      Formdata.append('teamMemeberCode6', this.teamMemeberCode6?.value);
      Formdata.append('teamMemeberName6', this.teamMemeberName6?.value);
      Formdata.append('teamMemeberPosition6', this.teamMemeberPosition6?.value);

      Formdata.append('teamMemeberCode7', this.teamMemeberCode7?.value);
      Formdata.append('teamMemeberName7', this.teamMemeberName7?.value);
      Formdata.append('teamMemeberPosition7', this.teamMemeberPosition7?.value);

      Formdata.append('deficienciesPoints', this.deficienciesPoints?.value);
      Formdata.append('effectivenessPoints', this.effectivenessPoints?.value);
      Formdata.append('emergencyEquipmentUsed', this.emergencyEquipmentUsed?.value);

      Formdata.append('timeCompleted', this.timeCompleted?.value);
      Formdata.append('timeInitiated', this.timeInitiated?.value);
      Formdata.append('duration', this.duration?.value);

      Formdata.append('drillScenario', this.drillScenario?.value);
      Formdata.append('userID', this.UserJsonObj.ID);
     
      Formdata.append('images', this.images?.value);
      for (let i = 0; i < this.SelectFiles.length; i++) {
        Formdata.append('images', this.SelectFiles[i]);
      }
     
      console.log(Formdata);

   
      console.log('after formData')
      this.AddNewDrill.AddDrill(Formdata).subscribe({
        next: data => {
          // console.log(this.drillForm);

          console.log('from service')
          console.log(data.data)
          location.reload();
        },
        error: error => {
          // console.log(this.drillForm);

          console.log("from Error")
          console.log(error)
        }
      });
     console.log(Formdata);
    }
    else {
      console.log('drilllllll', this.drillForm.value)

      console.log("E+++++====error in : ");
    }
  }

  
  Download() {
    let workbook = new Workbook();

    let worksheet = workbook.addWorksheet("Drills Data");


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

    let fname = "Drill Report"

    //add data and file name and download
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs.saveAs(blob, fname + '-' + new Date().toUTCString() + '.xlsx');
    });
  }

  GetImagePath(event: any) {
    this.SelectFiles = event.target.files;
  }

}
