import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EditDataService } from 'Services/edit-data.service';
import { LoginService } from 'Services/login.service';
import { ISubjectList } from 'SharedClasses/ISubjectList';

@Component({
  selector: 'app-edit-subject-list-employee-competency-evaluation',
  templateUrl: './edit-subject-list-employee-competency-evaluation.component.html',
  styleUrls: ['./edit-subject-list-employee-competency-evaluation.component.scss']
})
export class EditSubjectListEmployeeCompetencyEvaluationComponent {

  subjectListId:any;
  subjectList!:ISubjectList;
  subjectListForm!: FormGroup;
  ErrorMessage = '';
  // json_data: any[] = [];
  UserJsonString:any
  UserJsonObj:any

  constructor(private activatedRoute:ActivatedRoute,private loginService:LoginService,private editDataService:EditDataService,private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.subjectListId = params.get("id");
      console.log(this.subjectListId)
    }),
    this.editDataService.GetSubjectListById(this.subjectListId).subscribe({
      next: data => {
        this.subjectList = data.data,
        console.log('*************************************************************')
        console.log(this.subjectList)
        console.log('###################################################')
      },
      error: (erorr: string) => this.ErrorMessage = erorr
    }),
    this.UserJsonString=JSON.stringify(this.loginService.currentUser.getValue())
    this.UserJsonObj=JSON.parse(this.UserJsonString);
    this.subjectListForm = this.fb.group(
      {
        id: this.fb.control(
          this.subjectListId,
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
    return this.subjectListForm.get('id');
  }
  get name() {
    return this.subjectListForm.get('name');
  }

  submitData() {
    if (this.subjectListForm.valid) {
      this.editDataService.EditSubjectList(this.subjectListForm.value).subscribe({
        next: data => {
          console.log('from service')
          console.log(data)
          this.router.navigate(['Dashboard/SubjectList']);
        },
        error: error => {
          console.log("from Error")
          console.log(error)
        }
      });
    }
    else {
      console.log("E+++++====error in : ");
      console.log(this.subjectListForm);
    }
  }

}
