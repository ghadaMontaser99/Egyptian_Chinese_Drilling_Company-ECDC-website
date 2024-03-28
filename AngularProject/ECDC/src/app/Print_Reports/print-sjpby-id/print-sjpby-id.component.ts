import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AddnewJMPService } from 'Services/addnew-jmp.service';

@Component({
  selector: 'app-print-sjpby-id',
  templateUrl: './print-sjpby-id.component.html',
  styleUrls: ['./print-sjpby-id.component.scss']
})
export class PrintSJPByIdComponent {

  ErrorMessage: string = '';
  SJPId!: any;
  SJPRecord: any;
  Approve: boolean = false;
  instructions: boolean = false;
  constructor(private jmpService: AddnewJMPService,private activatedRoute:ActivatedRoute) { }
  ngOnInit() {

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.SJPId = params.get("id");
      console.log(this.SJPId)
    }),
  

  
  
    this.jmpService.GetJMPBySN(this.SJPId).subscribe({
      next: data => {
        this.SJPRecord = data.data;
    
        console.log("done");
        console.log(this.SJPRecord);
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
