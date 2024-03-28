import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AddBOPService } from 'Services/add-bop.service';
import { LoginService } from 'Services/login.service';

@Component({
  selector: 'app-print-pobby-id',
  templateUrl: './print-pobby-id.component.html',
  styleUrls: ['./print-pobby-id.component.scss']
})
export class PrintPOBByIdComponent {
  POBobj!: any;
  ErrorMessage: string = '';
  date!: Date;

  Data:boolean=false;
  POBId!:any;
  User:any;

  constructor(private addBopService:AddBOPService,private loginService:LoginService,private activatedRoute:ActivatedRoute) { }
  ngOnInit() {
   this.User= this.loginService.currentUser.getValue();
   
   this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
    this.POBId = params.get("id");
    console.log(this.POBId)
  }),
  




    this.addBopService.GeBOPById(this.POBId,this.User.ID,this.User.Role).subscribe({
      next: data => {
        console.log("data.data")
        console.log(data.data)
        this.POBobj = data.data;
        console.log("BBOOOOOOOPPPP************************")
        console.log(this.POBobj)

        this.Data=true;
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
