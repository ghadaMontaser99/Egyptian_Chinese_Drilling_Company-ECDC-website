import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { AddQHSEDailyService } from 'Services/add-qhsedaily.service';
import { DataService } from 'Services/data.service';
import { LoginService } from 'Services/login.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-admin-chart-qhsedaily-by-year',
  templateUrl: './admin-chart-qhsedaily-by-year.component.html',
  styleUrls: ['./admin-chart-qhsedaily-by-year.component.scss']
})
export class AdminChartQHSEDailyByYearComponent {
  clearChart(ID_Name:string) {
    const myElement = document.querySelector('#'+ ID_Name) as HTMLElement;
    
    myElement.remove()
    this.QHSEDailyRecord={};
    this.TotalManPowerHoursList=[];
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
  TotalManPowerHoursList:number[]=[]
  constructor(private loginService:LoginService,private dataService: DataService,private AddQHSEDailyService:AddQHSEDailyService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.User=this.loginService.currentUser.getValue();

   this.dataService.GetRig().subscribe({
    next:data=>{
      data.data.forEach((element:any) => {
       // var name= 'Rig-'+element.number
        this.RecordsNames.push('Rig-'+element.number)
        
      });
    }
  })
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
    let fname = "QHSE Daily Statics Compare By All Rigs Report"
    XLSX.writeFile(wb, fname + '-' + new Date().toUTCString() + '.xlsx');
  }

  SelectedYearr(event: any) {
    this.SelectedYear=event.target.value.toString();
    this.temp = true;
    this.AddQHSEDailyService.GetForAnalysisByYeaAllRigs(event.target.value).subscribe({
      next: (data:any) => {
        console.log(data.data)
        this.clearChart("myChart")
        this.QHSEDailyRecord=data.data;

        console.log("this.TotalManPowerHoursList")
        console.log(data.data.totalManPowerHoursList)

        this.AddCanvas("myChart","chart1")

        var myChart = new Chart("myChart", {
          type: 'bar',
          data: {
            labels:  this.RecordsNames,
            datasets: [{
              label: this.SelectedYear,
              data: 
              data.data.totalManPowerHoursList
                ,
              backgroundColor: [
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)'
              ],
              borderColor: [
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)'
              ],
              borderWidth: 1,
              datalabels: {
                color: [
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)'
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
   

    this.AddQHSEDailyService.GetForAnalysisByYeaAllRigs(event.target.value).subscribe({
      next: (data:any) => {
        console.log(data.data)
        this.clearChart("myChart2")
        //this.QHSEDailyRecord=data.data;

        console.log("this.drillsRecordsList")
        console.log(data.data.drillsRecordsList)

        this.AddCanvas("myChart2","chart2")

        var myChart2 = new Chart("myChart2", {
          type: 'bar',
          data: {
            labels:  this.RecordsNames,
            datasets: [{
              label: this.SelectedYear,
              data: 
              data.data.drillsRecordsList
                ,
              backgroundColor: [
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)'
              ],
              borderColor: [
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)'
              ],
              borderWidth: 1,
              datalabels: {
                color: [
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)'
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
   

    this.AddQHSEDailyService.GetForAnalysisByYeaAllRigs(event.target.value).subscribe({
      next: (data:any) => {
        console.log(data.data)
        this.clearChart("myChart3")
        //this.QHSEDailyRecord=data.data;

        console.log("this.StopCardsRecordsList")
        console.log(data.data.ptsmRecordsList)

        this.AddCanvas("myChart3","chart3")

        var myChart2 = new Chart("myChart3", {
          type: 'bar',
          data: {
            labels:  this.RecordsNames,
            datasets: [{
              label: this.SelectedYear,
              data: 
              data.data.ptsmRecordsList
                ,
              backgroundColor: [
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)'
              ],
              borderColor: [
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)'
              ],
              borderWidth: 1,
              datalabels: {
                color: [
                  'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)'
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

    this.AddQHSEDailyService.GetForAnalysisByYeaAllRigs(event.target.value).subscribe({
      next: (data:any) => {
        console.log(data.data)
        this.clearChart("myChart13")
        //this.QHSEDailyRecord=data.data;

        console.log("this.StopCardsRecordsList")
        console.log(data.data.ptsmRecordsList)

        this.AddCanvas("myChart13","chart13")

        var myChart13 = new Chart("myChart13", {
          type: 'bar',
          data: {
            labels:  this.RecordsNames,
            datasets: [{
              label: this.SelectedYear,
              data: 
              data.data.daysSinceLastLTIList
                ,
              backgroundColor: [
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)'
              ],
              borderColor: [
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)'
              ],
              borderWidth: 1,
              datalabels: {
                color: [
                  'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)'
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

    this.AddQHSEDailyService.GetForAnalysisByYeaAllRigs(event.target.value).subscribe({
      next: (data:any) => {
        console.log(data.data)
        this.clearChart("myChart4")
        //this.QHSEDailyRecord=data.data;

        console.log("this.TotalPTWList")
        console.log(data.data.TotalPTWList)

        this.AddCanvas("myChart4","chart4")

        var myChart4 = new Chart("myChart4", {
          type: 'bar',
          data: {
            labels:  this.RecordsNames,
            datasets: [{
              label: this.SelectedYear,
              data: 
              data.data.totalPTWList
                ,
              backgroundColor: [
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)'
              ],
              borderColor: [
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)'
              ],
              borderWidth: 1,
              datalabels: {
                color: [
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)'
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


    this.AddQHSEDailyService.GetForAnalysisByYeaAllRigs(event.target.value).subscribe({
      next: (data:any) => {
        console.log(data.data)
        this.clearChart("myChart5")
        //this.QHSEDailyRecord=data.data;

        console.log("this.LeadershipVisitsList")
        console.log(data.data.leadershipVisitsList)

        this.AddCanvas("myChart5","chart5")

        var myChart5 = new Chart("myChart5", {
          type: 'bar',
          data: {
            labels:  this.RecordsNames,
            datasets: [{
              label: this.SelectedYear,
              data: 
              data.data.leadershipVisitsList
                ,
              backgroundColor: [
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)'
              ],
              borderColor: [
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)'
              ],
              borderWidth: 1,
              datalabels: {
                color: [
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)'
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

    this.AddQHSEDailyService.GetForAnalysisByYeaAllRigs(event.target.value).subscribe({
      next: (data:any) => {
        console.log(data.data)
        this.clearChart("myChart6")
        //this.QHSEDailyRecord=data.data;

        console.log("this.QuizCrewNumberList")
        console.log(data.data.quizCrewNumberList)

        this.AddCanvas("myChart6","chart6")

        var myChart5 = new Chart("myChart6", {
          type: 'bar',
          data: {
            labels:  this.RecordsNames,
            datasets: [{
              label: this.SelectedYear,
              data: 
              data.data.quizCrewNumberList
                ,
              backgroundColor: [
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)'
              ],
              borderColor: [
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)'
              ],
              borderWidth: 1,
              datalabels: {
                color: [
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)'
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

    this.AddQHSEDailyService.GetForAnalysisByYeaAllRigs(event.target.value).subscribe({
      next: (data:any) => {
        console.log(data.data)
        this.clearChart("myChart7")
        //this.QHSEDailyRecord=data.data;

        console.log("this.SafetyAlertCrewNumberList")
        console.log(data.data.safetyAlertCrewNumberList)

        this.AddCanvas("myChart7","chart7")

        var myChart7 = new Chart("myChart7", {
          type: 'bar',
          data: {
            labels:  this.RecordsNames,
            datasets: [{
              label: this.SelectedYear,
              data: 
              data.data.safetyAlertCrewNumberList
                ,
              backgroundColor: [
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)'
              ],
              borderColor: [
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)'
              ],
              borderWidth: 1,
              datalabels: {
                color: [
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)'
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

    this.AddQHSEDailyService.GetForAnalysisByYeaAllRigs(event.target.value).subscribe({
      next: (data:any) => {
        console.log(data.data)
        this.clearChart("myChart8")
        //this.QHSEDailyRecord=data.data;

        console.log("this.MonthlyInspectionList")
        console.log(data.data.monthlyInspectionList)

        this.AddCanvas("myChart8","chart8")

        var myChart8= new Chart("myChart8", {
          type: 'bar',
          data: {
            labels:  this.RecordsNames,
            datasets: [{
              label: this.SelectedYear,
              data: 
              data.data.monthlyInspectionList
                ,
              backgroundColor: [
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)'
              ],
              borderColor: [
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)'
              ],
              borderWidth: 1,
              datalabels: {
                color: [
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)'
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

    this.AddQHSEDailyService.GetForAnalysisByYeaAllRigs(event.target.value).subscribe({
      next: (data:any) => {
        console.log(data.data)
        this.clearChart("myChart9")
        //this.QHSEDailyRecord=data.data;

        console.log("this.MonthlyInspectionList")
        console.log(data.data.monthlyInspectionList)

        this.AddCanvas("myChart9","chart9")

        var myChart9= new Chart("myChart9", {
          type: 'bar',
          data: {
            labels:  this.RecordsNames,
            datasets: [{
              label: this.SelectedYear,
              data: 
              data.data.weeklyInspectionList
                ,
              backgroundColor: [
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)'
              ],
              borderColor: [
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)'
              ],
              borderWidth: 1,
              datalabels: {
                color: [
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)'
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

    this.AddQHSEDailyService.GetForAnalysisByYeaAllRigs(event.target.value).subscribe({
      next: (data:any) => {
        console.log(data.data)
        this.clearChart("myChart10")
        //this.QHSEDailyRecord=data.data;

        console.log("this.recordableAccidentList")
        console.log(data.data.recordableAccidentList)

        this.AddCanvas("myChart10","chart10")

        var myChart10= new Chart("myChart10", {
          type: 'bar',
          data: {
            labels:  this.RecordsNames,
            datasets: [{
              label: this.SelectedYear,
              data: 
              data.data.recordableAccidentList
                ,
              backgroundColor: [
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)'
              ],
              borderColor: [
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)'
              ],
              borderWidth: 1,
              datalabels: {
                color: [
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)'
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

    this.AddQHSEDailyService.GetForAnalysisByYeaAllRigs(event.target.value).subscribe({
      next: (data:any) => {
        console.log(data.data)
        this.clearChart("myChart11")
        //this.QHSEDailyRecord=data.data;

        console.log("this.NonRecordableAccidentList")
        console.log(data.data.nonRecordableAccidentList)

        this.AddCanvas("myChart11","chart11")

        var myChart11= new Chart("myChart11", {
          type: 'bar',
          data: {
            labels:  this.RecordsNames,
            datasets: [{
              label: this.SelectedYear,
              data: 
              data.data.nonRecordableAccidentList
                ,
              backgroundColor: [
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)'
              ],
              borderColor: [
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)'
              ],
              borderWidth: 1,
              datalabels: {
                color: [
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)'
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

    this.AddQHSEDailyService.GetForAnalysisByYeaAllRigs(event.target.value).subscribe({
      next: (data:any) => {
        console.log(data.data)
        this.clearChart("myChart12")
       // this.QHSEDailyRecord=data.data;

        console.log("this.SafetyInductionList")
        console.log(data.data.safetyInductionList)

        this.AddCanvas("myChart12","chart12")

        var myChart12= new Chart("myChart12", {
          type: 'bar',
          data: {
            labels:  this.RecordsNames,
            datasets: [{
              label: this.SelectedYear,
              data: 
              data.data.safetyInductionList
                ,
              backgroundColor: [
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)'
              ],
              borderColor: [
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)'
              ],
              borderWidth: 1,
              datalabels: {
                color: [
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)'
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

    this.AddQHSEDailyService.GetForAnalysisByYeaAllRigs(event.target.value).subscribe({
      next: (data:any) => {
        console.log(data.data)
        this.clearChart("myChart13")
       // this.QHSEDailyRecord=data.data;

        console.log("this.SafetyInductionList")
        console.log(data.data.safetyInductionList)

        this.AddCanvas("myChart13","chart13")

        var myChart13= new Chart("myChart13", {
          type: 'bar',
          data: {
            labels:  this.RecordsNames,
            datasets: [{
              label: this.SelectedYear,
              data: 
              data.data.stopCardsRecordsList
                ,
              backgroundColor: [
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)',
                'rgba(0, 150, 0, 0.2)'
              ],
              borderColor: [
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)',
                'rgba(0, 150, 0, 1)'
              ],
              borderWidth: 1,
              datalabels: {
                color: [
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)',
                  'rgba(0, 150, 0, 1)'
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
