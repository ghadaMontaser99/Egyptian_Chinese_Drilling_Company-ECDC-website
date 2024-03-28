using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using TempProject.Models;

namespace TempProject.DTO
{
    public class QHSEDailyReportDTO
	{
		public int Id { get; set; }
		public int RigId { get; set; }
		public int ClientId { get; set; }
		public DateTime Date { get; set; }
		public int StopCardsRecords { get; set; }
		public int PTSMRecords { get; set; }
		public int DrillsRecords { get; set; }
		public int ManPowerNumber { get; set; }
		public int TotalManPowerHours { get; set; }
		public int? WeeklyInspection { get; set; }
		public int? MonthlyInspection { get; set; }
		public string WallName { get; set; }
		public int TotalPTW { get; set; }
		public int SafetyAlertCrewNumber { get; set; }
		public int QuizCrewNumber { get; set; }

		public int PTWCold { get; set; }
		public int PTWHot { get; set; }
		public int RecordableAccident { get; set; }
		public int NonRecordableAccident { get; set; }
		public int RigVehiclesKilometers { get; set; }
		public int SafetyInduction { get; set; }
		public int RigTrackingClosedPoints { get; set; }
		public int RigTrackingOpenPoints { get; set; }
		public int DaysSinceLastLTI { get; set; }
		public int DaysSinceNoLTIId { get; set; }
		public List<CrewSaftyAlertAndQHSEDaily> CrewSaftyAlertAndQHSEDaily { get; set; } = new List<CrewSaftyAlertAndQHSEDaily> { };
		public List<CrewQuizAndQHSEDaily> CrewQuizAndQHSEDaily { get; set; } = new List<CrewQuizAndQHSEDaily> { };
		public List<LeaderShipVisitsAndQHSEDaily> LeaderShipVisitsAndQHSEDaily { get; set; } = new List<LeaderShipVisitsAndQHSEDaily> { };

		[DefaultValue(false)]
		public bool IsDeleted { get; set; }
		public string UserId { set; get; }
	}
}
