import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { DataService } from 'Services/data.service';
import { EditDataService } from 'Services/edit-data.service';
import { LoginService } from 'Services/login.service';
import { IPosition } from 'SharedClasses/IPosition';

@Component({
  selector: 'app-edit-position',
  templateUrl: './edit-position.component.html',
  styleUrls: ['./edit-position.component.scss']
})
export class EditPositionComponent {
  PositionId:any;
  Position!:IPosition;
  PositionForm!: FormGroup;
  ErrorMessage = '';
  // json_data: any[] = [];
  UserJsonString:any
  UserJsonObj:any

  constructor(private dataService:DataService,private activatedRoute:ActivatedRoute,private loginService:LoginService,private editDataService:EditDataService,private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.PositionId = params.get("id");
      console.log(this.PositionId)
    }),
    this.dataService.GetPositionByID(this.PositionId).subscribe({
      next: data => {
        this.Position = data.data,
        console.log('*************************************************************')
        console.log(this.Position)
        console.log('###################################################')
      },
      error: (erorr: string) => this.ErrorMessage = erorr
    }),
    this.UserJsonString=JSON.stringify(this.loginService.currentUser.getValue())
    this.UserJsonObj=JSON.parse(this.UserJsonString);
    this.PositionForm = this.fb.group(
      {
        id: this.fb.control(
          this.PositionId,
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
    return this.PositionForm.get('id');
  }
  get name() {
    return this.PositionForm.get('name');
  }

  submitData() {
    if (this.PositionForm.valid) {
      this.editDataService.EditPositon(this.PositionId,this.PositionForm.value).subscribe({
        next: data => {
          console.log(this.PositionForm.value)
          console.log('from service')
          console.log(data)
          this.router.navigate(['Dashboard/Position']);
        },
        error: error => {
          console.log("from Error")
          console.log(error)
        }
      });
    }
    else {
      console.log("E+++++====error in : ");
      console.log(this.PositionForm);
    }
  }
}
