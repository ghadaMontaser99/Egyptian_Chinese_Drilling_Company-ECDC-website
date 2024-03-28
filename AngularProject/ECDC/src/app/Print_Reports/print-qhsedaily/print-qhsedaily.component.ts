import { Component } from '@angular/core';
import { AddQHSEDailyService } from 'Services/add-qhsedaily.service';
import { LoginService } from 'Services/login.service';

@Component({
  selector: 'app-print-qhsedaily',
  templateUrl: './print-qhsedaily.component.html',
  styleUrls: ['./print-qhsedaily.component.scss']
})
export class PrintQHSEDailyComponent {
  QHSEDaily: any[] = [];
  ErrorMessage: string = '';
  QHSEDailyRecord: any[] = [];
  Data: boolean = false;
  User: any;
  date!: Date;


  constructor(private loginService: LoginService, private QHSEDailyService: AddQHSEDailyService) { }
  ngOnInit() {
    this.User = this.loginService.currentUser.getValue();
    console.log("userrrrrrrrrrrrrr")
    console.log(this.User)
    console.log(this.User.ID)


    this.QHSEDailyService.GetQHSEDailys(this.User.ID, this.User.Role).subscribe({
      next: data => {
        data.data.forEach((ele: any) => {
          this.QHSEDaily.push(ele.date)
          console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$44")

          console.log(data.data)
          console.log(this.QHSEDaily)


        });
        // this.Accident = data.data;
        this.QHSEDaily = Array.from(new Set(this.QHSEDaily))
        console.log(this.QHSEDaily)
      },
      error: error => this.ErrorMessage = error
    })
  }

  DateSelected(event: any) {
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$44")
    console.log(event.target.value);

    this.QHSEDailyService.GetQHSEDailyByDate(event.target.value, this.User.ID, this.User.Role).subscribe({
      next: data => {
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
