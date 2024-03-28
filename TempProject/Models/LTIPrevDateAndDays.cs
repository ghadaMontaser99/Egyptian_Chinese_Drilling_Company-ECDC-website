using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using TempProject.Repository;

namespace TempProject.Models
{
    public class LTIPrevDateAndDays : ISoftDeleteRepository
	{
        public int Id { get; set; }
		[ForeignKey("DaysSinceNoLTI")]
		public int DaysSinceNoLTIId { get; set; }

		public virtual DaysSinceNoLTI DaysSinceNoLTI { get; set; }
        public int PrevDays { get; set; }
		[Column(TypeName = "date")]
		public DateTime PrevDate { get; set; }

		[DefaultValue(false)]
		public bool IsDeleted { get; set; }

	}
}
