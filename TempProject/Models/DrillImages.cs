using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using TempProject.Repository;

namespace TempProject.Models
{
	public class DrillImages : ISoftDeleteRepository
	{
			public int Id { get; set; }
			public string FileName { get; set; }

			[ForeignKey("Drill")]
			public int DrillId { get; set; } 
			public virtual Drill Drill { get; set; }
		    [DefaultValue(false)]
		    public bool IsDeleted { get; set; }

	}
}
