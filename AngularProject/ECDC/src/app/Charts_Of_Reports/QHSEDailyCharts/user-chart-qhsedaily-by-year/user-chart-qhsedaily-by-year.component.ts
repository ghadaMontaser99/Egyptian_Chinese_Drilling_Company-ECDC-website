import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { AddQHSEDailyService } from 'Services/add-qhsedaily.service';
import { DataService } from 'Services/data.service';
import { LoginService } from 'Services/login.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-user-chart-qhsedaily-by-year',
  templateUrl: './user-chart-qhsedaily-by-year.component.html',
  styleUrls: ['./user-chart-qhsedaily-by-year.component.scss']
})
export class UserChartQHSEDailyByYearComponent {
  clearChart(ID_Name:string) {
    const myElement = document.querySelector('#'+ ID_Name) as HTMLElement;
    
    myElement.remove()
    this.QHSEDailyRecord={};
    
    }

  AddCanvas(ID_Name:string,DIV_Name:string) {
    // Create a new element
    var newElement = document.createElement('canvas');
    newElement.id=ID_Name

    // Get the parent element where you want to append the new element
    const myElement = document.querySelector('#'+DIV_Name) as HTMLElement;

    // Append the new element to the parent element
    myElement.appendChild(newElement);
  }

  temp: boolean = false;
 

  QHSEDailyRecord:any;
  RecordsNames:string[] = [];
  Year:number[]=[];
  YearsList:number[]=[];
  SelectedYear:string='';
  User:any;

  constructor(private loginService:LoginService,private dataService: DataService,private AddQHSEDailyService:AddQHSEDailyService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.User=this.loginService.currentUser.getValue();
    this.RecordsNames=['Total Man Power Hours','Stop Cards','PTSM','Drills'
    ,'Recordable Accident','Non-RecordableAccident','Safety Induction',
   'Total PTW','Leadership Visits','Quiz','Safety Alert','Monthly Inspection',
   'Weekly Inspection'];


this.AddQHSEDailyService.GetQHSEDailys(this.User.ID,this.User.Role).subscribe({
  next:(data:any)=>{
    data.data.forEach((ele: any) => {
      this.Year.push(ele.date)
    });

    this.Year.forEach((ele: any) => {
      const dateObject = new Date(ele);
      const year = dateObject.getFullYear();
      this.YearsList.push(year)
      this.YearsList= Array.from(new Set(this.YearsList))

    });
  }
})
  
  }
   
  exportExcel(): void {
    const element = document.getElementById('tableId');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    let fname = "QHSE Daily Statics Compare By Year Report"
    XLSX.writeFile(wb, fname + '-' + new Date().toUTCString() + '.xlsx');
  }

  SelectedYearr(event: any) {
    this.SelectedYear=event.target.value.toString();
    this.temp = true;
    this.AddQHSEDailyService.GetForAnalysisByYear(this.User.ID,event.target.value).subscribe({
      next: (data:any) => {
        console.log(data.data)
        this.clearChart("myChart")
        this.QHSEDailyRecord=data.data;

        
        

        this.AddCanvas("myChart","chart1")

        var myChart = new Chart("myChart", {
          type: 'bar',
          data: {
            labels:  this.RecordsNames,
            datasets: [{
              label: this.SelectedYear,
              data: [
                this.QHSEDailyRecord.countTotalManPowerHoursYear,
                this.QHSEDailyRecord.countStopCardsYear,
                this.QHSEDailyRecord.countPTSMYear,
                this.QHSEDailyRecord.countDrillsYear,
                this.QHSEDailyRecord.countRecordableAccidentYear,
                this.QHSEDailyRecord.countNonRecordableAccidentYear,
                this.QHSEDailyRecord.countSafetyInductionYear,
                this.QHSEDailyRecord.countTotalPTWYear,
                this.QHSEDailyRecord.countLeadershipVisitsYear,
                this.QHSEDailyRecord.countQuizNumberCrewYear,
                this.QHSEDailyRecord.countSafetyNumberCrewYear,
                this.QHSEDailyRecord.countMonthlyInspectionYear,
                this.QHSEDailyRecord.countWeeklyInspectionYear
              ],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 1,
              datalabels: {
                color: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)'
                ],
                font: {
                  size: 18,
                }
              }
            }

          ]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

      }
    })
   
   
  }
}
