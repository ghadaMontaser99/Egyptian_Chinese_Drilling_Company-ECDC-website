import { Time } from "@angular/common"
import { IDrillImages } from "./IDrillImages"

export interface IDrill {
  id: number,
  rigId: number,

     date :Date ,
     drillTypeId:number,

     timeInitiated :string ,
     timeCompleted :string ,
     duration:string,
     
     drillScenario :string ,

    teamMemeberCode:number ,
    teamMemeberPosition :string ,
    teamMemeberName:string  ,

    teamMemeberCode1:number ,
    teamMemeberPosition1 :string ,
    teamMemeberName1:string  ,

    teamMemeberCode2:number ,
    teamMemeberPosition2 :string ,
    teamMemeberName2:string  ,

    teamMemeberCode3:number ,
    teamMemeberPosition3:string ,
    teamMemeberName3:string  ,

    teamMemeberCode4:number  ,
    teamMemeberPosition4:string   ,
    teamMemeberName4:string   ,

    teamMemeberCode5:number ,
    teamMemeberPosition5 :string ,
    teamMemeberName5:string  ,

    teamMemeberCode6:number ,
    teamMemeberPosition6:string ,
    teamMemeberName6:string  ,

    teamMemeberCode7:number  ,
    teamMemeberPosition7:string  ,
    teamMemeberName7:string   ,


    emergencyEquipmentUsed:string  ,
    effectivenessPoints :string,
    deficienciesPoints :string ,
    recommendations :string ,

    stpCode :number ,
    stpPositionName :string ,
    stpName :string ,

    qhseEmpCode :number ,
    qhsePositionName :string ,
    qhseEmpName :string ,

  userID: string,
  images:File[],
  isDeleted:boolean

}
