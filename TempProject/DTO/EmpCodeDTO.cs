using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using TempProject.Models;

namespace TempProject.DTO
{
	public class EmpCodeDTO
	{
		public int Id { get; set; }
		public int Code { get; set; }
		[DefaultValue(false)]
		public bool IsDeleted { get; set; }
		public string Name { get; set; }
		public int PositionId { get; set; }
		public int RigId { get; set; }

	}
}
