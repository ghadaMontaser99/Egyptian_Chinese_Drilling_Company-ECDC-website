import { LeaderShip } from "./LeaderShip";
import { QuizCrew } from "./QuizCrew";
import { SafetyCrew } from "./SaftyCrew";

export interface IQHSEDaily {
    id: number,
    RigId: number,
    clientId: number,
    date: Date,
    stopCardsRecords: number,
    ptsmRecords: number,
    drillsRecords: number,
    
    manPowerNumber:  number,
    totalManPowerHours : number,
    weeklyInspection : number,
    monthlyInspection : number,
    wallName : string,
    totalPTW : number,
    safetyAlertCrewNumber : number,
    quizCrewNumber : number,

    ptwCold: number,
    PtwHot: number,
    leaderShipVisitsDTO:LeaderShip[],
    crewSaftyAlertDTO:SafetyCrew[],
    crewQuizDTO:QuizCrew[],
    recordableAccident: number,
    nonRecordableAccident: number,

    rigVehiclesKilometers: number,
    safetyInduction: number,
    rigTrackingClosedPoints: number,
    rigTrackingOpenPoints: number,
    daysSinceLastLTI: number,
    daysSinceNoLTIId: number,
    userId: string,
    isDeleted: boolean,
}
