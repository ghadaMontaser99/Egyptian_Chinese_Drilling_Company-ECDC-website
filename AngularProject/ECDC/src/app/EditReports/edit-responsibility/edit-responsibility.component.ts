import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { DataService } from 'Services/data.service';
import { EditDataService } from 'Services/edit-data.service';
import { LoginService } from 'Services/login.service';
import { IResponsibility } from 'SharedClasses/IResponsibility';

@Component({
  selector: 'app-edit-responsibility',
  templateUrl: './edit-responsibility.component.html',
  styleUrls: ['./edit-responsibility.component.scss']
})
export class EditResponsibilityComponent {
  ResponsibilityId: any;
  Responsibility!: IResponsibility;
  ResponsibilityForm!: FormGroup;
  ErrorMessage = '';
  ResponsibilityName:string='';
  NewResposibility!:IResponsibility;
  // json_data: any[] = [];
  UserJsonString: any
  UserJsonObj: any

  constructor(private EditDataService: EditDataService, 
    private DataService: DataService,
    private activatedRoute: ActivatedRoute, private loginService: LoginService,  private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.ResponsibilityId = params.get("id");
      console.log(this.ResponsibilityId)
    }),
      this.DataService.GetResponsibilityByID(this.ResponsibilityId).subscribe({
        next: data => {
          this.Responsibility = data.data,
          this.ResponsibilityName=data.data.name;
          console.log( this.ResponsibilityName)
            console.log('*************************************************************')
            
          console.log(this.Responsibility)
          console.log(this.Responsibility.id)
          console.log('###################################################')
        },
        error: (erorr: string) => this.ErrorMessage = erorr
      }),
      this.UserJsonString = JSON.stringify(this.loginService.currentUser.getValue())
    this.UserJsonObj = JSON.parse(this.UserJsonString);
    this.ResponsibilityForm = this.fb.group(
      {
        id: this.fb.control(
          this.ResponsibilityId,
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
    return this.ResponsibilityForm.get('id');
  }
  get name() {
    return this.ResponsibilityForm.get('name');
  }
  
  submitData() {
    console.log('this.ResponsibilityForm.value')
    console.log(this.ResponsibilityForm.value)
    console.log("idddddddddd")
    console.log(this.ResponsibilityId)
    if (this.ResponsibilityForm.valid) {
      console.log("newwww obbjjj")

      this.NewResposibility={
        id:this.ResponsibilityForm.value.id,
        name:this.ResponsibilityName,
        isDeleted:false
      }
      
      console.log( this.NewResposibility)
      const Formdata = new FormData();
      Formdata.append('id', this.id?.value);
      Formdata.append('name', this.name?.value);

      
      this.EditDataService.EditResponsibility(this.ResponsibilityId, Formdata).subscribe({
        next: data => {
          console.log(this.ResponsibilityForm.value)
          console.log('from service')
          console.log(data)
          this.router.navigate(['Dashboard/Responsibility']);
        },
        error: error => {
          console.log("from Error")
          console.log(error)
        }
      });
    }
    else {
      console.log("E+++++====error in : ");
      console.log(this.ResponsibilityForm.errors);
    }
  }
}
