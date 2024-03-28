using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using TempProject.Repository;

namespace TempProject.Models
{
	public class AccidentImages : ISoftDeleteRepository
	{
			public int Id { get; set; }
			public string FileName { get; set; }
			
			[ForeignKey("Accident")]
			public int AccidentId { get; set; } 
			public virtual Accident Accident { get; set; }
		    [DefaultValue(false)]
		    public bool IsDeleted { get; set; }

	}
}
