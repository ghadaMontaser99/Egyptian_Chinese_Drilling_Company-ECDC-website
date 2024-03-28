import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { DataService } from 'Services/data.service';
import { EditDataService } from 'Services/edit-data.service';
import { LoginService } from 'Services/login.service';
import { IEmpCode } from 'SharedClasses/IEmpCode';
import { IRig } from 'SharedClasses/IRig';

@Component({
  selector: 'app-edit-emp-code',
  templateUrl: './edit-emp-code.component.html',
  styleUrls: ['./edit-emp-code.component.scss']
})
export class EditEmpCodeComponent {
  EmpCodeId:any;
  EmpCode!:IEmpCode;
  EmpCodeForm!: FormGroup;
  ErrorMessage = '';
  // json_data: any[] = [];
  UserJsonString:any
  UserJsonObj:any
  positonIdList:any;
  rigList:IRig[]=[];
  constructor(private dataService:DataService,private activatedRoute:ActivatedRoute,private loginService:LoginService,private editDataService:EditDataService,private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.EmpCodeId = params.get("id");
      console.log(this.EmpCodeId)
    }),
    this.dataService.GetEmpCodeByID(this.EmpCodeId).subscribe({
      next: data => {
        this.EmpCode = data.data,
        console.log('*************************************************************')
        console.log(this.EmpCode)
        console.log('###################################################')
      },
      error: (erorr: string) => this.ErrorMessage = erorr
    }),
    this.UserJsonString=JSON.stringify(this.loginService.currentUser.getValue())
    this.UserJsonObj=JSON.parse(this.UserJsonString);
    this.dataService.GetPositions().subscribe({
      next: data => this.positonIdList = data.data,
      error: err => this.ErrorMessage = err
    }),
    this.dataService.GetRig().subscribe({
      next: data => this.rigList = data.data,
      error: err => this.ErrorMessage = err
    }),
    this.EmpCodeForm = this.fb.group(
      {
        id: this.fb.control(
          this.EmpCodeId,
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
    )
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
    if (this.EmpCodeForm.valid) {
      this.editDataService.EditEmpCode( this.EmpCodeId,this.EmpCodeForm.value).subscribe({
        next: data => {
          console.log('from service')
          console.log(data)
          this.router.navigate(['Dashboard/EmpCode']);
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
}
