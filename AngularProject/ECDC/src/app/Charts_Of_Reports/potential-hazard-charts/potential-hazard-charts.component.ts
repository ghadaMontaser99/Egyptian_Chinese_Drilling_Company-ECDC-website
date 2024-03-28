import { Component } from '@angular/core';
import { DataService } from 'Services/data.service';
import { IRig } from 'SharedClasses/IRig';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { LoginService } from 'Services/login.service';
import { PotentialHazardService } from 'Services/potential-hazard.service';
// import { RouterTestingHarness } from '@angular/router/testing';
Chart.register(ChartDataLabels);
Chart.register(...registerables);

@Component({
  selector: 'app-potential-hazard-charts',
  templateUrl: './potential-hazard-charts.component.html',
  styleUrls: ['./potential-hazard-charts.component.scss']
})
export class PotentialHazardChartsComponent {
  

  clearChart(ID_Name:string) {
    const myElement = document.querySelector('#'+ ID_Name) as HTMLElement;
    myElement.remove();
    this.Status = [];
    this.pushingListCounthing=[]
    this.Open = [];
  
    this. Closed = [];
   
    this. PotentialList=[];
    this. pushingList=[];
    
    this.Colors=[];
    this.ColorsBackground=[];

   this.PotentialListOpen=[];
 this.pushingListOpen = []
 this.pushingListCounthingOpen=[];
 this.ColorsOpen=[];
 this.ColorsBackgroundOpen=[]

 this.PotentialListClosed=[];
 this.pushingListClosed = []
 this.pushingListCounthingClosed=[];
 this.ColorsClosed=[];
 this.ColorsBackgroundClosed=[]
    
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
  ColorsBackground:any[]=[]

  Rigs:any[]=[];
  Status: string[] = [];
  Open: any[] = [];
  OpenCount: number = 0;
  Closed: any[] = [];
  ClosedCount: number = 0;
  PotentialList:any[]=[];
  pushingList:any[][] = []//any[]=[];
  pushingListCounthing:any[]=[];
  User:any;
  RigNames:string[]=[];
 Colors:string[]=[];
 test:string[]=['vvvv','fff','dddd']
 Year:any[]=[];
 YearsList:any[]=[];

 PotentialListOpen:any[]=[];
  pushingListOpen:any[][] = []
  pushingListCounthingOpen:any[]=[];
  ColorsOpen:string[]=[];
  ColorsBackgroundOpen:any[]=[]

  PotentialListClosed:any[]=[];
  pushingListClosed:any[][] = []
  pushingListCounthingClosed:any[]=[];
  ColorsClosed:string[]=[];
  ColorsBackgroundClosed:any[]=[]
  constructor(private dataService: DataService,private potentialHazardService: PotentialHazardService,private loginService:LoginService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.User=this.loginService.currentUser.getValue();
    this.Status=['Open','Closed']
    this.dataService.GetRig().subscribe({
      next:data=>{
        this.Rigs=data.data;
        this.Rigs.forEach(element => {
         // var name= 'Rig-'+element.number
          this.RigNames.push('Rig-'+element.number)
          
        });
        console.log('this.RigNames')
          console.log(this.RigNames)
      }
    })
    this.potentialHazardService.GetPotentialHazards(this.User.ID,this.User.Role).subscribe({
      next:data=>{
        data.data.forEach((ele: any) => {
          this.Year.push(ele.date)
        });
        console.log('this.Year')
        console.log(this.Year)
        this.Year.forEach((ele: any) => {
          const dateObject = new Date(ele);
          const year = dateObject.getFullYear();
          this.YearsList.push(year)
          this.YearsList= Array.from(new Set(this.YearsList))

        });
        console.log('year formmaaaaaaaaate')
        console.log(this.YearsList)
        
       
      }
    })
    
  
  
  
  
  }


  onChange(event: any) {
    console.log("event")
    console.log(event)
    const myComboBox = document.getElementById('month') as HTMLSelectElement;
    const selectedOption = myComboBox.options[myComboBox.selectedIndex];
    const selectedText = selectedOption.text;
    this.temp = true;
    console.log('selectedOption')
    console.log(selectedOption)
    console.log('selectedText')
    console.log(selectedText)
    console.log('event.target.value')
    console.log(event.target.value)
    


   
    this.potentialHazardService.GetForAnalysis(event.target.value,this.User.ID,this.User.Role).subscribe({
      next: data => {
        this.clearChart("myChart")
        this.PotentialList=data.data
       
       

        console.log(data.data)
  

   // Initialize pushingList as an empty 2D array

for (var i = 0; i < this.PotentialList.length; i++) {
  // Check if this item has been added to any row
  let added = false;

  for (var j = 0; j < this.pushingList.length; j++) {
    const row = this.pushingList[j];

    // Check if the item's rigId matches any item in the current row
    if (row.some(item => item.rigId === this.PotentialList[i].rigId)) {
      row.push(this.PotentialList[i]);
      added = true;
      break;
    }
  }

  // If the item wasn't added to any existing row, create a new row
  if (!added) {
    this.pushingList.push([this.PotentialList[i]]);
  }
}

    
    console.log('this.pushingList')
    console.log(this.PotentialList)
    console.log(this.pushingList)
    console.log(this.Rigs)
    



 this.pushingListCounthing = new Array(this.Rigs.length).fill(0);
 for (var i = 0; i < this.Rigs.length; i++){
  for (var j = 0; j < this.pushingList.length; j++) {
    let foundMatchInRow = false; // Flag to check if a match is found in the row
  
    for (var k = 0; k < this.pushingList[j].length; k++) {
    
        if (this.Rigs[i].id === this.pushingList[j][k].rigId) {
          foundMatchInRow = true;
          break; // Exit the inner loop once a match is found
        }
      
    }
  
    // If a match is found in the row, update the count in the result array
    if (foundMatchInRow) {
      this.pushingListCounthing[i] = this.pushingList[j].length;
    }
  }
 }

    
    
    console.log('this.pushingListCounthing')
    console.log(this.pushingListCounthing)

    for (let i = 0; i < this.pushingListCounthing.length; i++) {
      const red = Math.floor(Math.random() * 256);
      const green = Math.floor(Math.random() * 200);
      const blue = Math.floor(Math.random() * 256);
      const colorString = `rgba(${red}, ${green}, ${blue}, 1)`;
      const colorStringbackground = `rgba(${red}, ${green}, ${blue}, 0.2)`;
      this.ColorsBackground.push(colorStringbackground);
      this.Colors.push(colorString);
    }
        // data.data.forEach((element: { : string; }) => {
        //   if (element == 'Unsafe Act') {
        //     this.UnsafeAct.push(element)
        //   }
        //   else if (element.classification == 'Positive Remark') {
        //     this.PositiveRemark.push(element)
        //   }
        //   else if (element.classification == 'Unsafe Condition') {
        //     this.UnsafeCondition.push(element)
        //   }
        //   else {
        //     this.Other.push(element)
        //   }
        // });
        // this.UnsafeActCount = this.UnsafeAct.length
        // this.UnsafeConditionCount = this.UnsafeCondition.length
        // this.PositiveRemarkCount = this.PositiveRemark.length
        // this.OtherCount = this.Other.length


        this.AddCanvas("myChart","chart1")

        var myChart = new Chart("myChart", {
          type: 'bar',
          data: {
            labels: this.RigNames,
            datasets: [{
              label: selectedText,
              data: this.pushingListCounthing,
              backgroundColor: this.ColorsBackground
              // [
              //   'rgba(255, 99, 132, 0.2)',
              //   'rgba(54, 162, 235, 0.2)',
              //   'rgba(255, 206, 86, 0.2)',
              //   'rgba(75, 192, 192, 0.2)'
              // ]
              ,
              borderColor: this.Colors
              // [
              //   'rgba(255, 99, 132, 1)',
              //   'rgba(54, 162, 235, 1)',
              //   'rgba(255, 206, 86, 1)',
              //   'rgba(75, 192, 192, 1)'
              // ]
              ,
              borderWidth: 1,
              datalabels: {
                color:this.Colors
                //  [
                //   'rgba(255, 99, 132, 1)',
                //   'rgba(54, 162, 235, 1)',
                //   'rgba(255, 206, 86, 1)',
                //   'rgba(75, 192, 192, 1)'
                // ]
                ,
                font: {
                  size: 18,
                }
              }
            }]
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
    });

   



    this.potentialHazardService.GetForAnalysis(event.target.value,this.User.ID,this.User.Role).subscribe({
      next: data => {
        this.clearChart("myChart2")
        data.data.filter((a: any) => a.status == "Open").forEach((ele: any) => {
          this.PotentialListOpen.push(ele)
        });
       
       
console.log('this.PotentialListOpen')
        console.log(this.PotentialListOpen)

   // Initialize pushingList as an empty 2D array

for (var i = 0; i < this.PotentialListOpen.length; i++) {
  // Check if this item has been added to any row
  let added = false;

  for (var j = 0; j < this.pushingListOpen.length; j++) {
    const row = this.pushingListOpen[j];

    // Check if the item's rigId matches any item in the current row
    if (row.some(item => item.rigId === this.PotentialListOpen[i].rigId)) {
      row.push(this.PotentialListOpen[i]);
      added = true;
      break;
    }
  }

  // If the item wasn't added to any existing row, create a new row
  if (!added) {
    this.pushingListOpen.push([this.PotentialListOpen[i]]);
  }
}

    
    console.log('this.PotentialListOpen')
    console.log(this.PotentialListOpen)
    console.log('this.pushingListOpen')
    console.log(this.pushingListOpen)
    console.log(this.Rigs)
    



 this.pushingListCounthingOpen = new Array(this.Rigs.length).fill(0);
 for (var i = 0; i < this.Rigs.length; i++){
  for (var j = 0; j < this.pushingListOpen.length; j++) {
    let foundMatchInRow = false; // Flag to check if a match is found in the row
  
    for (var k = 0; k < this.pushingListOpen[j].length; k++) {
    
        if (this.Rigs[i].id === this.pushingListOpen[j][k].rigId) {
          foundMatchInRow = true;
          break; // Exit the inner loop once a match is found
        }
      
    }
  
    // If a match is found in the row, update the count in the result array
    if (foundMatchInRow) {
      this.pushingListCounthingOpen[i] = this.pushingListOpen[j].length;
    }
  }
 }

    
    
    console.log('this.pushingListCounthing')
    console.log(this.pushingListCounthingOpen)

    for (let i = 0; i < this.pushingListCounthingOpen.length; i++) {
      const red = Math.floor(Math.random() * 256);
      const green = Math.floor(Math.random() * 200);
      const blue = Math.floor(Math.random() * 256);
      const colorString = `rgba(${red}, ${green}, ${blue}, 1)`;
      const colorStringbackground = `rgba(${red}, ${green}, ${blue}, 0.2)`;
      this.ColorsBackgroundOpen.push(colorStringbackground);
      this.ColorsOpen.push(colorString);
    }


        this.AddCanvas("myChart2","chart2")

        var myChart2 = new Chart("myChart2", {
          type: 'bar',
          data: {
            labels: this.RigNames,
            datasets: [{
              label: "Status Open",
              data: this.pushingListCounthingOpen,
              backgroundColor: this.ColorsBackgroundOpen
              // [
              //   'rgba(255, 99, 132, 0.2)',
              //   'rgba(54, 162, 235, 0.2)',
              //   'rgba(255, 206, 86, 0.2)',
              //   'rgba(75, 192, 192, 0.2)'
              // ]
              ,
              borderColor: this.ColorsOpen
              // [
              //   'rgba(255, 99, 132, 1)',
              //   'rgba(54, 162, 235, 1)',
              //   'rgba(255, 206, 86, 1)',
              //   'rgba(75, 192, 192, 1)'
              // ]
              ,
              borderWidth: 1,
              datalabels: {
                color:this.ColorsOpen
                //  [
                //   'rgba(255, 99, 132, 1)',
                //   'rgba(54, 162, 235, 1)',
                //   'rgba(255, 206, 86, 1)',
                //   'rgba(75, 192, 192, 1)'
                // ]
                ,
                font: {
                  size: 18,
                }
              }
            }]
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
    });



    //the 3 chart for closed

    this.potentialHazardService.GetForAnalysis(event.target.value,this.User.ID,this.User.Role).subscribe({
      next: data => {
        this.clearChart("myChart3")
        data.data.filter((a: any) => a.status == "Closed").forEach((ele: any) => {
          this.PotentialListClosed.push(ele)
        });
       
       
console.log('this.PotentialListClosed')
        console.log(this.PotentialListClosed)

   // Initialize pushingList as an empty 2D array

for (var i = 0; i < this.PotentialListClosed.length; i++) {
  // Check if this item has been added to any row
  let added = false;

  for (var j = 0; j < this.pushingListClosed.length; j++) {
    const row = this.pushingListClosed[j];

    // Check if the item's rigId matches any item in the current row
    if (row.some(item => item.rigId === this.PotentialListClosed[i].rigId)) {
      row.push(this.PotentialListClosed[i]);
      added = true;
      break;
    }
  }

  // If the item wasn't added to any existing row, create a new row
  if (!added) {
    this.pushingListClosed.push([this.PotentialListClosed[i]]);
  }
}

    
    console.log('this.PotentialListClosed')
    console.log(this.PotentialListClosed)
    console.log('this.pushingListClosed')
    console.log(this.pushingListClosed)
    console.log(this.Rigs)
    



 this.pushingListCounthingClosed = new Array(this.Rigs.length).fill(0);
 for (var i = 0; i < this.Rigs.length; i++){
  for (var j = 0; j < this.pushingListClosed.length; j++) {
    let foundMatchInRow = false; // Flag to check if a match is found in the row
  
    for (var k = 0; k < this.pushingListClosed[j].length; k++) {
    
        if (this.Rigs[i].id === this.pushingListClosed[j][k].rigId) {
          foundMatchInRow = true;
          break; // Exit the inner loop once a match is found
        }
      
    }
  
    // If a match is found in the row, update the count in the result array
    if (foundMatchInRow) {
      this.pushingListCounthingClosed[i] = this.pushingListClosed[j].length;
    }
  }
 }

    
    
    console.log('this.pushingListCounthing')
    console.log(this.pushingListCounthingClosed)

    for (let i = 0; i < this.pushingListCounthingClosed.length; i++) {
      const red = Math.floor(Math.random() * 256);
      const green = Math.floor(Math.random() * 200);
      const blue = Math.floor(Math.random() * 256);
      const colorString = `rgba(${red}, ${green}, ${blue}, 1)`;
      const colorStringbackground = `rgba(${red}, ${green}, ${blue}, 0.2)`;
      this.ColorsBackgroundClosed.push(colorStringbackground);
      this.ColorsClosed.push(colorString);
    }


        this.AddCanvas("myChart3","chart3")

        var myChart3 = new Chart("myChart3", {
          type: 'bar',
          data: {
            labels: this.RigNames,
            datasets: [{
              label: "Status Closed",
              data: this.pushingListCounthingClosed,
              backgroundColor: this.ColorsBackgroundClosed
             
              ,
              borderColor: this.ColorsClosed
             
              ,
              borderWidth: 1,
              datalabels: {
                color:this.ColorsClosed
               
                ,
                font: {
                  size: 18,
                }
              }
            }]
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
    });

    
    

  

  }


  
}
