using System.ComponentModel;
using TempProject.Models;

namespace TempProject.DTO
{
	public class PositionDTO
	{
		public int Id { get; set; }
		public string Name { get; set; }
		[DefaultValue(false)]
		public bool IsDeleted { get; set; }
	}
}
