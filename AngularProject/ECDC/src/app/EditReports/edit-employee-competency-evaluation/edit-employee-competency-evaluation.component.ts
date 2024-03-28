import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AddnewEmployeeCompetencyEvaluationService } from 'Services/addnew-employee-competency-evaluation.service';
import { DataService } from 'Services/data.service';
import { LoginService } from 'Services/login.service';
import { IEmployeeCompetencyEvaluation } from 'SharedClasses/IEmployeeCompetencyEvaluation';
import { IQHSEPosition } from 'SharedClasses/IQHSEPosition';
import { IQHSEPositionName } from 'SharedClasses/IQHSEPositionName';
import { IRig } from 'SharedClasses/IRig';
import { ISubjectList } from 'SharedClasses/ISubjectList';

@Component({
  selector: 'app-edit-employee-competency-evaluation',
  templateUrl: './edit-employee-competency-evaluation.component.html',
  styleUrls: ['./edit-employee-competency-evaluation.component.scss']
})
export class EditEmployeeCompetencyEvaluationComponent {


  employeeCompetencyEvaluationtId: any;
  employeeCompetencyEvaluationt!: IEmployeeCompetencyEvaluation;
  ErrorMessage: string = "";
  employeeCompetencyEvaluationForm!: FormGroup;
  Date: Date = new Date();
  rigList: IRig[] = []
  base64: any;
  subjectList: ISubjectList[] = []

  qhsePositionNameList: IQHSEPositionName[] = []
  qhsePositionList: IQHSEPosition[] = []
  QHSEPositionID: number = 0;
  EmployeePositionID: number = 0;

  UserJsonString: any
  UserJsonObj: any

  QHSECodeRecord: any;

  QHSEPositionCodeID: number = 0;
  QHSENameCodeID: number = 0;
  QHSEposition: string = '';
  QHSEName: string = '';

  QHSECodeList: any;
  QHSE_NameID:number=0;
  QHSE_Code:number=0;
  QHSE_Name:string='';
  QHSE_Position:string='';

  Employee_Code: number = 0;
  Employee_Position:string='';
  Employee_Name:string='';
  Employee_NameId:number=0;



  fileToEdit!: File;
  User:any;

  constructor(private loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private employeeCompetencyEvaluationService: AddnewEmployeeCompetencyEvaluationService ,
   private fb: FormBuilder,
    private router: Router) { }


  ngOnInit(): void {
    this.User=this.loginService.currentUser.getValue();
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.employeeCompetencyEvaluationtId = params.get("id");
      console.log(this.employeeCompetencyEvaluationtId)
    }),
      this.employeeCompetencyEvaluationService.GetEmployeeCompetencyEvaluationtByID(this.employeeCompetencyEvaluationtId,this.User.ID,this.User.Role).subscribe({
        next: data => {
          this.employeeCompetencyEvaluationt = data.data,

            console.log('*************************************************************')
            this.QHSE_Code=data.data.qhseEmpCode
            this.QHSE_Position=data.data.qhsePositionName;
            console.log('***********this.QHSE_Code here ******************')
            console.log( this.QHSE_Code)
          console.log(this.employeeCompetencyEvaluationt)
          this.Date = this.employeeCompetencyEvaluationt.date
          console.log('###################################################')

          //this.QHSE_Code=this.accident.qHSEEmpCode
          console.log( this.QHSE_Code)
         
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
          this.dataService.GetEmpCodeByCode(this.employeeCompetencyEvaluationt.employeeCode).subscribe({
            next:data=>{
              this.Employee_NameId=data.data.id
              this.Employee_Name=data.data.name,
              this.EmployeePositionID=data.data.positionId
              this.Employee_Code=this.employeeCompetencyEvaluationt.employeeCode
              console.log("this.Pusher_Name")
              console.log(this.Employee_Name)
              console.log("this.PusherPositionID")
              console.log(this.EmployeePositionID)
              this.dataService.GetPositionByID(this.EmployeePositionID).subscribe({
                next:data=>{
                  this.Employee_Position=data.data.name,
                  console.log("this.PusherPosition")
                  console.log(this.Employee_Position)
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
      
    this.employeeCompetencyEvaluationForm = this.fb.group({
      id: this.fb.control(0, [Validators.required]),
      rigId: this.fb.control('', [Validators.required]),
      date: this.fb.control('',
       [
        Validators.required
       ]
      ),
      subjectId: this.fb.control('', [Validators.required]),
      description: this.fb.control('', [Validators.required]),
      
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
      employeeCode: this.fb.control(
        '',
        [
          Validators.required
        ]
      ),
      employeePositionName: this.fb.control(
        '',
        [
          Validators.required
        ]
      ),
      employeeName: this.fb.control(
        '',
        [
          Validators.required
        ]
      ),
    }),
      // this.userID=this.UserJsonObj.ID;
      this.dataService.GetSubjectList().subscribe({
        next: data => {
          this.subjectList = data.data,
            console.log(this.subjectList)
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
        this.Employee_NameId=data.data.id
        this.Employee_Name=data.data.name,
        this.EmployeePositionID=data.data.positionId
        console.log("this.employee_name")
        console.log(this.Employee_Name)
        console.log("this.employeePositionID")
        console.log(this.EmployeePositionID)
        this.dataService.GetPositionByID(this.EmployeePositionID).subscribe({
          next:data=>{
            this.Employee_Position=data.data.name,
            console.log("this.PusherPosition")
            console.log(this.Employee_Position)
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

  
  get id() {
    return this.employeeCompetencyEvaluationForm.get('id');
  }
  get rigId() {
    return this.employeeCompetencyEvaluationForm.get('rigId');
  }
  get date() {
    return this.employeeCompetencyEvaluationForm.get('date');
  }
  get subjectId() {
    return this.employeeCompetencyEvaluationForm.get('subjectId');
  }
  
  get description() {
    return this.employeeCompetencyEvaluationForm.get('description');
  }
  get qHSEEmpCode() {
    return this.employeeCompetencyEvaluationForm.get('qHSEEmpCode');
  }
  get qHSEPositionName() {
    return this.employeeCompetencyEvaluationForm.get('qHSEPositionName');
  }
  get qHSEEmpName() {
    return this.employeeCompetencyEvaluationForm.get('qHSEEmpName');
  }
  get employeeCode() {
    return this.employeeCompetencyEvaluationForm.get('employeeCode');
  }
  get employeePositionName() {
    return this.employeeCompetencyEvaluationForm.get('employeePositionName');
  }
  get employeeName() {
    return this.employeeCompetencyEvaluationForm.get('employeeName');
  }
  
  submitData() {
    console.log("/*********SUBMIMT HERE**********/")  
    console.log(this.employeeCompetencyEvaluationForm.value)
    if (this.employeeCompetencyEvaluationForm.valid) {
      const Formdata = new FormData();
      Formdata.append('id', this.id?.value);
      Formdata.append('rigId', this.rigId?.value);
      Formdata.append('date', this.date?.value);
      Formdata.append('subjectId', this.subjectId?.value);
      Formdata.append('description', this.description?.value);
      Formdata.append('qHSEEmpCode', this.qHSEEmpCode?.value);
      Formdata.append('qHSEPositionName', this.qHSEPositionName?.value);
      Formdata.append('qHSEEmpName', this.qHSEEmpName?.value);
      Formdata.append('employeeCode', this.employeeCode?.value);
      Formdata.append('employeePositionName', this.employeePositionName?.value);
      Formdata.append('employeeName', this.employeeName?.value);
      Formdata.append('userID', this.UserJsonObj.ID);
      this.employeeCompetencyEvaluationService.EditEmployeeCompetencyEvaluationt(Formdata,this.employeeCompetencyEvaluationtId)
      .subscribe({
        next: data => {
          console.log(data)
          this.router.navigate(['/Dashboard/EmployeeCompetencyEvaluations']);
        },
        error: error => console.log(error)
      });
      // console.log(this.accidentForm.value)
      // this.router.navigate(['/Dashboard/AccidentTable'])
    }
    else {
      console.log("E+++++====error in : ");
      console.log(this.employeeCompetencyEvaluationForm);
    }
  }

}
