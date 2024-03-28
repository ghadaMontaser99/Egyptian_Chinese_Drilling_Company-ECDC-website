using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using TempProject.Repository;

namespace TempProject.Models
{
    public class DaysSinceNoLTI : ISoftDeleteRepository
    {
        public int Id { get; set; }
		[ForeignKey("Rig")]
		public int RigId { get; set; }

		public virtual Rig Rig { get; set; }
		public int Days { get; set; }
		public virtual List<QHSEDailyReport> QHSEDailyReport { get; set; }
		public virtual List<LTIPrevDateAndDays> LTIPrevDateAndDays { get; set; }


		[DefaultValue(false)]
		public bool IsDeleted { get; set; }

	}
}
