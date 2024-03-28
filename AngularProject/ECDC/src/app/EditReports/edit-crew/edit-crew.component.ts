import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { DataService } from 'Services/data.service';
import { EditDataService } from 'Services/edit-data.service';
import { LoginService } from 'Services/login.service';
import { ICrew } from 'SharedClasses/ICrew';

@Component({
  selector: 'app-edit-crew',
  templateUrl: './edit-crew.component.html',
  styleUrls: ['./edit-crew.component.scss']
})
export class EditCrewComponent {
  CrewId:any;
  Crew!:ICrew;
  CrewForm!: FormGroup;
  ErrorMessage = '';
  // json_data: any[] = [];
  UserJsonString:any
  UserJsonObj:any

  constructor(private dataService:DataService,private activatedRoute:ActivatedRoute,private loginService:LoginService,private editDataService:EditDataService,private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.CrewId = params.get("id");
      console.log(this.CrewId)
    }),
    this.dataService.GetCrewByID(this.CrewId).subscribe({
      next: data => {
        this.Crew = data.data,
        console.log('*************************************************************')
        console.log(this.Crew)
        console.log('###################################################')
      },
      error: (erorr: string) => this.ErrorMessage = erorr
    }),
    this.UserJsonString=JSON.stringify(this.loginService.currentUser.getValue())
    this.UserJsonObj=JSON.parse(this.UserJsonString);
    this.CrewForm = this.fb.group(
      {
        id: this.fb.control(
          this.CrewId,
          [
            Validators.required
          ]
        ),
        crewName: this.fb.control(
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
    return this.CrewForm.get('id');
  }
  get crewName() {
    return this.CrewForm.get('crewName');
  }

  submitData() {
    if (this.CrewForm.valid) {
      const Formdata = new FormData();
      Formdata.append('id', this.id?.value);
      Formdata.append('crewName', this.crewName?.value);
      this.editDataService.EditCrew(this.CrewId,Formdata).subscribe({
        next: data => {
          console.log(this.CrewForm.value)
          console.log('from service')
          console.log(data)
          this.router.navigate(['Dashboard/Crew']);
        },
        error: error => {
          console.log("from Error")
          console.log(error)
        }
      });
    }
    else {
      console.log("E+++++====error in : ");
      console.log(this.CrewForm);
    }
  }
}
