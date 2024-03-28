import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LoginService } from 'Services/login.service';
import { PPEService } from 'Services/ppe.service';
import { PPE } from 'SharedClasses/PPE';

@Component({
  selector: 'app-edit-ppes',
  templateUrl: './edit-ppes.component.html',
  styleUrls: ['./edit-ppes.component.scss']
})
export class EditPPEsComponent {
  PPEId: any;
  PPE!: PPE;
  PPEForm!: FormGroup;
  ErrorMessage = '';
  // json_data: any[] = [];
  UserJsonString: any
  UserJsonObj: any

  constructor(private PPEService: PPEService, private activatedRoute: ActivatedRoute, private loginService: LoginService,  private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.PPEId = params.get("id");
      console.log(this.PPEId)
    }),
      this.PPEService.GetPPEByID(this.PPEId).subscribe({
        next: data => {
          this.PPE = data.data,
            console.log('*************************************************************')
          console.log(this.PPE)
          console.log('###################################################')
        },
        error: (erorr: string) => this.ErrorMessage = erorr
      }),
      this.UserJsonString = JSON.stringify(this.loginService.currentUser.getValue())
    this.UserJsonObj = JSON.parse(this.UserJsonString);
    this.PPEForm = this.fb.group(
      {
        id: this.fb.control(
          this.PPEId,
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
    return this.PPEForm.get('id');
  }
  get name() {
    return this.PPEForm.get('name');
  }

  submitData() {
    if (this.PPEForm.valid) {
      this.PPEService.EditPPE(this.PPEId, this.PPEForm.value).subscribe({
        next: data => {
          console.log(this.PPEForm.value)
          console.log('from service')
          console.log(data)
          this.router.navigate(['Dashboard/PPE']);
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
