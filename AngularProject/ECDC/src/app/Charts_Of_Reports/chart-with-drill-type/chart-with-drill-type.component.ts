import { Component } from '@angular/core';
import { AddNewDrillServiceService } from 'Services/add-new-drill-service.service';
import { DataService } from 'Services/data.service';
import { LoginService } from 'Services/login.service';
import { IRig } from 'SharedClasses/IRig';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart-with-drill-type',
  templateUrl: './chart-with-drill-type.component.html',
  styleUrls: ['./chart-with-drill-type.component.scss'],
})
export class ChartWithDrillTypeComponent {

  clearChart(ID_Name: string) {
    const myElement = document.querySelector('#' + ID_Name) as HTMLElement;
    myElement.remove();

      this.other_Month1 = [];
      this.FireAid_Month1 = [];
      this.FireAndFirstAid_Month1 = [];
      this.Fire_Month1 = [];
      this.SpillDrill_Month1 = [];
      this.Evacuation_Month1 = [];
      this.HS_Month1 = [];
      this.Kick_Month1 = [];
      this.ConfinedSpace_Month1=[];

      this.other_Month2 = [];
      this.FireAid_Month2 = [];
      this.FireAndFirstAid_Month2 = [];
      this.Fire_Month2 = [];
      this.SpillDrill_Month2 = [];
      this.Evacuation_Month2 = [];
      this.HS_Month2 = [];
      this.Kick_Month2 = [];
      this.ConfinedSpace_Month2=[];
  }

  AddCanvas(ID_Name:string,DIV_Name:string) {
    // Create a new element
    var newElement = document.createElement('canvas');
    newElement.id=ID_Name

    // Get the parent element where you want to append the new element
    const myElement = document.querySelector('#'+DIV_Name) as HTMLElement;

   
  // Check if the element exists before appending
  if (myElement) {
    // Create a new element
    var newElement = document.createElement('canvas');
    newElement.id = ID_Name;

    // Append the new element to the parent element
    myElement.appendChild(newElement);
  } else {
    console.error(`Element with ID '${DIV_Name}' not found.`);
  }
  }
  temp: boolean = false;
  temp2: boolean = false;
  month1: number = 0;
  month2: number = 0;
  month1_Name: string = '';
  month2_Name: string = '';

  DrillType: any[] = [];
  YearList: any[] = [];

  DrillType_Month1: any[] = [];
  DrillType_Month2: any[] = [];

  Month!: number;

  User: any;
  IsUser: boolean = false;
  ErrorMessage: string = '';
  Year!: number;

  other_Month1: any[] = [];
  other_Month2: any[] = [];

  ConfinedSpace_Month1: any[] = [];
  ConfinedSpace_Month2: any[] = [];

  SpillDrill_Month1: any[] = [];
  SpillDrill_Month2: any[] = [];

  Evacuation_Month1: any[] = [];
  Evacuation_Month2: any[] = [];

  FireAndFirstAid_Month1: any[] = [];
  FireAndFirstAid_Month2: any[] = [];

  FireAid_Month1: any[] = [];
  FireAid_Month2: any[] = [];

  HS_Month2: any[] = [];
  HS_Month1: any[] = [];

  Fire_Month1: any[] = [];
  Fire_Month2: any[] = [];

  Kick_Month1: any[] = [];
  Kick_Month2: any[] = [];

  otherCount_Month1: number = 0;
  otherCount_Month2: number = 0;

  ConfinedSpaceCount_Month1: number = 0;
  ConfinedSpaceCount_Month2: number = 0;

  SpillDrillCount_Month1: number = 0;
  SpillDrillCount_Month2: number = 0;

  EvacuationCount_Month1: number = 0;
  EvacuationCount_Month2: number = 0;

  HSCount_Month2: number = 0;
  HSCount_Month1: number = 0;

  FireAndFirstAidCount_Month1: number = 0;
  FireAndFirstAidCount_Month2: number = 0;

  FireAidCount_Month1: number = 0;
  FireAidCount_Month2: number = 0;

  FireCount_Month1: number = 0;
  FireCount_Month2: number = 0;

  KickCount_Month1: number = 0;
  KickCount_Month2: number = 0;

  other_Year: any[] = [];

  ConfinedSpace_Year: any[] = [];

  SpillDrill_Year: any[] = [];

  Evacuation_Year: any[] = [];

  FireAndFirstAid_Year: any[] = [];

  FireAid_Year: any[] = [];

  HS_Year: any[] = [];

  Fire_Year: any[] = [];

  Kick_Year: any[] = [];

  otherCount_Year: number = 0;

  ConfinedSpaceCount_Year: number = 0;

  SpillDrillCount_Year: number = 0;

  EvacuationCount_Year: number = 0;

  HSCount_Year: number = 0;

  FireAndFirstAidCount_Year: number = 0;

  FireAidCount_Year: number = 0;

  FireCount_Year: number = 0;

  KickCount_Year: number = 0;
  constructor(
    private loginService: LoginService,
    private addNewDrill: AddNewDrillServiceService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.User = this.loginService.currentUser.getValue();
    if (this.User.Role == 'User') {
      this.IsUser = true;
    } else {
      this.IsUser = false;
    }

    this.dataService.GetDrillTypeList().subscribe({
      next: (data) => {
        data.data.forEach((element: { name: string }) => {
          this.DrillType.push(element.name);
          console.log('DrillType');
          console.log(this.DrillType);
        });
      },
    }),
      this.dataService.GetDrills(this.User.ID, this.User.Role).subscribe({
        next: (data) => {
          console.log('yearrrr', this.YearList);
          console.log('dataaaaaaaaaaaaa', data.data);

          data.data.forEach((element: any) => {
            const Date = Number(element.date.slice(0, 4));
            this.YearList.push(Date);
          });
          this.YearList = Array.from(new Set(this.YearList));
        },
      });
  }

  onChangeWithMonth1(event: any) {
    this.month1 = event.target.value;
    const myComboBox = document.getElementById('month1') as HTMLSelectElement;
    const selectedOption = myComboBox.options[myComboBox.selectedIndex];
    const selectedText = selectedOption.text;
    this.month1_Name = selectedText;
  }

  onChangeWithMonth2(event: any) {
    this.month2 = event.target.value;
    const myComboBox = document.getElementById('month2') as HTMLSelectElement;
    const selectedOption = myComboBox.options[myComboBox.selectedIndex];
    const selectedText = selectedOption.text;
    this.month2_Name = selectedText;
  }

  onYearChange(event: any) {
    this.Year = event.target.value;
  }

  onChangeByMonth() {
    console.log(this.month1);
    console.log(this.month2);
    console.log(this.month1_Name);
    console.log(this.month2_Name);
    this.temp=true;
    this.dataService
      .GetDrillByMonth(this.month1, this.month2, this.User.Role, this.User.ID)
      .subscribe({
        next: (data) => {
     
          console.log('data____________________________');
          console.log(data.data);
          this.clearChart("myChart1");
          data.data.forEach(
            (element: { date: Date; drillTypeName: string }) => {
              const validDate = new Date(element.date);
              console.log('validDate.getMonth() + 1')
              console.log(validDate.getMonth() + 1);
              if (element.drillTypeName == 'other' &&validDate.getMonth() + 1 == this.month1) 
              {
                this.other_Month1.push(element);
              } else if (
                element.drillTypeName == 'other' &&
                validDate.getMonth() + 1 == this.month2
              ) {
                this.other_Month2.push(element);
              } else if (
                element.drillTypeName == 'Confined space' &&
                validDate.getMonth() + 1 == this.month1
              ) {
                this.ConfinedSpace_Month1.push(element);
              } else if (
                element.drillTypeName == 'Confined space' &&
                validDate.getMonth() + 1 == this.month2
              ) {
                this.ConfinedSpace_Month2.push(element);
              } else if (
                element.drillTypeName == 'Spill Drill' &&
                validDate.getMonth() + 1 == this.month1
              ) {
                this.SpillDrill_Month1.push(element);
              } else if (
                element.drillTypeName == 'Spill Drill' &&
                validDate.getMonth() + 1 == this.month2
              ) {
                this.SpillDrill_Month2.push(element);
              } else if (
                element.drillTypeName == 'Evacuation' &&
                validDate.getMonth() + 1 == this.month1
              ) {
                this.Evacuation_Month1.push(element);
              } else if (
                element.drillTypeName == 'Evacuation' &&
                validDate.getMonth() + 1 == this.month2
              ) {
                this.Evacuation_Month2.push(element);
              } else if (
                element.drillTypeName == 'Fire and first aid' &&
                validDate.getMonth() + 1 == this.month1
              ) {
                this.FireAndFirstAid_Month1.push(element);
              } else if (
                element.drillTypeName == 'Fire and first aid' &&
                validDate.getMonth() + 1 == this.month2
              ) {
                this.FireAndFirstAid_Month2.push(element);
              } else if (
                element.drillTypeName == 'First aid' &&
                validDate.getMonth() + 1 == this.month1
              ) {
                this.FireAid_Month1.push(element);
              } else if (
                element.drillTypeName == 'First aid' &&
                validDate.getMonth() + 1 == this.month2
              ) {
                this.FireAid_Month2.push(element);
              } else if (
                element.drillTypeName == 'Fire' &&
                validDate.getMonth() + 1 == this.month1
              ) {
                this.Fire_Month1.push(element);
              } else if (
                element.drillTypeName == 'Fire' &&
                validDate.getMonth() + 1 == this.month2
              ) {
                this.Fire_Month2.push(element);
              } else if (
                element.drillTypeName == 'Kick' &&
                validDate.getMonth() + 1 == this.month1
              ) {
                this.Kick_Month1.push(element);
              } else if (
                element.drillTypeName == 'Kick' &&
                validDate.getMonth() + 1 == this.month2
              ) {
                this.Kick_Month2.push(element);
              } else if (
                element.drillTypeName == 'H2s' &&
                validDate.getMonth() + 1 == this.month1
              ) {
                this.HS_Month1.push(element);
              } else if (
                element.drillTypeName == 'H2s' &&
                validDate.getMonth() + 1 == this.month2
              ) {
                this.HS_Month2.push(element);
              }
            }
          );
          this.otherCount_Month1 = this.other_Month1.length;
          this.otherCount_Month2 = this.other_Month2.length;

          this.ConfinedSpaceCount_Month1 = this.ConfinedSpace_Month1.length;
          this.ConfinedSpaceCount_Month2 = this.ConfinedSpace_Month2.length;

          this.FireAidCount_Month1 = this.FireAid_Month1.length;
          this.FireAidCount_Month2 = this.FireAid_Month2.length;

          this.FireAndFirstAidCount_Month1 = this.FireAndFirstAid_Month1.length;
          this.FireAndFirstAidCount_Month2 = this.FireAndFirstAid_Month2.length;

          this.SpillDrillCount_Month1 = this.SpillDrill_Month1.length;
          this.SpillDrillCount_Month2 = this.SpillDrill_Month2.length;

          this.FireCount_Month1 = this.Fire_Month1.length;
          this.FireCount_Month2 = this.Fire_Month2.length;

          this.KickCount_Month1 = this.Kick_Month1.length;
          this.KickCount_Month2 = this.Kick_Month2.length;

          this.EvacuationCount_Month1 = this.Evacuation_Month1.length;
          this.EvacuationCount_Month2 = this.Evacuation_Month2.length;

          this.HSCount_Month1 = this.HS_Month1.length;
          this.HSCount_Month2 = this.HS_Month2.length;
          console.log('KickCount_Month1');
          console.log(this.KickCount_Month1);
          console.log('KickCount_Month2');
          console.log(this.KickCount_Month2);
          this.AddCanvas("myChart1", "chart1")

          var myChart1 = new Chart("myChart1", {
            type: 'bar',
            data: {
              labels: this.DrillType,
              datasets: [
                {
                  label: this.month1_Name,
                  data: [
                    this.KickCount_Month1,
                    this.ConfinedSpaceCount_Month1,
                    this.SpillDrillCount_Month1,
                    this.HSCount_Month1,
                    this.FireAndFirstAidCount_Month1,
                    this.FireAidCount_Month1,
                    this.FireCount_Month1,
                    this.EvacuationCount_Month1,
                    this.otherCount_Month1
                  ],
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                  ],
                  borderWidth: 1,
                  datalabels: {
                    color: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(255, 99, 132, 1)',
                      'rgba(255, 99, 132, 1)',
                      'rgba(255, 99, 132, 1)',
                    ],
                    font: {
                      size: 18,
                    },
                  },
                },
                {
                  label: this.month2_Name,
                  data: [
                    this.KickCount_Month2,
                    this.ConfinedSpaceCount_Month2,
                    this.SpillDrillCount_Month2,
                    this.HSCount_Month2,
                    this.FireAndFirstAidCount_Month2,
                    this.FireAidCount_Month2,
                    this.FireCount_Month2,
                    this.EvacuationCount_Month2,
                    this.otherCount_Month2

                  ],
                  backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                  ],
                  borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                  ],
                  borderWidth: 1,
                  datalabels: {
                    color: [
                      'rgba(54, 162, 235, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(54, 162, 235, 1)',
                    ],
                    font: {
                      size: 18,
                    },
                  },
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        },
        error: (err) => {
          console.log('Error', err);
        },
      });
  }

  onChangeByYear() {
    console.log(this.Year);
    this.temp2=true;
    this.dataService

      .GetDrillByYear(this.Year, this.User.Role, this.User.ID)
      .subscribe({
        next: (data:any) => {
          console.log('dataaaaaaaaaa2');
          console.log(data.data)
          this.clearChart('myChart2');
          data.data.forEach(
            (element: { rigId: number; drillTypeName: string }) => {
              console.log('element');
              console.log(element);
              if (element.drillTypeName == 'other') {
                this.other_Year.push(element);
              } else if (element.drillTypeName == 'Confined space') {
                this.ConfinedSpace_Year.push(element);
              } else if (element.drillTypeName == 'Spill Drill') {
                this.SpillDrill_Year.push(element);
              } else if (element.drillTypeName == 'Evacuation') {
                this.Evacuation_Year.push(element);
              } else if (element.drillTypeName == 'Fire and first aid') {
                this.FireAndFirstAid_Year.push(element);
              } else if (element.drillTypeName == 'First aid') {
                this.FireAid_Year.push(element);
              } else if (element.drillTypeName == 'Fire') {
                this.Fire_Year.push(element);
              } else if (element.drillTypeName == 'Kick') {
                this.Kick_Year.push(element);
              } else if (element.drillTypeName == 'H2s') {
                this.HS_Year.push(element);
              }
            }
          );
          this.otherCount_Year = this.other_Year.length;
          this.ConfinedSpaceCount_Year = this.ConfinedSpace_Year.length;
          this.FireAidCount_Year = this.FireAid_Year.length;
          this.FireAndFirstAidCount_Year = this.FireAndFirstAid_Year.length;
          this.SpillDrillCount_Year = this.SpillDrill_Year.length;
          this.FireCount_Year = this.Fire_Year.length;
          this.KickCount_Year = this.Kick_Year.length;
          this.EvacuationCount_Year = this.Evacuation_Year.length;
          this.HSCount_Year = this.HS_Year.length;

          this.AddCanvas('myChart2', 'chart2');

          var myChart2 = new Chart('myChart2', {
            type: 'bar',
            data: {
              labels: this.DrillType,
              datasets: [
                {
                  label: this.Year.toString(),
                  data: [
                    this.KickCount_Year,
                    this.ConfinedSpaceCount_Year,
                    this.SpillDrillCount_Year,
                    this.HSCount_Year,
                    this.FireAndFirstAidCount_Year,
                    this.FireAidCount_Year,
                    this.FireCount_Year,
                    this.EvacuationCount_Year,
                    this.otherCount_Year
                  ],
                  backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                  borderColor: ['rgba(255, 99, 132, 1)'],
                  borderWidth: 1,
                  datalabels: {
                    color: ['rgba(255, 99, 132, 1)'],
                    font: {
                      size: 18,
                    },
                  },
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        },
        error: (err) => {
          this.ErrorMessage = err;
        },
      });
  }
}
