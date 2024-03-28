import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AddnewEmployeeCompetencyEvaluationService } from 'Services/addnew-employee-competency-evaluation.service';
import { DataService } from 'Services/data.service';
import { LoginService } from 'Services/login.service';

@Component({
  selector: 'app-print-employee-competency-evaluationt-by-id',
  templateUrl: './print-employee-competency-evaluationt-by-id.component.html',
  styleUrls: ['./print-employee-competency-evaluationt-by-id.component.scss']
})
export class PrintEmployeeCompetencyEvaluationtByIdComponent {
  employeeCompetencyEvaluationtId!: any;
  ErrorMessage: string = '';

  EmployeeCompetencyEvaluationRecord!: any;
  Data: boolean = false;
  User: any;


  constructor(private loginService: LoginService, private AddNewEmployeeCompetencyEvaluation: AddnewEmployeeCompetencyEvaluationService, private dataService: DataService, private activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.User = this.loginService.currentUser.getValue();
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.employeeCompetencyEvaluationtId = params.get("id");
      console.log(this.employeeCompetencyEvaluationtId)
    }),

      this.AddNewEmployeeCompetencyEvaluation.PrintEmployeeCompetencyEvaluationtByID(this.employeeCompetencyEvaluationtId, this.User.ID, this.User.Role).subscribe({
        next: data => {
          this.EmployeeCompetencyEvaluationRecord = data.data as any; // Use "as any" to bypass type checking
          console.log('this.EmployeeCompetencyEvaluationRecord')
          console.log(this.EmployeeCompetencyEvaluationRecord)
          this.Data = true;
        },
        error: error => {
          this.ErrorMessage = error;
        }
      });


  }

  print(): void {
    const elements = Array.from(document.getElementsByClassName("print-section"));

    const iframe = document.body.appendChild(document.createElement("iframe"));
    iframe.style.display = "none";
    const idoc = iframe.contentDocument;

    if (idoc != null) {
      idoc.head.innerHTML = document.head.innerHTML;
      elements.forEach(element => {
        idoc.body.appendChild(element.cloneNode(true));
      });

      const pageStyles = window.getComputedStyle(document.body);

      const style = document.createElement('style');
      style.textContent = pageStyles.cssText;
      idoc.head.appendChild(style);

      const breakRule = `@media print {
    .print-section {
      page-break-before: always;
    }
  }`;

      style.textContent += breakRule;

      window.setTimeout(() => {
        iframe.contentWindow?.print();
        document.body.removeChild(iframe);
      }, 1000);
    }
  }
}
