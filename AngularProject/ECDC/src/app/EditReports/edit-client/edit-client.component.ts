import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { DataService } from 'Services/data.service';
import { EditDataService } from 'Services/edit-data.service';
import { LoginService } from 'Services/login.service';
import { IClient } from 'SharedClasses/IClient';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent {
  ClientId:any;
  Client!:IClient;
  ClientForm!: FormGroup;
  ErrorMessage = '';
  // json_data: any[] = [];
  UserJsonString:any
  UserJsonObj:any

  constructor(private dataService:DataService,private activatedRoute:ActivatedRoute,private loginService:LoginService,private editDataService:EditDataService,private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.ClientId = params.get("id");
      console.log(this.ClientId)
    }),
    this.dataService.GetClientByID(this.ClientId).subscribe({
      next: data => {
        this.Client = data.data,
        console.log('*************************************************************')
        console.log(this.Client)
        console.log('###################################################')
      },
      error: (erorr: string) => this.ErrorMessage = erorr
    }),
    this.UserJsonString=JSON.stringify(this.loginService.currentUser.getValue())
    this.UserJsonObj=JSON.parse(this.UserJsonString);
    this.ClientForm = this.fb.group(
      {
        id: this.fb.control(
          this.ClientId,
          [
            Validators.required
          ]
        ),
        clientName: this.fb.control(
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
    return this.ClientForm.get('id');
  }
  get clientName() {
    return this.ClientForm.get('clientName');
  }

  submitData() {
    if (this.ClientForm.valid) {
      const Formdata = new FormData();
      Formdata.append('id', this.id?.value);
      Formdata.append('clientName', this.clientName?.value);
      this.editDataService.EditClient(this.ClientId,Formdata).subscribe({
        next: data => {
          console.log(this.ClientForm.value)
          console.log('from service')
          console.log(data)
          this.router.navigate(['Dashboard/Client']);
        },
        error: error => {
          console.log("from Error")
          console.log(error)
        }
      });
    }
    else {
      console.log("E+++++====error in : ");
      console.log(this.ClientForm);
    }
  }
}
