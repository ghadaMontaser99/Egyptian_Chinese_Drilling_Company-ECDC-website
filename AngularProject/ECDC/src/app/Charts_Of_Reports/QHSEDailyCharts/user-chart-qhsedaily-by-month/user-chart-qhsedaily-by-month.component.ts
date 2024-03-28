import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { AddQHSEDailyService } from 'Services/add-qhsedaily.service';
import { DataService } from 'Services/data.service';
import { LoginService } from 'Services/login.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-user-chart-qhsedaily-by-month',
  templateUrl: './user-chart-qhsedaily-by-month.component.html',
  styleUrls: ['./user-chart-qhsedaily-by-month.component.scss']
})
export class UserChartQHSEDailyByMonthComponent {
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


  month1: number = 0;
  month2: number = 0;
  month1_Name: string = '';
  month2_Name: string = '';

  temp: boolean = false;
 

  QHSEDailyRecord:any;
  RecordsNames:string[] = [];
  Year:number[]=[];
  YearsList:number[]=[];
  SelectedYear:number=0;
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
  next:data=>{
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
    let fname = "QHSE Daily Statics Compare By Month Report"
    XLSX.writeFile(wb, fname + '-' + new Date().toUTCString() + '.xlsx');
  }

  onYearChange(event: any)
  {
    this.SelectedYear = event.target.value
    //const myComboBox = document.getElementById('Year') as HTMLSelectElement;
    //const selectedOption = myComboBox.options[myComboBox.selectedIndex];
    //const selectedText = selectedOption.text;
    //this.month1_Name = selectedText
  }
  onMonth1Change(event: any) {
    this.month1 = event.target.value
    const myComboBox = document.getElementById('month1') as HTMLSelectElement;
    const selectedOption = myComboBox.options[myComboBox.selectedIndex];
    const selectedText = selectedOption.text;
    this.month1_Name = selectedText
  }

  onMonth2Change(event: any) {
    this.month2 = event.target.value
    const myComboBox = document.getElementById('month2') as HTMLSelectElement;
    const selectedOption = myComboBox.options[myComboBox.selectedIndex];
    const selectedText = selectedOption.text;
    this.month2_Name = selectedText
  }

  onChange(event: any) {
    console.log(this.month1)
    console.log(this.month2)
    console.log(this.month1_Name)
    console.log(this.month2_Name)
    this.temp = true;
    this.AddQHSEDailyService.GetForAnalysisByMonth(this.User.ID,this.SelectedYear, this.month1, this.month2).subscribe({
      next: data => {
        console.log(data.data)
        this.clearChart("myChart")
        this.QHSEDailyRecord=data.data;

        
        

        this.AddCanvas("myChart","chart1")

        var myChart = new Chart("myChart", {
          type: 'bar',
          data: {
            labels:  this.RecordsNames,
            datasets: [{
              label: this.month1_Name,
              data: [
                this.QHSEDailyRecord.countTotalManPowerHoursMonth1,
                this.QHSEDailyRecord.countStopCardsMonth1,
                this.QHSEDailyRecord.countPTSMMonth1,
                this.QHSEDailyRecord.countDrillsMonth1,
                this.QHSEDailyRecord.countRecordableAccidentMonth1,
                this.QHSEDailyRecord.countNonRecordableAccidentMonth1,
                this.QHSEDailyRecord.countSafetyInductionMonth1,
                this.QHSEDailyRecord.countTotalPTWMonth1,
                this.QHSEDailyRecord.countLeadershipVisitsMonth1,
                this.QHSEDailyRecord.countQuizNumberCrewMonth1,
                this.QHSEDailyRecord.countSafetyNumberCrewMonth1,
                this.QHSEDailyRecord.countMonthlyInspectionMonth1,
                this.QHSEDailyRecord.countWeeklyInspectionMonth1
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
            ,{
              label: this.month2_Name,
              data: [
                this.QHSEDailyRecord.countTotalManPowerHoursMonth2,
                this.QHSEDailyRecord.countStopCardsMonth2,
                this.QHSEDailyRecord.countPTSMMonth2,
                this.QHSEDailyRecord.countDrillsMonth2,
                this.QHSEDailyRecord.countRecordableAccidentMonth2,
                this.QHSEDailyRecord.countNonRecordableAccidentMonth2,
                this.QHSEDailyRecord.countSafetyInductionMonth2,
                this.QHSEDailyRecord.countTotalPTWMonth2,
                this.QHSEDailyRecord.countLeadershipVisitsMonth2,
                this.QHSEDailyRecord.countQuizNumberCrewMonth2,
                this.QHSEDailyRecord.countSafetyNumberCrewMonth2,
                this.QHSEDailyRecord.countMonthlyInspectionMonth2,
                this.QHSEDailyRecord.countWeeklyInspectionMonth2              ],
              backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)'
              ],
              borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)'
              ],
              borderWidth: 1,
              datalabels: {
                color: [
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)'
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
