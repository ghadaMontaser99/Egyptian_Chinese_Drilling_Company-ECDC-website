import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddDataService } from 'Services/add-data.service';
import { DataService } from 'Services/data.service';
import { LoginService } from 'Services/login.service';
import { IRig } from 'SharedClasses/IRig';

@Component({
  selector: 'app-add-days-science-no-lti',
  templateUrl: './add-days-science-no-lti.component.html',
  styleUrls: ['./add-days-science-no-lti.component.scss']
})
export class AddDaysScienceNoLTIComponent {
  DaysScienceNoLTIForm!: FormGroup;
  ErrorMessage = '';
  json_data: any[] = [];
  rigList: IRig[] = []

  UserJsonString: any
  UserJsonObj: any
  extractedNumber: number | null = null;
  
  User:any;

  constructor(private loginService: LoginService, private dataService: DataService,private AdddataService: AddDataService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.User=this.loginService.currentUser.getValue();
   

      this.DaysScienceNoLTIForm = this.fb.group(
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

  f:boolean=false;
  Check(event:any)
  {
    console.log("seleccccteeedddd itttemmm")
    console.log(event.target.selectedIndex)
    this.f=false;
    this.dataService.GetDaysSinceNoLTITOCheck().subscribe({
      next: data => {

        data.data.forEach((ele:any) => {
          if( ele.rigId==event.target.value)
            {
              this.f=true;             
            }
        });
        console.log(data)
      },
      error: error => {
        console.log("from Error")
        console.log(error)
      }
    });
  }

  get id() {
    return this.DaysScienceNoLTIForm.get('id');
  }
  get rigId() {
    return this.DaysScienceNoLTIForm.get('rigId');
  }
  get days() {
    return this.DaysScienceNoLTIForm.get('days');
  }
  

  submitData() {
    if (this.DaysScienceNoLTIForm.valid) {
      console.log('before formData')
      // const Formdata = new FormData();
      // Formdata.append('id', this.id?.value);
      // Formdata.append('rigId', this.rigId?.value);
      // Formdata.append('daysScienceNoLTI', this.daysScienceNoLTI?.value);
      if(this.f==false)
      {
        this.AdddataService.AddDaysSinceNoLTI(this.DaysScienceNoLTIForm.value).subscribe({
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
      else
      {
        this.f=true;
      }
     
    }
    else {
      console.log("E+++++====error in : ");
      console.log(this.DaysScienceNoLTIForm);
    }
  }


 

 
}
