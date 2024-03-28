using System.ComponentModel;
using TempProject.Repository;

namespace TempProject.Models
{
	public class DrillType : ISoftDeleteRepository
	{
		public int Id { get; set; }
		public string Name { get; set; }
		[DefaultValue(false)]
		public virtual List<Drill> Drills { get; set; }
		public bool IsDeleted { get; set; }
	}
}
