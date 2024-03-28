import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { DataService } from 'Services/data.service';
import { LoginService } from 'Services/login.service';
import { PotentialHazardService } from 'Services/potential-hazard.service';
import { IPotentialHazard } from 'SharedClasses/IPotentialHazard';
import { IResponsibility } from 'SharedClasses/IResponsibility';
import { IRig } from 'SharedClasses/IRig';


@Component({
  selector: 'app-edit-potential-hazard',
  templateUrl: './edit-potential-hazard.component.html',
  styleUrls: ['./edit-potential-hazard.component.scss']
})
export class EditPotentialHazardComponent {
  PotentialHazardId: any;
  PotentialHazard: any;
  ErrorMessage: string = "";
  PotentialHazardForm!: FormGroup;
  //date: Date = new Date();
  rigList: IRig[] = []
  base64: any;
  SelectFiles:File[]=[];



  Responsibilty!:IResponsibility
  ResponsibiltyList:IResponsibility[]=[]

  fileToEdit!: File;

  UserJsonString: any
  UserJsonObj: any

  User:any;

  constructor(private loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private PotentialHazardService : PotentialHazardService,
    private fb: FormBuilder,
    private router: Router) { }


  ngOnInit(): void {
    this.User=this.loginService.currentUser.getValue();
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.PotentialHazardId = params.get("id");
      console.log("basic info")
      console.log(this.PotentialHazardId)
      console.log(this.User.ID)
      console.log(this.User.Role)

    }),
      this.PotentialHazardService.GetPotentialHazardByID(this.PotentialHazardId,this.User.ID,this.User.Role).subscribe({
        next: data => {
          this.PotentialHazard = data.data,

            console.log('*************************************************************')
     console.log(data)
          console.log('###################################################')

          const file = data.data.images;
          this.PotentialHazardForm.patchValue({
            images: file
          });
          this.PotentialHazardForm.get('images')?.updateValueAndValidity()
          console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasssssddddd")
        
          const reader = new FileReader();     //to reade image file and dispaly it
          reader.onload = () => {
            this.base64 = reader.result as string;
          }
          
          

         
     
        },
        error: (erorr: string) => this.ErrorMessage = erorr
      }),
      this.UserJsonString = JSON.stringify(this.loginService.currentUser.getValue()),
      this.UserJsonObj = JSON.parse(this.UserJsonString),
     
     
    this.PotentialHazardForm = this.fb.group({
      id: this.fb.control(0, [Validators.required]),
      rigId: this.fb.control('', [Validators.required]),
      pR_IssueDate: this.fb.control('', [Validators.required]),
      date: this.fb.control('', [Validators.required]),
      pR_No: this.fb.control('', [Validators.required]),
      pO_No: this.fb.control('', [Validators.required]),
      responibilityId: this.fb.control('', [Validators.required]),
      status: this.fb.control('', [Validators.required]),
      description: this.fb.control('', [Validators.required]),
      
      neededAction: this.fb.control('', [Validators.required]),
      title: this.fb.control('', [Validators.required]),
      userID: this.fb.control(this.UserJsonObj.ID, [Validators.required]),
      images: this.fb.control(null)
    }),
      // this.userID=this.UserJsonObj.ID;
      this.dataService.GetResponsibility().subscribe({
        next: data => {
          this.ResponsibiltyList = data.data,
            console.log(this.ResponsibiltyList)
        },
        error: err => {
          this.ErrorMessage = err,
            console.log(this.ErrorMessage)
        }
      }),
      this.dataService.GetRig().subscribe({
        next: data => {
          this.rigList = data.data,
            console.log(this.rigList)
        },
        error: err => {
          this.ErrorMessage = err,
            console.log(this.ErrorMessage)
        }
      })
      
      
  }

  

  


  


 

  

  
  get rigId() {
    return this.PotentialHazardForm.get('rigId');
  }
  get pR_IssueDate() {
    return this.PotentialHazardForm.get('pR_IssueDate');
  }
  get date() {
    return this.PotentialHazardForm.get('date');
  }
  get pR_No() {
    return this.PotentialHazardForm.get('pR_No');
  }
  get pO_No() {
    return this.PotentialHazardForm.get('pO_No');
  }
  get responibilityId() {
    return this.PotentialHazardForm.get('responibilityId');
  }
  get status() {
    return this.PotentialHazardForm.get('status');
  }

  get description() {
    return this.PotentialHazardForm.get('description');
  }
  get neededAction() {
    return this.PotentialHazardForm.get('neededAction');
  }
  get title() {
    return this.PotentialHazardForm.get('title');
  }
  get pusherCode() {
    return this.PotentialHazardForm.get('pusherCode');
  }
  get pusherPositionName() {
    return this.PotentialHazardForm.get('pusherPositionName');
  }
  get pusherName() {
    return this.PotentialHazardForm.get('pusherName');
  }
  get drillerCode() {
    return this.PotentialHazardForm.get('drillerCode');
  }
  get drillerPositionName() {
    return this.PotentialHazardForm.get('drillerPositionName');
  }
  
  // get pictures() {
  //   return this.accidentForm.get('pictures');
  // }
  get userID() {
    return this.PotentialHazardForm.get('userID');
  }
  get images() {
    return this.PotentialHazardForm.get('images');
  }


  submitData() {
    if (this.PotentialHazardForm.valid) {
      const Formdata = new FormData();
      Formdata.append('id', this.PotentialHazardId);
      Formdata.append('images', this.images?.value);
      Formdata.append('rigId', this.rigId?.value);
      Formdata.append('pR_IssueDate', this.pR_IssueDate?.value);
      Formdata.append('date', this.date?.value);
      Formdata.append('pR_No', this.pR_No?.value);
      Formdata.append('pO_No', this.pO_No?.value);
      Formdata.append('responibilityId', this.responibilityId?.value);
      Formdata.append('status', this.status?.value);
      Formdata.append('description', this.description?.value);
      Formdata.append('neededAction', this.neededAction?.value);

      Formdata.append('title', this.title?.value);
      // Formdata.append('pictures', this.pictures?.value);
      Formdata.append('userID', this.UserJsonObj.ID);
      for (let i = 0; i < this.SelectFiles.length; i++) {
        Formdata.append('images', this.SelectFiles[i]);
      }
      this.PotentialHazardService.EditPotentialHazard(Formdata,this.PotentialHazardId).subscribe({
        next: data => {
          console.log(data)
          this.router.navigate(['/PotentialHazard']);
        },
        error: error => console.log(error)
      });
      // console.log(this.accidentForm.value)
      // this.router.navigate(['/Dashboard/AccidentTable'])
    }
    else {
      console.log("E+++++====error in : ");
      console.log(this.PotentialHazardForm);
    }
  }


  GetImagePath(event: any) {
    this.SelectFiles = event.target.files;

    // const file = event.target.files[0];
    // this.PotentialHazardForm.patchValue({
    //   ImageOfaccident: file
    // });
    // this.PotentialHazardForm.get('images')?.updateValueAndValidity()

    // const reader = new FileReader();     //to reade image file and dispaly it
    // reader.onload = () => {
    //   this.base64 = reader.result as string;
    // }
    // reader.readAsDataURL(file)

      // const file: File = event.target.files[0];
      // this.fileToEdit = file;
  }

}
