import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { DataService } from 'Services/data.service';
import { EditDataService } from 'Services/edit-data.service';
import { LoginService } from 'Services/login.service';
import { IDaysSinceNoFatality } from 'SharedClasses/IDaysSinceNoFatality';
import { IRig } from 'SharedClasses/IRig';

@Component({
  selector: 'app-edit-days-since-no-fatality',
  templateUrl: './edit-days-since-no-fatality.component.html',
  styleUrls: ['./edit-days-since-no-fatality.component.scss']
})
export class EditDaysSinceNoFatalityComponent {
  DaysSinceNoFatalityId:any;
  DaysSinceNoFatality!:IDaysSinceNoFatality;
  DaysSinceNoFatalityForm!: FormGroup;
  ErrorMessage = '';
  rigList:IRig[]=[];
  // json_data: any[] = [];
  UserJsonString:any
  UserJsonObj:any

  constructor(private dataService:DataService,private activatedRoute:ActivatedRoute,private loginService:LoginService,private editDataService:EditDataService,private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.DaysSinceNoFatalityId = params.get("id");
      console.log(this.DaysSinceNoFatalityId)
    }),
    this.dataService.GetDaysSinceNoFatalityByID(this.DaysSinceNoFatalityId).subscribe({
      next: data => {
        this.DaysSinceNoFatality = data.data,
        console.log('*************************************************************')
        console.log(this.DaysSinceNoFatality)
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
    )
   
      
    
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
      const Formdata = new FormData();
      Formdata.append('id', this.id?.value);
      Formdata.append('rigId', this.rigId?.value);

      Formdata.append('days', this.days?.value);
      this.editDataService.EditDaysSinceNoFatality(this.DaysSinceNoFatalityId,Formdata).subscribe({
        next: data => {
          console.log(this.DaysSinceNoFatalityForm.value)
          console.log('from service')
          console.log(data)
          this.router.navigate(['Dashboard/DaysSinceNoFatality']);
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
