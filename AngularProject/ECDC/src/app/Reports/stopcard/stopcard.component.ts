import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Workbook } from 'exceljs';
import * as saveAs from 'file-saver';
import { DataService } from 'Services/data.service';
import { LoginService } from 'Services/login.service';
import { stopcardservice } from 'Services/stop-card.service';
import { IClassification } from 'SharedClasses/IClassification';
import { ITypeOfObservationCategory } from 'SharedClasses/ITypeOfObservationCategory';

@Component({
  selector: 'app-stopcard',
  templateUrl: './stopcard.component.html',
  styleUrls: ['./stopcard.component.scss']
})
export class StopcardComponent {
  StopCardForm!: FormGroup;
  ErrorMessage = '';
  json_data: any[] = [];
  time = new Date();
  classificationList: IClassification[] = []
  typeOfObservationCategoryList: ITypeOfObservationCategory[] = []


  UserJsonString: any
  UserJsonObj: any

  QHSECodeList: any;

  EmployeeCodeList: any;
  Employee_PositionID: number = 0;
  Employee_Position: string = '';
  Employee_Name: string = '';
  Employee_NameId: number = 0;

  User: any;

  constructor(private loginService: LoginService, private dataService: DataService, private StopCardService: stopcardservice, private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.User = this.loginService.currentUser.getValue();
    this.UserJsonString = JSON.stringify(this.loginService.currentUser.getValue())
    this.UserJsonObj = JSON.parse(this.UserJsonString);
    this.dataService.GetEmpCode().subscribe({
      next: data => {
        this.QHSECodeList = data.data; // Ensure the structure of data matches expectations
        console.log('QHSECodeList:', this.QHSECodeList); // Check if data is received
      },
      error: err => {
        this.ErrorMessage = err;
        console.log('Error fetching QHSE codes:', err);
      }
    });

    this.StopCardService.GetStopCard(this.User.ID, this.User.Role).subscribe({
      next: data => this.json_data = data.data,
      error: err => this.ErrorMessage = err
    }),
      this.dataService.GetClassification().subscribe({
        next: data => this.classificationList = data.data,
        error: err => this.ErrorMessage = err
      }),
      this.dataService.GetTypeOfObservationCategory().subscribe({
        next: data => this.typeOfObservationCategoryList = data.data,
        error: err => this.ErrorMessage = err
      })
    this.StopCardForm = this.fb.group(
      {
        id: this.fb.control(
          0,
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
        classificationID: this.fb.control(
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
        employeeCode: this.fb.control(
          '',
          [
            Validators.required
          ]
        ),
        reportedByPosition: this.fb.control(
          '',
          [
            Validators.required
          ]
        ),
        reportedByName: this.fb.control(
          '',
          [
            Validators.required
          ]
        ),

        actionRequired: this.fb.control(
          '',
          [
            Validators.required
          ]
        ),
        typeOfObservationCategoryID: this.fb.control(
          '',
          [
            Validators.required
          ]
        ),
        status: this.fb.control(
          '',
          [
            Validators.required
          ]
        ),
        stopWorkAuthorityApplied: this.fb.control(
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
    )

  }

  SelectedEmployeeCode(event: any) {
    console.log("event.target.value")
    console.log(event.target.value)
    this.dataService.GetEmpCodeByCode(event.target.value).subscribe({
      next: data => {
        this.Employee_NameId = data.data.id
        this.Employee_Name = data.data.name,
          this.Employee_PositionID = data.data.positionId
        console.log("this.Employee_Name")
        console.log(this.Employee_Name)
        console.log("this.ReportedBy_PositionID")
        console.log(this.Employee_PositionID)
        console.log("**********************************************")
        //GetReportedByPositionByID
        this.dataService.GetPositionByID(this.Employee_PositionID).subscribe({
          next: data => {
            this.Employee_Position = data.data.name,
              console.log("this. Employee_Position")
            console.log(this.Employee_Position)
          },
          error: err => {
            this.ErrorMessage = err,
              console.log(err)
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
    return this.StopCardForm.get('id');
  }
  get date() {
    return this.StopCardForm.get('date');
  }
  get classificationID() {
    return this.StopCardForm.get('classificationID');
  }
  get description() {
    return this.StopCardForm.get('description');
  }
  get employeeCode() {
    return this.StopCardForm.get('employeeCode');
  }
  get reportedByPosition() {
    return this.StopCardForm.get('reportedByPosition');
  }
  get reportedByName() {
    return this.StopCardForm.get('reportedByName');
  }
  get actionRequired() {
    return this.StopCardForm.get('actionRequired');
  }
  get typeOfObservationCategoryID() {
    return this.StopCardForm.get('typeOfObservationCategoryID');
  }
  get status() {
    return this.StopCardForm.get('status');
  }
  get stopWorkAuthorityApplied() {
    return this.StopCardForm.get('stopWorkAuthorityApplied');
  }
  get userID() {
    return this.StopCardForm.get('userID');
  }

  submitData() {
    console.log(this.StopCardForm.value)
    this.StopCardService.AddStopCardRegister(this.StopCardForm.value).subscribe({
      next: data => {
        console.log(data)
        // this.Download()
        console.log(this.StopCardForm.value)

        location.reload();
      },
      error: error => console.log(error)
    });
  }

  verifecationStateSelected(event: any) {
    var boolValue = JSON.parse(event.target.value);
    this.stopWorkAuthorityApplied?.setValue(boolValue, { onlySelf: true, });
    console.log(" this.verifecationState   " + boolValue)
  }


  Download() {
    let workbook = new Workbook();

    let worksheet = workbook.addWorksheet("Stop Card Data");

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

    let fname = "Stop Card Report"

    //add data and file name and download
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs.saveAs(blob, fname + '-' + new Date().toUTCString() + '.xlsx');
    });
  }
}
