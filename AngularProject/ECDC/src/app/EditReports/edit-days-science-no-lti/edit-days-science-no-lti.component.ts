import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { DataService } from 'Services/data.service';
import { EditDataService } from 'Services/edit-data.service';
import { LoginService } from 'Services/login.service';
import { IDaysSinceNoLTI } from 'SharedClasses/IDaysSinceNoLTI';
import { IRig } from 'SharedClasses/IRig';

@Component({
  selector: 'app-edit-days-science-no-lti',
  templateUrl: './edit-days-science-no-lti.component.html',
  styleUrls: ['./edit-days-science-no-lti.component.scss']
})
export class EditDaysScienceNoLTIComponent {
  DaysScienceNoLTIId:any;
  DaysScienceNoLTI!:IDaysSinceNoLTI;
  DaysScienceNoLTIForm!: FormGroup;
  ErrorMessage = '';
  rigList:IRig[]=[];
  // json_data: any[] = [];
  UserJsonString:any
  UserJsonObj:any

  constructor(private dataService:DataService,private activatedRoute:ActivatedRoute,private loginService:LoginService,private editDataService:EditDataService,private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.DaysScienceNoLTIId = params.get("id");
      console.log(this.DaysScienceNoLTIId)
    }),
    this.dataService.GetDaysSinceNoLTIByID(this.DaysScienceNoLTIId).subscribe({
      next: data => {
        this.DaysScienceNoLTI = data.data,
        console.log('*************************************************************')
        console.log(this.DaysScienceNoLTI)
        console.log('###################################################')
      },
      error: (erorr: string) => this.ErrorMessage = erorr
    }),
    this.dataService.GetRig().subscribe({
      next: data => this.rigList = data.data,
      error: err => this.ErrorMessage = err
    }),
    this.UserJsonString=JSON.stringify(this.loginService.currentUser.getValue())
    this.UserJsonObj=JSON.parse(this.UserJsonString);
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
    )
   
      
    
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
      const Formdata = new FormData();
      Formdata.append('id', this.id?.value);
      Formdata.append('rigId', this.rigId?.value);

      Formdata.append('days', this.days?.value);
      this.editDataService.EditDaysSinceNoLTI(this.DaysScienceNoLTIId,Formdata).subscribe({
        next: data => {
          console.log(this.DaysScienceNoLTIForm.value)
          console.log('from service')
          console.log(data)
          this.router.navigate(['Dashboard/DaysSinceNoLTI']);
        },
        error: error => {
          console.log("from Error")
          console.log(error)
        }
      });
    }
    else {
      console.log("E+++++====error in : ");
      console.log(this.DaysScienceNoLTIForm);
    }
  }
}
