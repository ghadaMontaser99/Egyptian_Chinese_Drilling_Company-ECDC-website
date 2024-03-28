using Microsoft.Extensions.Hosting;
using System.ComponentModel;
using System.Drawing;
using System.Web.Http.Tracing;
using TempProject.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace TempProject.DTO
{
    public class QHSEMonthlyChartDTO
	{

        //public int CountManPowerNumber { get; set; }
		public int CountTotalManPowerHoursMonth1  { get; set; }
		public int CountStopCardsMonth1 { get; set; }
		public int CountPTSMMonth1 { get; set; }
		//public int CountRigTrackingClosedPoints { get; set; }
		//public int CountRigTrackingOpenPoints { get; set; }
		//public int CountRigVehiclesKilometers { get; set; }
		public int CountDrillsMonth1 { get; set; }
		//public int CountPTWHot { get; set; }
		//public int CountPTWCold { get; set; }
		public int CountRecordableAccidentMonth1 { get; set; }
		public int CountNonRecordableAccidentMonth1 { get; set; }
		public int CountSafetyInductionMonth1 { get; set; }

		public int CountTotalPTWMonth1 { get; set; }
		public int CountLeadershipVisitsMonth1 { get; set; }
		public int CountQuizNumberCrewMonth1 { get; set; }
		public int CountSafetyNumberCrewMonth1 { get; set; }
		public int? CountMonthlyInspectionMonth1 { get; set; }
		public int? CountWeeklyInspectionMonth1 { get; set; }
		public int CountDaysSinceLastLTIMonth1 { get; set; }

		public int CountTotalManPowerHoursMonth2 { get; set; }
		public int CountStopCardsMonth2 { get; set; }
		public int CountPTSMMonth2 { get; set; }
		//public int CountRigTrackingClosedPoints { get; set; }
		//public int CountRigTrackingOpenPoints { get; set; }
		//public int CountRigVehiclesKilometers { get; set; }
		public int CountDrillsMonth2 { get; set; }
		//public int CountPTWHot { get; set; }
		//public int CountPTWCold { get; set; }
		public int CountRecordableAccidentMonth2 { get; set; }
		public int CountNonRecordableAccidentMonth2 { get; set; }
		public int CountSafetyInductionMonth2 { get; set; }

		public int CountTotalPTWMonth2 { get; set; }
		public int CountLeadershipVisitsMonth2 { get; set; }
		public int CountQuizNumberCrewMonth2 { get; set; }
		public int CountSafetyNumberCrewMonth2 { get; set; }
		public int? CountMonthlyInspectionMonth2 { get; set; }
		public int? CountWeeklyInspectionMonth2 { get; set; }
		public int CountDaysSinceLastLTIMonth2 { get; set; }


		[DefaultValue(false)]
		public bool IsDeleted { get; set; }

	}
}
