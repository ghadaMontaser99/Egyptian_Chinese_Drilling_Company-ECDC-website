using Microsoft.Extensions.Hosting;
using System.ComponentModel;
using System.Drawing;
using System.Web.Http.Tracing;
using TempProject.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace TempProject.DTO
{
    public class QHSEYearChartDTO
	{

        //public int CountManPowerNumber { get; set; }
		public int CountTotalManPowerHoursYear  { get; set; }
		public int CountStopCardsYear { get; set; }
		public int CountPTSMYear { get; set; }
		//public int CountRigTrackingClosedPoints { get; set; }
		//public int CountRigTrackingOpenPoints { get; set; }
		//public int CountRigVehiclesKilometers { get; set; }
		public int CountDrillsYear { get; set; }
		//public int CountPTWHot { get; set; }
		//public int CountPTWCold { get; set; }
		public int CountRecordableAccidentYear { get; set; }
		public int CountNonRecordableAccidentYear { get; set; }
		public int CountSafetyInductionYear { get; set; }

		public int CountTotalPTWYear { get; set; }
		public int CountLeadershipVisitsYear { get; set; }
		public int CountQuizNumberCrewYear { get; set; }
		public int CountSafetyNumberCrewYear { get; set; }
		public int? CountMonthlyInspectionYear { get; set; }
		public int? CountWeeklyInspectionYear { get; set; }
		public int CountDaysSinceLastLTIYear { get; set; }


		[DefaultValue(false)]
		public bool IsDeleted { get; set; }

	}
}
