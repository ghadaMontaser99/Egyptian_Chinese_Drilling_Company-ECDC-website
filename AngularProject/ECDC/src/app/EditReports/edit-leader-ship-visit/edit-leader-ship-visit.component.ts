import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { DataService } from 'Services/data.service';
import { EditDataService } from 'Services/edit-data.service';
import { LoginService } from 'Services/login.service';
import { ILeadershipVisits } from 'SharedClasses/ILeadershipVisits';

@Component({
  selector: 'app-edit-leader-ship-visit',
  templateUrl: './edit-leader-ship-visit.component.html',
  styleUrls: ['./edit-leader-ship-visit.component.scss']
})
export class EditLeaderShipVisitComponent {
  LeadershipVisitsId:any;
  LeadershipVisits!:ILeadershipVisits;
  LeadershipVisitsForm!: FormGroup;
  ErrorMessage = '';
  // json_data: any[] = [];
  UserJsonString:any
  UserJsonObj:any

  constructor(private dataService:DataService,private activatedRoute:ActivatedRoute,private loginService:LoginService,private editDataService:EditDataService,private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.LeadershipVisitsId = params.get("id");
      console.log(this.LeadershipVisitsId)
    }),
    this.dataService.GetLeadershipVisitsByID(this.LeadershipVisitsId).subscribe({
      next: data => {
        this.LeadershipVisits = data.data,
        console.log('*************************************************************')
        console.log(this.LeadershipVisits)
        console.log('###################################################')
      },
      error: (erorr: string) => this.ErrorMessage = erorr
    }),
    this.UserJsonString=JSON.stringify(this.loginService.currentUser.getValue())
    this.UserJsonObj=JSON.parse(this.UserJsonString);
    this.LeadershipVisitsForm = this.fb.group(
      {
        id: this.fb.control(
          this.LeadershipVisitsId,
          [
            Validators.required
          ]
        ),
        leadershipType: this.fb.control(
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
    return this.LeadershipVisitsForm.get('id');
  }
  get leadershipType() {
    return this.LeadershipVisitsForm.get('leadershipType');
  }

  submitData() {
    if (this.LeadershipVisitsForm.valid) {
      const Formdata = new FormData();
      Formdata.append('id', this.id?.value);
      Formdata.append('leadershipType', this.leadershipType?.value);
      this.editDataService.EditLeadershipVisits(this.LeadershipVisitsId,Formdata).subscribe({
        next: data => {
          console.log(this.LeadershipVisitsForm.value)
          console.log('from service')
          console.log(data)
          this.router.navigate(['Dashboard/LeadershipVisit']);
        },
        error: error => {
          console.log("from Error")
          console.log(error)
        }
      });
    }
    else {
      console.log("E+++++====error in : ");
      console.log(this.LeadershipVisitsForm);
    }
  }
}
