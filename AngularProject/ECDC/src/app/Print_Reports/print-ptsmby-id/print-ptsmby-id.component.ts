import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LoginService } from 'Services/login.service';
import { PTSMService } from 'Services/ptsm.service';

@Component({
  selector: 'app-print-ptsmby-id',
  templateUrl: './print-ptsmby-id.component.html',
  styleUrls: ['./print-ptsmby-id.component.scss']
})
export class PrintPTSMByIdComponent {

  ErrorMessage: string = '';


  PTSMObject: any;

  Data: boolean = false;
  PTSMId!: any;
  User: any;

  constructor(private PTSMService: PTSMService, private loginService: LoginService, private activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.User = this.loginService.currentUser.getValue();
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.PTSMId = params.get("id");
      console.log(this.PTSMId)
    }),



      this.PTSMService.GePTSMById(this.PTSMId, this.User.ID, this.User.Role)
        .subscribe({
          next: data => {
            console.log("data.data")
            console.log(data.data)
            this.PTSMObject = data.data;
            console.log(this.PTSMObject)

            this.Data = true;
          },
          error: error => {
            this.ErrorMessage = error;
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

      // Get the styles of the entire HTML page
      const pageStyles = window.getComputedStyle(document.body);

      // Append the styles to the head element of the iframe
      const style = document.createElement('style');
      style.textContent = pageStyles.cssText;
      idoc.head.appendChild(style);

      // Add CSS rule to define a page break before each element in the print media
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
