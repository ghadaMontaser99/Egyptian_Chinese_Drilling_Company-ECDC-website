import { Component } from '@angular/core';
import { AddNewDrillServiceService } from 'Services/add-new-drill-service.service';
import { DataService } from 'Services/data.service';
import { LoginService } from 'Services/login.service';
import { IEmergencyResponseTeamMembers } from 'SharedClasses/IEmergencyResponseTeamMembers';

@Component({
  selector: 'app-print-drill',
  templateUrl: './print-drill.component.html',
  styleUrls: ['./print-drill.component.scss']
})
export class PrintDrillComponent {
  Drill: any[] = [];
  ErrorMessage: string = '';



  DrillType!: string;
  DrillRecord: any[] = [];
  Data: boolean = false;
  User:any;
  date!: Date;
  extractedNumber: number = 0;
  extractedDate!: Date;
  constructor(private loginService:LoginService,private AddNewDrill: AddNewDrillServiceService, private dataService: DataService) { }
  ngOnInit() {
    this.User=this.loginService.currentUser.getValue();
    console.log()
    this.dataService.GetDrills(this.User.ID,this.User.Role).subscribe({
      next: data => {
        data.data.forEach((ele: any) => {
          this.Drill.push(ele)
          console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$44")
          console.log(data.data)
          console.log(this.Drill)
        });
        // this.Accident = data.data;
       this.Drill = Array.from(new Set(this.Drill))
        console.log(this.Drill)
      },
      error: error => this.ErrorMessage = error
    })
  }

  

  DrillTypeAndRigAndDateSelected(event: any) {
    console.log(event.target.value)
   
   
    const regex = /(\d+) \/ ([\w\s]+) \/ (\d{2}-\d{2}-\d{4})/;
    const match = event.target.value.match(regex);
    
    if (match) {
      const rigNumber = match[1];  // Extracted number
      const drillType = match[2].trim();  // Extracted string with leading/trailing spaces trimmed
      const date = match[3];    // Extracted date
      console.log("Number: " + rigNumber);
      console.log("String: " + drillType);
      console.log("Date: " + date);

      this.AddNewDrill.GetDrillByDrillType(drillType,this.User.ID,this.User.Role,date,rigNumber).subscribe({
        next: data => {
          this.DrillRecord = data.data;
          this.Data = true;
          console.log("dtoooooooo");
  
          console.log(this.DrillRecord[0])
  
          console.log("done");
          
        },
        error: error => {
          this.ErrorMessage = error;
          console.log("Error");
        }
      })
    } else {
      console.log("No match found");
    }
    


  
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
