export interface IStopCardRegister {
  id: number,
  date: Date,
  classificationID: number,
  description: string,
  employeeCode: number,
  reportedByPosition: string,
  reportedByName: string,
  actionRequired: string,
  typeOfObservationCategoryID: number,
  status: string,
  stopWorkAuthorityApplied: string,
  userID: string,
}
