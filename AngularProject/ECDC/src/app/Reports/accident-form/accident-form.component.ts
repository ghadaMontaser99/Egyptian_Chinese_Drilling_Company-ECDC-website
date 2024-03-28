import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddNewAccidentService } from '../../../../Services/add-new-accident.service';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { IRig } from 'SharedClasses/IRig';
import { ITypeOfInjury } from 'SharedClasses/ITypeOfInjury';
import { IViolationCategory } from 'SharedClasses/IViolationCategory';
import { IAccidentCauses } from 'SharedClasses/IAccidentCauses';
import { IPreventionCategory } from 'SharedClasses/IPreventionCategory';
import { IClassificationOfAccident } from 'SharedClasses/IClassificationOfAccident';
import { DataService } from 'Services/data.service';
import { LoginService } from 'Services/login.service';



@Component({
  selector: 'app-accident-form',
  templateUrl: './accident-form.component.html',
  styleUrls: ['./accident-form.component.scss']
})
export class AccidentFormComponent {
  accidentForm!: FormGroup;
  ErrorMessage = '';
  json_data: any[] = [];
  time = new Date();
  base64: any;
  rigList: IRig[] = []
  typeOfInjuryList: ITypeOfInjury[] = []
  violationCategoryList: IViolationCategory[] = []
  accidentCausesList: IAccidentCauses[] = []
  preventionCategoryList: IPreventionCategory[] = []
  classificationOfAccidentList: IClassificationOfAccident[] = []

  UserJsonString: any
  UserJsonObj: any

  QHSECodeList: any;
  QHSE_NameID:number=0;
  QHSE_Name:string='';
  QHSEPositionID: number = 0;
  QHSE_Position:string='';

  ToolPusherCodeList: any;
  PusherPositionID: number = 0;
  PusherPosition:string='';
  Pusher_Name:string='';
  Pusher_NameId:number=0;


  DrillerPositionID: number = 0;
  DrillerPosition:string='';
  Driller_Name:string='';
  Driller_NameId:number=0;
  
  InjuredPersonPositionID: number = 0;
  InjuredPersonPosition:string='';
  InjuredPerson_Name:string='';
  InjuredPerson_NameId:number=0;
  SelectFiles:File[]=[]
  User:any;

  constructor(private loginService: LoginService, private dataService: DataService, private AddNewAccident: AddNewAccidentService, private fb: FormBuilder, private router: Router) { }

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

      this.accidentForm = this.fb.group(
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
          timeOfEvent: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),
          dateOfEvent: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),
          typeOfInjuryID: this.fb.control(
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
          violationCategoryId: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),
          accidentCausesId: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),
          preventionCategoryId: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),
          classificationOfAccidentId: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),
          accidentLocation: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),
          descriptionOfTheEvent: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),

          immediateActionType: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),
          directCauses: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),
          rootCauses: this.fb.control(
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
          images: this.fb.control(
            [], 
            [
            Validators.required
            ]),
        }
      ),
      this.AddNewAccident.GetAccidents(this.User.ID,this.User.Role).subscribe({
        next: data => this.json_data = data.data,
        error: err => this.ErrorMessage = err
      }),
      this.dataService.GetRig().subscribe({
        next: data => this.rigList = data.data,
        error: err => this.ErrorMessage = err
      }),
      this.dataService.GetTypeOfInjury().subscribe({
        next: data => this.typeOfInjuryList = data.data,
        error: err => this.ErrorMessage = err
      }),
      this.dataService.GetViolationCategory().subscribe({
        next: data => this.violationCategoryList = data.data,
        error: err => this.ErrorMessage = err
      }),
      this.dataService.GetAccidentCauses().subscribe({
        next: data => this.accidentCausesList = data.data,
        error: err => this.ErrorMessage = err
      }),
      this.dataService.GetPreventionCategory().subscribe({
        next: data => this.preventionCategoryList = data.data,
        error: err => this.ErrorMessage = err
      }),
      this.dataService.GetClassificationOfAccident().subscribe({
        next: data => this.classificationOfAccidentList = data.data,
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
        this.Driller_NameId=data.data.id
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
        this.InjuredPerson_NameId=data.data.id
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

  get id() {
    return this.accidentForm.get('id');
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
  get classificationOfAccidentId() {
    return this.accidentForm.get('classificationOfAccidentId');
  }
  get accidentLocation() {
    return this.accidentForm.get('accidentLocation');
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
  
  get images() {
    return this.accidentForm.get('images');
  }

  submitData() {
    if (this.accidentForm.valid) {
      console.log('before formData')
      const Formdata = new FormData();
      Formdata.append('id', this.id?.value);
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
      Formdata.append('userID', this.UserJsonObj.ID);
      for (let i = 0; i < this.SelectFiles.length; i++) {
        Formdata.append('images', this.SelectFiles[i]);
      }
      
      console.log(Formdata);

      console.log('after formData')


      this.AddNewAccident.AddAccident(Formdata).subscribe({
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
      console.log(this.accidentForm);
    }
  }


  Download() {
    let workbook = new Workbook();

    let worksheet = workbook.addWorksheet("Accident Data");


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

    let fname = "Accident Report"

    //add data and file name and download
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs.saveAs(blob, fname + '-' + new Date().toUTCString() + '.xlsx');
    });
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
  // }
  GetImagePath(event: any) {

    this.SelectFiles = event.target.files;


  }
}
