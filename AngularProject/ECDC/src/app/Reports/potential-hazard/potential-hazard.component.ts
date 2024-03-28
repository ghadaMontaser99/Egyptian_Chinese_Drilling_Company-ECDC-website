import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Workbook } from 'exceljs';
import * as saveAs from 'file-saver';
import { AddNewAccidentService } from 'Services/add-new-accident.service';
import { DataService } from 'Services/data.service';
import { LoginService } from 'Services/login.service';
import { PotentialHazardService } from 'Services/potential-hazard.service';
import { IAccidentCauses } from 'SharedClasses/IAccidentCauses';
import { IClassificationOfAccident } from 'SharedClasses/IClassificationOfAccident';
import { IPreventionCategory } from 'SharedClasses/IPreventionCategory';
import { IResponsibility } from 'SharedClasses/IResponsibility';
import { IRig } from 'SharedClasses/IRig';
import { ITypeOfInjury } from 'SharedClasses/ITypeOfInjury';
import { IViolationCategory } from 'SharedClasses/IViolationCategory';

@Component({
  selector: 'app-potential-hazard',
  templateUrl: './potential-hazard.component.html',
  styleUrls: ['./potential-hazard.component.scss']
})
export class PotentialHazardComponent {
  potentialHazardForm!: FormGroup;
  ErrorMessage = '';
  json_data: any[] = [];
  time = new Date();
  base64: any;
  rigList: IRig[] = []
  ResponsibilityList: IResponsibility[] = []
  SelectFiles:File[]=[]

  UserJsonString: any
  UserJsonObj: any

  User:any;

  constructor(private loginService: LoginService, private dataService: DataService, private PotentialHazardService: PotentialHazardService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.User=this.loginService.currentUser.getValue();

    this.dataService.GetRig().subscribe({
      next: data => {this.rigList = data.data
           console.log("riiig")
           console.log(this.rigList)

          },
      error: err => this.ErrorMessage = err
    }),
    this.dataService.GetResponsibility().subscribe({
      next: data => this.ResponsibilityList = data.data,
      error: err => this.ErrorMessage = err
    }),
    this.UserJsonString = JSON.stringify(this.loginService.currentUser.getValue())
  this.UserJsonObj = JSON.parse(this.UserJsonString);
  console.log(this.UserJsonObj)
  
      this.potentialHazardForm = this.fb.group(
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
          pR_IssueDate: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),
          pR_No: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),
          pO_No: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),
          responibilityId: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),
          title: this.fb.control(
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
          description: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),
          neededAction: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),
          images: this.fb.control(
            [], 
            [
            Validators.required
            ]),
      
          userId: this.fb.control(
            this.UserJsonObj.ID,
            [
              Validators.required
            ]
          ),
        }
      )
   
      
  }

  

  get id() {
    return this.potentialHazardForm.get('id');
  }
  get rigId() {
    return this.potentialHazardForm.get('rigId');
  }
  get pR_IssueDate() {
    return this.potentialHazardForm.get('pR_IssueDate');
  }
  get date() {
    return this.potentialHazardForm.get('date');
  }
  get pR_No() {
    return this.potentialHazardForm.get('pR_No');
  }
  
  get pO_No() {
    return this.potentialHazardForm.get('pO_No');
  }
  get responibilityId() {
    return this.potentialHazardForm.get('responibilityId');
  }
  get status() {
    return this.potentialHazardForm.get('status');
  }
  get description() {
    return this.potentialHazardForm.get('description');
  }
  get neededAction() {
    return this.potentialHazardForm.get('neededAction');
  }
  get images() {
    return this.potentialHazardForm.get('images');
  }
  get title() {
    return this.potentialHazardForm.get('title');
  }
  

  submitData() {
    if (this.potentialHazardForm.valid) {
       console.log(this.potentialHazardForm.value)

      console.log('before formData')
      const Formdata = new FormData();
      Formdata.append('id', this.id?.value);
      Formdata.append('rigId', this.rigId?.value);
      Formdata.append('pR_IssueDate', this.pR_IssueDate?.value);
      Formdata.append('date', this.date?.value);
      Formdata.append('pR_No', this.pR_No?.value);
      Formdata.append('pO_No', this.pO_No?.value);
      Formdata.append('responibilityId', this.responibilityId?.value);
      Formdata.append('status', this.status?.value);
      Formdata.append('description', this.description?.value);
      Formdata.append('neededAction', this.neededAction?.value);
      Formdata.append('images', this.images?.value);
      Formdata.append('title', this.title?.value);
      Formdata.append('userID', this.UserJsonObj.ID);

     
      //const formData = new FormData();
    
      for (let i = 0; i < this.SelectFiles.length; i++) {
        Formdata.append('images', this.SelectFiles[i]);
      }
      
      console.log(Formdata);

      console.log('after formData')


      this.PotentialHazardService.AddPotentialHazard(Formdata).subscribe({
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
      console.log(this.potentialHazardForm);
    }
    
  }


  Download() {
    let workbook = new Workbook();

    let worksheet = workbook.addWorksheet("Potential Hazard Data");


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

    let fname = "Potential Hazard Report"

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

