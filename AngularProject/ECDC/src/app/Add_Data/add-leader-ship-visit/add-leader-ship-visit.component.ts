import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddDataService } from 'Services/add-data.service';
import { LoginService } from 'Services/login.service';

@Component({
  selector: 'app-add-leader-ship-visit',
  templateUrl: './add-leader-ship-visit.component.html',
  styleUrls: ['./add-leader-ship-visit.component.scss']
})
export class AddLeaderShipVisitComponent {
  LeadershipVisitsForm!: FormGroup;
  ErrorMessage = '';
  // json_data: any[] = [];
  UserJsonString:any
  UserJsonObj:any

  constructor(private loginService:LoginService,private addDataService:AddDataService,private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.LeadershipVisitsForm = this.fb.group(
      {
        id: this.fb.control(
          0,
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
    ),
    this.UserJsonString=JSON.stringify(this.loginService.currentUser.getValue())
    this.UserJsonObj=JSON.parse(this.UserJsonString);
  }

  get id() {
    return this.LeadershipVisitsForm.get('id');
  }
  get leadershipType() {
    return this.LeadershipVisitsForm.get('leadershipType');
  }

  submitData() {
    if (this.LeadershipVisitsForm.valid) {
      this.addDataService.AddLeadershipVisits(this.LeadershipVisitsForm.value).subscribe({
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
      console.log(this.LeadershipVisitsForm);
    }
  }
}
