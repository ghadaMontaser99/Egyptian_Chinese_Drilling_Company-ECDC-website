import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AddNewAccidentService } from 'Services/add-new-accident.service';
import { DataService } from 'Services/data.service';
import { LoginService } from 'Services/login.service';
import { IAccident } from 'SharedClasses/IAccident';
import { IAccidentCauses } from 'SharedClasses/IAccidentCauses';
import { IClassificationOfAccident } from 'SharedClasses/IClassificationOfAccident';
import { IPreventionCategory } from 'SharedClasses/IPreventionCategory';
import { IQHSEPosition } from 'SharedClasses/IQHSEPosition';
import { IQHSEPositionName } from 'SharedClasses/IQHSEPositionName';
import { IRig } from 'SharedClasses/IRig';
import { IToolPusherPosition } from 'SharedClasses/IToolPusherPosition';
import { IToolPusherPositionName } from 'SharedClasses/IToolPusherPositionName';
import { ITypeOfInjury } from 'SharedClasses/ITypeOfInjury';
import { IViolationCategory } from 'SharedClasses/IViolationCategory';

@Component({
  selector: 'app-edit-accident',
  templateUrl: './edit-accident.component.html',
  styleUrls: ['./edit-accident.component.scss']
})
export class EditAccidentComponent {
  accidentId: any;
  accident!: any;
  ErrorMessage: string = "";
  accidentForm!: FormGroup;
  date: Date = new Date();
  rigList: IRig[] = []
  typeOfInjuryList: ITypeOfInjury[] = []
  violationCategoryList: IViolationCategory[] = []
  accidentCausesList: IAccidentCauses[] = []
  preventionCategoryList: IPreventionCategory[] = []
  classificationOfAccidentList: IClassificationOfAccident[] = []
  qhsePositionNameList: IQHSEPositionName[] = []
  toolPusherPositionNameList: IToolPusherPositionName[] = []
  toolPusherPositionList: IToolPusherPosition[] = []
  qhsePositionList: IQHSEPosition[] = []
  QHSEPositionID: number = 0;
  base64: any;



  QHSECodeRecord: any;

  QHSEPositionCodeID: number = 0;
  QHSENameCodeID: number = 0;
  QHSEposition: string = '';
  QHSEName: string = '';

  ToolPusherCodeList: any;

  ToolPusherCodeRecord: any;

  QHSECodeList: any;
  QHSE_NameID:number=0;
  QHSE_Code:number=0;
  QHSE_Name:string='';
  
  QHSE_Position:string='';

  PusherPositionID: number = 0;
  PusherPosition:string='';
  Pusher_Name:string='';
  Pusher_NameId:number=0;
  Pusher_Code:number=0;

  DrillerPositionID: number = 0;
  DrillerPosition:string='';
  Driller_Name:string='';
  Driller_Code:number=0;
  
  InjuredPersonPositionID: number = 0;
  InjuredPersonPosition:string='';
  InjuredPerson_Name:string='';
  InjuredPerson_Code:number=0;

  fileToEdit!: File;

  UserJsonString: any
  UserJsonObj: any
  SelectFiles:File[]=[];
  User:any;

  constructor(private loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private accidentService: AddNewAccidentService,
    private fb: FormBuilder,
    private router: Router) { }


  ngOnInit(): void {
    this.User=this.loginService.currentUser.getValue();
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.accidentId = params.get("id");
      console.log(this.accidentId)
    }),
      this.accidentService.GetAccidentByID(this.accidentId,this.User.ID,this.User.Role).subscribe({
        next: data => {
          this.accident = data.data,

            console.log('*************************************************************')
            this.QHSE_Code=data.data.qhseEmpCode
            this.QHSE_Position=data.data.qhsePositionName;
            console.log('***********this.QHSE_Code here ******************')
            console.log( this.QHSE_Code)
            console.log('************** accidentbyID ************************************')
          console.log(this.accident)
          this.date = this.accident.dateOfEvent
          console.log('###################################################')

          const file = data.data.images;
          this.accidentForm.patchValue({
            images: file
          });
          this.accidentForm.get('images')?.updateValueAndValidity()
          console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasssssddddd")
        
          const reader = new FileReader();     //to reade image file and dispaly it
          reader.onload = () => {
            this.base64 = reader.result as string;
          }
          this.dataService.GetEmpCodeByCode(this.QHSE_Code).subscribe({
            next:data=>{
            
              this.QHSE_NameID=data.data.id
              this.QHSE_Name=data.data.name,
              this.QHSEPositionID=data.data.positionId
              console.log("this.QHSE_Name+++++++++++++++++")
              console.log(data.data)

              console.log(this.QHSE_Name)
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
          this.dataService.GetEmpCodeByCode(this.accident.pusherCode).subscribe({
            next:data=>{
              this.Pusher_NameId=data.data.id
              this.Pusher_Name=data.data.name,
              this.PusherPositionID=data.data.positionId
              this.Pusher_Code=this.accident.pusherCode
              console.log("this.Pusher_Name")
              console.log(this.Pusher_Name)
              console.log("this.PusherPositionID")
              console.log(this.PusherPositionID)
              this.dataService.GetPositionByID(this.PusherPositionID).subscribe({
                next:data=>{
                  this.PusherPosition=data.data.name,
                  console.log("this.PusherPosition")
                  console.log(this.PusherPosition)
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

          this.dataService.GetEmpCodeByCode(this.accident.drillerCode).subscribe({
            next:data=>{
              this.Driller_Name=data.data.name,
              this.DrillerPositionID=data.data.positionId
              this.Driller_Code=this.accident.drillerCode
              console.log("this.Driller_Name")
              console.log(this.Driller_Code)
              console.log("this.Driller_Cooooooooooooooooooddeeee")
              console.log(this.Driller_Name)
              console.log("this.Driller_PositionID")
              console.log(this.DrillerPositionID)
              this.dataService.GetPositionByID(this.DrillerPositionID).subscribe({
                next:data=>{
                  
                  this.DrillerPosition=data.data.name,
                  console.log("this.Driller_Position")
                  console.log(this.DrillerPosition)
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
          this.dataService.GetEmpCodeByCode(this.accident.injuredPersonCode).subscribe({
            next:data=>{
              this.InjuredPerson_Code=this.accident.injuredPersonCode
              this.InjuredPerson_Name=data.data.name,
              this.InjuredPersonPositionID=data.data.positionId
              console.log("this.InjuredPerson_Name")
              console.log(this.InjuredPerson_Name)
              console.log("this.InjuredPerson_PositionID")
              console.log(this.InjuredPersonPositionID)
              this.dataService.GetPositionByID(this.InjuredPersonPositionID).subscribe({
                next:data=>{
                  this.InjuredPersonPosition=data.data.name,
                  console.log("this.InjuredPerson_Position")
                  console.log(this.InjuredPersonPosition)
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
        },
        error: (erorr: string) => this.ErrorMessage = erorr
      }),
      this.UserJsonString = JSON.stringify(this.loginService.currentUser.getValue()),
      this.UserJsonObj = JSON.parse(this.UserJsonString),
      this.dataService.GetEmpCode().subscribe({
        next: data => {
          this.QHSECodeList = data.data,
            console.log("this.QHSECodeListtttt")
          console.log(this.QHSECodeList)
        },
        error: err => {
          this.ErrorMessage = err,
            console.log("this.ErrorMessage")
          console.log(this.ErrorMessage)
        }
      }),
      
    this.accidentForm = this.fb.group({
      id: this.fb.control(0, [Validators.required]),
      rigId: this.fb.control('', [Validators.required]),
      timeOfEvent: this.fb.control('', [Validators.required]),
      dateOfEvent: this.fb.control('', [Validators.required]),
      typeOfInjuryID: this.fb.control('', [Validators.required]),
      violationCategoryId: this.fb.control('', [Validators.required]),
      accidentCausesId: this.fb.control('', [Validators.required]),
      preventionCategoryId: this.fb.control('', [Validators.required]),
      classificationOfAccidentId: this.fb.control('', [Validators.required]),
      accidentLocation: this.fb.control('', [Validators.required]),
      
      qHSEEmpCode: this.fb.control(
        '',
        [
          Validators.required
        ]
      ),
      qHSEPositionName: this.fb.control(
        '',
        [
          Validators.required
        ]
      ),
      qHSEEmpName: this.fb.control(
        '',
        [
          Validators.required
        ]
      ),
      pusherCode: this.fb.control(
        '',
        [
          Validators.required
        ]
      ),
      pusherPositionName: this.fb.control(
        '',
        [
          Validators.required
        ]
      ),
      pusherName: this.fb.control(
        '',
        [
          Validators.required
        ]
      ),
      drillerCode: this.fb.control(
        '',
        [
          Validators.required
        ]
      ),
      drillerPositionName: this.fb.control(
        '',
        [
          Validators.required
        ]
      ),
      drillerName: this.fb.control(
        '',
        [
          Validators.required
        ]
      ),
      injuredPersonCode: this.fb.control(
        '',
        [
          Validators.required
        ]
      ),
      injuredPersonPositionName: this.fb.control(
        '',
        [
          Validators.required
        ]
      ),
      injuredPersonName: this.fb.control(
        '',
        [
          Validators.required
        ]
      ),

      descriptionOfTheEvent: this.fb.control('', [Validators.required]),
      immediateActionType: this.fb.control('', [Validators.required]),
      directCauses: this.fb.control('', [Validators.required]),
      rootCauses: this.fb.control('', [Validators.required]),
      recommendations: this.fb.control('', [Validators.required]),
      // pictures: this.fb.control('', [Validators.required]),
      userID: this.fb.control(this.UserJsonObj.ID, [Validators.required]),
      images: this.fb.control(null)
    }),
      // this.userID=this.UserJsonObj.ID;
      this.dataService.GetAccidentCauses().subscribe({
        next: data => {
          this.accidentCausesList = data.data,
            console.log(this.accidentCausesList)
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
      }),
      this.dataService.GetClassificationOfAccident().subscribe({
        next: data => {
          this.classificationOfAccidentList = data.data,
            console.log(this.classificationOfAccidentList)
        },
        error: err => {
          this.ErrorMessage = err,
            console.log(this.ErrorMessage)
        }
      }),
      this.dataService.GetPreventionCategory().subscribe({
        next: data => {
          this.preventionCategoryList = data.data,
            console.log(this.preventionCategoryList)
        },
        error: err => {
          this.ErrorMessage = err,
            console.log(this.ErrorMessage)
        }
      }),
      this.dataService.GetTypeOfInjury().subscribe({
        next: data => {
          this.typeOfInjuryList = data.data,
            console.log(this.typeOfInjuryList)
        },
        error: err => {
          this.ErrorMessage = err,
            console.log(this.ErrorMessage)
        }
      }),
      this.dataService.GetViolationCategory().subscribe({
        next: data => {
          this.violationCategoryList = data.data,
            console.log(this.violationCategoryList)
        },
        error: err => {
          this.ErrorMessage = err,
            console.log(this.ErrorMessage)
        }
      }),
      this.dataService.GetToolPusherPosition().subscribe({
        next: data => {
          this.toolPusherPositionList = data.data,
            console.log(this.accidentCausesList)
        },
        error: err => {
          this.ErrorMessage = err,
            console.log(this.ErrorMessage)
        }
      }),
      this.dataService.GetQHSEPosition().subscribe({
        next: data => {
          this.qhsePositionList = data.data,
            console.log(this.accidentCausesList)
        },
        error: err => {
          this.ErrorMessage = err,
            console.log(this.ErrorMessage)
        }
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

  selectedMenaceTool(event: any) {
    console.log("event.target.value")
    console.log(event.target.value)
    this.dataService.GetEmpCodeByCode(event.target.value).subscribe({
      next:data=>{
        this.Pusher_NameId=data.data.id
        this.Pusher_Name=data.data.name,
        this.PusherPositionID=data.data.positionId
        console.log("this.Pusher_Name")
        console.log(this.Pusher_Name)
        console.log("this.PusherPositionID")
        console.log(this.PusherPositionID)
        this.dataService.GetPositionByID(this.PusherPositionID).subscribe({
          next:data=>{
            this.PusherPosition=data.data.name,
            console.log("this.PusherPosition")
            console.log(this.PusherPosition)
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


  selectedMenaceDriller(event: any) {
    console.log("event.target.value")
    console.log(event.target.value)
    this.dataService.GetEmpCodeByCode(event.target.value).subscribe({
      next:data=>{
       
        this.Driller_Name=data.data.name,
        this.DrillerPositionID=data.data.positionId
        console.log("this.Driller_Name")
        console.log(this.Driller_Name)
        console.log("this.DrillerPositionID")
        console.log(this.DrillerPositionID)
        this.dataService.GetPositionByID(this.DrillerPositionID).subscribe({
          next:data=>{
            this.DrillerPosition=data.data.name,
            console.log("this.DrillerPosition")
            console.log(this.DrillerPosition)
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


  selectedMenaceInjuredPerson(event: any) {
    console.log("event.target.value")
    console.log(event.target.value)
    this.dataService.GetEmpCodeByCode(event.target.value).subscribe({
      next:data=>{
        this.InjuredPerson_Name=data.data.name,
        this.InjuredPersonPositionID=data.data.positionId
        console.log("this.InjuredPerson_Name")
        console.log(this.InjuredPerson_Name)
        console.log("this.InjuredPersonPositionID")
        console.log(this.InjuredPersonPositionID)
        this.dataService.GetPositionByID(this.InjuredPersonPositionID).subscribe({
          next:data=>{
            this.InjuredPersonPosition=data.data.name,
            console.log("this.InjuredPersonPosition")
            console.log(this.InjuredPersonPosition)
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

  


  get rigId() {
    return this.accidentForm.get('rigId');
  }
  get timeOfEvent() {
    return this.accidentForm.get('timeOfEvent');
  }
  get dateOfEvent() {
    return this.accidentForm.get('dateOfEvent');
  }
  get typeOfInjuryID() {
    return this.accidentForm.get('typeOfInjuryID');
  }
  get violationCategoryId() {
    return this.accidentForm.get('violationCategoryId');
  }
  get accidentCausesId() {
    return this.accidentForm.get('accidentCausesId');
  }
  get preventionCategoryId() {
    return this.accidentForm.get('preventionCategoryId');
  }

  get qHSEEmpCode() {
    return this.accidentForm.get('qHSEEmpCode');
  }
  get qHSEPositionName() {
    return this.accidentForm.get('qHSEPositionName');
  }
  get qHSEEmpName() {
    return this.accidentForm.get('qHSEEmpName');
  }
  get pusherCode() {
    return this.accidentForm.get('pusherCode');
  }
  get pusherPositionName() {
    return this.accidentForm.get('pusherPositionName');
  }
  get pusherName() {
    return this.accidentForm.get('pusherName');
  }
  get drillerCode() {
    return this.accidentForm.get('drillerCode');
  }
  get drillerPositionName() {
    return this.accidentForm.get('drillerPositionName');
  }
  get drillerName() {
    return this.accidentForm.get('drillerName');
  }
  get injuredPersonCode() {
    return this.accidentForm.get('injuredPersonCode');
  }
  get injuredPersonPositionName() {
    return this.accidentForm.get('injuredPersonPositionName');
  }
  get injuredPersonName() {
    return this.accidentForm.get('injuredPersonName');
  }

  get classificationOfAccidentId() {
    return this.accidentForm.get('classificationOfAccidentId');
  }
  get accidentLocation() {
    return this.accidentForm.get('accidentLocation');
  }
  
  get descriptionOfTheEvent() {
    return this.accidentForm.get('descriptionOfTheEvent');
  }

  get immediateActionType() {
    return this.accidentForm.get('immediateActionType');
  }
  get directCauses() {
    return this.accidentForm.get('directCauses');
  }
  get rootCauses() {
    return this.accidentForm.get('rootCauses');
  }
  get recommendations() {
    return this.accidentForm.get('recommendations');
  }
  
  get userID() {
    return this.accidentForm.get('userID');
  }
  get images() {
    return this.accidentForm.get('images');
  }


  submitData() {
    console.log('accidentForm')
    console.log(this.accidentForm)
    if (this.accidentForm.valid) {
      const Formdata = new FormData();
      Formdata.append('id', this.accidentId);
     
      Formdata.append('rigId', this.rigId?.value);
      Formdata.append('timeOfEvent', this.timeOfEvent?.value);
      Formdata.append('dateOfEvent', this.dateOfEvent?.value);
      Formdata.append('typeOfInjuryID', this.typeOfInjuryID?.value);
      Formdata.append('violationCategoryId', this.violationCategoryId?.value);
      Formdata.append('accidentCausesId', this.accidentCausesId?.value);
      Formdata.append('preventionCategoryId', this.preventionCategoryId?.value);
      Formdata.append('classificationOfAccidentId', this.classificationOfAccidentId?.value);
      Formdata.append('accidentLocation', this.accidentLocation?.value);

      Formdata.append('qHSEEmpCode', this.qHSEEmpCode?.value);
      Formdata.append('qHSEPositionName', this.qHSEPositionName?.value);
      Formdata.append('qHSEEmpName', this.qHSEEmpName?.value);
      Formdata.append('pusherCode', this.pusherCode?.value);
      Formdata.append('pusherPositionName', this.pusherPositionName?.value);
      Formdata.append('pusherName', this.pusherName?.value);
      Formdata.append('drillerCode', this.drillerCode?.value);
      Formdata.append('drillerPositionName', this.drillerPositionName?.value);
      Formdata.append('drillerName', this.drillerName?.value);
      Formdata.append('injuredPersonCode', this.injuredPersonCode?.value);
      Formdata.append('injuredPersonPositionName', this.injuredPersonPositionName?.value);
      Formdata.append('injuredPersonName', this.injuredPersonName?.value);

      Formdata.append('descriptionOfTheEvent', this.descriptionOfTheEvent?.value);

      Formdata.append('immediateActionType', this.immediateActionType?.value);
      Formdata.append('directCauses', this.directCauses?.value);
      Formdata.append('rootCauses', this.rootCauses?.value);
      Formdata.append('recommendations', this.recommendations?.value);
      // Formdata.append('pictures', this.pictures?.value);
      Formdata.append('userID', this.UserJsonObj.ID);
      
      for (let i = 0; i < this.SelectFiles.length; i++) {
        Formdata.append('images', this.SelectFiles[i]);
      }

      console.log('____ Formdata ___')
      console.log(Formdata)


      this.accidentService.EditAccident(Formdata).subscribe({
        next: data => {
          console.log(data.data)
          this.router.navigate(['/Dashboard/Accidents']);
        },
        error: error => console.log(error)
      });
     
    }
    else {
      console.log("E+++++====error in : ");
      console.log(this.accidentForm);
    }
  }
  

  // GetImagePath(event: any) {

  //   const file = event.target.files[0];
  //   this.accidentForm.patchValue({
  //     ImageOfaccident: file
  //   });
  //   this.accidentForm.get('ImageOfaccident')?.updateValueAndValidity()

  //   const reader = new FileReader();     //to reade image file and dispaly it
  //   reader.onload = () => {
  //     this.base64 = reader.result as string;
  //   }
  //   reader.readAsDataURL(file)

  //     // const file: File = event.target.files[0];
  //     // this.fileToEdit = file;
  // }

  GetImagePath(event: any) {
    this.SelectFiles = event.target.files;


  }


}
