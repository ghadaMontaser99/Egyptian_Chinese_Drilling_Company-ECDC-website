using Microsoft.AspNetCore.Identity;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using TempProject.Repository;

namespace TempProject.Models
{
	public class PotentialHazard : ISoftDeleteRepository
	{
		
		public int Id { get; set; }
		[ForeignKey("Rig")]
		public int RigId { get; set; }
		public virtual Rig Rig { get; set; }

		[Column(TypeName = "date")]
		public DateTime Date { get; set; }

		[Column(TypeName = "date")]
		public DateTime PR_IssueDate { get; set; }

		public int PR_No { get; set; }
		public int PO_No { get; set; }

		[ForeignKey("Responsibility")]
		public int ResponibilityId { get; set; }
		public virtual Responsibility Responsibility { get; set; }
		public string Status { get; set; }
		public string Description { get; set; }
		public string NeededAction { get; set; }
		public string Title { get; set; }

		public virtual List<HazardImages> Images { get; set; } =new List<HazardImages>();

		[ForeignKey("user")]
		public string userID { get; set; }

		public virtual IdentityUser user { get; set; }
		[DefaultValue(false)]
		public bool IsDeleted { get; set; }

	}
}
