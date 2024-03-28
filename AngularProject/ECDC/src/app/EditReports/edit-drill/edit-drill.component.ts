import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AddNewDrillServiceService } from 'Services/add-new-drill-service.service';
import { DataService } from 'Services/data.service';
import { LoginService } from 'Services/login.service';
import { IDrill } from 'SharedClasses/IDrill';
import { IDrillType } from 'SharedClasses/IDrillType';
import { IQHSEPosition } from 'SharedClasses/IQHSEPosition';
import { IQHSEPositionName } from 'SharedClasses/IQHSEPositionName';
import { IRig } from 'SharedClasses/IRig';

@Component({
  selector: 'app-edit-drill',
  templateUrl: './edit-drill.component.html',
  styleUrls: ['./edit-drill.component.scss']
})
export class EditDrillComponent {

  SelectFiles!:File[];
  imageName!:string
  drillId: any;
  drill!: IDrill;
  ErrorMessage: string = "";
  drillForm!: FormGroup;
  Date: Date = new Date();
  rigList: IRig[] = []
  base64: any;
  drillTypeList: IDrillType[] = []

  qhsePositionNameList: IQHSEPositionName[] = []
  qhsePositionList: IQHSEPosition[] = []
  QHSEPositionID: number = 0;

  UserJsonString: any
  UserJsonObj: any

  QHSECodeRecord: any;

  QHSEPositionCodeID: number = 0;
  QHSENameCodeID: number = 0;
  QHSEposition: string = '';
  QHSEName: string = '';
  DrillType:number=0;

  QHSECodeList: any[]=[];
  QHSE_NameID: number = 0;
  QHSE_Code: number = 0;
  QHSE_Name: string = '';
  QHSE_Position: string = '';

  STPPositionID: number = 0;
  STPPosition: string = '';
  STP_Name: string = '';
  STP_NameId: number = 0;
  STP_Code: number = 0;

  // TeamMemeberCodeList: any;
  TeamMemeber_PositionID: number = 0;
  TeamMemeber_Position: string = '';
  TeamMemeber_Name: string = '';
  TeamMemeber_NameId: number = 0;
  TeamMemeber_Code: number = 0;


  TeamMemeber1_PositionID: number = 0;
  TeamMemeber1_Position: string = '';
  TeamMemeber1_Name: string = '';
  TeamMemeber1_NameId: number = 0;
  TeamMemeber1_Code: number = 0;


  TeamMemeber2_PositionID: number = 0;
  TeamMemeber2_Position: string = '';
  TeamMemeber2_Name: string = '';
  TeamMemeber2_NameId: number = 0;
  TeamMemeber2_Code: number = 0;

  TeamMemeber3_PositionID: number = 0;
  TeamMemeber3_Position: string = '';
  TeamMemeber3_Name: string = '';
  TeamMemeber3_NameId: number = 0;
  TeamMemeber3_Code: number = 0;

  TeamMemeber4_PositionID: number = 0;
  TeamMemeber4_Position: string = '';
  TeamMemeber4_Name: string = '';
  TeamMemeber4_NameId: number = 0;
  TeamMemeber4_Code: number = 0;

  TeamMemeber4_CodeDefault: number = 0;

  TeamMemeber5_PositionID: number = 0;
  TeamMemeber5_Position: string = '';
  TeamMemeber5_Name: string = '';
  TeamMemeber5_NameId: number = 0;
  TeamMemeber5_Code: number = 0;

  TeamMemeber6_PositionID: number = 0;
  TeamMemeber6_Position: string = '';
  TeamMemeber6_Name: string = '';
  TeamMemeber6_NameId: number = 0;
  TeamMemeber6_Code: number = 0;

  TeamMemeber7_PositionID: number = 0;
  TeamMemeber7_Position: string = '';
  TeamMemeber7_Name: string = '';
  TeamMemeber7_NameId: number = 0;
  TeamMemeber7_Code: number = 0;

Code:any=[]

  files!:any

  fileToEdit!: File;
  User: any;


  DutartionEquip: any;

  @Input() TimeInitiated:any
@Input() TimeCompleted:any

  constructor(private loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private drillService: AddNewDrillServiceService,
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef) { 
      
    }


  ngOnInit(): void {
    this.User = this.loginService.currentUser.getValue();
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.drillId = params.get("id");
      console.log(this.drillId)
    }),
   
   

      this.drillService.GetDrillByID(this.drillId, this.User.ID, this.User.Role).subscribe({
        next: data => {
          this.drill = data.data,
            console.log('*************************************************************')
          console.log(this.drill);
            this.TimeCompleted=data.data.timeCompleted
          this.TimeInitiated=data.data.timeInitiated

          this.SelectFiles=data.data.images
          this.DutartionEquip=data.data.duration
          this.QHSE_Code = data.data.qhseEmpCode
          this.QHSE_Position = data.data.qhsePositionName;
          this.QHSE_Name = data.data.qhseEmpName;
          this.DrillType=data.data.drillTypeId;
          this.STP_Code = data.data.stpCode
          this.STPPosition = data.data.stpPositionName;
          this.STP_Name = data.data.stpName;

          this.TeamMemeber_Code = data.data.teamMemeberCode
          this.TeamMemeber_Position = data.data.teamMemeberPosition;
          this.TeamMemeber_Name = data.data.teamMemeberName;

          this.TeamMemeber1_Code = data.data.teamMemeberCode1
          this.TeamMemeber1_Position = data.data.teamMemeberPosition1;
          this.TeamMemeber1_Name = data.data.teamMemeberName1;

          this.TeamMemeber2_Code = data.data.teamMemeberCode2
          this.TeamMemeber2_Position = data.data.teamMemeberPosition2;
          this.TeamMemeber2_Name = data.data.teamMemeberName2;

          this.TeamMemeber3_Code = data.data.teamMemeberCode3
          this.TeamMemeber3_Position = data.data.teamMemeberPosition3;
          this.TeamMemeber3_Name = data.data.teamMemeberName3;

         if(data.data.teamMemeberCode4 ===''|| data.data.teamMemeberCode4 === null)
         {
           this.TeamMemeber4_Code=0;
         }
         else{
          this.TeamMemeber4_Code = data.data.teamMemeberCode4
          this.TeamMemeber4_Position = data.data.teamMemeberPosition4;
          this.TeamMemeber4_Name = data.data.teamMemeberName4;  
         }
            
         if(data.data.teamMemeberCode5 ===''|| data.data.teamMemeberCode5 === null)
         {
           this.TeamMemeber5_Code=0;
         }
         else{
          this.TeamMemeber5_Code = data.data.teamMemeberCode5
          this.TeamMemeber5_Position = data.data.teamMemeberPosition5;
          this.TeamMemeber5_Name = data.data.teamMemeberName5;  
         }

         if(data.data.teamMemeberCode6 ===''|| data.data.teamMemeberCode6 === null)
         {
           this.TeamMemeber6_Code=0;
         }
         else{
          this.TeamMemeber6_Code = data.data.teamMemeberCode6
          this.TeamMemeber6_Position = data.data.teamMemeberPosition6;
          this.TeamMemeber6_Name = data.data.teamMemeberName6;  
         }

         if(data.data.teamMemeberCode7 ===''|| data.data.teamMemeberCode7 === null)
         {
           this.TeamMemeber7_Code=0;
         }
         else{
          this.TeamMemeber7_Code = data.data.teamMemeberCode7
          this.TeamMemeber7_Position = data.data.teamMemeberPosition7;
          this.TeamMemeber7_Name = data.data.teamMemeberName7;  
         }

          console.log('***********this.QHSE_Code here ******************')
          console.log(this.QHSE_Code)
          console.log("dataaaaaaaaaa")
          console.log(data.data)
          this.Date = this.drill.date
          console.log('###################################################')

          console.log(this.QHSE_Code)

          this.dataService.GetEmpCodeByCode(this.QHSE_Code).subscribe({
            next: data => {
              this.QHSE_NameID = data.data.id;
              this.QHSE_Name = data.data.name;
              this.QHSEPositionID = data.data.positionId;
              console.log("this.QHSE_Name+++++++++++++++++");
              console.log(data.data);
              console.log("this.QHSE_nameeeeeeeeeeeeeeeeeeeeeeeeee");
              console.log(this.QHSE_Name);
              console.log("this.QHSE_PositionID");
              console.log(this.QHSEPositionID);
              
              this.dataService.GetPositionByID(this.QHSEPositionID).subscribe({
                next: data => {
                  this.QHSE_Position = data.data.name;
                  console.log("this.QHSE_Position");
                  console.log(this.QHSE_Position);
                },
                error: err => {
                  this.ErrorMessage = err;
                  console.log(this.ErrorMessage);
                }
              });
            },
            error: err => {
              this.ErrorMessage = err;
              console.log(err);
            }
          });   
          this.dataService.GetEmpCodeByCode(this.STP_Code).subscribe({
            next: data => {
              this.STP_Code = this.drill.stpCode
              this.STP_NameId = data.data.id
              this.STP_Name = data.data.name
              this.STPPositionID = data.data.positionId

              console.log("this.STP_Dataaa")
              console.log(data.data)

              console.log("this.STP_Name")
              console.log(this.STP_Name)
              console.log("this.STPPositionID")
              console.log(this.STPPositionID)
              this.dataService.GetPositionByID(this.STPPositionID).subscribe({
                next: data => {
                  this.STPPosition = data.data.name
                    console.log("this.PusherPosition")
                  console.log(this.STPPosition)
                },
                error: err => {
                  this.ErrorMessage = err,
                    console.log(this.ErrorMessage)
                }
              })
            },
            error: err => {
              this.ErrorMessage = err,
                console.log(err)
            }
          })
          this.dataService.GetEmpCodeByCode(this.drill.teamMemeberCode).subscribe({
            next: data => {
              this.TeamMemeber_NameId = data.data.id
              this.TeamMemeber_Name = data.data.name
                this.TeamMemeber_PositionID = data.data.positionId
              this.TeamMemeber_Code = this.drill.teamMemeberCode
              console.log("this.Pusher_Name")
              console.log(this.TeamMemeber_Name)
              console.log("this.PusherPositionID")
              console.log(this.TeamMemeber_PositionID)
              this.dataService.GetPositionByID(this.TeamMemeber_PositionID).subscribe({
                next: data => {
                  this.TeamMemeber_Position = data.data.name
                    console.log("this.PusherPosition")
                  console.log(this.TeamMemeber_Position)
                },
                error: err => {
                  this.ErrorMessage = err,
                    console.log(this.ErrorMessage)
                }
              })
            },
            error: err => {
              this.ErrorMessage = err,
                console.log(err)
            }
          })
          this.dataService.GetEmpCodeByCode(this.drill.teamMemeberCode1).subscribe({
            next: data => {
              this.TeamMemeber1_NameId = data.data.id
              this.TeamMemeber1_Name = data.data.name
                this.TeamMemeber1_PositionID = data.data.positionId
              this.TeamMemeber1_Code = this.drill.teamMemeberCode1
              console.log("this.Pusher_Name")
              console.log(this.TeamMemeber1_Name)
              console.log("this.PusherPositionID")
              console.log(this.TeamMemeber1_PositionID)
              this.dataService.GetPositionByID(this.TeamMemeber1_PositionID).subscribe({
                next: data => {
                  this.TeamMemeber1_Position = data.data.name,
                    console.log("this.PusherPosition")
                  console.log(this.TeamMemeber1_Position)
                },
                error: err => {
                  this.ErrorMessage = err,
                    console.log(this.ErrorMessage)
                }
              })
            },
            error: err => {
              this.ErrorMessage = err,
                console.log(err)
            }
          })
          this.dataService.GetEmpCodeByCode(this.drill.teamMemeberCode2).subscribe({
            next: data => {
              this.TeamMemeber2_NameId = data.data.id
              this.TeamMemeber2_Name = data.data.name,
                this.TeamMemeber2_PositionID = data.data.positionId
              this.TeamMemeber2_Code = this.drill.teamMemeberCode2
              console.log("this.Pusher_Name")
              console.log(this.TeamMemeber2_Name)
              console.log("this.PusherPositionID")
              console.log(this.TeamMemeber2_PositionID)
              this.dataService.GetPositionByID(this.TeamMemeber2_PositionID).subscribe({
                next: data => {
                  this.TeamMemeber2_Position = data.data.name,
                    console.log("this.PusherPosition")
                  console.log(this.TeamMemeber2_Position)
                },
                error: err => {
                  this.ErrorMessage = err,
                    console.log(this.ErrorMessage)
                }
              })
            },
            error: err => {
              this.ErrorMessage = err,
                console.log(err)
            }
          })
          this.dataService.GetEmpCodeByCode(this.drill.teamMemeberCode3).subscribe({
            next: data => {
              this.TeamMemeber3_NameId = data.data.id
              this.TeamMemeber3_Name = data.data.name,
                this.TeamMemeber3_PositionID = data.data.positionId
              this.TeamMemeber3_Code = this.drill.teamMemeberCode3
              console.log("this.Pusher_Name")
              console.log(this.TeamMemeber3_Name)
              console.log("this.PusherPositionID")
              console.log(this.TeamMemeber3_PositionID)
              this.dataService.GetPositionByID(this.TeamMemeber3_PositionID).subscribe({
                next: data => {
                  this.TeamMemeber3_Position = data.data.name,
                    console.log("this.PusherPosition")
                  console.log(this.TeamMemeber3_Position)
                },
                error: err => {
                  this.ErrorMessage = err,
                    console.log(this.ErrorMessage)
                }
              })
            },
            error: err => {
              this.ErrorMessage = err,
                console.log(err)
            }
          })
          // this.dataService.GetEmpCodeByCode(this.drill.teamMemeberCode4).subscribe({
          //   next: data => {
          //     this.TeamMemeber4_NameId = data.data.id
          //     this.TeamMemeber4_Name = data.data.name,
          //       this.TeamMemeber4_PositionID = data.data.positionId
          //     this.TeamMemeber4_Code = this.drill.teamMemeberCode4
          //     console.log("this.Pusher_Name")
          //     console.log(this.TeamMemeber4_Name)
          //     console.log("this.PusherPositionID")
          //     console.log(this.TeamMemeber4_PositionID)
          //     this.dataService.GetPositionByID(this.TeamMemeber4_PositionID).subscribe({
          //       next: data => {
          //         this.TeamMemeber4_Position = data.data.name,
          //           console.log("this.PusherPosition")
          //         console.log(this.TeamMemeber4_Position)
          //       },
          //       error: err => {
          //         this.ErrorMessage = err,
          //           console.log(this.ErrorMessage)
          //       }
          //     })
          //   },
          //   error: err => {
          //     this.ErrorMessage = err,
          //       console.log(err)
          //   }
          // })
          // this.dataService.GetEmpCodeByCode(this.drill.teamMemeberCode5).subscribe({
          //   next: data => {
          //     this.TeamMemeber5_NameId = data.data.id
          //     this.TeamMemeber5_Name = data.data.name,
          //       this.TeamMemeber5_PositionID = data.data.positionId
          //     this.TeamMemeber5_Code = this.drill.teamMemeberCode5
          //     console.log("this.Pusher_Name")
          //     console.log(this.TeamMemeber5_Name)
          //     console.log("this.PusherPositionID")
          //     console.log(this.TeamMemeber5_PositionID)
          //     this.dataService.GetPositionByID(this.TeamMemeber5_PositionID).subscribe({
          //       next: data => {
          //         this.TeamMemeber5_Position = data.data.name,
          //           console.log("this.PusherPosition")
          //         console.log(this.TeamMemeber5_Position)
          //       },
          //       error: err => {
          //         this.ErrorMessage = err,
          //           console.log(this.ErrorMessage)
          //       }
          //     })
          //   },
          //   error: err => {
          //     this.ErrorMessage = err,
          //       console.log(err)
          //   }
          // })
          // this.dataService.GetEmpCodeByCode(this.drill.teamMemeberCode6).subscribe({
          //   next: data => {
          //     this.TeamMemeber6_NameId = data.data.id
          //     this.TeamMemeber6_Name = data.data.name,
          //       this.TeamMemeber6_PositionID = data.data.positionId
          //     this.TeamMemeber6_Code = this.drill.teamMemeberCode
          //     console.log("this.Pusher_Name")
          //     console.log(this.TeamMemeber6_Name)
          //     console.log("this.PusherPositionID")
          //     console.log(this.TeamMemeber6_PositionID)
          //     this.dataService.GetPositionByID(this.TeamMemeber6_PositionID).subscribe({
          //       next: data => {
          //         this.TeamMemeber6_Position = data.data.name,
          //           console.log("this.PusherPosition")
          //         console.log(this.TeamMemeber6_Position)
          //       },
          //       error: err => {
          //         this.ErrorMessage = err,
          //           console.log(this.ErrorMessage)
          //       }
          //     })
          //   },
          //   error: err => {
          //     this.ErrorMessage = err,
          //       console.log(err)
          //   }
          // })
          // this.dataService.GetEmpCodeByCode(this.drill.teamMemeberCode7).subscribe({
          //   next: data => {
          //     this.TeamMemeber7_NameId = data.data.id
          //     this.TeamMemeber7_Name = data.data.name,
          //       this.TeamMemeber7_PositionID = data.data.positionId
          //     this.TeamMemeber7_Code = this.drill.teamMemeberCode7
          //     console.log("this.Pusher_Name")
          //     console.log(this.TeamMemeber7_Name)
          //     console.log("this.PusherPositionID")
          //     console.log(this.TeamMemeber7_PositionID)
          //     this.dataService.GetPositionByID(this.TeamMemeber7_PositionID).subscribe({
          //       next: data => {
          //         this.TeamMemeber7_Position = data.data.name,
          //           console.log("this.PusherPosition")
          //         console.log(this.TeamMemeber7_Position)
          //       },
          //       error: err => {
          //         this.ErrorMessage = err,
          //           console.log(this.ErrorMessage)
          //       }
          //     })
          //   }

         // })
        },
        error: (erorr: string) => this.ErrorMessage = erorr
      }),
      

      this.dataService.GetEmpCode().subscribe({
        next: data => {
          this.QHSECodeList = data.data
          console.log("this.QHSECodeListtttt")
          console.log(this.QHSECodeList)
          this.Code = data.data.code
          console.log(data.data.code)
          this.cdr.detectChanges();
        },
        error: err => {
          this.ErrorMessage = err,
            console.log("this.ErrorMessage")
          console.log(this.ErrorMessage)
        }
      }),

      // this.dataService.GetEmpCode().subscribe({
      //   next: data => {
      //     this.QHSECodeList = data.data,
      //       console.log("this.QHSECodeListtttt")
      //     console.log(this.QHSECodeList)
      //   },
      //   error: err => {
      //     this.ErrorMessage = err,
      //       console.log("this.ErrorMessage")
      //     console.log(this.ErrorMessage)
      //   }
      // }),

      this.UserJsonString = JSON.stringify(this.loginService.currentUser.getValue()),
      this.UserJsonObj = JSON.parse(this.UserJsonString),
      this.drillForm = this.fb.group({
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
                0,
                [
                  // Validators.required
                ]
              ),
              teamMemeberPosition4: this.fb.control(
                '',
                [
                  // Validators.required
                ]
              ),
              teamMemeberName4: this.fb.control(
                '',
                [
                  // Validators.required
                ]
              ),
      
              teamMemeberCode5: this.fb.control(
                0,
                [
                  // Validators.required
                ]
              ),
              teamMemeberPosition5: this.fb.control(
                '',[]
                // [
                //   Validators.required
                // ]
              ),
              teamMemeberName5: this.fb.control(
                '',
                [
                ]
              ),
      
              teamMemeberCode6: this.fb.control(
                0,[]
              ),
              teamMemeberPosition6: this.fb.control(
                '',[]
               
              ),
              teamMemeberName6: this.fb.control(
                '',[]
                
              ),
      
              teamMemeberCode7: this.fb.control(
                0,[]
               
              ),
              teamMemeberPosition7: this.fb.control(
                0,[]
                
              ),
              teamMemeberName7: this.fb.control(
                0,[]
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
      
              userID: this.fb.control(this.UserJsonObj.ID, [Validators.required]),
              images: this.fb.control(null)
            }),
      this.dataService.GetDrillTypeList().subscribe({
        next: data => {
          this.drillTypeList = data.data,

            console.log(this.drillTypeList)
        },
        error: err => {
          this.ErrorMessage = err,
            console.log(this.ErrorMessage)
        }
      
      
      
      }),
      this.dataService.GetRig().subscribe({
        next: data => {
          this.rigList = data.data,
            console.log(this.rigList)
        },
        error: err => {
          this.ErrorMessage = err,
            console.log(this.ErrorMessage)
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
      next: data => {
        this.STP_NameId = data.data.id
        this.STP_Name = data.data.name,
          this.STPPositionID = data.data.positionId
        console.log("this.employee_name")
        console.log(this.STP_Name)
        console.log("this.employeePositionID")
        console.log(this.STPPositionID)
        this.dataService.GetPositionByID(this.STPPositionID).subscribe({
          next: data => {
            this.STPPosition = data.data.name,
              console.log("this.PusherPosition")
            console.log(this.STPPosition)
          },
          error: err => {
            this.ErrorMessage = err,
              console.log(this.ErrorMessage)
          }
        })
      },
      error: err => {
        this.ErrorMessage = err,
          console.log(err)
      }
    })
  }

  selectedMenaceTeamMemeber(event: any) {
    console.log("event.target.value")
    console.log(event.target.value)
    this.dataService.GetEmpCodeByCode(event.target.value).subscribe({
      next: data => {
        this.TeamMemeber_NameId = data.data.id
        this.TeamMemeber_Name = data.data.name,
          this.TeamMemeber_PositionID = data.data.positionId
        console.log("this.employee_name")
        console.log(this.TeamMemeber_Name)
        console.log("this.employeePositionID")
        console.log(this.TeamMemeber_PositionID)
        this.dataService.GetPositionByID(this.TeamMemeber_PositionID).subscribe({
          next: data => {
            this.TeamMemeber_Position = data.data.name,
              console.log("this.PusherPosition")
            console.log(this.TeamMemeber_Position)
          },
          error: err => {
            this.ErrorMessage = err,
              console.log(this.ErrorMessage)
          }
        })
      },
      error: err => {
        this.ErrorMessage = err,
          console.log(err)
      }
    })
  }

  selectedMenaceTeamMemeber1(event: any) {
    console.log("event.target.value")
    console.log(event.target.value)
    this.dataService.GetEmpCodeByCode(event.target.value).subscribe({
      next: data => {
        this.TeamMemeber1_NameId = data.data.id
        this.TeamMemeber1_Name = data.data.name,
          this.TeamMemeber1_PositionID = data.data.positionId
        console.log("this.employee_name")
        console.log(this.TeamMemeber1_Name)
        console.log("this.employeePositionID")
        console.log(this.TeamMemeber1_PositionID)
        this.dataService.GetPositionByID(this.TeamMemeber1_PositionID).subscribe({
          next: data => {
            this.TeamMemeber1_Position = data.data.name,
              console.log("this.PusherPosition")
            console.log(this.TeamMemeber1_Position)
          },
          error: err => {
            this.ErrorMessage = err,
              console.log(this.ErrorMessage)
          }
        })
      },
      error: err => {
        this.ErrorMessage = err,
          console.log(err)
      }
    })
  }
  selectedMenaceTeamMemeber2(event: any) {
    console.log("event.target.value")
    console.log(event.target.value)
    this.dataService.GetEmpCodeByCode(event.target.value).subscribe({
      next: data => {
        this.TeamMemeber2_NameId = data.data.id
        this.TeamMemeber2_Name = data.data.name,
          this.TeamMemeber2_PositionID = data.data.positionId
        console.log("this.employee_name")
        console.log(this.TeamMemeber2_Name)
        console.log("this.employeePositionID")
        console.log(this.TeamMemeber2_PositionID)
        this.dataService.GetPositionByID(this.TeamMemeber2_PositionID).subscribe({
          next: data => {
            this.TeamMemeber2_Position = data.data.name,
              console.log("this.PusherPosition")
            console.log(this.TeamMemeber2_Position)
          },
          error: err => {
            this.ErrorMessage = err,
              console.log(this.ErrorMessage)
          }
        })
      },
      error: err => {
        this.ErrorMessage = err,
          console.log(err)
      }
    })
  }
  selectedMenaceTeamMemeber3(event: any) {
    console.log("event.target.value")
    console.log(event.target.value)
    this.dataService.GetEmpCodeByCode(event.target.value).subscribe({
      next: data => {
        this.TeamMemeber3_NameId = data.data.id
        this.TeamMemeber3_Name = data.data.name,
          this.TeamMemeber3_PositionID = data.data.positionId
        console.log("this.employee_name")
        console.log(this.TeamMemeber3_Name)
        console.log("this.employeePositionID")
        console.log(this.TeamMemeber3_PositionID)
        this.dataService.GetPositionByID(this.TeamMemeber3_PositionID).subscribe({
          next: data => {
            this.TeamMemeber3_Position = data.data.name,
              console.log("this.PusherPosition")
            console.log(this.TeamMemeber3_Position)
          },
          error: err => {
            this.ErrorMessage = err,
              console.log(this.ErrorMessage)
          }
        })
      },
      error: err => {
        this.ErrorMessage = err,
          console.log(err)
      }
    })
  }
  selectedMenaceTeamMemeber4(event: any) {
    console.log("event.target.value")
    console.log(event.target.value)
    this.dataService.GetEmpCodeByCode(event.target.value).subscribe({
      next: data => {
        this.TeamMemeber4_NameId = data.data.id
        this.TeamMemeber4_Name = data.data.name,
          this.TeamMemeber4_PositionID = data.data.positionId
        console.log("this.employee_name")
        console.log(this.TeamMemeber4_Name)
        console.log("this.employeePositionID")
        console.log(this.TeamMemeber4_PositionID)
        this.dataService.GetPositionByID(this.TeamMemeber4_PositionID).subscribe({
          next: data => {
            this.TeamMemeber4_Position = data.data.name,
              console.log("this.PusherPosition")
            console.log(this.TeamMemeber4_Position)
          },
          error: err => {
            this.ErrorMessage = err,
              console.log(this.ErrorMessage)
          }
        })
      },
      error: err => {
        this.ErrorMessage = err,
          console.log(err)
      }
    })
  }
  selectedMenaceTeamMemeber5(event: any) {
    console.log("event.target.value")
    console.log(event.target.value)
    this.dataService.GetEmpCodeByCode(event.target.value).subscribe({
      next: data => {
        this.TeamMemeber5_NameId = data.data.id
        this.TeamMemeber5_Name = data.data.name,
          this.TeamMemeber5_PositionID = data.data.positionId
        console.log("this.employee_name")
        console.log(this.TeamMemeber5_Name)
        console.log("this.employeePositionID")
        console.log(this.TeamMemeber5_PositionID)
        this.dataService.GetPositionByID(this.TeamMemeber5_PositionID).subscribe({
          next: data => {
            this.TeamMemeber5_Position = data.data.name,
              console.log("this.PusherPosition")
            console.log(this.TeamMemeber5_Position)
          },
          error: err => {
            this.ErrorMessage = err,
              console.log(this.ErrorMessage)
          }
        })
      },
      error: err => {
        this.ErrorMessage = err,
          console.log(err)
      }
    })
  }
  selectedMenaceTeamMemeber6(event: any) {
    console.log("event.target.value")
    console.log(event.target.value)
    this.dataService.GetEmpCodeByCode(event.target.value).subscribe({
      next: data => {
        this.TeamMemeber6_NameId = data.data.id
        this.TeamMemeber6_Name = data.data.name,
          this.TeamMemeber6_PositionID = data.data.positionId
        console.log("this.employee_name")
        console.log(this.TeamMemeber6_Name)
        console.log("this.employeePositionID")
        console.log(this.TeamMemeber6_PositionID)
        this.dataService.GetPositionByID(this.TeamMemeber6_PositionID).subscribe({
          next: data => {
            this.TeamMemeber6_Position = data.data.name,
              console.log("this.PusherPosition")
            console.log(this.TeamMemeber6_Position)
          },
          error: err => {
            this.ErrorMessage = err,
              console.log(this.ErrorMessage)
          }
        })
      },
      error: err => {
        this.ErrorMessage = err,
          console.log(err)
      }
    })
  }

    selectedMenaceTeamMemeber7(event: any) {
    console.log("event.target.value")
    console.log(event.target.value)
    this.dataService.GetEmpCodeByCode(event.target.value).subscribe({
      next: data => {
        this.TeamMemeber7_NameId = data.data.id
        this.TeamMemeber7_Name = data.data.name,
          this.TeamMemeber7_PositionID = data.data.positionId
        console.log("this.employee_name")
        console.log(this.TeamMemeber7_Name)
        console.log("this.employeePositionID")
        console.log(this.TeamMemeber7_PositionID)
        this.dataService.GetPositionByID(this.TeamMemeber7_PositionID).subscribe({
          next: data => {
            this.TeamMemeber7_Position = data.data.name,
              console.log("this.PusherPosition")
            console.log(this.TeamMemeber7_Position)
          },
          error: err => {
            this.ErrorMessage = err,
              console.log(this.ErrorMessage)
          }
        })
      },
      error: err => {
        this.ErrorMessage = err,
          console.log(err)
      }
    })
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

  get userID() {
    return this.drillForm.get('userID');
  }
  get images() {
    return this.drillForm.get('images');
  }

 





   submitData() {

      const Formdata = new FormData();
      Formdata.append('id', this.drillId);
      Formdata.append('images', this.images?.value);
      Formdata.append('rigId', this.rigId?.value);
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
     
      for (let i = 0; i < this.SelectFiles.length; i++) {
        Formdata.append('images', this.SelectFiles[i]);
      }
      this.drillService.EditDrill(Formdata, this.drillId).subscribe({
        next: data => {
          console.log(data)
          this.router.navigate(['/Dashboard/Drill']);
        },
        error: error => console.log(error)
      });


    
    //   console.log("E+++++====error in : ");
    // console.log(this.drillForm);
    
  }


  GetImagePath(event: any) {
     this.SelectFiles = event.target.files;
  
 
}
}






  