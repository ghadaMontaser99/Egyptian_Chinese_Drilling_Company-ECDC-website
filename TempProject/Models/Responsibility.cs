using System.ComponentModel;
using TempProject.Repository;

namespace TempProject.Models
{
	public class Responsibility :ISoftDeleteRepository
	{
		public int Id { get; set; }
		public string Name { get; set; }
		[DefaultValue(false)]
		public virtual List<PotentialHazard> Hazards { get; set; }
		public bool IsDeleted { get; set; }
	}
}
