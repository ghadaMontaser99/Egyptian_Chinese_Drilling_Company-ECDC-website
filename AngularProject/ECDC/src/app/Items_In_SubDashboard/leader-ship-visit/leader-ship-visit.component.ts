import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from 'Services/data.service';
import { DeleteDataService } from 'Services/delete-data.service';
import { GetdataByPageService } from 'Services/getdata-by-page.service';
import { LoginService } from 'Services/login.service';
import { ILeadershipVisits } from 'SharedClasses/ILeadershipVisits';

@Component({
  selector: 'app-leader-ship-visit',
  templateUrl: './leader-ship-visit.component.html',
  styleUrls: ['./leader-ship-visit.component.scss']
})
export class LeaderShipVisitComponent {
  private ListOfLeadershipVisits = new BehaviorSubject<ILeadershipVisits[]>([]);
  readonly LeadershipVisitsList = this.ListOfLeadershipVisits.asObservable();
  page:number=1;
  count:number=0;
  productSize:number=5;
  indexofPages: number=1;
  countOfPage:number=0;
  TempArray:any[]=[];
  IsUser:boolean=false;
  IsRadio:boolean=false;
  IsAdmin:boolean=false;

  constructor(private getDataByPage:GetdataByPageService,private dataService: DataService, private deleteService: DeleteDataService,private loginService:LoginService) { }

  ngOnInit(): void {
    this.getpages(1)
    this.loginService.isAdmin.subscribe({
      next: data => {
        this.IsAdmin=data
      }
     })
  }

  DeleteLeadershipVisits(LeadershipVisits: ILeadershipVisits) {
    if (confirm("Are you sure you want to delete this Record?")) {
      // user clicked "Yes"
      // do something, such as call an API to delete the item
      this.deleteService.DeleteLeadershipVists(LeadershipVisits).subscribe({
        next: data => {
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
    this.getDataByPage.GetLeadershipVisitByPage(num).subscribe({
      next: data => {
        this.ListOfLeadershipVisits.next(data.items)
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
