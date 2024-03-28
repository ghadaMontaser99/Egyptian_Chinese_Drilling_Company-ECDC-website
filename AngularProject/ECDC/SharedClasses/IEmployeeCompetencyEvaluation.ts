
export interface IEmployeeCompetencyEvaluation {
  id: number,
  rigId: number,
  date: Date,
  subjectId: number,
  description: string,

  qHSEEmpCode :number,
  qHSEPositionName :string,
  qHSEEmpName :string,

  employeeCode :number,
  employeePositionName :string,
  employeeName :string,

  userID: string,
  isDelete:boolean


}
