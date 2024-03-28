import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddnewEmployeeCompetencyEvaluationService } from 'Services/addnew-employee-competency-evaluation.service';
import { DataService } from 'Services/data.service';
import { LoginService } from 'Services/login.service';
import { IRig } from 'SharedClasses/IRig';
import { ISubjectList } from 'SharedClasses/ISubjectList';
import { Workbook } from 'exceljs';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-employee-competency-evaluation',
  templateUrl: './employee-competency-evaluation.component.html',
  styleUrls: ['./employee-competency-evaluation.component.scss']
})
export class EmployeeCompetencyEvaluationComponent {

  employeeCompetencyEvaluationForm!: FormGroup;
  ErrorMessage = '';
  json_data: any[] = [];
  base64: any;
  rigList: IRig[] = []
  subjectList: ISubjectList[] = []
 
  UserJsonString: any
  UserJsonObj: any

  QHSECodeList: any;
  QHSE_NameID:number=0;
  QHSE_Name:string='';
  QHSEPositionID: number = 0;
  QHSE_Position:string='';

  EmployeeCodeList: any;
  Employee_PositionID: number = 0;
  Employee_Position:string='';
  Employee_Name:string='';
  Employee_NameId:number=0;

  User:any;

  constructor(private loginService: LoginService, private dataService: DataService, private AddNewEmployeeCompetencyEvaluation: AddnewEmployeeCompetencyEvaluationService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.User=this.loginService.currentUser.getValue();
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
      this.employeeCompetencyEvaluationForm = this.fb.group(
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
          subjectId: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),
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
          description: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),
        }
      ),
      this.AddNewEmployeeCompetencyEvaluation.GetEmployeeCompetencyEvaluationts(this.User.ID,this.User.Role).subscribe({
        next: data => this.json_data = data.data,
        error: err => this.ErrorMessage = err
      }),
      this.dataService.GetRig().subscribe({
        next: data => this.rigList = data.data,
        error: err => this.ErrorMessage = err
      }),
      this.dataService.GetSubjectList().subscribe({
        next: data => this.subjectList = data.data,
        error: err => this.ErrorMessage = err
      }),
      this.UserJsonString = JSON.stringify(this.loginService.currentUser.getValue())
    this.UserJsonObj = JSON.parse(this.UserJsonString);
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
        this.Employee_PositionID=data.data.positionId
        console.log("this.employee_name")
        console.log(this.Employee_Name)
        console.log("this.employeePositionID")
        console.log(this.Employee_PositionID)
        this.dataService.GetPositionByID(this.Employee_PositionID).subscribe({
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
    if (this.employeeCompetencyEvaluationForm.valid) {
      console.log('before formData')
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
      console.log(Formdata);
      console.log(this.employeeCompetencyEvaluationForm);

      console.log('after formData')
      this.AddNewEmployeeCompetencyEvaluation.AddEmployeeCompetencyEvaluation(Formdata).subscribe({
        next: data => {
          console.log(this.employeeCompetencyEvaluationForm);

          console.log('from service')
          console.log(data)
          location.reload();
        },
        error: error => {
          console.log(this.employeeCompetencyEvaluationForm);

          console.log("from Error")
          console.log(error)
        }
      });
      console.log(Formdata);
    }
    else {
      console.log('emloyyyyyyyyyyyy', this.employeeCompetencyEvaluationForm.value)

      console.log("E+++++====error in : ");
    }
  }


  Download() {
    let workbook = new Workbook();

    let worksheet = workbook.addWorksheet("Employee Competency Evaluation Data");


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

    let fname = "EmployeeCompetencyEvaluation Report"

    //add data and file name and download
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs.saveAs(blob, fname + '-' + new Date().toUTCString() + '.xlsx');
    });
  }
}
  
