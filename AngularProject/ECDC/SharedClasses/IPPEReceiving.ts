import { PPE } from "./PPE"


export interface IPPEReceiving {
  id: number,
  rigId: number,
  date: Date,
  userId: string,
  isDeleted: boolean,
  ppedto: PPE[],
  thermalCoverallsSize: string,
  safetyBootsSize: string,
  normalCoverallsSize: string,
  employeeCode: number,
  employeePositionName: string,
  employeeName: string,
  qhseEmpCode: number,
  qhsePositionName: string,
  qhseEmpName: string,
 
}
