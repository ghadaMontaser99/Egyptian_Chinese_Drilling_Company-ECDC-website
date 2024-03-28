import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EditDataService } from 'Services/edit-data.service';
import { LoginService } from 'Services/login.service';
import { IDrillType } from 'SharedClasses/IDrillType';

@Component({
  selector: 'app-edit-drill-types',
  templateUrl: './edit-drill-types.component.html',
  styleUrls: ['./edit-drill-types.component.scss']
})
export class EditDrillTypesComponent {

  drillTypeListId:any;
  drillTypeList!:IDrillType;
  drillTypeListForm!: FormGroup;
  ErrorMessage = '';
  // json_data: any[] = [];
  UserJsonString:any
  UserJsonObj:any

  constructor(private activatedRoute:ActivatedRoute,private loginService:LoginService,private editDataService:EditDataService,private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.drillTypeListId = params.get("id");
      console.log(this.drillTypeListId)
    }),
    this.editDataService.GetDrillTypesById(this.drillTypeListId).subscribe({
      next: data => {
        this.drillTypeList = data.data,
        console.log('*************************************************************')
        console.log(this.drillTypeList)
        console.log('###################################################')
      },
      error: (erorr: string) => this.ErrorMessage = erorr
    }),
    this.UserJsonString=JSON.stringify(this.loginService.currentUser.getValue())
    this.UserJsonObj=JSON.parse(this.UserJsonString);
    this.drillTypeListForm = this.fb.group(
      {
        id: this.fb.control(
          this.drillTypeListId,
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
    return this.drillTypeListForm.get('id');
  }
  get name() {
    return this.drillTypeListForm.get('name');
  }

  submitData() {
    if (this.drillTypeListForm.valid) {
      const Formdata = new FormData();
         Formdata.append('id', this.id?.value);
         Formdata.append('name', this.name?.value);
      this.editDataService.EditDrillTypes(this.drillTypeListId,Formdata).subscribe({
        next: data => {
          console.log('from service')
          console.log(data)
          this.router.navigate(['Dashboard/DrillType']);
        },
        error: error => {
          console.log("from Error")
          console.log(error)
        }
      });
    }
    else {
      console.log("E+++++====error in : ");
      console.log(this.drillTypeListForm);
    }
  }


}
