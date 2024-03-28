import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddDataService } from 'Services/add-data.service';
import { DataService } from 'Services/data.service';
import { LoginService } from 'Services/login.service';
import { IRig } from 'SharedClasses/IRig';

@Component({
  selector: 'app-add-emp-code',
  templateUrl: './add-emp-code.component.html',
  styleUrls: ['./add-emp-code.component.scss']
})
export class AddEmpCodeComponent {
  EmpCodeForm!: FormGroup;
  ErrorMessage = '';
  // json_data: any[] = [];
  UserJsonString:any
  UserJsonObj:any
  positonIdList:any;
  rigList:IRig[]=[];
  constructor(private dataService:DataService,private loginService:LoginService,private addDataService:AddDataService,private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.EmpCodeForm = this.fb.group(
      {
        id: this.fb.control(
          0,
          [
            Validators.required
          ]
        ),
        code: this.fb.control(
          '',
          [
            Validators.required
          ]
        ),
        name: this.fb.control(
          '',
          [
            Validators.required
          ]
        ),
        PositionId: this.fb.control(
          '',
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
        isDeleted: this.fb.control(
          false,
          [
            Validators.required
          ]
        )
      }
    ),
    this.UserJsonString=JSON.stringify(this.loginService.currentUser.getValue())
    this.UserJsonObj=JSON.parse(this.UserJsonString);
    this.dataService.GetPositions().subscribe({
      next: data => this.positonIdList = data.data,
      error: err => this.ErrorMessage = err
    }),
    this.dataService.GetRig().subscribe({
      next: data => this.rigList = data.data,
      error: err => this.ErrorMessage = err
    })
  }

  get id() {
    return this.EmpCodeForm.get('id');
  }
  get code() {
    return this.EmpCodeForm.get('code');
  }
  get name() {
    return this.EmpCodeForm.get('name');
  }
  get PositionId() {
    return this.EmpCodeForm.get('PositionId');
  }
  get rigId() {
    return this.EmpCodeForm.get('rigId');
  }

  submitData() {
    console.log("here>>>>>>>>>")
    console.log(this.EmpCodeForm.value)
    if (this.EmpCodeForm.valid) {
      this.addDataService.AddEmpCode(this.EmpCodeForm.value).subscribe({
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
    }
    else {
      console.log("E+++++====error in : ");
      console.log(this.EmpCodeForm);
    }
  }


  // Download() {
  //   let workbook = new Workbook();

  //   let worksheet = workbook.addWorksheet("Employee Data");

  //   let header = [
  //     "Id",
  //     "Rig",
  //     "Time Of Event",
  //     "Date Of Event",
  //     "Type Of Injury",
  //     "Violation Category",
  //     "Accident Causes",
  //     "Prevention Category",
  //     "Classification Of Accident",
  //     "Accident Location",
  //     " Name",
  //     "Tool Pusher Name",
  //     "Tool Pusher Position",
  //     " Position",
  //     "Driller Name",
  //     "Description Of TheEvent",
  //     "Immediate Action Type",
  //     "Direct Causes",
  //     "Root Causes",
  //     "Recommendations",
  //     "User Name",
  //     "Pictures"
  //   ];

  //   // this.json_data.push(this.accidentForm.value)

  //   let headerRow = worksheet.addRow(header);

  //   for (let x1 of this.json_data) {
  //     let x2 = Object.keys(x1);
  //     let temp: any[] = []
  //     for (let y of x2) {
  //       temp.push(x1[y])
  //     }
  //     worksheet.addRow(temp)
  //   }

  //   let fname = "Accident Report"

  //   //add data and file name and download
  //   workbook.xlsx.writeBuffer().then((data) => {
  //     let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  //     saveAs.saveAs(blob, fname + '-' + new Date().toUTCString() + '.xlsx');
  //   });
  // }

}
