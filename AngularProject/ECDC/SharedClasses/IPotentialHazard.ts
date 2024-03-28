import { Time } from "@angular/common"
import { IHazardImages } from "./IHazardImages"

export interface IPotentialHazard {
  id: number,
  rigId: number,
  pR_IssueDate: Date,
  date: Date,
  pR_No: number,
  pO_No: number,
  responibilityId: number,
  status: string,
  description: string,
  neededAction :string,
  userID: string,
  title:string,

  images:File[],
  isDeleted:boolean

}
