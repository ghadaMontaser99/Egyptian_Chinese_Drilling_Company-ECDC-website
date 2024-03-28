import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AddNewDrillServiceService } from 'Services/add-new-drill-service.service';
import { DataService } from 'Services/data.service';
import { LoginService } from 'Services/login.service';

@Component({
  selector: 'app-print-drill-by-id',
  templateUrl: './print-drill-by-id.component.html',
  styleUrls: ['./print-drill-by-id.component.scss']
})
export class PrintDrillByIdComponent {
  DrillObj!: any;
  ErrorMessage: string = '';
  DrillId!: any;
  Data: boolean = false;
  User:any;

  constructor(private loginService:LoginService,private activatedRoute: ActivatedRoute,private AddNewDrill: AddNewDrillServiceService, private dataService: DataService,) { }
  ngOnInit() {
    this.User=this.loginService.currentUser.getValue();
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.DrillId = params.get("id");
      console.log(this.DrillId)
    }),

  

 

      this.AddNewDrill.GetDrillByID(this.DrillId,this.User.ID,this.User.Role).subscribe({
        next: data => {
          this.DrillObj = data.data;
          this.Data = true;
          console.log("this.DrillObj");
  
          console.log(this.DrillObj)

          
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
