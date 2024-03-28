using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;
using TempProject.Repository;
using System.Web.Http.Tracing;

namespace TempProject.Models
{
    public class QHSEDailyReport : ISoftDeleteRepository
    {
        public int Id { get; set; }

        [ForeignKey("Rig")]
        public int RigId { get; set; }

        public virtual Rig Rig { get; set; }

		[ForeignKey("Client")]
		public int ClientId { get; set; }

		public virtual Client Client { get; set; }
		public virtual List<LeaderShipVisitsAndQHSEDaily> LeaderShipVisitsAndQHSEDaily { get; set; }

		[Column(TypeName = "date")]
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
		public virtual List<CrewSaftyAlertAndQHSEDaily> CrewSaftyAlertAndQHSEDaily { get; set; }
		public virtual List<CrewQuizAndQHSEDaily> CrewQuizAndQHSEDaily { get; set; }
		public int RecordableAccident { get; set; }
		public int NonRecordableAccident { get; set; }
		public int RigVehiclesKilometers { get; set; }
		public int SafetyInduction { get; set; }
		public int RigTrackingClosedPoints { get; set; }
		public int RigTrackingOpenPoints { get; set; }
		public int DaysSinceLastLTI { get; set; }
		[ForeignKey("DaysSinceNoLTI")]
		public int DaysSinceNoLTIId { get; set; }
		public virtual DaysSinceNoLTI DaysSinceNoLTI { get; set; }

		[DefaultValue(false)]
        public bool IsDeleted { get; set; }

        [ForeignKey("user")]
        public string UserId { set; get; }

        public virtual IdentityUser user { get; set; }

    }
}
