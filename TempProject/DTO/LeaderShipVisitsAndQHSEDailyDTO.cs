using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using TempProject.Models;

namespace TempProject.DTO
{
	public class LeaderShipVisitsAndQHSEDailyDTO
	{
		public int Id { get; set; }
		public int LeadershipVisitId { get; set; }
		public int QHSEDailyId { get; set; }

		[DefaultValue(false)]
		public bool IsDeleted { get; set; }
	}
}
