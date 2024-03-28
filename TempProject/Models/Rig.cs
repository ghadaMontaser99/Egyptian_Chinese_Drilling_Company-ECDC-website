using System.ComponentModel;
using TempProject.Repository;

namespace TempProject.Models
{
    public class Rig : ISoftDeleteRepository
    {
        public int Id { get; set; }
        public int Number { get; set; }

        [DefaultValue(false)]
        public bool IsDeleted { get; set; }
		public virtual List<DaysSinceNoLTI> DaysSinceNoLTI { get; set; }
		public virtual List<QHSEDailyReport> QHSEDailyReport { get; set; }
		public virtual List<Accident> Accidents { get; set; }
        public virtual List<RigMovePerformance> RigMovePerformances { get; set; }
        public virtual List<EmployeeCompetencyEvaluation> RigEmployeeCompetencyEvaluation { get; set; }
        public virtual List<PotentialHazard> PotentialHazard { get; set; }
        public virtual List<PPEReceiving> PPEReceiving { get; set;}

        public virtual List<EmpCode> EmpCode { get; set; }



	}
}
