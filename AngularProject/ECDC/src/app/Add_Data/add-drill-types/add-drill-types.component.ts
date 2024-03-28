import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddDataService } from 'Services/add-data.service';
import { LoginService } from 'Services/login.service';

@Component({
  selector: 'app-add-drill-types',
  templateUrl: './add-drill-types.component.html',
  styleUrls: ['./add-drill-types.component.scss']
})
export class AddDrillTypesComponent {

  drillTypes!: FormGroup;
  ErrorMessage = '';
  // json_data: any[] = [];
  UserJsonString:any
  UserJsonObj:any

  constructor(private loginService:LoginService,private addDataService:AddDataService,private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.drillTypes = this.fb.group(
      {
        id: this.fb.control(
          0,
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
    ),
    this.UserJsonString=JSON.stringify(this.loginService.currentUser.getValue())
    this.UserJsonObj=JSON.parse(this.UserJsonString);
  }

  get id() {
    return this.drillTypes.get('id');
  }
  get name() {
    return this.drillTypes.get('name');
  }

  submitData() {
    if (this.drillTypes.valid) {
      this.addDataService.AddDrillTypes(this.drillTypes.value).subscribe({
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
      console.log(this.drillTypes);
    }
  }


}
