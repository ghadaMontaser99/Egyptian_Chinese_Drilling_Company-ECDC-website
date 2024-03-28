import { Component } from '@angular/core';
import { DataService } from 'Services/data.service';
import { LoginService } from 'Services/login.service';
import { PPEService } from 'Services/ppe.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-ppes',
  templateUrl: './ppes.component.html',
  styleUrls: ['./ppes.component.scss']
})
export class PPEsComponent {
  private ListOfPPE = new BehaviorSubject<any[]>([]);
  readonly PPEList = this.ListOfPPE.asObservable();
  page:number=1;
  count:number=0;
  productSize:number=5;
  indexofPages: number=1;
  countOfPage:number=0;
  TempArray:any[]=[];
  IsUser:boolean=false;
  IsRadio:boolean=false;
  IsAdmin:boolean=false;

  constructor(private PPEService:PPEService,private dataService: DataService, private loginService:LoginService) { }

  ngOnInit(): void {
    this.getpages(1)
    this.loginService.isAdmin.subscribe({
      next: data => {
        this.IsAdmin=data
      }
     })
  }

  DeletePPE(PPE: any) {
    if (confirm("Are you sure you want to delete this Record?")) {
      // user clicked "Yes"
      // do something, such as call an API to delete the item
      this.PPEService.DeletePPE(PPE).subscribe({
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
    this.PPEService.GetPPEByPage(num).subscribe({
      next: data => {
        this.ListOfPPE.next(data.items)
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
