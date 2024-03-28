using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using TempProject.Models;

namespace TempProject.DTO
{
    public class DaysSinceNoLTIDTO
	{
		public int Id { get; set; }
	
		public int RigId { get; set; }
		public int Days { get; set; }
		public int DaysAfterIncreasing { get; set; }
		public int DaysSinceNoLTIId { get; set; }


		[DefaultValue(false)]
		public bool IsDeleted { get; set; }

	}
}
