import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'Services/login.service';
import { PPEService } from 'Services/ppe.service';

@Component({
  selector: 'app-add-ppes',
  templateUrl: './add-ppes.component.html',
  styleUrls: ['./add-ppes.component.scss']
})
export class AddPPEsComponent {
  PPEForm!: FormGroup;
  ErrorMessage = '';
  // json_data: any[] = [];
  UserJsonString:any
  UserJsonObj:any

  constructor(private loginService:LoginService,private PPEService:PPEService,private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.PPEForm = this.fb.group(
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
    return this.PPEForm.get('id');
  }
  get name() {
    return this.PPEForm.get('name');
  }

  submitData() {
    if (this.PPEForm.valid) {
      this.PPEService.AddPPE(this.PPEForm.value).subscribe({
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
      console.log(this.PPEForm);
    }
  }
}
