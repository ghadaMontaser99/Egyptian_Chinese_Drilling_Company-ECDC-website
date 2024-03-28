import { Time } from "@angular/common"

export interface IAccident {
  id: number,
  rigId: number,
  timeOfEvent: Time,
  dateOfEvent: Date,
  typeOfInjuryID: number,
  violationCategoryId: number,
  accidentCausesId: number,
  preventionCategoryId: number,
  classificationOfAccidentId: number,
  accidentLocation: string,

  qHSEEmpCode :number,
  qHSEPositionName :string,
  qHSEEmpName :string,

  pusherCode :number,
  pusherPositionName :string,
  pusherName :string,

  drillerCode :number,
  drillerPositionName :string,
  drillerName :string,

  injuredPersonCode :number,
  injuredPersonPositionName :string,
  injuredPersonName :string,

  descriptionOfTheEvent: string,
  immediateActionType: string,
  directCauses: string,
  rootCauses: string,
  recommendations: string,
  pictures: string,
  userID: string,
  imageOfaccident: File,


}
