import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LoginService } from 'Services/login.service';
import { PPEReceivingService } from 'Services/ppereceiving.service';

@Component({
  selector: 'app-print-ppereceiving-by-id',
  templateUrl: './print-ppereceiving-by-id.component.html',
  styleUrls: ['./print-ppereceiving-by-id.component.scss']
})
export class PrintPPEReceivingByIdComponent {
  PPEReceivingId!: any;
  ErrorMessage: string = '';
  ppEs: any[] = [];
  PPEReceivingRecord!: any;
  Data: boolean = false;
  User: any;
  date!: Date;



  constructor(private loginService: LoginService, private PPEReceivingService: PPEReceivingService,   private activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.User = this.loginService.currentUser.getValue();
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.PPEReceivingId = params.get("id");
      console.log(this.PPEReceivingId)
    }),

    this.PPEReceivingService.PrintPPEReceivingByID(this.PPEReceivingId, this.User.ID, this.User.Role).subscribe({
      next: data => {
        this.PPEReceivingRecord = data.data as any; // Use "as any" to bypass type checking
        this.ppEs = data.data.ppEs;
        console.log( 'this.PPEReceivingRecord')
       console.log( this.PPEReceivingRecord)
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
