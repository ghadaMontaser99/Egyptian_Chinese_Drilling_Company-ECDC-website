import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddDataService } from 'Services/add-data.service';
import { DataService } from 'Services/data.service';
import { LoginService } from 'Services/login.service';
import { IRig } from 'SharedClasses/IRig';

@Component({
  selector: 'app-add-days-since-no-fatality',
  templateUrl: './add-days-since-no-fatality.component.html',
  styleUrls: ['./add-days-since-no-fatality.component.scss']
})
export class AddDaysSinceNoFatalityComponent {
  DaysSinceNoFatalityForm!: FormGroup;
  ErrorMessage = '';
  json_data: any[] = [];
  rigList: IRig[] = []

  UserJsonString: any
  UserJsonObj: any

  
  User:any;

  constructor(private loginService: LoginService, private dataService: DataService,private AdddataService: AddDataService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.User=this.loginService.currentUser.getValue();
   

      this.DaysSinceNoFatalityForm = this.fb.group(
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
      
          days: this.fb.control(
            '',
            [
              Validators.required
            ]
          ),
        
         
         
        }
      ),

      this.dataService.GetRig().subscribe({
        next: data => this.rigList = data.data,
        error: err => this.ErrorMessage = err
      }),
     
      this.UserJsonString = JSON.stringify(this.loginService.currentUser.getValue())
    this.UserJsonObj = JSON.parse(this.UserJsonString);
  }

  

  get id() {
    return this.DaysSinceNoFatalityForm.get('id');
  }
  get rigId() {
    return this.DaysSinceNoFatalityForm.get('rigId');
  }
  get days() {
    return this.DaysSinceNoFatalityForm.get('days');
  }
  

  submitData() {
    if (this.DaysSinceNoFatalityForm.valid) {
      console.log('before formData')
      // const Formdata = new FormData();
      // Formdata.append('id', this.id?.value);
      // Formdata.append('rigId', this.rigId?.value);
      // Formdata.append('DaysSinceNoFatality', this.DaysSinceNoFatality?.value);
      this.AdddataService.AddDaysSinceNoFatality(this.DaysSinceNoFatalityForm.value).subscribe({
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
      console.log(this.DaysSinceNoFatalityForm);
    }
}
}
