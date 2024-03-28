import { Component } from '@angular/core';
import { LoginService } from 'Services/login.service';
import { PPEReceivingService } from 'Services/ppereceiving.service';
import * as moment from 'moment';

@Component({
  selector: 'app-print-ppereceiving',
  templateUrl: './print-ppereceiving.component.html',
  styleUrls: ['./print-ppereceiving.component.scss']
})
export class PrintPPEReceivingComponent {
  PPEReceiving: any[] = [];
  ErrorMessage: string = '';
  //  QHSECodeList: any;
  EmpCodeLists: any[] = [];
  EmpCode!: any;
  PPEReceivingRecord: any[] = [];
  Data: boolean = false;
  User: any;
  date!: Date;
  ppEs: any[] = [];
  extractedNumber: number = 0;
  extractedDate!: Date;


  constructor(private loginService: LoginService, private PPEReceivingService: PPEReceivingService) { }
  ngOnInit() {
    this.User = this.loginService.currentUser.getValue();
    console.log()


    this.PPEReceivingService.GetPPEReceivings(this.User.ID, this.User.Role).subscribe({
      next: data => {
        data.data.forEach((ele: any) => {
          this.PPEReceiving.push(ele)
          console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$44")

          console.log(data.data)
          console.log(this.PPEReceiving)


        });
        // this.Accident = data.data;
        this.PPEReceiving = Array.from(new Set(this.PPEReceiving))
        console.log(this.PPEReceiving)
      },
      error: error => this.ErrorMessage = error
    })
  }

  EmpCodeSelected(event: any) {
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$44")
    console.log(this.EmpCode)
    console.log(event.target.value);

    const match = event.target.value.match(/(\d+) \/ (\d{2}-\d{2}-\d{4})/);




    if (match) {
      this.extractedNumber = parseInt(match[1], 10);
      const dateParts = match[2].split('-');
      this.extractedDate = new Date(parseInt(dateParts[2], 10), parseInt(dateParts[1], 10) - 1, parseInt(dateParts[0], 10));

    }
    const inputDate = new Date(this.extractedDate);
    const day = String(inputDate.getDate()).padStart(2, '0');
    const month = String(inputDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
    const year = inputDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;



    

    console.log("---------------------------------------------------------")
    console.log(formattedDate); // Output: "14-12-2023"

    console.log(this.extractedNumber)
    console.log(this.extractedDate);


    this.PPEReceivingService.GetPPEReceivingtByEmpCodeNew(this.extractedNumber, this.User.ID, this.User.Role,formattedDate).subscribe({
      next: data => {
        this.PPEReceivingRecord = data.data as any; // Use "as any" to bypass type checking
        this.ppEs = data.data.ppEs;
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
