using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TempProject.Models
{
	public class QHSEDailyReportExelDTO
	{
        public int Id { get; set; }
        public int RigNumber { get; set; }

	
		public DateTime Date { get; set; }

		public string ClientName { get; set; }
		public int StopCardsRecords { get; set; }

		public int PTSMRecords { get; set; }
		public int DrillsRecords { get; set; }
		public int PTWCold { get; set; }
		public int PTWHot { get; set; }
		public int RecordableAccident { get; set; }
		public int NonRecordableAccident { get; set; }
		public int RigVehiclesKilometers { get; set; }
		public int SafetyInduction { get; set; }
		public int RigTrackingClosedPoints { get; set; }
		public int RigTrackingOpenPoints { get; set; }
		public int DaysSinceLastLTI { get; set; }
		public int DaysSinceNoLTI { get; set; }
		public int ManPowerNumber { get; set; }
		public int TotalManPowerHours { get; set; }
		public int? WeeklyInspection { get; set; }
		public int? MonthlyInspection { get; set; }
		public string WallName { get; set; }
		public int TotalPTW { get; set; }
		public int SafetyAlertCrewNumber { get; set; }
		public int QuizCrewNumber { get; set; }
		public int LeaderShipVisits { get; set; }
		//public List<CrewQuizAndQHSEDaily> CrewQuizAndQHSEDaily { get; set; } = new List<CrewQuizAndQHSEDaily> { };
		//public List<string> CrewQuizAndQHSEDailys { get; set; } = new List<string>();
		//public List<CrewSaftyAlertAndQHSEDaily> CrewSaftyAlertAndQHSEDaily { get; set; } = new List<CrewSaftyAlertAndQHSEDaily> { };
		//public List<string> CrewSaftyAlertAndQHSEDailys { get; set; } = new List<string>();
		//public List<LeaderShipVisitsAndQHSEDaily> LeaderShipVisitsAndQHSEDaily { get; set; } = new List<LeaderShipVisitsAndQHSEDaily> { };
		//public List<string> LeaderShipVisitsAndQHSEDailys { get; set; } = new List<string>();
		public string UserName { set; get; }


    }
}
