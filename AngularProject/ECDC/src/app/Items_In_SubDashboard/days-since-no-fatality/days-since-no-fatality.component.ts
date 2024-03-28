import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DeleteDataService } from 'Services/delete-data.service';
import { GetdataByPageService } from 'Services/getdata-by-page.service';
import { LoginService } from 'Services/login.service';
import { IDaysSinceNoFatality } from 'SharedClasses/IDaysSinceNoFatality';
import { IDaysSinceNoLTI } from 'SharedClasses/IDaysSinceNoLTI';

@Component({
  selector: 'app-days-since-no-fatality',
  templateUrl: './days-since-no-fatality.component.html',
  styleUrls: ['./days-since-no-fatality.component.scss']
})
export class DaysSinceNoFatalityComponent {
  private ListOfDaysSinceNoFatality = new BehaviorSubject<IDaysSinceNoFatality[]>([]);
  readonly DaysSinceNoFatalityList = this.ListOfDaysSinceNoFatality.asObservable();
  page:number=1;
  count:number=0;
  productSize:number=5;
  indexofPages: number=1;
  countOfPage:number=0;
  TempArray:any[]=[];
  IsUser:boolean=false;
  IsRadio:boolean=false;
  IsAdmin:boolean=false;

  constructor(private getDataByPage:GetdataByPageService, private deleteService: DeleteDataService,private loginService:LoginService) { }

  ngOnInit(): void {
    this.getpages(1)
    this.loginService.isAdmin.subscribe({
      next: data => {
        this.IsAdmin=data
      }
     })
  }

  DeleteDaysSinceNoFatality(DaysSinceNoFatality: IDaysSinceNoFatality) {
    if (confirm("Are you sure you want to delete this Record?")) {
      // user clicked "Yes"
      // do something, such as call an API to delete the item
      this.deleteService.DeleteDaysSinceNoFatality(DaysSinceNoFatality).subscribe({
        next: data => {
          console.log("data")
          console.log(data)
          this.getpages(this.indexofPages)
        },
        error: err => {
          console.log(err);
        }
      })
    }
    else {
      // user clicked "No"
      // do nothing
    }
  }
  getpages(num:number)
  {
    this.getDataByPage.GetDaysSinceNoFatalityByPage(num).subscribe({
      next: data => {
        this.ListOfDaysSinceNoFatality.next(data.items)
        this.countOfPage=data.count;
        this.TempArray= new Array(this.countOfPage);
      },
      error: err => {
        console.log(err)
      }
    })
    this.indexofPages=num;
    console.log("getpages"+this.indexofPages);
  }
  gotleft()
  {
    (this.indexofPages>1)?this.indexofPages-=1:this.indexofPages=1;
    this.getpages(this.indexofPages);
    console.log("gotleft"+this.indexofPages);
  }
  gotoright()
  {

    (this.indexofPages<this.countOfPage)?this.indexofPages+=1:this.indexofPages=this.countOfPage;
    this.getpages(this.indexofPages);
    console.log("gotoright"+this.indexofPages);
  }
}
