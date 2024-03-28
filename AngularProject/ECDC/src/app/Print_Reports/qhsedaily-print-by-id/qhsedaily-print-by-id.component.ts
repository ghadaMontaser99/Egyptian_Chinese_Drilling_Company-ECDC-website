import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AddQHSEDailyService } from 'Services/add-qhsedaily.service';
import { LoginService } from 'Services/login.service';

@Component({
  selector: 'app-qhsedaily-print-by-id',
  templateUrl: './qhsedaily-print-by-id.component.html',
  styleUrls: ['./qhsedaily-print-by-id.component.scss']
})
export class QHSEDailyPrintByIdComponent {
  QHSEDaily: any[] = [];
  ErrorMessage: string = '';
  QHSEDailyRecord: any[] = [];
  Data: boolean = false;
  User: any;
  date!: Date;
  formId:any;

  constructor(private loginService: LoginService, private QHSEDailyService: AddQHSEDailyService,  private activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.User = this.loginService.currentUser.getValue();
    console.log("userrrrrrrrrrrrrr")
    console.log(this.User)
    console.log(this.User.ID)
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.formId = params.get("id");
      console.log(this.formId)
    }),
    this.QHSEDailyService.GetQHSEDailyPrintByID(this.formId, this.User.ID, this.User.Role).subscribe({
      next: data => {
        console.log("printtt dataa")
        console.log(data.data)

        this.QHSEDailyRecord = data.data as any; // Use "as any" to bypass type checking     
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
