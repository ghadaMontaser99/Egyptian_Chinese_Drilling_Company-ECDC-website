import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AddNewAccidentService } from 'Services/add-new-accident.service';
import { DataService } from 'Services/data.service';
import { LoginService } from 'Services/login.service';

@Component({
  selector: 'app-print-accident-by-id',
  templateUrl: './print-accident-by-id.component.html',
  styleUrls: ['./print-accident-by-id.component.scss']
})
export class PrintAccidentByIdComponent {

  accidentId: any;
  ErrorMessage: string = '';
  AccidentRecord!: any;
  Data: boolean = false;
  User: any;
  date!: Date;


  constructor(private loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private AccidentService: AddNewAccidentService) { }
  ngOnInit() {
    this.User = this.loginService.currentUser.getValue();
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.accidentId = params.get("id");
      console.log(this.accidentId)
    }),
      this.AccidentService.PrintAccidentByID(this.accidentId, this.User.ID, this.User.Role).subscribe({
        next: data => {
          this.AccidentRecord = data.data as any;
          this.Data = true;
          console.log("done");
          console.log("data.data");
          console.log(this.AccidentRecord);
        },
        error: error => {
          this.ErrorMessage = error;
          console.log("Error");
        }
      })
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
