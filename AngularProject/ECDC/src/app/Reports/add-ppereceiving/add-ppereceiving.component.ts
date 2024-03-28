import { PPEReceivingService } from './../../../../Services/ppereceiving.service';

import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'Services/data.service';
import { LoginService } from 'Services/login.service';
import { PPEService } from 'Services/ppe.service';
import { IPPEReceiving } from 'SharedClasses/IPPEReceiving';
import { IRig } from 'SharedClasses/IRig';
import { PPE } from 'SharedClasses/PPE';
import { Workbook } from 'exceljs';
import * as saveAs from 'file-saver';


@Component({
  selector: 'app-add-ppereceiving',
  templateUrl: './add-ppereceiving.component.html',
  styleUrls: ['./add-ppereceiving.component.scss']
})
export class AddPPEReceivingComponent {

  PPEReceivingForm!: FormGroup;
  ErrorMessage = '';
  json_data: any[] = [];
  time = new Date();
  rigList: IRig[] = [];
  PPEList!: any[];

  UserJsonString: any
  UserJsonObj: any
  QHSECodeList: any;
  QHSE_NameID: number = 0;
  QHSE_Name: string = '';
  QHSEPositionID: number = 0;
  QHSE_Position: string = '';
  EmployeeCodeList: any;
  Employee_PositionID: number = 0;
  Employee_Position: string = '';
  Employee_Name: string = '';
  Employee_NameId: number = 0;
  User: any;

  NormalCoveralls: any;
  ThermalCoveralls: any;
  SafetyBoots: any;
  PPEReceivingObj!:IPPEReceiving;
  NormalCoverallsSize:any='';
  ThermalCoverallsSize: any='';
  SafetyBootsSize: any='';

  constructor(private loginService: LoginService,
    private dataService: DataService,
    private PPEReceiving: PPEReceivingService, private fb: FormBuilder,
    private router: Router,

    private PPEService: PPEService) { }

  ngOnInit() {
    this.User = this.loginService.currentUser.getValue();
    this.dataService.GetRig().subscribe({
      next: data => this.rigList = data.data,
      error: err => this.ErrorMessage = err
    }),
    this.UserJsonString = JSON.stringify(this.loginService.currentUser.getValue())
    this.UserJsonObj = JSON.parse(this.UserJsonString);


      this.PPEService.GetPPEs().subscribe({
        next: data => {
          this.PPEList = data.data

          console.log("PPEList")
          console.log(this.PPEList)
        },
        error: err => {
          this.ErrorMessage = err;
          console.log("ErrrrrrPPEList")
        }

      }),
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

      this.PPEReceiving.GetPPEReceivings(this.User.ID,this.User.Role).subscribe({
        next: data => this.json_data = data.data,
        error: err => this.ErrorMessage = err
      }),

      this.PPEReceivingForm = this.fb.group(
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
          employeeName: this.fb.control(
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
          employeeCode: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),

          normalCoverallsSize: this.fb.control(
            '',
          
          ),
          safetyBootsSize: this.fb.control(
            '',
          
          ),
          thermalCoverallsSize: this.fb.control(
            '',

           
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

  selectedMenaceEmployee(event: any) {
    console.log("event.target.value")
    console.log(event.target.value)
    this.dataService.GetEmpCodeByCode(event.target.value).subscribe({
      next: data => {
        this.Employee_NameId = data.data.id
        this.Employee_Name = data.data.name,
          this.Employee_PositionID = data.data.positionId
        console.log("this.employee_name")
        console.log(this.Employee_Name)
        console.log("this.employeePositionID")
        console.log(this.Employee_PositionID)
        this.dataService.GetPositionByID(this.Employee_PositionID).subscribe({
          next: data => {
            this.Employee_Position = data.data.name,
              console.log("this.PusherPosition")
            console.log(this.Employee_Position)
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

  selectedMenaceQHSE(event: any) {
    console.log("event.target.value")
    console.log(event.target.value)
    this.dataService.GetEmpCodeByCode(event.target.value).subscribe({
      next: data => {
        this.QHSE_NameID = data.data.id
        this.QHSE_Name = data.data.name,
          this.QHSEPositionID = data.data.positionId
        console.log(data.data)
        console.log("this.QHSE_Name")
        console.log(this.QHSE_Name)
        console.log("this kkkkkkkkk")
        console.log(data.data)
        console.log("this.QHSE_PositionID")
        console.log(this.QHSEPositionID)
        this.dataService.GetPositionByID(this.QHSEPositionID).subscribe({
          next: data => {
            this.QHSE_Position = data.data.name,
              console.log("this.QHSE_Position")
            console.log(this.QHSE_Position)
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
    return this.PPEReceivingForm.get('id');
  }
  get rigId() {
    return this.PPEReceivingForm.get('rigId');
  }
  get date() {
    return this.PPEReceivingForm.get('date');
  }
  get employeeCode() {
    return this.PPEReceivingForm.get('employeeCode');
  }
  get employeePositionName() {
    return this.PPEReceivingForm.get('employeePositionName');
  }

  get employeeName() {
    return this.PPEReceivingForm.get('employeeName');
  }
  get userId() {
    return this.PPEReceivingForm.get('userId');
  }

  get qhseEmpCode() {
    return this.PPEReceivingForm.get('qhseEmpCode');
  }
  get qhsePositionName() {
    return this.PPEReceivingForm.get('qhsePositionName');
  }
  get qhseEmpName() {
    return this.PPEReceivingForm.get('qhseEmpName');
  }

  get ppedto() {
    return this.PPEReceivingForm.get('ppedto')
  }
  get normalCoverallsSize() {
    return this.PPEReceivingForm.get('normalCoverallsSize');
  }

  get safetyBootsSize() {
    return this.PPEReceivingForm.get('safetyBootsSize');
  }
  get thermalCoverallsSize() {
    return this.PPEReceivingForm.get('thermalCoverallsSize');
  }

  selectedItems: PPE[] = [];


  toggleSelection(item: PPE) {
    if (!this.selectedItems.includes(item)) {
      this.selectedItems.push(item);
      
    }
    else {
      this.selectedItems = this.selectedItems.filter((selectedItem) => selectedItem !== item)
      if(item.name=='Normal Coveralls')
      {
        const element = document.getElementById('normalCoverallsSize') as HTMLInputElement;

        if (element) {
          element.value = '';
        }
      }
      if(item.name=='Thermal Coveralls')
      {
        const element = document.getElementById('thermalCoverallsSize') as HTMLInputElement;

        if (element) {
          element.value = '';
        }
      }
      if(item.name=='Safety Boot')
      {
        const element = document.getElementById('safetyBootsSize') as HTMLInputElement;

        if (element) {
          element.value = '';
        }
      }
    }
    console.log('chexkbooooooooooox select')
    console.log(this.selectedItems)
    this.updateFlags();


  }

  updateFlags() {
    this.NormalCoveralls = this.selectedItems.some((item) => item.name === 'Normal Coveralls');
    this.ThermalCoveralls = this.selectedItems.some((item) => item.name === 'Thermal Coveralls');
    this.SafetyBoots = this.selectedItems.some((item) => item.name === 'Safety Boot');
  }
  
  submitData() {
    if (this.PPEReceivingForm.valid) {
       
     this.PPEReceivingObj=this.PPEReceivingForm.value;
     this.PPEReceivingObj.ppedto=this.selectedItems;
     
     this.NormalCoverallsSize = document.getElementById('normalCoverallsSize');
     this.PPEReceivingObj.normalCoverallsSize=this.NormalCoverallsSize.value;

     this.ThermalCoverallsSize = document.getElementById('thermalCoverallsSize');
     this.PPEReceivingObj.thermalCoverallsSize=this.ThermalCoverallsSize.value;


    this.SafetyBootsSize = document.getElementById('safetyBootsSize');
    this.PPEReceivingObj.safetyBootsSize=this.SafetyBootsSize.value;
     console.log('PPEReceivingObj')
    console.log(this.PPEReceivingObj)
     
      console.log('before formData')
      const Formdata = new FormData();
      Formdata.append('id', this.id?.value);
      Formdata.append('rigId', this.rigId?.value);
      Formdata.append('date', this.date?.value);
      Formdata.append('employeeName', this.employeeName?.value);
      Formdata.append('employeePositionName', this.employeePositionName?.value);
      Formdata.append('employeeCode', this.employeeCode?.value);
      Formdata.append('qhseEmpCode', this.qhseEmpCode?.value);
      Formdata.append('qhsePositionName', this.qhsePositionName?.value);
      Formdata.append('qhseEmpName', this.qhseEmpName?.value);
      Formdata.append('normalCoverallsSize', this.normalCoverallsSize?.value);
      Formdata.append('safetyBootsSize', this.safetyBootsSize?.value);
      Formdata.append('thermalCoverallsSize', this.thermalCoverallsSize?.value);
      Formdata.append('ppedto', this.ppedto?.value);
      Formdata.append('userID', this.UserJsonObj.ID);
      console.log(Formdata);

      console.log('after formData')


      this.PPEReceiving.AddPPEReceiving(this.PPEReceivingObj).subscribe({
        next: data => {

          console.log('from service')
          console.log(data)
          location.reload();
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
      console.log(this.PPEReceivingForm);
    }
  }







  Download() {
    let workbook = new Workbook();

    let worksheet = workbook.addWorksheet("PPEReceiving Data");


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

    let fname = "PPEReceiving Report"

    //add data and file name and download
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs.saveAs(blob, fname + '-' + new Date().toUTCString() + '.xlsx');
    });
  }




}

