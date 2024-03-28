import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LoginService } from 'Services/login.service';
import { stopcardservice } from 'Services/stop-card.service';

@Component({
  selector: 'app-print-stop-card-by-id',
  templateUrl: './print-stop-card-by-id.component.html',
  styleUrls: ['./print-stop-card-by-id.component.scss']
})
export class PrintStopCardByIdComponent {
  StopCards: any[] = [];
  ErrorMessage: string = '';
  date!: Date;
  StopCard!: any;
  Data: boolean = false;
  stopCardId:any;
  User: any;

  constructor(private activatedRoute:ActivatedRoute,private loginService: LoginService, private stopCardService: stopcardservice) { }
  ngOnInit() {
    this.User = this.loginService.currentUser.getValue();
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.stopCardId = params.get("id");
      console.log(this.stopCardId)
    }),
  




    this.stopCardService.PrintStopCardById( this.stopCardId,this.User.ID, this.User.Role).subscribe({
      next: data => {
        this.StopCard = data.data;
        this.Data = true;
        console.log("done");
        console.log("data.data");
        console.log(this.StopCard);
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
